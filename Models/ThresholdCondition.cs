namespace UmbMetrics.Models;

public class ThresholdCondition
{
    public int Id { get; set; }
    public ConditionType Type { get; set; }

    // For single conditions
    public MetricType? Metric { get; set; }
    public ComparisonOperator? Operator { get; set; }
    public double? Value { get; set; }

    // For nested conditions
    public List<ThresholdCondition> Children { get; set; } = new();

    // Helper methods
    public bool IsSingleCondition => Type == ConditionType.Single;
    public bool IsCompositeCondition => Type == ConditionType.And || Type == ConditionType.Or;

    public override string ToString()
    {
        if (IsSingleCondition && Metric.HasValue && Operator.HasValue && Value.HasValue)
        {
            return $"{Metric} {Operator} {Value}";
        }
        else if (IsCompositeCondition)
        {
            var operatorStr = Type == ConditionType.And ? "AND" : "OR";
            return $"({string.Join($" {operatorStr} ", Children.Select(c => c.ToString()))})";
        }
        return "Invalid Condition";
    }

    // Validation
    public bool IsValid()
    {
        if (IsSingleCondition)
        {
            return Metric.HasValue && Operator.HasValue && Value.HasValue;
        }
        else if (IsCompositeCondition)
        {
            return Children != null && Children.Count >= 2 && Children.All(c => c.IsValid());
        }
        return false;
    }
}