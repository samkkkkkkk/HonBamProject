// src/api/postApi.js
import apiClient from '@/config/axiosConfig';

export const postApi = {
  getFeed: async (page = 0, size = 10) => {
    const res = await apiClient.get('/api/sns/feed', {
      params: { page, size },
    });
    return res.data;
  },
  getMyFeed: async (page = 0, size = 10) => {
    const res = await apiClient.get('/api/sns/feed/my', {
      params: { page, size },
    });
    return res.data;
  },
  getUserPosts: async (authorId, page = 0, size = 10) => {
    const res = await apiClient.get(`/api/sns/feed/user/${authorId}`, {
      params: { page, size },
    });
    return res.data;
  },
  getExplore: async (sort = 'popular', page = 0, size = 10) => {
    const res = await apiClient.get('/api/sns/feed/explore', {
      params: { sort, page, size },
    });
    return res.data;
  },
  createPost: async (payload) => {
    const res = await apiClient.post('/api/sns/feed', payload);
    return res.data;
  },
  deletePost: async (postId) => {
    await apiClient.delete(`/api/sns/feed/${postId}`);
  },
};
