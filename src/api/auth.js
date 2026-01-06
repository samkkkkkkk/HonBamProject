import apiClient from '@/config/axiosConfig';
import { AUTH } from '@/config/host-config';

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post(`${AUTH}/login`, {
        skipAuthRefresh: true,
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '로그인에 실패했습니다.',
      };
    }
  },

  logout: async () => {
    try {
      await apiClient.post(`${AUTH}/logout`, { skipAuthRefresh: true });
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },

  verifyAuth: async () => {
    const res = await apiClient.get(`${AUTH}/verify`, {
      skipAuthRefresh: true,
    });
    return res.data;
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post(`${AUTH}/refresh`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  },
};
