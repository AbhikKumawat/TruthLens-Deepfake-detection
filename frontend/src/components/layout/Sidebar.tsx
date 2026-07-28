import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, UploadCloud, Video, FileText, Settings, LogOut, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { removeToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload', href: '/upload', icon: UploadCloud },
  { name: 'My Uploads', href: '/uploads', icon: Video },
  { name: 'Reports', href: '/uploads', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/auth');
  };

  return (
    <div className="flex flex-col w-64 border-r border-border bg-surface-50 h-screen sticky top-0 px-4 py-6">
      <Link href="/" className="flex items-center gap-2 px-2 mb-8 text-primary hover:opacity-80 transition-opacity">
        <Shield className="w-8 h-8 text-white" />
        <span className="font-bold text-xl tracking-tight">TruthLens</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-btn text-sm font-medium transition-colors",
                isActive 
                  ? "bg-surface-200 text-primary" 
                  : "text-muted hover:text-primary hover:bg-hover"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-btn text-sm font-medium text-muted hover:text-primary hover:bg-hover transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <div className="flex items-center gap-3 mt-4 px-3">
          <div className="w-9 h-9 rounded-full bg-surface-200 border border-border flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary">Demo User</span>
            <span className="text-xs text-muted">Pro Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
}
