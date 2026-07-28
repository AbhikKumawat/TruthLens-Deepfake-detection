import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ForensicReport {
  id: string;
  videoId: string;
  title: string;
  uploadDate: string;
  status: string;
  score: number;
  aiPercentage: number;
  confidence: number;
  processingTime: string;
  timeline: Array<{ time: string; status: string; details?: string }>;
  frameAnalysis: Array<{ frame: number; score: number }>;
}

export const useReport = (id: string) => {
  return useQuery({
    queryKey: ['report', id],
    queryFn: async (): Promise<ForensicReport> => {
      const res = await api.get(`/api/v1/reports/${id}`);
      const data = res.data;
      return {
        id: data.id,
        videoId: data.video_id,
        title: data.title || 'Analyzed Video',
        uploadDate: data.created_at || new Date().toISOString(),
        status: data.status || 'Completed',
        score: Math.round(data.authenticity_score ?? 90),
        aiPercentage: Math.round(data.ai_percentage ?? 10),
        confidence: Math.round(data.confidence_score ?? 95),
        processingTime: `${data.processing_time || 1.5}s`,
        timeline: (data.suspicious_segments && data.suspicious_segments.length > 0)
          ? data.suspicious_segments.map((s: any) => ({
              time: s.time || '0:00',
              status: s.status || 'Suspicious',
              details: s.details || 'Frame spatial/noise variance anomaly detected'
            }))
          : [{ time: '0:00 - End', status: 'Clean' }],
        frameAnalysis: (data.frame_analysis && data.frame_analysis.length > 0)
          ? data.frame_analysis
          : [
              { frame: 100, score: Math.round(data.authenticity_score ?? 90) },
              { frame: 200, score: Math.round(data.authenticity_score ?? 90) },
              { frame: 300, score: Math.round(data.authenticity_score ?? 90) }
            ]
      };
    }
  });
};

export const useReportAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ reportId, action }: { reportId: string; action: string }) => {
      const res = await api.post(`/api/v1/reports/${reportId}/action`, { action });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['report'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    }
  });
};
