import React from 'react';
import './JoinTest.scss'; // 스타일은 따로 정의해야 합니다.

const JoinTest = () => {
  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h1 className='signup-title'>회원가입</h1>
        <form className='signup-form'>
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
          <div className='input-group'>
            <label htmlFor='confirmPassword' className='input-label'>
              비밀번호 확인
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='input-field'
              placeholder='비밀번호를 다시 입력하세요'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='name' className='input-label'>
              이름
            </label>
            <input
              type='text'
              id='name'
              className='input-field'
              placeholder='이름을 입력하세요'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='email' className='input-label'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              className='input-field'
              placeholder='이메일을 입력하세요'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='phone' className='input-label'>
              휴대폰 번호
            </label>
            <input
              type='tel'
              id='phone'
              className='input-field'
              placeholder='휴대폰 번호를 입력하세요'
            />
          </div>
          <button type='submit' className='signup-button'>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinTest;
