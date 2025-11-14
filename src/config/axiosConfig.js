import axios from 'axios';
import { API_BASE_URL, USER } from '@/config/host-config';

const apiClient = axios.create({
  baseURL: API_BASE_URL || 'http://localhost:8181',
  timeout: 10000,
  withCredentials: true, // httpOnly 쿠키 포함을 위한 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.log('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.error(
      `[API Response Error] ${error.response?.status} ${originalRequest.url}`
    );

    // refresh 요청 자체는 재시도 하지 않도록 차단
    if (originalRequest.url.includes('/refresh')) {
      window.dispatchEvent(new CustomEvent('auth:logout'));
      return Promise.reject(error);
    }

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 refresh 중인 경우 대기
      if (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return apiClient(originalRequest);
      }

      isRefreshing = true;

      try {
        // refresh token으로 토큰 갱신 시도
        await apiClient.post(`${USER}/refresh`);
        console.log('[Token Refresh] 토큰이 갱싱되었습니다.');

        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('[Token Refresh Error] 토큰 갱신 실패:', refreshError);

        // 토큰 갱신 실패 시 로그아웃 처리를 위하나 커스텀 이벤트 발생
        window.dispatchEvent(new CustomEvent('auth:logout'));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
