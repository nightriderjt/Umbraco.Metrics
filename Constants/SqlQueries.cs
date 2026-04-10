namespace UmbMetrics.Constants;

/// <summary>
/// SQL queries used for Umbraco metrics collection
/// </summary>
/// 
public static class Generic
{
    public const string ApiName = "umbmetrics";
}
public static class SqlQueries
{
    public static class Content
    {
        /// <summary>
        /// Get total non-trashed content nodes count
        /// Parameter: @0 = Document ObjectType
        /// </summary>
        public const string TotalContentNodes =
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 0";

        /// <summary>
        /// Get published content nodes count
        /// </summary>
        public const string PublishedContentNodes =
            @"SELECT COUNT(*) FROM umbracoDocument d
              INNER JOIN umbracoNode n ON d.nodeId = n.id
              WHERE d.published = 1 AND n.trashed = 0";

        /// <summary>
        /// Get trashed content nodes count
        /// Parameter: @0 = Document ObjectType
        /// </summary>
        public const string TrashedContentNodes =
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 1";

        /// <summary>
        /// Get content types count
        /// </summary>
        public const string ContentTypeCount =
            "SELECT COUNT(*) FROM cmsContentType";
    }

    public static class Media
    {
        /// <summary>
        /// Get total non-trashed media nodes count
        /// Parameter: @0 = Media ObjectType
        /// </summary>
        public const string TotalMediaNodes =
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 0";

        /// <summary>
        /// Get total media file size in bytes from umbracoBytes property
        /// </summary>
        public const string TotalMediaSize =
            @"SELECT SUM(CAST(pd.varcharValue AS BIGINT)) 
              FROM umbracoPropertyData pd
              INNER JOIN cmsPropertyType pt ON pd.propertytypeid = pt.id
              WHERE pt.Alias = 'umbracoBytes' AND pd.varcharValue IS NOT NULL 
              AND pd.varcharValue != ''";

        /// <summary>
        /// Get count of media items by content type alias
        /// Parameter: @0 = Media ObjectType, @1 = ContentType Alias (e.g., 'Image', 'File')
        /// </summary>
        public const string MediaByTypeAlias =
            @"SELECT COUNT(*) FROM umbracoNode n
              INNER JOIN umbracoContent c ON n.id = c.nodeId
              INNER JOIN cmsContentType ct ON c.contentTypeId = ct.nodeId
              WHERE n.nodeObjectType = @0 AND n.trashed = 0
              AND ct.alias = @1";

        /// <summary>
        /// Get media types count
        /// Parameter: @0 = MediaType ObjectType
        /// </summary>
        public const string MediaTypeCount =
            @"SELECT COUNT(*) FROM cmsContentType 
              WHERE nodeId IN (SELECT id FROM umbracoNode WHERE nodeObjectType = @0)";
    }

    public static class Cache
    {
        /// <summary>
        /// Get published content count for NuCache statistics
        /// </summary>
        public const string PublishedContentCount =
            @"SELECT COUNT(*) FROM umbracoDocument d
              INNER JOIN umbracoNode n ON d.nodeId = n.id
              WHERE d.published = 1 AND n.trashed = 0";

        /// <summary>
        /// Get media count for NuCache statistics
        /// Parameter: @0 = Media ObjectType
        /// </summary>
        public const string MediaCount =
            @"SELECT COUNT(*) FROM umbracoNode 
              WHERE nodeObjectType = @0 AND trashed = 0";
    }

    public static class Thresholds
    {
        /// <summary>
        /// Insert a new threshold alert
        /// Parameters: @ruleid, @RuleName, @TriggeredAt, @Status, @Severity, @TriggeredValuesJson, @EmailSent
        /// </summary>
        public const string InsertAlert =
            @"INSERT INTO UmbMetrics_ThresholdAlerts 
              (RuleId, RuleName, TriggeredAt, Status, Severity, TriggeredValuesJson, EmailSent)
              VALUES (@ruleid, @RuleName, @TriggeredAt, @Status, @Severity, @TriggeredValuesJson, @EmailSent);
              SELECT CAST(SCOPE_IDENTITY() AS INT);";

        /// <summary>
        /// Get active alerts
        /// Parameter: @0 = Status (AlertStatus.Active)
        /// </summary>
        public const string GetActiveAlerts =
            @"SELECT Id, RuleId, RuleName, TriggeredAt,AcknowledgedAt, 
                     Status, Severity, TriggeredValuesJson, EmailSent, EmailSentAt                     
              FROM UmbMetrics_ThresholdAlerts 
              WHERE Status = @0
              ORDER BY TriggeredAt DESC";

        /// <summary>
        /// Acknowledge an alert
        /// Parameters: @0 = Status (AlertStatus.Acknowledged), @1 = AcknowledgedAt, @2 = ResolvedBy, @3 = AlertId, @4 = Status (AlertStatus.Active)
        /// </summary>
        public const string AcknowledgeAlert =
            @"UPDATE UmbMetrics_ThresholdAlerts 
              SET Status = @0, AcknowledgedAt = @1
              WHERE Id = @2 AND Status = @3";



        /// <summary>
        /// Get total alerts count
        /// </summary>
        public const string TotalAlertsCount = "SELECT COUNT(*) FROM UmbMetrics_ThresholdAlerts";

        /// <summary>
        /// Get active alerts count
        /// Parameter: @0 = Status (AlertStatus.Active)
        /// </summary>
        public const string AlertsCountByStatus = "SELECT COUNT(*) FROM UmbMetrics_ThresholdAlerts WHERE Status = @status";





        /// <summary>
        /// Get alerts count from last 24 hours
        /// </summary>
        public const string Last24HoursAlertsCount = "SELECT COUNT(*) FROM UmbMetrics_ThresholdAlerts WHERE TriggeredAt >= DATEADD(hour, -24, GETUTCDATE())";

        /// <summary>
        /// Get alerts count from last 7 days
        /// </summary>
        public const string Last7DaysAlertsCount = "SELECT COUNT(*) FROM UmbMetrics_ThresholdAlerts WHERE TriggeredAt >= DATEADD(day, -7, GETUTCDATE())";

        /// <summary>
        /// Get last alert time
        /// </summary>
        public const string LastAlertTime = "SELECT MAX(TriggeredAt) FROM UmbMetrics_ThresholdAlerts";

        /// <summary>
        /// Get alerts count by severity
        /// </summary>
        public const string AlertsBySeverity = "SELECT Severity, COUNT(*) as Count FROM UmbMetrics_ThresholdAlerts GROUP BY Severity";

        /// <summary>
        /// Get alerts count by rule name
        /// </summary>
        public const string AlertsByRule = "SELECT RuleName, COUNT(*) as Count FROM UmbMetrics_ThresholdAlerts GROUP BY RuleName";

        /// <summary>
        /// Update email sent status for an alert
        /// Parameters: @0 = EmailSent (true), @1 = EmailSentAt, @2 = AlertId
        /// </summary>
        public const string UpdateEmailStatus =
            @"UPDATE UmbMetrics_ThresholdAlerts 
              SET EmailSent = @0, EmailSentAt = @1
              WHERE Id = @2";
    }
}
