using System;
using System.Collections.Generic;
using System.Text;

namespace UmbMetrics.Observers
{   
    using System.Data.Common;
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
            switch (value.Key)
            {
                case "Microsoft.Data.SqlClient.WriteCommandBefore":
                    var command = (DbCommand)value.Value.GetType().GetProperty("Command").GetValue(value.Value);
                    string sql = command.CommandText;
                    _performanceMetricsService.SqlOperations.TryAdd((Guid)value.Value.GetType().GetProperty("OperationId").GetValue(value.Value),new SqlOperation { OperationValue = sql, StartCommand = DateTime.UtcNow, OperationKey = (Guid)value.Value.GetType().GetProperty("OperationId").GetValue(value.Value) });
                    break;
                 case "Microsoft.Data.SqlClient.WriteCommandAfter":
                   var operationId = (Guid)value.Value.GetType().GetProperty("OperationId").GetValue(value.Value);
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
    }
}
