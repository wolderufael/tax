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

const variantAccent = {
  default: "bg-gray-400",
  success: "bg-green-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}) => {
  return (
    <Card
      className={`relative overflow-hidden rounded-2xl border-0 shadow-md bg-gradient-to-br from-white via-gray-50 to-gray-100 transition-transform duration-200 hover:scale-[1.025] hover:shadow-lg ${getVariantStyles(
        variant
      )}`}
    >
      {/* Accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1.5 rounded-l-2xl ${
          variantAccent[variant] || variantAccent.default
        }`}
      ></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm md:text-base font-semibold tracking-wide text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 md:p-3 rounded-lg ${getIconStyles(variant)}`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="text-lg md:text-xl font-medium text-foreground">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div
              className={`text-xs md:text-sm font-medium flex items-center gap-1 ${
                trend.isPositive ? "text-success" : "text-destructive"
              }`}
            >
              <span className="text-base md:text-lg">
                {trend.isPositive ? "↗" : "↘"}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
