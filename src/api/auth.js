import apiClient from '@/config/axiosConfig';
import { USER } from '@/config/host-config';

export const authApi = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post(`${USER}/login`, {
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
      await apiClient.post(`${USER}/logout`);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false };
    }
  },

  verifyAuth: async () => {
    try {
      const response = await apiClient.get(`${USER}/verify`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  },

  refreshToken: async () => {
    try {
      const response = await apiClient.post(`${USER}/refresh`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false };
    }
  },
};
