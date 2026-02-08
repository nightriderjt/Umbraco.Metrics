namespace UmbMetrics.Models;

public class BackofficeUserInfo
{
    public int ActiveUsers { get; set; }
    public int TotalUsers { get; set; }
    public int AdminUsers { get; set; }
    public int CurrentSessions { get; set; }
}