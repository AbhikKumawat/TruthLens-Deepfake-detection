"use client";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // For demo purposes, checking auth but proceeding anyway if dev
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-muted animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-primary">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-8">
        {children}
      </main>
    </div>
  );
}
