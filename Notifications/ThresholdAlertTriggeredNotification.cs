using System;
using System.Collections.Generic;
using System.Text;
using UmbMetrics.Models;
using Umbraco.Cms.Core.Notifications;

namespace UmbMetrics.Notifications
{
    public class ThresholdAlertTriggeredNotification:INotification
    {
        public readonly ThresholdRule _rule;
        public readonly PerformanceMetrics _metrics;

        public ThresholdAlertTriggeredNotification(ThresholdRule rule, PerformanceMetrics metrics)
        {
            _rule = rule;
            _metrics = metrics;
        }       
    }
}
