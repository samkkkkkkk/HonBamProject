import apiClient from '@/config/axiosConfig';
import { USER } from '@/config/host-config';
import axios from 'axios';

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

  deleteUser: async () => {
    try {
      const response = await apiClient.delete(`${USER}/delete`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        seuccess: false,
        message: error.response?.data?.message || '회원탈퇴에 실패했습니다.',
      };
    }
  },

  getUserProfileImage: async () => {
    const res = await apiClient.get(`${USER}/profile-image`);
    return { success: true, data: res.data.profileUrl };
  },
};
