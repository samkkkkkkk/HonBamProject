import React from 'react';
import apiClient from '@/config/axiosConfig';

export const followApi = {
  getFollowInfo: async (authorId) => {
    const res = await apiClient.get(`/api/sns/users/${authorId}/profile`);
    return res.data;
  },

  follow: async (authorId) => {
    const res = await apiClient.post(`/api/sns/users/${authorId}/follow`);
    return res.data;
  },

  unfollow: async (authorId) => {
    const res = await apiClient.delete(`/api/sns/users/${authorId}/follow`);
    return res.data;
  },
};
