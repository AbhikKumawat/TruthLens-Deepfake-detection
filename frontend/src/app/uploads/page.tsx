"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/ui/StatusBadge";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useVideos, useDeleteVideo } from "@/hooks/useVideos";
import { Search, Filter, Eye, Trash2, Video } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function UploadsHistory() {
  const { data: videos, isLoading } = useVideos();
  const deleteMutation = useDeleteVideo();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          toast.success("Video deleted successfully");
          setDeleteId(null);
        },
        onError: () => toast.error("Failed to delete video")
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">My Uploads</h1>
            <p className="text-muted text-sm">View and manage all your analyzed videos.</p>
          </div>
          <Link href="/upload" className="px-4 py-2 bg-white text-black rounded-btn text-sm font-medium hover:bg-gray-200 transition-colors w-fit">
            Upload New Video
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input 
              type="text" 
              placeholder="Search videos..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-50 border border-border rounded-btn focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-surface-50 border border-border rounded-btn text-sm font-medium hover:bg-surface-100 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="bg-surface-50 border border-border rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-100 text-muted border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium w-16">Preview</th>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Upload Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Score</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><div className="w-12 h-8 bg-surface-200 animate-pulse rounded" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-48" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-24" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-20" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-32" /></td>
                      <td className="px-6 py-4"><LoadingSkeleton type="text" className="w-16 ml-auto" /></td>
                    </tr>
                  ))
                ) : (
                  videos?.filter(v => v.title.toLowerCase().includes(search.toLowerCase())).map((video) => (
                    <tr key={video.id} className="hover:bg-surface-100 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-12 h-8 bg-surface-200 rounded overflow-hidden">
                          {/* Simulated image using generic background */}
                          <div className="w-full h-full bg-gradient-to-br from-surface-200 to-surface-100" />
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{video.title}</td>
                      <td className="px-6 py-4 text-muted">{new Date(video.uploadDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={video.status} />
                      </td>
                      <td className="px-6 py-4">
                        {video.score !== null ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-surface-200 rounded-full overflow-hidden w-24">
                              <div 
                                className={cn("h-full rounded-full", video.score >= 90 ? "bg-emerald-500" : video.score >= 70 ? "bg-amber-500" : "bg-rose-500")} 
                                style={{ width: `${video.score}%` }} 
                              />
                            </div>
                            <span className="text-xs font-medium">{video.score}</span>
                          </div>
                        ) : (
                          <span className="text-muted">--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/reports/${video.id}`} className="text-muted hover:text-white p-2 flex items-center justify-center rounded-btn hover:bg-surface-200 transition-colors">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => setDeleteId(video.id)} className="text-muted hover:text-rose-500 p-2 flex items-center justify-center rounded-btn hover:bg-rose-500/10 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!isLoading && videos?.length === 0 && (
              <div className="p-12 text-center text-muted">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No videos found</p>
              </div>
            )}
          </div>
        </div>

      </div>

      <ConfirmDialog 
        isOpen={!!deleteId}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone and will remove the report permanently."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </DashboardLayout>
  );
}
