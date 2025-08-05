import { createContext, useState } from "react";
import { userAPI } from "./apiService";


// 사용자 정보 Context
const UserContext = createContext({
  userName: '',
  address: '',
  phoneNumber: '',
  nickName: '',
  userPay: '',
  email: '',
  loading: false,
  error: null,
  fetchUserInfo: () => {},
  updateUserInfo: (userData) => {},
  clearUserInfo: () => {},
});

export const UserContextProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({
    userName: '',
    address: '',
    phoneNumber: '',
    nickName: '',
    userPay: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);

    try{
      const result = await userAPI.getUserInfo();

      if (result.success) {
        setUserInfo({
          userName: result.data.userName || '',
          address: result.data.address || '',
          phoneNumber: result.data.phoneNumber || '',
          nickName: result.data.nickName || '',
          userPay: result.data.userPay || '',
          email: result.data.email || '',
        });
      } else {
        setError(result.message);

        // 401 에러인 경우 사용자 정보 초기화
        if (result.status === 401) {
          clearUserInfo();
        }
      }
    } catch (error) {
      console.error('Fetch user info failed:', error);
      setError('사용자 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }

  // 사용자 정보 업데이트
  const updataUserInfo = async (userData) => {
    setLoading(true);
    setError(null);
  

  try {
    const result = await userAPI.updateUserInfo(userData);

    if (result.success) {
      setUserInfo(prevInfo => ({
        ...prevInfo,
        ...userData,
      }));
      return { success: true };
    } else {
      setError(result.message);
      return { success: false, message: result.message };
    }
  } catch (error) {
    console.error('Update user info failed:', error);
    setError('사용자 정보 업데이트에 실패했습니다.');
    return { success: false, message: '사용자 정보 업데이트에 실패했습니다.' };
  } finally {
    setLoading(false);
  }
}

};