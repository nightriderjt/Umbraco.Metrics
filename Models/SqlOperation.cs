using System;
using System.Collections.Generic;
using System.Text;

namespace UmbMetrics.Models
{
    public class SqlOperation
    {
        public Guid OperationKey { get; set; }
        public string? OperationValue { get; set; }
        public DateTime StartCommand { get; set; }
        public DateTime EndCommand { get; set; }
        public Boolean? Success { get; set; }
        public string? Error { get; set; } 
        public Double Duration { get; set;  }
        public bool HasStackTrace { get; set; }
    }

    public class SqlStackTrace
    {
        public string? Caller { get; set; }
        public string? Method { get; set; }
        public string? FileName { get; set; }
        public int LineNumber { get; set; }

        public SqlStackTrace? Child { get; set; }
    } 
}
