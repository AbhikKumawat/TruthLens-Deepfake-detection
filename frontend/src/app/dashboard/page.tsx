"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Video, AlertTriangle, ShieldCheck, Activity, Eye } from "lucide-react";
import { useDashboardStats, useDashboardCharts } from "@/hooks/useDashboard";
import { useVideos } from "@/hooks/useVideos";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: charts, isLoading: chartsLoading } = useDashboardCharts();
  const { data: videos, isLoading: videosLoading } = useVideos();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
            <p className="text-muted text-sm">Overview of your video analysis activity.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/uploads" className="px-4 py-2 border border-border rounded-btn text-sm font-medium hover:bg-surface-50 transition-colors">
              View All Reports
            </Link>
            <Link href="/upload" className="px-4 py-2 bg-white text-black rounded-btn text-sm font-medium hover:bg-gray-200 transition-colors">
              Upload New Video
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsLoading ? (
            Array(4).fill(0).map((_, i) => <LoadingSkeleton key={i} />)
          ) : (
            <>
              <StatCard title="Total Videos" value={stats!.totalVideos} icon={Video} trend={{ value: "12%", isPositive: true }} />
              <StatCard title="AI Detected" value={stats!.aiDetected} icon={AlertTriangle} trend={{ value: "2%", isPositive: false }} />
              <StatCard title="Verified Clean" value={stats!.verifiedClean} icon={ShieldCheck} trend={{ value: "8%", isPositive: true }} />
              <StatCard title="Avg Score" value={stats!.avgScore} icon={Activity} />
            </>
          )}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-50 border border-border rounded-card p-6">
            <h3 className="text-lg font-semibold mb-6">Monthly Uploads</h3>
            {chartsLoading ? (
              <LoadingSkeleton type="chart" />
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={charts!.monthlyUploads}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111111', borderColor: '#27272a', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="uploads" stroke="#ffffff" strokeWidth={2} dot={{ fill: '#ffffff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          
          <div className="bg-surface-50 border border-border rounded-card p-6">
            <h3 className="text-lg font-semibold mb-6">Detection Results</h3>
            {chartsLoading ? (
              <LoadingSkeleton type="chart" />
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={charts!.detectionResults}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {charts!.detectionResults.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#111111', borderColor: '#27272a', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {!chartsLoading && (
              <div className="flex justify-center gap-6 mt-4">
                {charts!.detectionResults.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-surface-50 border border-border rounded-card overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Uploads</h3>
            <Link href="/uploads" className="text-sm text-muted hover:text-white transition-colors">View All</Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-100 text-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Video</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Score</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {videosLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-48" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-24" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-20" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-16" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-10" /></td>
                    </tr>
                  ))
                ) : (
                  videos?.slice(0, 5).map((video) => (
                    <tr key={video.id} className="hover:bg-surface-100 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{video.title}</td>
                      <td className="px-6 py-4 text-muted">{new Date(video.uploadDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={video.status} />
                      </td>
                      <td className="px-6 py-4">
                        {video.score !== null ? (
                          <span className={cn("font-medium", video.score >= 90 ? "text-emerald-500" : video.score >= 70 ? "text-amber-500" : "text-rose-500")}>
                            {video.score}/100
                          </span>
                        ) : (
                          <span className="text-muted">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/reports/${video.id}`} className="text-muted hover:text-white p-2 flex items-center justify-center rounded-btn hover:bg-surface-200 transition-colors w-fit">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
