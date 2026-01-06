// src/pages/OAuth2Success.tsx
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAPI } from '@/api/user';
import UserContext from '@/util/UserContext';

export default function OAuth2Success() {
  const nav = useNavigate();
  const { search } = useLocation();
  const { fetchUserInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      await fetchUserInfo(); //  쿠키 기반으로 내 정보 로드
      const status = new URLSearchParams(search).get('status');
      if (status === 'ONBOARDING') {
        nav('/onboarding', { replace: true });
      } else {
        nav('/', { replace: true });
      }
    })().catch(() =>
      nav('/oauth2/failure?error=FETCH_USERINFO', { replace: true })
    );
  }, [search]);

  return <div>로그인 완료 중…</div>;
}
