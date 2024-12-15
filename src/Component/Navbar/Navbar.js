import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, USER } from '../../config/host-config';
import AuthContext from '../../util/AuthContext';
import { isLogin, getLoginUserInfo } from '../../util/login-util';
import { Link, Route, Routes, redirect, useNavigate } from 'react-router-dom';
import NaverSearch from '../Map/NaverSearch';
import { NAVER_MAP_URL } from '../../util/naver-config';

export const Navbar = () => {
  const currentDate = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);
  const timeDifference = oneYearLater.getTime() - currentDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24) - 2;
  const message = `프리미엄회원권을 결제하셨습니다! 이용 날짜: ${currentDate.toLocaleDateString()} ~ ${oneYearLater.toLocaleDateString()}`;
  const message2 = `프리미엄 회원권 남은일수 : ${daysDifference}일 ${Math.floor(
    hoursDifference / 367
  )}시간 ${Math.floor(minutesDifference / 8900)}분 남으셨습니다`;

  const timecheck = () => {
    alert(message2);
  };

  const onClickPayment = () => {
    // const { IMP } = window;
    // IMP.init('imp10345536');

    // const data = {
    //   pg: 'html5_inicis', // PG사
    //   pay_method: 'card', // 결제수단
    //   merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
    //   amount: 1000, // 결제금액
    //   name: '혼밤 프리미엄(1년)', // 주문명
    //   buyer_name: '기태', // 구매자 이름
    //   buyer_tel: '010-1234-5678', // 구매자 전화번호
    //   buyer_email: 'honbam@naver.com', // 구매자 이메일
    //   buyer_addr: '서울', // 구매자 주소
    //   buyer_postcode: '01234', // 구매자 우편번호
    // };
    // IMP.request_pay(data, callback);

    <Link to='/pay'></Link>;
  };
  const callback = (response) => {
    const { success, error_msg } = response;
    if (success) {
      alert(message);
      promote();
      logoutHandler();
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

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

  // 등급에 따른 조건별 렌더링
  const gradeView = () => {
    const userPay = localStorage.getItem('USER_PAY');
    console.log('Navbar -> PAY: ' + userPay);
    if (userPay === 'NORMAL') {
      return (
        <Link to='/pay'>
          <button className='btn userpaynormal'>
            <span>일반 회원</span>
          </button>
        </Link>
      );
    } else if (userPay === 'PREMIUM') {
      return <div className='userpaypremium' onClick={timecheck}></div>;
    }
  };

  const PremiumView = () => {
    const userPay = localStorage.getItem('USER_PAY');
    console.log('Navbar -> PAY: ' + userPay);
    if (!isLoggedIn || userPay === 'NORMAL') {
      return (
        <div className='app__navbar-logo'>
          {' '}
          <Link to='/'>HONBAM</Link>{' '}
        </div>
      );
    } else if (userPay === 'PREMIUM') {
      return (
        <Link to='/'>
          <div className='HonBamGIF'></div>
        </Link>
      );
    }
  };

  const fetchPromote = async () => {
    const res = await fetch(`${API_BASE_URL}${USER}/paypromote`, {
      method: 'Post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    // if (res.status === 403) {
    //   alert('이미 프리미엄 회원입니다.');
    // } else if (res.status === 200) {
    //   const json = await res.json();
    //   localStorage.setItem('ACCESS_TOKEN', json.token);
    //   localStorage.setItem('USER_ROLE', json.role);
    //   setToken(json.token);
    // }
  };

  // 등급 승격 서버 요청 (프리미엄)
  const promote = () => {
    console.log('등급 승격 서버 요청!');
    fetchPromote();
  };

  const deleteUser = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const res = await fetch(`${API_BASE_URL}${USER}/delete`, {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const message = `An error has occurred: ${res.status}`;
          throw new Error(message);
        }

        const result = await res.text();
        console.log(result);
        logoutHandler();
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const deleteUser2 = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}${USER}/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const message = `An error has occurred: ${res.status}`;
        throw new Error(message);
      }

      const result = await res.text();
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  // deleteUser().catch((error) => {
  //   console.error(error.message);
  // });

  // function logout() {
  //   // 로컬 스토리지에서 토큰 삭제
  //   localStorage.removeItem('ACCESS_TOKEN');
  //   // 세션 종료
  //   // 사용자를 로그인 페이지로 리다이렉트
  //   window.location.href = '/login';
  // }

  // deleteUser().catch((error) => {
  //   console.error(error.message);
  // });

  return (
    <>
      <nav className={`app__navbar ${showLinks ? 'active' : ''}`}>
        {PremiumView()}
        {/* <div className='HonBamGIF'></div> */}
        <ul className={`app__navbar-links ${showLinks ? 'active' : ''}`}>
          <li>
            <Link to='/searchPlace'>맛집검색</Link>
          </li>
          <li>
            <Link to='/recipe'>레시피</Link>
          </li>
          <li>
            <Link to='/chat'>대화하기</Link>
          </li>
          {/* <li>
            <Link to='/board'>게시판</Link>
          </li> */}
          <li>
            <Link to='/naverSearchHotPlace'>추천맛집</Link>
          </li>

          <li>
            {isLoggedIn ? (
              <Link to='/freeboard'>문의</Link>
            ) : (
              <Link to='/login'>문의</Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <a className='delete' onClick={deleteUser}>
                회원탈퇴
              </a>
            ) : (
              <></>
            )}
          </li>
          <li>{isLoggedIn ? <Link to='/Modify'>회원수정</Link> : <></>}</li>
        </ul>
        <ul className={`app__navbar-login ${showLinks ? 'active' : ''}`}>
          {gradeView()}
          {/* <div className='tosspay'>
          {isLoggedIn ? <button onClick={onClickPayment}>결제하기</button> : ''}
        </div> */}
          <div>
            <div className='loginImage'>
              {isLoggedIn && (
                <img
                  src={profileUrl || require('../../assets/2-1.png')}
                  onClick={deleteUser2}
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
            {isLoggedIn ? userName + '님 안녕하세요' : ''}
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
    </>
  );
};
