import { createContext, useState } from 'react';
import { userAPI } from '@/util/apiService';
import { faSlack } from '@fortawesome/free-brands-svg-icons';

// 사용자 정보 Context
const UserContext = createContext({
  id: '',
  userName: '',
  address: '',
  phoneNumber: '',
  nickname: '',
  userPay: '',
  email: '',
  profileUrl: null,
  loading: false,
  error: null,
  fetchUserInfo: () => {},
  updateUserInfo: (_userData) => {},
  clearUserInfo: () => {},
  fetchProfileImage: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    userName: '',
    address: '',
    phoneNumber: '',
    nickname: '',
    userPay: '',
    email: '',
  });
  const [profileUrl, setProfileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await userAPI.getUserInfo();

      if (result.success) {
        const d = result.data || {};
        setUserInfo({
          userName: d.data.userName || '',
          address: d.data.address || '',
          phoneNumber: d.data.phoneNumber || '',
          nickname: d.data.nickname || '',
          userPay: d.data.userPay || '',
          email: d.data.email || '',
        });
      } else {
        setError(result.message || '사용자 정보 요청 실패');
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
  };

  const fetchProfileImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userAPI.getUserProfileImage(); // axios { data: Blob, headers: {...} } 형태 기대

      // 에러 플래그가 있으면 즉시 예외
      if (res.error) {
        throw new Error(res.message || '이미지 요청 실패');
      }

      const ct = res.headers?.['content-type'] || '';
      if (ct.startsWith('image')) {
        const imgUrl = URL.createObjectURL(res.data);
        setProfileUrl(imgUrl);
      } else {
        setProfileUrl(null);
        setError('알 수 없는 이미지 포맷');
      }
    } catch (err) {
      console.error('Fetch profile image failed:', err);
      setProfileUrl(null);
      setError('프로필 이미지 요청 실패');
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 업데이트

  const updateUserInfo = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userAPI.updateUserInfo(userData);
      if (result.success) {
        setUserInfo((prev) => ({ ...prev, ...userData }));
        return { success: true };
      }
      setError(result.message || '사용자 정보 업데이트 실패');
      return { success: false, message: result.message };
    } catch (e) {
      console.error('Update user info failed:', e);
      setError('사용자 정보 업데이트에 실패했습니다.');
      return {
        success: false,
        message: '사용자 정보 업데이트에 실패했습니다.',
      };
    } finally {
      setLoading(false);
    }
  };

  const clearUserInfo = () => {
    setUserInfo({
      id: '',
      userName: '',
      address: '',
      phoneNumber: '',
      nickname: '',
      userPay: '',
      email: '',
    });
    setProfileUrl(null);
    setError(null);
  };

  const contextValue = {
    ...userInfo,
    profileUrl,
    loading,
    error,
    fetchUserInfo,
    updateUserInfo, // ✅ 이름 통일
    clearUserInfo,
    fetchProfileImage, // ✅ 노출
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
