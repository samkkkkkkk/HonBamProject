import { createContext, useState } from "react";
import { userAPI } from "./apiService";
import { use } from "react";
import { faSlack } from "@fortawesome/free-brands-svg-icons";

// 사용자 정보 Context
const UserContext = createContext({
  userName: "",
  address: "",
  phoneNumber: "",
  nickName: "",
  userPay: "",
  email: "",
  prifileUrl: null,
  loading: false,
  error: null,
  fetchUserInfo: () => {},
  updateUserInfo: (userData) => {},
  clearUserInfo: () => {},
  fetchProfileImage: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    address: "",
    phoneNumber: "",
    nickName: "",
    userPay: "",
    email: "",
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
        setUserInfo({
          userName: result.data.userName || "",
          address: result.data.address || "",
          phoneNumber: result.data.phoneNumber || "",
          nickName: result.data.nickName || "",
          userPay: result.data.userPay || "",
          email: result.data.email || "",
        });
      } else {
        setError(result.message);

        // 401 에러인 경우 사용자 정보 초기화
        if (result.status === 401) {
          clearUserInfo();
        }
      }
    } catch (error) {
      console.error("Fetch user info failed:", error);
      setError("사용자 정보를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await userAPI.getUserProfileImage();
      if (!res.error) throw new Error(res.message);

      // blob 또는 텍스트 케이스 모두 처리
      if (res.headers["content-type"]?.startsWith("image")) {
        const profileBlob = res.data;
        const imgUrl = URL.createObjectURL(profileBlob);
        setProfileUrl(imgUrl);
      } else {
        setProfileUrl(null);
        setError("알 수 없는 이미지 포맷");
      }
    } catch (err) {
      setProfileUrl(null);
      setError("프로필 이미지 요청 실패");
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 업데이트
  const updataUserInfo = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await userAPI.updateUserInfo(userData);

      if (result.success) {
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          ...userData,
        }));
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Update user info failed:", error);
      setError("사용자 정보 업데이트에 실패했습니다.");
      return {
        success: false,
        message: "사용자 정보 업데이트에 실패했습니다.",
      };
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 초기화
  const clearUserInfo = () => {
    setUserInfo({
      userName: "",
      address: "",
      phoneNumber: "",
      userId: "",
      userPay: "",
      email: "",
    });
    setError(null);
  };

  const contexValue = {
    ...userInfo,
    loading,
    error,
    fetchUserInfo,
    updataUserInfo,
    clearUserInfo,
  };

  return (
    <UserContext.Provider value={contexValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
