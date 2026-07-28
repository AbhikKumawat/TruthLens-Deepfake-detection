import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface DashboardStats {
  totalVideos: number;
  aiDetected: number;
  verifiedClean: number;
  avgScore: number;
}

export interface DashboardCharts {
  monthlyUploads: Array<{ name: string; uploads: number }>;
  detectionResults: Array<{ name: string; value: number; color: string }>;
}

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      try {
        const res = await api.get('/api/v1/dashboard/stats');
        return {
          totalVideos: res.data.total_videos || 0,
          aiDetected: res.data.ai_detected || 0,
          verifiedClean: res.data.verified_videos || 0,
          avgScore: res.data.avg_authenticity_score || 0,
        };
      } catch (err) {
        return {
          totalVideos: 0,
          aiDetected: 0,
          verifiedClean: 0,
          avgScore: 0,
        };
      }
    }
  });
};

export const useDashboardCharts = () => {
  return useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: async (): Promise<DashboardCharts> => {
      try {
        const res = await api.get('/api/v1/dashboard/stats');
        const stats = res.data;
        return {
          monthlyUploads: [
            { name: 'Jan', uploads: 0 },
            { name: 'Feb', uploads: 0 },
            { name: 'Mar', uploads: 0 },
            { name: 'Apr', uploads: 0 },
            { name: 'May', uploads: 0 },
            { name: 'Jun', uploads: stats.total_videos || 0 },
          ],
          detectionResults: [
            { name: 'Authentic', value: stats.verified_videos || 0, color: '#10b981' },
            { name: 'AI Detected', value: stats.ai_detected || 0, color: '#ef4444' },
          ],
        };
      } catch (err) {
        return {
          monthlyUploads: [],
          detectionResults: [
            { name: 'Authentic', value: 0, color: '#10b981' },
            { name: 'AI Detected', value: 0, color: '#ef4444' },
          ],
        };
      }
    }
  });
};
