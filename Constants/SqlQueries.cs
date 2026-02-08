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
}