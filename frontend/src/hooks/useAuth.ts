import { useMutation } from '@tanstack/react-query';
import { setToken, removeToken } from '@/lib/auth';
import api from '@/lib/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const res = await api.post('/api/v1/auth/login', credentials);
      return res.data;
    },
    onSuccess: (data: any) => {
      setToken(data.access_token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: { email: string; password: string; name: string }) => {
      const res = await api.post('/api/v1/auth/register', userData);
      return res.data;
    },
    onSuccess: (data: any) => {
      setToken(data.access_token);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post('/api/v1/auth/logout');
      } catch {
        // Still remove token even if API call fails
      }
      removeToken();
    }
  });
};
