using System.Globalization;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UmbMetrics.Models;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Services;

public class HistoricalMetricsService : IHistoricalMetricsService, IHostedService, IDisposable
{
    private readonly IPerformanceMetricsService _performanceMetricsService;
    private readonly ILogger<HistoricalMetricsService> _logger;
    private readonly IWebHostEnvironment _webHostEnvironment;
    private readonly HistoricalMetricsOptions _options;
    private Timer? _timer;
    private bool _disposed;

    public HistoricalMetricsService(
        IPerformanceMetricsService performanceMetricsService,
        ILogger<HistoricalMetricsService> logger,
        IOptions<HistoricalMetricsOptions> options,
        IWebHostEnvironment webHostEnvironment)
    {
        _performanceMetricsService = performanceMetricsService;
        _logger = logger;
        _webHostEnvironment = webHostEnvironment;
        _options = options.Value;     
        // Ensure storage directory exists
        EnsureStorageDirectory();
    }

    public async Task SaveMetricsAsync()
    {
        try
        {
            var metrics = await _performanceMetricsService.GetMetricsAsync();
            await SaveMetricsToFileAsync(metrics);
            _logger.LogDebug("Saved performance metrics to historical storage");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving metrics to historical storage");
        }
    }

    public async Task<Memory<PerformanceMetrics>> GetHistoricalMetricsAsync(DateTime startDate, DateTime endDate)
    {
        var allMetrics = new List<PerformanceMetrics>();
        var files = GetDailyFilesForDateRange(startDate, endDate);

        for (int i = 0; i < files.Count; i++)
        {         
            var file = files[i];
            await foreach (var metric in StreamMetricsFromFileAsync(file))
            {
                allMetrics.Add(metric);
            }
        }
        return allMetrics.ToArray().AsMemory();
    }
    private async IAsyncEnumerable<PerformanceMetrics> StreamMetricsFromFileAsync(string filePath)
    {
        using var reader = new StreamReader(filePath);
        string? line;
        var jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = false, // No indentation for smaller file size
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
        while ((line = await reader.ReadLineAsync()) != null)
        {
            var metric = JsonSerializer.Deserialize<PerformanceMetrics>(line, jsonOptions);
            if (metric != null) yield return metric;
        }
    }
    public async Task<Memory<PerformanceMetrics>> GetLatestMetricsAsync(int count)
    {
        try
        {
            var recentDays = Math.Max(7, count / 100);
            // Get files and REVERSE them to start with the most recent data
            var files = GetDailyFilesForDateRange(DateTime.UtcNow.AddDays(-recentDays), DateTime.UtcNow);
            files.Reverse();
            var allMetrics = new List<PerformanceMetrics>();
            foreach (var file in files)
            {           
                if (allMetrics.Count >= count) break;
                try
                {
                   
                    Memory<PerformanceMetrics> fileMemory = await ReadMetricsFromFileAsync(file);                  
                    ReadOnlySpan<PerformanceMetrics> span = fileMemory.Span;
                    foreach (var metric in span)
                    {
                        allMetrics.Add(metric);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(ex, "Error reading file: {File}", file);
                }
            }

            // Final Sort and Take
            var result = allMetrics
                .OrderByDescending(m => m.Timestamp)
                .Take(count)
                .ToArray();

            return result.AsMemory();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting latest metrics");
            return Memory<PerformanceMetrics>.Empty;
        }
    }

    public async Task CleanupOldDataAsync()
    {
        try
        {
            UpdateCleanupLogicForDailyFiles();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up old data");
        }
    }

    public async Task<HistoricalMetricsStats> GetStorageStatsAsync()
    {
        var stats = new HistoricalMetricsStats
        {
            StoragePath = _options.StoragePath
        };

        try
        {
            var files = Directory.GetFiles(_options.StoragePath, "metrics-*.json");
            stats.TotalFiles = files.Length;
            
            if (files.Length > 0)
            {
                stats.TotalSizeBytes = files.Sum(f => new FileInfo(f).Length);
                
                var dates = files
                    .Select(f => TryParseDateFromFileName(f, out var date) ? date : (DateTime?)null)
                    .Where(d => d.HasValue)
                    .Select(d => d!.Value)
                    .ToList();
                    
                if (dates.Count > 0)
                {
                    stats.OldestRecord = dates.Min();
                    stats.NewestRecord = dates.Max();
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting storage stats");
        }

        return stats;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Historical Metrics Service starting");
        
        // Start the timer for periodic saving
        _timer = new Timer(
            async _ => await SaveMetricsAsync(),
            null,
            TimeSpan.Zero,
            TimeSpan.FromSeconds(_options.SaveIntervalSeconds));

        // Start cleanup timer if enabled
        if (_options.EnableAutoCleanup)
        {
            var cleanupTimer = new Timer(
                async _ => await CleanupOldDataAsync(),
                null,
                TimeSpan.FromHours(1), // First run after 1 hour
                TimeSpan.FromHours(_options.CleanupIntervalHours));
        }

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _logger.LogInformation("Historical Metrics Service stopping");
        
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        if (!_disposed)
        {
            _timer?.Dispose();
            _disposed = true;
            GC.SuppressFinalize(this);
        }
    }

    private async Task SaveMetricsToFileAsync(PerformanceMetrics metrics)
    {
        try
        {
            // Create filename based on date (daily files)
            var datePart = metrics.Timestamp.ToString("yyyyMMdd");
            var fileName = $"metrics-{datePart}.json";
            var filePath = Path.Combine(_options.StoragePath, fileName);

            var jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = false, // No indentation for smaller file size
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(metrics, jsonOptions);
            
            // Append to file with newline
            await using var stream = new FileStream(filePath, FileMode.Append, FileAccess.Write, FileShare.Read);
            await using var writer = new StreamWriter(stream, Encoding.UTF8);
            await writer.WriteLineAsync(json);

            // Enforce max file size limit
            await EnforceMaxFileSizeLimitAsync(filePath);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error saving metrics to file");
        }
    }

    private async Task EnforceMaxFileSizeLimitAsync(string filePath)
    {
        try
        {
            var fileInfo = new FileInfo(filePath);
            if (fileInfo.Exists && fileInfo.Length > _options.MaxFileSizeBytes)
            {
                // Read all lines from the file
                var lines = await File.ReadAllLinesAsync(filePath, Encoding.UTF8);
                
                // Keep only the most recent lines that fit within the size limit
                var keptLines = new List<string>();
                var currentSize = 0L;
                
                // Start from the end (most recent) and work backwards
                for (int i = lines.Length - 1; i >= 0; i--)
                {
                    var lineSize = Encoding.UTF8.GetByteCount(lines[i]) + 2; // +2 for newline
                    if (currentSize + lineSize > _options.MaxFileSizeBytes)
                        break;
                    
                    keptLines.Insert(0, lines[i]); // Insert at beginning to maintain order
                    currentSize += lineSize;
                }
                
                // Write back the kept lines
                await File.WriteAllLinesAsync(filePath, keptLines, Encoding.UTF8);
                _logger.LogDebug("Trimmed file {FilePath} to stay within size limit", filePath);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error enforcing max file size limit");
        }
    }

    private void EnsureStorageDirectory()
    {
        try
        {
            if (!Directory.Exists(_options.StoragePath))
            {
                Directory.CreateDirectory(_options.StoragePath);
                _logger.LogInformation("Created historical metrics storage directory: {Path}", _options.StoragePath);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating storage directory");
        }
    }

    private List<string>  GetDailyFilesForDateRange(DateTime startDate, DateTime endDate)
    {
        var files = new List<string>();
        
        // Generate all possible daily file names for the date range
        var currentDate = startDate.Date;
        while (currentDate <= endDate.Date)
        {
            var fileName = $"metrics-{currentDate:yyyyMMdd}.json";
            var filePath = Path.Combine(_options.StoragePath
            , fileName);
            
            if (File.Exists(filePath))
            {
                files.Add(filePath);
            }            
            currentDate = currentDate.AddDays(1);
        }
        
        return files;
    }

    private async Task<Memory<PerformanceMetrics>> ReadMetricsFromFileAsync(string filePath)
    {
        var metricsList = new List<PerformanceMetrics>();
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        try
        {            
            using var reader = new StreamReader(filePath, Encoding.UTF8);
            string? line;          
            while ((line = await reader.ReadLineAsync()) != null)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;

                try
                {
                    var metric = JsonSerializer.Deserialize<PerformanceMetrics>(line, jsonOptions);
                    if (metric != null)
                    {
                        metricsList.Add(metric);
                    }
                }
                catch (JsonException ex)
                {
                    _logger.LogDebug(ex, "Error parsing JSON line in file {File}: {Line}", filePath, line);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error reading metrics file: {File}", filePath);
        }

        return metricsList.ToArray().AsMemory();
    }

    private bool TryParseDateFromFileName(string filePath, out DateTime date)
    {
        date = DateTime.MinValue;
        
        try
        {
            var fileName = Path.GetFileNameWithoutExtension(filePath);
            if (fileName.StartsWith("metrics-"))
            {
                var datePart = fileName.Substring(8); // Remove "metrics-"
                // Try parsing as daily file (yyyyMMdd)
                if (DateTime.TryParseExact(datePart, "yyyyMMdd", 
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out var parsedDate))
                {
                    date = parsedDate;
                    return true;
                }
                // Also try the old format for backward compatibility (yyyyMMdd-HHmmss)
                if (DateTime.TryParseExact(datePart, "yyyyMMdd-HHmmss", 
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out parsedDate))
                {
                    date = parsedDate;
                    return true;
                }
            }
        }
        catch
        {
            // Ignore parsing errors
        }
        
        return false;
    }

    private void UpdateCleanupLogicForDailyFiles()
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-_options.RetentionDays).Date;
            var files = Directory.GetFiles(_options.StoragePath, "metrics-*.json");

            int deletedCount = 0;
            foreach (var file in files)
            {
                if (TryParseDateFromFileName(file, out var fileDate) && fileDate < cutoffDate)
                {
                    try
                    {
                        File.Delete(file);
                        deletedCount++;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(ex, "Error deleting old metrics file: {File}", file);
                    }
                }
            }

            if (deletedCount > 0)
            {
                _logger.LogInformation("Cleaned up {Count} old metrics files", deletedCount);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up old data");
        }
    }
}

public class HistoricalMetricsOptions
{
    public string StoragePath { get; set; } = "Data/MetricsHistory";
    public int SaveIntervalSeconds { get; set; } = 5;
    public int RetentionDays { get; set; } = 30;
    public long MaxFileSizeBytes { get; set; } = 100 * 1024 * 1024; // 100 MB default
    public bool EnableAutoCleanup { get; set; } = true;
    public int CleanupIntervalHours { get; set; } = 24;
}
