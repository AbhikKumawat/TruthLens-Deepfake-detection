import { cn } from "@/lib/utils";

export default function LoadingSkeleton({ className, type = "card" }: { className?: string, type?: "card" | "text" | "chart" }) {
  if (type === "text") {
    return <div className={cn("h-4 bg-surface-200 rounded animate-pulse w-full", className)} />;
  }
  
  if (type === "chart") {
    return <div className={cn("h-[300px] bg-surface-100 rounded-card border border-border animate-pulse", className)} />;
  }

  return (
    <div className={cn("p-6 bg-surface-50 border border-border rounded-card animate-pulse", className)}>
      <div className="h-4 w-1/3 bg-surface-200 rounded mb-4" />
      <div className="h-8 w-1/2 bg-surface-200 rounded" />
    </div>
  );
}
