using System.Collections.Concurrent;
using System.Data.Common;
using System.Diagnostics;
using System.Reflection;
using System.Text;
using UmbMetrics.Models;
using UmbMetrics.Observers.Interfaces;
using UmbMetrics.Services;

namespace UmbMetrics.Observers
{
    public class SqlQueryObserver : IDbObserver
    {
        private readonly IPerformanceMetricsService _performanceMetricsService;

        /// <summary>
        /// Cached PropertyInfo lookups to avoid repeated reflection calls per event.
        /// Keyed by (payloadType, propertyName) for fast access.
        /// </summary>
        private static readonly ConcurrentDictionary<(Type, string), PropertyInfo?> _propertyCache = new();

        public SqlQueryObserver(IPerformanceMetricsService performanceMetricsService)
        {
            _performanceMetricsService = performanceMetricsService;
        }

        public void OnCompleted() { }
        public void OnError(Exception error) { }

        public void OnNext(KeyValuePair<string, object?> value)
        {
            if (value.Value == null) return;

            Guid operationId = GetOperationId(value.Value);
            switch (value.Key)
            {
                case "Microsoft.Data.SqlClient.WriteCommandBefore":
                    var command = GetPropertyValue<DbCommand>(value.Value, "Command");
                    if (command == null) break;

                    string sql = command.CommandText;
                    string queryHash = ComputeQueryHash(sql);
                    var callerMethod = GetFullStackTrace();
                    _performanceMetricsService.SqlOperations.TryAdd(operationId, new SqlOperation
                    {
                        OperationValue = sql,
                        QueryHash = queryHash,
                        StartCommand = DateTime.UtcNow,
                        OperationKey = operationId,
                        HasStackTrace = callerMethod != null
                    });
                    if (callerMethod != null)
                    {
                        _performanceMetricsService.SqlStackTraces.TryAdd(operationId, callerMethod);
                    }
                    break;

                case "Microsoft.Data.SqlClient.WriteCommandAfter":
                    if (_performanceMetricsService.SqlOperations.TryGetValue(operationId, out var sqlOperation))
                    {
                        sqlOperation.EndCommand = DateTime.UtcNow;
                        sqlOperation.Success = true;
                        sqlOperation.Duration = sqlOperation.EndCommand.Subtract(sqlOperation.StartCommand).TotalMilliseconds;
                    }
                    break;

                case "Microsoft.Data.SqlClient.WriteCommandError":
                    var errorOperationId = GetOperationId(value.Value);
                    if (_performanceMetricsService.SqlOperations.TryGetValue(errorOperationId, out var errorSqlOperation))
                    {
                        errorSqlOperation.EndCommand = DateTime.UtcNow;
                        errorSqlOperation.Success = false;
                        errorSqlOperation.Error = GetPropertyValue<Exception>(value.Value, "Exception")?.Message;
                        errorSqlOperation.Duration = errorSqlOperation.EndCommand.Subtract(errorSqlOperation.StartCommand).TotalMilliseconds;
                    }
                    break;
            }
        }

        /// <summary>
        /// Gets a property value from a payload object using cached reflection.
        /// The PropertyInfo is cached after the first lookup for each (type, property) pair.
        /// </summary>
        private static T? GetPropertyValue<T>(object payload, string propertyName)
        {
            var type = payload.GetType();
            var key = (type, propertyName);

            var property = _propertyCache.GetOrAdd(key, static k =>
            {
                return k.Item1.GetProperty(k.Item2, BindingFlags.Public | BindingFlags.Instance);
            });

            if (property == null) return default;
            var value = property.GetValue(payload);
            return value is null ? default : (T)value;
        }

        private static Guid GetOperationId(object payload)
        {
            return GetPropertyValue<Guid>(payload, "OperationId");
        }

        private SqlStackTrace? GetFullStackTrace()
        {
            var stackTrace = new System.Diagnostics.StackTrace(true);

            SqlStackTrace? root = null;
            SqlStackTrace? current = null;

            for (int i = stackTrace.FrameCount - 1; i >= 0; i--)
            {
                var frame = stackTrace.GetFrame(i);
                var method = frame?.GetMethod();
                var type = method?.DeclaringType;

                if (type == null || method == null) continue;

                if (IsInfrastructure(type.Assembly, type.FullName) || IsInternalStateFrame(method))
                    continue;

                string? fileName = frame.GetFileName();
                int lineNumber = frame.GetFileLineNumber();

                var newNode = new SqlStackTrace
                {
                    Caller = type.FullName,
                    Method = method.Name,
                    FileName = fileName,
                    LineNumber = lineNumber
                };

                if (root == null)
                {
                    root = newNode;
                    current = root;
                }
                else
                {
                    current!.Child = newNode;
                    current = newNode;
                }
            }

            return root;
        }

        private bool IsInfrastructure(Assembly assembly, string typeName)
        {
            return
                typeName.Contains("AsyncTaskMethodBuilder") ||
                typeName.Contains("ConfiguredTaskAwaitable") ||
                typeName.Contains("SqlQueryObserver") ||
                typeName.Contains("Diagnostic") ||
                typeName.StartsWith("System.") ||
                typeName.StartsWith("Microsoft.") ||
                typeName.StartsWith("StackExchange");
        }

        private bool IsInternalStateFrame(MethodBase method)
        {
            var type = method.DeclaringType;

            if (method.Name == "MoveNext" && type != null && type.Name.Contains("<") && type.Name.Contains(">"))
                return true;

            if (type != null && typeof(System.Runtime.CompilerServices.IAsyncStateMachine).IsAssignableFrom(type))
                return true;

            if (method.Name.Contains("WriteContext") || method.IsGenericMethod && IsTState(method))
                return true;

            return false;
        }

        private bool IsTState(System.Reflection.MethodBase method)
        {
            if (!method.IsGenericMethod) return false;

            var genericArgs = method.GetGenericArguments();
            for (int i = 0; i < genericArgs.Length; i++)
            {
                if (genericArgs[i].Name == "TState")
                {
                    return true;
                }
            }

            return false;
        }

        /// <summary>
        /// Computes a deterministic hash from SQL query text for grouping identical queries.
        /// Normalizes whitespace before hashing to group queries that differ only in formatting.
        /// </summary>
        private static string ComputeQueryHash(string sql)
        {
            if (string.IsNullOrWhiteSpace(sql))
                return string.Empty;

            var normalized = new StringBuilder(sql.Length);
            bool lastWasSpace = false;
            foreach (char c in sql.Trim())
            {
                if (char.IsWhiteSpace(c))
                {
                    if (!lastWasSpace)
                    {
                        normalized.Append(' ');
                        lastWasSpace = true;
                    }
                }
                else
                {
                    normalized.Append(c);
                    lastWasSpace = false;
                }
            }

            using var sha256 = System.Security.Cryptography.SHA256.Create();
            byte[] inputBytes = Encoding.UTF8.GetBytes(normalized.ToString());
            byte[] hashBytes = sha256.ComputeHash(inputBytes);

            var hash = new StringBuilder(16);
            for (int i = 0; i < 8; i++)
            {
                hash.Append(hashBytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
    }
}
