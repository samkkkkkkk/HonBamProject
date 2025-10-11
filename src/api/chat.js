// src/api/chat.js
import apiClient from '@/config/axiosConfig';
import { CHAT } from '@/config/host-config';

export const chatApi = {
  // 내가 속한 채팅방 목록
  roomList: async () => {
    try {
      const res = await apiClient.get(`${CHAT}/rooms`);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '채팅방 목록 불러오기 실패',
      };
    }
  },

  // 채팅방 생성
  createRoom: async (payload) => {
    try {
      const res = await apiClient.post(`${CHAT}/rooms`, payload);
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '채팅방 생성 실패',
      };
    }
  },

  // 1대1 채팅 시작
  startDirectChat: async (targetUserId) => {
    try {
      const res = await apiClient.post(`${CHAT}/rooms/direct`, null, {
        params: { targetUserId },
      });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: '1대1 채팅 생성 실패' };
    }
  },

  // 특정 방에 사용자 초대
  inviteUsers: async (roomId, targetUserIds) => {
    try {
      const res = await apiClient.post(`${CHAT}/rooms/${roomId}/invite`, {
        targetUserIds,
      });
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: '초대 실패' };
    }
  },

  // 오픈 채팅방 참가
  joinOpenRoom: async (roomId) => {
    try {
      const res = await apiClient.post(`${CHAT}/rooms/${roomId}/join`);
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: '오픈방 참여 실패' };
    }
  },

  // 오픈 채팅방 리스트
  openRoomList: async (keyword = '') => {
    try {
      const res = await apiClient.get(`${CHAT}/rooms/open`, {
        params: { keyword },
      });
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || '오픈방 목록 불러오기 실패',
      };
    }
  },

  // 커서 기반 메시지 조회
  getMessagesCursor: async (roomUuid, cursor = null, size = 30) => {
    try {
      const params = { roomUuid, size };
      if (cursor) {
        params.cursor = cursor;
      }
      const res = await apiClient.get(`${CHAT}/messages/cursor`, { params });
      return { success: true, data: res.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data.message || '메시지 조회 실패',
      };
    }
  },
};
