// src/api/likeApi.js
import apiClient from '@/config/axiosConfig';

/**
 * 서버 응답( Map { liked, likeCount } )을 표준 형태로 맞춰 반환
 */
const normalize = (res) => {
  const data = res?.data || {};
  return {
    liked: Boolean(data.liked),
    likeCount: typeof data.likeCount === 'number' ? data.likeCount : 0,
  };
};

export const likeApi = {
  // 좋아요 등록
  addLike: async (postId) => {
    const res = await apiClient.post(`/api/sns/posts/${postId}/like`);
    return normalize(res);
  },

  // 좋아요 취소
  removeLike: async (postId) => {
    const res = await apiClient.delete(`/api/sns/posts/${postId}/like`);
    return normalize(res);
  },

  // 특정 게시물에 내가 좋아요 했는지 여부
  checkLiked: async (postId) => {
    const res = await apiClient.get(`/api/sns/posts/${postId}/like`);
    // { liked: boolean }
    return { liked: Boolean(res?.data?.liked) };
  },

  // 특정 게시물의 좋아요 수
  getLikeCount: async (postId) => {
    const res = await apiClient.get(`/api/sns/posts/${postId}/like-count`);
    // { likeCount: number }
    return { likeCount: Number(res?.data?.likeCount ?? 0) };
  },

  /**
   * 편의: 현재 상태에 따라 토글
   * @param {{postId:number, liked:boolean}} param0
   * @returns {{liked:boolean, likeCount:number}}
   */
  toggle: async ({ postId, liked }) => {
    return liked ? likeApi.removeLike(postId) : likeApi.addLike(postId);
  },
};
