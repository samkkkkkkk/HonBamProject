import { useContext, useState, useEffect } from 'react';
import '@/Component/Navbar/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/util/AuthContext';
import UserContext from '@/util/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  // 날짜 계산
  const currentDate = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);
  const timeDifference = oneYearLater.getTime() - currentDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24) - 2;

  const message2 = `프리미엄 회원권 남은일수 : ${daysDifference}일 ${Math.floor(
    hoursDifference / 367
  )}시간 ${Math.floor(minutesDifference / 8900)}분 남으셨습니다`;

  const timecheck = () => {
    alert(message2);
  };

  // UI state
  const [showLinks, setShowLinks] = useState(false);
  const handleToggleClick = () => setShowLinks((prev) => !prev);

  // Context
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const {
    userName,
    userPay,
    profileUrl,
    fetchUserInfo,
    clearUserInfo,
    fetchProfileImage,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // 로그아웃
  const logoutHandler = async () => {
    await onLogout();
    clearUserInfo();
    navigate('/login');
  };

  // 등급(프리미엄/일반) 버튼 뷰
  const gradeView = () => {
    if (userPay === 'NORMAL') {
      return (
        <Link to="/pay">
          <button className="btn userpaynormal">
            <span>일반 회원</span>
          </button>
        </Link>
      );
    } else if (userPay === 'PREMIUM') {
      return <div className="userpaypremium" onClick={timecheck}></div>;
    }
    return null;
  };

  // 프리미엄 로고
  const PremiumView = () => {
    if (!isLoggedIn || userPay === 'NORMAL') {
      return (
        <div className="app__navbar-logo">
          <Link to="/">HONBAM</Link>
        </div>
      );
    } else if (userPay === 'PREMIUM') {
      return (
        <Link to="/">
          <div className="HonBamGIF"></div>
        </Link>
      );
    }
    return null;
  };

  // 회원탈퇴
  const deleteUser = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) {
      return;
    }
    try {
      // 서버 탈퇴 API 호출(실제 API 경로/메서드 확인 필요)
      await fetch('/api/user/delete', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      logoutHandler();
    } catch (error) {
      console.error(error.message);
    }
  };

  // 로그인 상태 변화 시 정보 fetch
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchProfileImage();
    }
  }, [isLoggedIn]);

  // profileUrl 변경 시 이전 blob url 해제
  useEffect(() => {
    return () => {
      if (profileUrl && profileUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profileUrl);
      }
    };
  }, [profileUrl]);
  return (
    <nav className={`app__navbar ${showLinks ? 'active' : ''}`}>
      {PremiumView()}
      <ul className={`app__navbar-links ${showLinks ? 'active' : ''}`}>
        <li>
          <Link to="/searchPlace">맛집검색</Link>
        </li>
        <li>
          <Link to="/recipe">레시피</Link>
        </li>
        <li>
          <Link to="/chat">대화하기</Link>
        </li>
        <li>
          <Link to="/naverSearchHotPlace">추천맛집</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/freeboard">문의</Link>
          ) : (
            <Link to="/login">문의</Link>
          )}
        </li>
        <li>
          {isLoggedIn && (
            <a className="delete" onClick={deleteUser}>
              회원탈퇴
            </a>
          )}
        </li>
        <li>{isLoggedIn && <Link to="/Modify">회원수정</Link>}</li>
      </ul>
      <ul className={`app__navbar-login ${showLinks ? 'active' : ''}`}>
        {gradeView()}
        <div>
          <div className="loginImage">
            {isLoggedIn && (
              <img
                src={
                  profileUrl ||
                  new URL('../../assets/2-1.png', import.meta.url).href
                }
                alt="프사프사"
                style={{
                  marginLeft: 20,
                  width: 75,
                  height: 75,
                  borderRadius: '50%',
                }}
              />
            )}
          </div>
        </div>
        <div className="loginHello">
          {isLoggedIn ? `${userName}님 안녕하세요` : ''}
        </div>
        <li>
          {isLoggedIn ? (
            <a className="logout-btn" onClick={logoutHandler}>
              로그아웃
            </a>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/MyPage">마이페이지</Link>
          ) : (
            <Link to="/Join">회원가입</Link>
          )}
        </li>
      </ul>
      <li className="menu">
        <a
          href="#"
          className="app__navbar-toogleBtn"
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
        </a>
      </li>
    </nav>
  );
};
