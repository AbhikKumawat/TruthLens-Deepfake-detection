import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  const getStyles = () => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'authentic':
      case 'clean':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'processing':
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'rejected':
      case 'ai detected':
      case 'suspicious':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-surface-200 text-muted border-border';
    }
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", getStyles())}>
      {status}
    </span>
  );
}
