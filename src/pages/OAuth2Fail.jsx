import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function OAuth2Failure() {
  const [sp] = useSearchParams();
  const err = useMemo(() => sp.get('error') ?? 'UNKNOWN', [sp]);
  const retry = () => {
    window.location.href = '/oauth2/authorization/naver';
  };
  return (
    <div>
      <h2>소셜 로그인 실패</h2>
      <p>사유: {err}</p>
      <button onClick={retry}>다시 시도</button>
    </div>
  );
}
