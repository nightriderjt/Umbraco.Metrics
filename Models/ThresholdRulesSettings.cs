namespace UmbMetrics.Models;

public class ThresholdRulesSettings
{
    public List<ThresholdRule> Rules { get; set; } = new();

    public const string  SectionName = "UmbMetrics:ThresholdRules";
}