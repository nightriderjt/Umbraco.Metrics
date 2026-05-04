using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System.Diagnostics;
using UmbMetrics.Services;
using UmbMetrics.Services.Interfaces;

namespace UmbMetrics.Middleware;

public class DeliveryPulseMiddleware
{
    private readonly RequestDelegate _next;
    private readonly DeliveryPulseOptions _options;
    private const string DeliveryApiPrefix = "/umbraco/delivery/api/v1/";

    public DeliveryPulseMiddleware(RequestDelegate next, IOptions<DeliveryPulseOptions> options)
    {
        _next = next;
        _options = options.Value;
    }

    public async Task InvokeAsync(HttpContext context, IDeliveryPulseMetricsService metricsService)
    {
        var path = context.Request.Path.Value ?? string.Empty;

        if (!IsDeliveryApiRequest(path))
        {
            await _next(context);
            return;
        }

        var stopwatch = Stopwatch.StartNew();
        var requestSizeBytes = _options.TrackRequestSizes
            ? context.Request.ContentLength
            : null;

        long? responseSizeBytes = null;
        Stream? responseCaptureStream = null;
        var originalBodyStream = context.Response.Body;

        if (_options.TrackRequestSizes)
        {
            responseCaptureStream = new MemoryStream();
            context.Response.Body = responseCaptureStream;
        }

        try
        {
            await _next(context);

            stopwatch.Stop();

            if (_options.TrackRequestSizes && responseCaptureStream != null)
            {
                responseSizeBytes = await CaptureResponseSizeAsync(responseCaptureStream, originalBodyStream);
            }

            metricsService.RecordRequest(
                path,
                context.Request.Method,
                context.Response.StatusCode,
                stopwatch.ElapsedMilliseconds,
                requestSizeBytes,
                responseSizeBytes);
        }
        catch
        {
            stopwatch.Stop();

            metricsService.RecordRequest(
                path,
                context.Request.Method,
                500,
                stopwatch.ElapsedMilliseconds,
                requestSizeBytes,
                null);

            throw;
        }
        finally
        {
            if (responseCaptureStream != null)
            {
                await responseCaptureStream.DisposeAsync();
                context.Response.Body = originalBodyStream;
            }
        }
    }

    private static bool IsDeliveryApiRequest(string path)
    {
        return path.StartsWith(DeliveryApiPrefix, StringComparison.OrdinalIgnoreCase);
    }

    private static async Task<long> CaptureResponseSizeAsync(Stream captureStream, Stream originalStream)
    {
        captureStream.Seek(0, SeekOrigin.Begin);
        var size = captureStream.Length;
        await captureStream.CopyToAsync(originalStream);
        return size;
    }
}
