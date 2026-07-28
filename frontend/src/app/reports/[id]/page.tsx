"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/ui/StatusBadge";
import ScoreCircle from "@/components/ui/ScoreCircle";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { useReport, useReportAction } from "@/hooks/useReports";
import { ArrowLeft, Download, RefreshCw, Share2, AlertTriangle, ShieldCheck, CheckCircle2, Trash2, Tag, ShieldAlert, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from "react-hot-toast";

import api from "@/lib/api";

export default function ReportPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: report, isLoading, refetch } = useReport(params.id);
  const actionMutation = useReportAction();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <LoadingSkeleton type="text" className="w-1/4 h-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <LoadingSkeleton className="h-32" />
            <LoadingSkeleton className="h-32" />
            <LoadingSkeleton className="h-32" />
            <LoadingSkeleton className="h-32" />
          </div>
          <LoadingSkeleton className="h-96" />
        </div>
      </DashboardLayout>
    );
  }

  if (!report) return null;

  const isClean = report.score >= 70;

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/api/v1/reports/${report.id}/download`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `truthlens_report_${report.id}.html`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download report");
    }
  };

  const handleAction = (action: string) => {
    actionMutation.mutate(
      { reportId: report.id, action },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Action executed successfully");
          if (action === 'remove') {
            router.push('/uploads');
          } else {
            refetch();
          }
        },
        onError: () => {
          toast.error("Failed to execute action");
        }
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/uploads" className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-4 w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Uploads
            </Link>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{report.title}</h1>
              <StatusBadge status={report.status} />
            </div>
            <p className="text-sm text-muted">Analyzed on {new Date(report.uploadDate).toLocaleString()}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 bg-surface-50 border border-border rounded-btn text-sm font-medium hover:bg-surface-100 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Re-analyze
            </button>
            <button 
              onClick={handleDownloadPDF} 
              className="px-4 py-2 bg-surface-50 border border-border rounded-btn text-sm font-medium hover:bg-surface-100 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Report
            </button>
          </div>
        </div>

        {/* AI ALERT & ACTION BANNER */}
        {!isClean ? (
          <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-card space-y-4">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-rose-500 shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-rose-500">⚠️ High AI Detection Alert</h3>
                <p className="text-sm text-muted mt-1">
                  Spatial Laplacian noise variance and temporal consistency checks indicate this video contains synthetic or manipulated AI content.
                </p>
              </div>
            </div>

            <div className="border-t border-rose-500/20 pt-4 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-semibold text-rose-400">Select Post-Detection Action:</span>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => handleAction('remove')} 
                  disabled={actionMutation.isPending}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-btn text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Video
                </button>

                <button 
                  onClick={() => handleAction('label_ai')} 
                  disabled={actionMutation.isPending}
                  className="px-4 py-2 bg-surface-100 border border-border hover:border-amber-500/50 text-amber-400 rounded-btn text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  Label as AI
                </button>

                <button 
                  onClick={() => handleAction('submit_moderator')} 
                  disabled={actionMutation.isPending}
                  className="px-4 py-2 bg-surface-100 border border-border hover:border-white text-white rounded-btn text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Submit to Moderator
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-card flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-500" />
              <div>
                <h3 className="text-base font-bold text-emerald-500">Verified Authentic Video</h3>
                <p className="text-xs text-muted">No spatial frame manipulation or synthetic artifacts detected.</p>
              </div>
            </div>

            <button 
              onClick={() => handleAction('publish')} 
              disabled={actionMutation.isPending}
              className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-btn text-sm font-semibold transition-colors flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Publish Video
            </button>
          </div>
        )}

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 bg-surface-50 border border-border rounded-card p-6 flex items-center gap-8">
            <ScoreCircle score={report.score} size={140} />
            <div>
              <h3 className="text-xl font-bold mb-2">Authenticity Score</h3>
              <p className="text-sm text-muted mb-4">Calculated from spatial frequency Laplacian variance & temporal continuity.</p>
              <div className="flex items-center gap-2">
                {isClean ? <ShieldCheck className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-rose-500" />}
                <span className={`text-sm font-medium ${isClean ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isClean ? 'Verified Authentic' : 'Manipulation Detected'}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-surface-50 border border-border rounded-card p-6 flex flex-col justify-center">
            <span className="text-sm font-medium text-muted mb-2">AI Percentage</span>
            <div className="text-4xl font-bold text-primary mb-2">{report.aiPercentage}%</div>
            <span className="text-xs text-muted">Synthetic content probability</span>
          </div>
          <div className="bg-surface-50 border border-border rounded-card p-6 flex flex-col justify-center">
            <span className="text-sm font-medium text-muted mb-2">Confidence Level</span>
            <div className="text-4xl font-bold text-primary mb-2">{report.confidence}%</div>
            <span className="text-xs text-muted">Model certainty score</span>
          </div>
        </div>

        {/* Timeline & Anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-surface-50 border border-border rounded-card p-6">
            <h4 className="text-sm font-semibold mb-3">Analysis Timeline</h4>
            <div className="flex w-full h-4 rounded-full overflow-hidden gap-1 mb-4">
              {report.timeline.map((seg, i) => (
                <div 
                  key={i} 
                  className={`h-full ${seg.status === 'Clean' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ flex: seg.status === 'Clean' ? 3 : 1 }}
                  title={`${seg.time} - ${seg.status}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted">
              <span>0:00</span>
              <span>End</span>
            </div>
          </div>

          <div className="bg-surface-50 border border-border rounded-card p-6">
            <h3 className="text-lg font-semibold mb-4">Detected Anomalies</h3>
            {report.timeline.filter(t => t.status !== 'Clean').length > 0 ? (
              <div className="space-y-3">
                {report.timeline.filter(t => t.status !== 'Clean').map((seg, i) => (
                  <div key={i} className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-btn">
                    <div className="text-xs font-medium text-rose-500 mb-1">{seg.time}</div>
                    <div className="text-sm">{seg.details || 'Suspicious artifact detected'}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3 opacity-80" />
                <p className="text-sm font-medium text-primary">No anomalies detected</p>
                <p className="text-xs text-muted mt-1">Video is clean and authentic</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-surface-50 border border-border rounded-card p-6">
          <h3 className="text-lg font-semibold mb-6">Frame-by-Frame OpenCV Signal Score</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={report.frameAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="frame" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1a1a1a' }}
                  contentStyle={{ backgroundColor: '#111111', borderColor: '#27272a', borderRadius: '8px' }}
                />
                <Bar dataKey="score" fill="#ffffff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
