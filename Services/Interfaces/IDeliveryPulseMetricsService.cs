using UmbMetrics.Models;

namespace UmbMetrics.Services.Interfaces;

public interface IDeliveryPulseMetricsService
{
    void RecordRequest(string path, string method, int statusCode, long durationMs, long? requestSizeBytes = null, long? responseSizeBytes = null);
    DeliveryPulseMetrics GetMetrics();
    List<DeliveryPulseEndpointStats> GetTopEndpoints(int count = 20);
    void ClearMetrics();
}
