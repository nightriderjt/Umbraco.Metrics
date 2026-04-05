using System.Globalization;

namespace UmbMetrics
{
    public static class Utils
    {
        public static bool TryParseDateFromFileName(string filePath, out DateTime date)
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
    }
}
