import { useContext, useState } from 'react';
import '@/Component/LoginTest.scss'; // 스타일은 따로 정의해주셔야 합니다.
import AuthContext from '@/util/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '@/util/UserContext';

const LoginTest = () => {
  const redirection = useNavigate();
  const { onLogin } = useContext(AuthContext);
  const { fetchUserInfo } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      // 반드시 await
      const result = await onLogin(email, password);
      if (result?.success) {
        // 선택: 유저 정보 미리 채우기
        await fetchUserInfo();
        redirection('/'); // 또는 navigate('/', { replace: true })
      } else {
        alert(result?.message ?? '로그인에 실패했습니다.');
      }
    } catch (err) {
      alert(err?.message ?? '로그인 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="login-options">
          <a href="#" className="find-id">
            아이디 찾기
          </a>
          <a href="#" className="find-password">
            비밀번호 찾기
          </a>
          <Link className="sign-up" to={'/Join'}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
