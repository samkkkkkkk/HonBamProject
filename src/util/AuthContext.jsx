import React, { Children, createContext, useEffect, useState } from 'react';
import { authApi } from '@/util/apiService';
import apiClient from '@/config/axiosConfig';

// 인증 Context 인증 상태만 관리
const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
  checkAuthState: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 인증 상태 확인 함수
  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      const result = await authApi.verifyAuth();
      if (result.success) {
        setIsLoggedIn(true);
        // 필요 시 사용자 정보도 이어서 로드
        // const me = await userAPI.getUserInfo(); setUser(me.data);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false); // ← 성공이든 실패든 여기서 false
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthState();

    // 토큰 갱신 실패 시 자동 로그아웃을 위한 이벤트 리스너
    const handleAuthLogout = () => {
      setIsLoggedIn(false);
    };

    window.addEventListener('auth:logout', handleAuthLogout);

    return () => {
      window.removeEventListener('auth:logout', handleAuthLogout);
    };
  }, []);

  // 로그인 핸들러
  const loginHandler = async (email, password) => {
    try {
      const result = await authApi.login(email, password);

      if (result.success) {
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggedIn(false);
    }
  };

  const contextValue = {
    isLoggedIn,
    isLoading,
    onLogin: loginHandler,
    onLogout: logoutHandler,
    checkAuthState,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
