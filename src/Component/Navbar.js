import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, USER } from '../util/host-config';
import AuthContext from '../util/AuthContext';
import { isLogin, getLoginUserInfo } from '../util/login-util';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleToggleClick = () => {
    setShowLinks(!showLinks);
  };

  const profileRequestURL = `${API_BASE_URL}${USER}/load-profile`;

  const redirection = useNavigate();

  // 프로필 이미지 url 상태 변수
  const [profileUrl, setProfileUrl] = useState(null);

  // AuthContext에서 로그인 상태를 가져옵니다.
  //const { isLoggedIn, onLogout } = useContext(AuthContext);
  const { isLoggedIn, userName, onLogout } = useContext(AuthContext);

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    const res = await fetch(`${API_BASE_URL}${USER}/logout`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트 합니다.
    onLogout();
    redirection('/login');
  };

  // 프로필 이미지 요청
  const fetchProfileImage = async () => {
    const res = await fetch(profileRequestURL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    if (
      res.status === 200 &&
      res.headers.get('Content-type').startsWith('image')
    ) {
      // content-type이 image면 직접가입한 사람 ,  카카오톡 유저는 이미지가 그냥 홈페이지 url 주소로와서 text 임
      // 서버에서는 byte[]로 직렬화된 이미지가 응답됨 ( 그렇게 설정했음 )
      // blob()을 통해 전달받아야 한다. (json() xxx)
      const profileBlob = await res.blob();
      // 해당 이미지를 imgUrl로 변경
      const imgUrl = window.URL.createObjectURL(profileBlob);
      setProfileUrl(imgUrl);
    } else if (
      res.status === 200 &&
      res.headers.get('Content-type').startsWith('text')
    ) {
      const imgUrl2 = await res.text();
      // 해당 이미지를 imgUrl로 변경

      setProfileUrl(imgUrl2);
    } else {
      const err = await res.text();
      setProfileUrl(null);
    }
  };

  // 로그인의 상태가 변화될 떄 화면이 리렌더링이 되고,
  // 그에 맞는 회원의 프로필 이미지 요청이 들어갈 수 있도록 처리.
  useEffect(() => {
    fetchProfileImage();
  }, [isLoggedIn]);

  return (
    <nav className={`app__navbar ${showLinks ? 'active' : ''}`}>
      <div className='app__navbar-logo'>
        <Link to='/'>HONBAM</Link>
      </div>
      <ul className={`app__navbar-links ${showLinks ? 'active' : ''}`}>
        <li>
          <a href='#hotplace'>맛집</a>
        </li>
        <li>
          <a href='#recipe'>레시피</a>
        </li>
        <li>
          <a href='#chat'>대화하기</a>
        </li>
        <li>
          <a href='#board'>게시판</a>
        </li>
      </ul>
      <ul className={`app__navbar-login ${showLinks ? 'active' : ''}`}>
        <div>
          <div className='loginImage'>
            {isLoggedIn && (
              <img
                src={profileUrl || require('../assets/2-1.png')}
                alt='프사프사'
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
        <div className='loginHello'>
          {isLoggedIn ? userName + '님 안녕하세요 ~' : ''}
        </div>
        <li>
          <a href='#login'>
            {' '}
            {isLoggedIn ? (
              <a className='logout-btn' onClick={logoutHandler}>
                로그아웃
              </a>
            ) : (
              <>
                <Link to='/login'>로그인</Link>
              </>
            )}
          </a>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to='/MyPage'>마이페이지</Link>
          ) : (
            <>
              <Link to='/Join'>회원가입</Link>
            </>
          )}
        </li>
      </ul>
      <li className='menu'>
        <a
          href='#'
          className='app__navbar-toogleBtn'
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
        </a>
      </li>
    </nav>
  );
};
