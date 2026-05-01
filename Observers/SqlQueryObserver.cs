using System;
using System.Collections.Generic;
using System.Text;

namespace UmbMetrics.Observers
{   
    using System.Data.Common;
    using System.Diagnostics;
    using System.Reflection;
    using System.Xml.Linq;
    using UmbMetrics.Models;
    using UmbMetrics.Observers.Interfaces;
    using UmbMetrics.Services;

    public class SqlQueryObserver : IDbObserver
    {
        private readonly IPerformanceMetricsService _performanceMetricsService;

        public SqlQueryObserver(IPerformanceMetricsService performanceMetricsService)
        {
            _performanceMetricsService = performanceMetricsService;
        }
        public void OnCompleted() {}
        public void OnError(Exception error) { }

        public void OnNext(KeyValuePair<string, object?> value)
        {
            Guid operationId = GetOperationId(value);
            switch (value.Key)
            {
                 
                case "Microsoft.Data.SqlClient.WriteCommandBefore":
                    var command = (DbCommand)value.Value.GetType().GetProperty("Command").GetValue(value.Value);
                    string sql = command.CommandText;                 
                    var callerMethod = GetFullStackTrace();
                    _performanceMetricsService.SqlOperations.TryAdd(operationId, new SqlOperation { OperationValue = sql, StartCommand = DateTime.UtcNow, OperationKey = operationId, HasStackTrace = callerMethod != null });
                    if (callerMethod != null)
                    {
                        _performanceMetricsService.SqlStackTraces.TryAdd(operationId, callerMethod);
                    }
                    break;
                case "Microsoft.Data.SqlClient.WriteCommandAfter":                 
                   _performanceMetricsService.SqlOperations.TryGetValue(operationId, out var sqlOperation);
                    sqlOperation?.EndCommand = DateTime.UtcNow;
                    sqlOperation?.Success = true;
                    sqlOperation?.Duration = sqlOperation.EndCommand.Subtract( sqlOperation.StartCommand).TotalMilliseconds;
                    break;
                    case "Microsoft.Data.SqlClient.WriteCommandError":
                    var errorOperationId = (Guid)value.Value.GetType().GetProperty("OperationId").GetValue(value.Value);
                                        _performanceMetricsService.SqlOperations.TryGetValue(errorOperationId, out var errorSqlOperation);
                                        errorSqlOperation?.EndCommand = DateTime.UtcNow;
                    errorSqlOperation?.Success = false;
                    errorSqlOperation?.Error = ((Exception)value.Value.GetType().GetProperty("Exception").GetValue(value.Value)).Message;
                    errorSqlOperation?.Duration = errorSqlOperation.EndCommand.Subtract(errorSqlOperation.StartCommand).TotalMilliseconds;
                    break;
                default:
                    break;
            }          
        }

        private static Guid GetOperationId(KeyValuePair<string, object?> value)
        {
            return (Guid)value.Value.GetType().GetProperty("OperationId").GetValue(value.Value);
        }

        private SqlStackTrace? GetFullStackTrace()
        {
            var stackTrace = new System.Diagnostics.StackTrace(true);

            SqlStackTrace? root = null;   // The very first custom method called
            SqlStackTrace? current = null; // The pointer for the chain

            // Iterate from the bottom of the stack (Oldest / Entry point) 
            // to the top (Newest / SQL Trigger)
            for (int i = stackTrace.FrameCount - 1; i >= 0; i--)
            {
                var frame = stackTrace.GetFrame(i);
                var method = frame?.GetMethod();
                var type = method?.DeclaringType;

                if (type == null || method == null) continue;

                // NEW: Check for TState or Diagnostic bridge methods
                if (IsInfrastructure(type.Assembly, type.FullName) || IsInternalStateFrame(method))
                    continue;

                var newNode = new SqlStackTrace
                {
                    Caller = type.FullName,
                    Method = method.Name,
                    FileName = frame.GetFileName(),
                    LineNumber = frame.GetFileLineNumber()
                };

                if (root == null)
                {
                    root = newNode; // This is your Controller action or Background Task
                    current = root;
                }
                else
                {
                    current!.Child = newNode; // Link the caller to the called method
                    current = newNode;        // Move the pointer down
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
            typeName.StartsWith("Swashbuckle") ||
            typeName.StartsWith("StackExchange")
                           ;
        }

        private bool IsInternalStateFrame(MethodBase method)
        {
            var type = method.DeclaringType;

            // 1. Skip the Async State Machine "MoveNext" noise
            // Compiler generated types for async often look like <MyMethod>d__1
            if (method.Name == "MoveNext" && type != null && type.Name.Contains("<") && type.Name.Contains(">"))
                return true;

            // 2. Skip Task-specific plumbing
            if (type != null && typeof(System.Runtime.CompilerServices.IAsyncStateMachine).IsAssignableFrom(type))
                return true;

            // 3. Skip TState/DiagnosticSource (from previous step)
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
                // We look for the literal string "TState" in the generic parameter name
                if (genericArgs[i].Name == "TState")
                {
                    return true;
                }
            }

            return false;
        }



    }
}
