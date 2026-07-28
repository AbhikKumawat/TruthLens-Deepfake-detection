import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("p-6 bg-surface-50 border border-border rounded-card hover:bg-hover transition-colors", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted">{title}</span>
        <Icon className="w-5 h-5 text-muted" />
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        {trend && (
          <span className={cn("text-xs font-medium", trend.isPositive ? "text-emerald-500" : "text-rose-500")}>
            {trend.isPositive ? "+" : "-"}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
