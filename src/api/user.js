import apiClient from '@/config/axiosConfig';
import { USER } from '@/config/host-config';

// 사용자 정보 관련 API
export const userAPI = {
  getUserInfo: async () => {
    try {
      const response = await apiClient.get(`${USER}/userinfo`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          '사용자 정보를 가져오는데 실패햇습니다.',
        status: error.response?.status,
      };
    }
  },

  updateUserInfo: async (userData) => {
    try {
      const response = await apiClient.put(`${USER}/userinfo`, userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          '사용자 정보 업데이트에 실패했습니다.',
      };
    }
  },

  getUserProfileImage: async () => {
    try {
      // 서버에서 직접 이미지를 내려줄 때(Blob)
      const response = await apiClient.get(`${USER}/profile-image`, {
        responseType: 'blob', // blob으로 받기
      });
      return {
        success: true,
        data: response.data,
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      // 서버에서 텍스트(URL)로 내려줄 때
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === 'string'
      ) {
        return {
          success: true,
          data: error.response.data,
          headers: error.response.headers,
          status: error.response.status,
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || '프로필 이미지 요청 실패',
        status: error.response?.status,
      };
    }
  },
};
