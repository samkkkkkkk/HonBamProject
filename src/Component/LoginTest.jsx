import { useContext } from 'react';
import '@/Component/LoginTest.scss'; // 스타일은 따로 정의해주셔야 합니다.
import AuthContext from '@/util/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserContext from '@/util/UserContext';

const LoginTest = () => {
  const redirection = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const { fetchUserInfo } = useContext(UserContext);

  // 1. 요소에서 사용자가 입력한 email, password 가져오기
  // 2. AuthContext의 onLogin(email, paswword)
  // 3. UserContext의 userInfo 호출해서 유저 정보 상태관리하기
  const fetchLogin = async () => {
    const $email = document.getElementById('email');
    const $password = document.getElementById('password');

    const result = onLogin($email.value, $password.value);

    if (result.success) {
      fetchUserInfo();
      redirection('/');
    } else {
      alert(result.message);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    await fetchLogin();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>
        <form className="login-form" onSubmit={loginHandler}>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="input-field"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <div className="login-options">
          <a href="#" className="find-id">
            아이디 찾기
          </a>
          <a href="#" className="find-password">
            비밀번호 찾기
          </a>
          <a href="#" className="sign-up">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
