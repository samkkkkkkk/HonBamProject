import apiClient from '@/config/axiosConfig';
import { TOSS_PAYMENTS, USER } from '@/config/host-config';

export const payAPI = {
  getPayInfo: async (requestData) => {
    try {
      const response = await apiClient.post(
        `${TOSS_PAYMENTS}/info`,
        requestData
      );
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          '결제 정보를 가져오는데 실패했습니다.',
        status: error.response?.status,
      };
    }
  },

  confirm: async ({ orderId, amount, paymentKey }) => {
    try {
      const response = await apiClient.post(`${TOSS_PAYMENTS}/confirm`, {
        orderId,
        amount,
        paymentKey,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '결제에 실패했습니다.',
        status: error.response?.status,
      };
    }
  },

  // 결제 취소 (필요 시)
  cancel: async (payload) => {
    try {
      const response = await apiClient.post(`${TOSS_PAYMENTS}/cancel`, payload);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '결제 취소에 실패했습니다.',
        status: error.response?.status,
      };
    }
  },

  // 결제 등급 승격(서버가 유저 구독상태 갱신) — 기존 /user/paypromote 연동
  promoteUserPay: async () => {
    try {
      const response = await apiClient.put(`${USER}/paypromote`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || '결제 등급 승격에 실패햇습니다.',
        status: error.response?.status,
      };
    }
  },
};
