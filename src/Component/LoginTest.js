import React, { useContext } from 'react';
import './LoginTest.scss'; // 스타일은 따로 정의해주셔야 합니다.
import { API_BASE_URL, USER } from '../config/host-config';
import handleRequest from '../util/handleRequset';
import axios from 'axios';
import axiosInstance from '../config/axios-config';
import AuthContext from '../util/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Password } from '@mui/icons-material';

const LoginTest = () => {
  const redirection = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const REQUEST_URL = API_BASE_URL + USER + '/signin';

  const fetchLogin = async () => {
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    try {
      const res = await axios.post(REQUEST_URL, {
        email: $email.value,
        password: $password.value,
      });

      const {
        token,
        userName,
        role,
        userPay,
        address,
        phoneNumber,
        userId,
        email,
      } = res.data;
      onLogin(
        token,
        userName,
        role,
        userPay,
        address,
        phoneNumber,
        userId,
        email
      );
      // 홈으로 리다이렉트
      redirection('/');
    } catch (error) {
      alert(error.response.data);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    fetchLogin();
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1 className='login-title'>로그인</h1>
        <form className='login-form' onSubmit={loginHandler}>
          <div className='input-group'>
            <label htmlFor='email' className='input-label'>
              이메일
            </label>
            <input
              type='text'
              id='email'
              className='input-field'
              placeholder='이메일을 입력하세요'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password' className='input-label'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              className='input-field'
              placeholder='비밀번호를 입력하세요'
            />
          </div>
          <button type='submit' className='login-button'>
            로그인
          </button>
        </form>
        <div className='login-options'>
          <a href='#' className='find-id'>
            아이디 찾기
          </a>
          <a href='#' className='find-password'>
            비밀번호 찾기
          </a>
          <a href='#' className='sign-up'>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
