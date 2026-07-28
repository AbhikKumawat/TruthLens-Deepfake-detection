import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  uploadDate: string;
  status: string;
  score: number | null;
  aiPercentage: number | null;
  thumbnail?: string;
}

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async (): Promise<VideoItem[]> => {
      try {
        const res = await api.get('/api/v1/videos/');
        return res.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          uploadDate: item.created_at || new Date().toISOString(),
          status: item.status,
          score: item.authenticity_score !== undefined ? Math.round(item.authenticity_score) : null,
          aiPercentage: item.ai_percentage !== undefined ? Math.round(item.ai_percentage) : null,
          thumbnail: item.thumbnail_path || ''
        }));
      } catch (err) {
        return [];
      }
    },
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await api.post('/api/v1/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    }
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/v1/videos/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    }
  });
};
