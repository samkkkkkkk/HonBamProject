// src/config/host-config.js
const required = (key) => {
  const v = import.meta.env[key];
  if (!v) {
    throw new Error(`[ENV] ${key}가 비어있습니다. .env를 확인하세요.`);
  }
  return v;
};

export const API_BASE_URL = required('VITE_API_BASE_URL');

export const TODO = import.meta.env.VITE_TODO || '/api/todos';
export const USER = import.meta.env.VITE_USER || '/api/auth';
export const RECIPE = import.meta.env.VITE_RECIPE || '/api/recipe';
export const POST = import.meta.env.VITE_POST || '/api/posts';
export const FREEBOARD = import.meta.env.VITE_FREEBOARD || '/api/freeboard';
export const CHAT = import.meta.env.VITE_CHAT || '/api/chat';
export const TOSS_PAYMENTS =
  import.meta.env.VITE_TOSS_PAYMENTS || '/api/tosspay';

// 편의: 풀 URL 조합
export const url = (path) =>
  `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
