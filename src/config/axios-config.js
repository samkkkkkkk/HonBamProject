// export const API_BASE_URL = backendName;
// export const HONBAM = '/api/honbam';
// export const USER = '/api/auth';
// export const POST = '/api/posts';

import axios from 'axios';
import { API_BASE_URL, USER } from '@/config/host-config';
import { config } from '@fortawesome/fontawesome-svg-core';

const USER_URL = API_BASE_URL + USER;

const axiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
});

// Request Interceptor 설정
axiosInstance.interceptors.request.use(
  // 요청 보내기 전에 일괄 처리해야 할 내용을 함수로 선언.
  (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
