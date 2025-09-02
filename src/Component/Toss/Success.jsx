import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '@/Component/Toss/Success.scss';
import LoadingPage from '@/util/Loading';
import AuthContext from '@/util/AuthContext';
import UserContext from '@/util/UserContext';
import { payAPI } from '@/api/pay';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 선택: 필요 시 재검증/상태동기화를 위해 사용
  const { isLoggedIn } = useContext(AuthContext);
  const { fetchUserInfo, userRole, userName } = useContext(UserContext);

  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) {
      return;
    } // ✅ 중복 방지
    calledRef.current = true;
    const confirmRequestData = {
      orderId: searchParams.get('orderId'),
      amount: +searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    (async () => {
      // 1) 백엔드에 confirm 요청 (httpOnly 쿠키 자동 포함)
      const confirmed = await payAPI.confirm(confirmRequestData);
      if (!confirmed.success) {
        navigate(
          `/fail?code=${confirmed.code || ''}&message=${encodeURIComponent(confirmed.message || '결제 승인 실패')}`
        );
        return;
      }

      // 2) 결제 등급 승격(서버 유저 상태 갱신)
      const promoted = await payAPI.promoteUserPay();
      if (!promoted.success) {
        // 등급 승격 실패 시에도 결제는 완료된 상태 — UX에 맞게 처리
        console.warn('paypromote 실패:', promoted.message);
      }

      await fetchUserInfo();

      console.log('userRole 변화: ', userName);

      setResponseData(confirmed.data);
      setLoading(false);
    })();
  }, []);

  const {
    amount,
    discount = 0,
    orderId,
    orderName,
    paidAt,
    method,
  } = responseData || {};

  const cancel = async () => {
    const payload = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
      method: searchParams.get('method'),
    };
    const res = await payAPI.cancel(payload);
    if (!res.success) {
      alert(res.message || '결제 취소에 실패했습니다.');
    } else {
      alert('결제가 취소되었습니다.');
      navigate('/');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {loading ? (
        LoadingPage
      ) : (
        <div className="payment-container">
          <h1 className="payment-title">결제가 완료되었습니다!</h1>
          <p className="payment-subtitle">
            감사합니다. 구독이 활성화되었습니다.
          </p>

          <div className="payment-info">
            <div className="payment-row">
              <span className="payment-label">구독권</span>
              <span className="payment-value">{orderName}</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">결제 날짜</span>
              <span className="payment-value">{formatDate(paidAt)}</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">주문 번호</span>
              <span className="payment-value">{orderId}</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">결제 방법</span>
              <span className="payment-value">{method}</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">상품 요금</span>
              <span className="payment-value">{amount}원</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">할인 금액</span>
              <span className="payment-value">-{discount}원</span>
            </div>
            <div className="payment-row">
              <span className="payment-label">총 결제 금액</span>
              <span className="payment-value-highlight">
                {amount - discount}원
              </span>
            </div>
          </div>

          <button className="payment-button" onClick={() => navigate('/')}>
            홈으로
          </button>
        </div>
      )}
      );
    </>
  );
}
