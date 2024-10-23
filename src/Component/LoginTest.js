import React from 'react';
import './LoginTest.scss'; // 스타일은 따로 정의해주셔야 합니다.

const LoginTest = () => {
  return (
    <div className='login-container'>
      <div className='login-box'>
        <h1 className='login-title'>로그인</h1>
        <form className='login-form'>
          <div className='input-group'>
            <label htmlFor='userId' className='input-label'>
              아이디
            </label>
            <input
              type='text'
              id='userId'
              className='input-field'
              placeholder='아이디를 입력하세요'
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
