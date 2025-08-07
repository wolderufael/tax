import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "info";
  subtitle?: string;
}

const getVariantStyles = (variant: StatsCardProps["variant"]) => {
  switch (variant) {
    case "success":
      return "border-green-200 bg-green-50";
    case "warning":
      return "border-yellow-200 bg-yellow-50";
    case "info":
      return "border-blue-200 bg-blue-50";
    default:
      return "border-gray-200 bg-white";
  }
};

const getIconStyles = (variant: StatsCardProps["variant"]) => {
  switch (variant) {
    case "success":
      return "text-green-600 bg-green-100";
    case "warning":
      return "text-yellow-600 bg-yellow-100";
    case "info":
      return "text-blue-600 bg-blue-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
  subtitle,
}) => {
  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md min-h-[140px] ${getVariantStyles(
        variant
      )}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-xs font-medium text-muted-foreground leading-tight max-w-[70%]">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg flex-shrink-0 ${getIconStyles(variant)}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="text-lg font-bold text-foreground leading-tight break-words">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>

          <div className="flex items-center justify-between">
            {subtitle && (
              <div className="text-xs text-muted-foreground font-medium">
                {subtitle}
              </div>
            )}
            {trend && (
              <div
                className={`text-xs font-medium flex items-center gap-1 ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                } ${subtitle ? "ml-auto" : ""}`}
              >
                <span>{trend.isPositive ? "↗" : "↘"}</span>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
