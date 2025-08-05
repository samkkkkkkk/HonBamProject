import React, { Children, createContext, useEffect, useState } from 'react';
import { authApi } from './apiService';
import apiClient from '../config/axiosConfig';

// // 새로운 전역 컨텍스트 생성
// const AuthContext = React.createContext({
//   isLoggedIn: false, // 로그인 했는지의 여부 추적
//   userName: '',
//   address: '',
//   phoneNumber: '',
//   userId: '',
//   token: '',
//   userPay: '',
//   onLogout: () => {},
//   onLogin: (email, password) => {},
//   renewToken: (accessToken) => {},
// });

// // 위에서 생성한 Context를 제공할 수 있는 provider
// // 이 컴포넌트를 통해 자식 컴포넌트에게 인증 상태와 관련된 함수들을 전달할 수 있음.
// export const AuthContextProvider = (props) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [userId, setUserId] = useState('');
//   const [token, setToken] = useState('');
//   const [userPay, setUserPay] = useState('');

//   // 컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
//   useEffect(() => {
//     if (localStorage.getItem('isLoggedIn') === '1') {
//       setIsLoggedIn(true);
//       setUserName(localStorage.getItem('LOGIN_USERNAME'));
//     }
//   }, []);

//   //로그아웃 핸들러
//   const logoutHandler = () => {
//     localStorage.clear(); //로컬스토리지 내용 전체 삭제
//     setIsLoggedIn(false);
//     setUserName('');
//   };

//   // 로그인 핸들러
//   const loginHandler = (
//     token,
//     userName,
//     role,
//     userPay,
//     address,
//     phoneNumber,
//     userId,
//     email
//   ) => {
//     localStorage.setItem('isLoggedIn', '1');
//     //json에 담긴 인증정보를 클라이언트에 보관
//     // 1. 로컬 스토리지 - 브라우저가 종료되어도 보관됨.
//     // 2. 세션 스토리지 - 브라우저가 종료되면 사라짐.
//     console.log('authcontext', userName);
//     localStorage.setItem('ACCESS_TOKEN', token);
//     localStorage.setItem('LOGIN_USERNAME', userName);
//     localStorage.setItem('USER_ROLE', role);
//     localStorage.setItem('USER_PAY', userPay);
//     localStorage.setItem('USER_ADDRESS', address);
//     localStorage.setItem('USER_PHONE', phoneNumber);
//     localStorage.setItem('USER_ID', userId);
//     localStorage.setItem('USER_EMAIL', email);
//     setIsLoggedIn(true);

//     setUserName(userName);
//     setAddress(address);
//     setPhoneNumber(phoneNumber);
//     setUserId(userId);
//     setToken(token);
//     setUserPay(userPay);
//   };

//   const updateToken = (accessToken) => {
//     localStorage.setItem('ACCESS_TOKEN', accessToken);
//     setToken(accessToken);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         userName,
//         address,
//         phoneNumber,
//         userId,
//         onLogout: logoutHandler,
//         onLogin: loginHandler,
//         renewToken: updateToken,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );

// 인증 Context 인증 상태만 관리
const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
  checkAuthState: () => {},
});

export const AuthContextProvider = ({Children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  cosnt [isLoading, setIsLoading] = useState(true);

  // 인증 상태 확인 함수
  const checkAuthState = async () => {
    try {
      const result = await authApi.verifyAuth();
      setIsLoading(true);
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    checkAuthState();

    // 토큰 갱신 실패 시 자동 로그아웃을 위한 이벤트 리스너
    const handleAuthLogout = () => {
      setIsLoggedIn(false);
    }

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
        return {success: false, message: result.message};
      }
    } catch (error) {
      console.error('Login failed:', errorData.message);
      return { success: false, message: '로그인 중 오류가 발생했습니다.' };
    }
  };

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    try {
      await authApi.logout();
    } catch {
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
    <AuthContext.Provider value={contextValue}>
      {Children}
    </AuthContext.Provider>
  )

};

export default AuthContext;
