import React, { useContext } from 'react';
import './Pay.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL, USER } from '../../util/host-config';
import AuthContext from '../../util/AuthContext';
import { PaymentCheckoutPage } from './TossPay';

export const Pay = () => {
  const currentDate = new Date();
  const oneYearLater = new Date();
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);
  const message = `프리미엄회원권을 결제하셨습니다! 이용 날짜: ${currentDate.toLocaleDateString()} ~ ${oneYearLater.toLocaleDateString()}`;

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

  const onClickPayment = () => {
    redirection('/toss');
  };

  const redirection = useNavigate();

  // 서버에 비동기 로그인 요청(AJAX 요청)
  // 함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴합니다.

  // 로그인 요청 핸들러

  const { isLoggedIn, userName, onLogout } = useContext(AuthContext);

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

  return (
    <>
      <div className='box2'>
        <div className='group'>
          <div className='LOGIN'>
            <div className='overlap-group'>
              <div className='div-sign-container'>
                <div className='heading'>HONBAM PREMIUM</div>
              </div>
              <div className='explain'></div>
              <PaymentCheckoutPage />
              {/* <div className='Welcome' onClick={onClickPayment}></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
