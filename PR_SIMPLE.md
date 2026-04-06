# Add Thresholds Monitoring

## Summary
This PR adds a thresholds monitoring system to the Umbraco Metrics package. Administrators can now set up automated alerts based on performance metrics thresholds.

## What's New
- **Thresholds Monitoring Dashboard**: New tab in backoffice to monitor alerts and rules
- **Threshold Rules**: Create rules with conditions (greater than, less than, etc.) for various metrics
- **Alert System**: Automated email and webhook notifications when thresholds are breached
- **Improved Notifications**: Better email templates and webhook delivery tracking
- **Performance**: Delay added to prevent false positives, async loading for better performance

## Technical Changes
- New services: `ThresholdEvaluationService`, `UmbMetricslNotificationService`
- New models for thresholds, alerts, and rules
- Database migrations for threshold tables
- Updated dashboard with monitoring tab
- Localization support for thresholds