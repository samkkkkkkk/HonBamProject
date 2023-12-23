import React, { useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL as BASE, USER } from '../../util/host-config';
import AuthContext from '../../util/AuthContext';
import { KAKAO_AUTH_URL } from '../../util/kakao-config';
import { NAVER_AUTH_URL } from '../../util/naver-config';

export const Login = () => {
  const redirection = useNavigate();

  const { onLogin } = useContext(AuthContext);

  const REQUEST_URL = BASE + USER + '/signin';

  // 서버에 비동기 로그인 요청(AJAX 요청)
  // 함수 앞에 async를 붙이면 해당 함수는 프로미스 객체를 바로 리턴합니다.
  const fetchLogin = async () => {
    // 이메일, 비밀번호 입력 태그 얻어오기
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    // await는 async로 선언된 함수에서만 사용이 가능합니다.
    // await는 프로미스 객체가 처리될 때까지 기다립니다.
    // 프로미스 객체의 반환값을 바로 활용할 수 있도록 도와줍니다.
    // then()을 활용하는 것보다 가독성이 좋고, 쓰기도 쉽습니다.
    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });

    if (res.status === 400) {
      const text = await res.text();
      alert(text);
      return;
    }

    const { token, userName, email, role, userPay } = await res.json(); // 서버에서 온 json 읽기
    console.log('token : ', token, email, userName, userPay);
    // Context API를 사용하여 로그인 상태를 업데이트 합니다.
    onLogin(token, userName, role, userPay);

    // 홈으로 리다이렉트
    redirection('/');
  };

  // 로그인 요청 핸들러
  const loginHandler = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 전송
    fetchLogin();
  };

  return (
    <div className='box2'>
      <div className='group'>
        <div className='LOGIN'>
          <div className='overlap-group'>
            <div className='div-sign-container'>
              <form onSubmit={loginHandler}>
                <a href={KAKAO_AUTH_URL}>
                  <div className='frame'></div>
                </a>
                <a href={NAVER_AUTH_URL}>
                  <div className='div' />
                </a>
                <div className='input'>
                  <div className='text-wrapper'>
                    <Link to='/Join'>
                      <button
                        type='button'
                        className='JoinButton'
                      >
                        JOIN
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='div-wrapper'>
                  <div className='text-wrapper-2'>
                    <button
                      type='submit'
                      className='LoginButton'
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className='div-placeholder-wrapper'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-3'>
                      <input
                        className='inputText'
                        type='text'
                        placeholder='ENTER YOUR EMAIL'
                        name='email'
                        id='email'
                      ></input>
                    </div>
                  </div>
                </div>
                <div className='input-2'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-4'>
                      <input
                        className='inputText'
                        type='password'
                        placeholder='ENTER YOUR PASSWORD'
                        name='password'
                        id='password'
                      ></input>
                    </div>
                  </div>
                </div>
              </form>
              <div className='heading'>LOGIN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
