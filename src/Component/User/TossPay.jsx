import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useContext, useEffect, useRef, useState } from 'react';
import '@/Component/User/TossPay.scss';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL, TOSS_PAYMENTS } from '@/config/host-config';
import AuthContext from '@/util/AuthContext';
import UserContext from '@/util/UserContext';
import { payAPI } from '@/api/pay';

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const TOSS_CLIENT_KEY = 'test_ck_yZqmkKeP8gBg1P1nEOqdrbQRxB9l';

const successUrl = API_BASE_URL + TOSS_PAYMENTS;

export function PaymentCheckoutPage({ sub, payMethod }) {
  const { isLoggedIn } = useContext(AuthContext);
  const { userName, email, id, fetchUserInfo } = useContext(UserContext);

  const [payment, setPayment] = useState(null);
  const [amount] = useState({
    currency: 'KRW',
    value: +sub.price.replace(',', ''),
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }
  // 최초 1회 생성 유지
  const orderIdRef = useRef(uuidv4());
  const customerKeyRef = useRef(uuidv4());

  // TossPayments 초기화
  useEffect(() => {
    let mounted = true;

    (async () => {
      // 로그인 상태고, 사용자 정보가 비어있다면 한 번 로드(선택)
      if (isLoggedIn && !userName) {
        await fetchUserInfo?.();
      }

      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      // 회원결제: customerKey 사용 / 비회원은 ANONYMOUS
      const p = tossPayments.payment({
        customerKey: customerKeyRef.current /* or ANONYMOUS */,
      });
      if (mounted) {
        setPayment(p);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [isLoggedIn, userName, fetchUserInfo]);

  // 결제 사전 정보 서버 저장(위변조 방지용)
  async function sendPaymentInfo() {
    const requestData = {
      orderId: orderIdRef.current,
      amount: amount.value,
      userId: id,
      method: payMethod,
    };

    const res = await payAPI.getPayInfo(requestData);
    return res;
  }
  async function requestPayment() {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!payment) {
      alert('결제 모듈 초기화 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    // 1) 서버에 사전 정보 저장/검증
    const pre = await sendPaymentInfo();
    if (!pre.success) {
      alert(pre.message || '결제 정보 전송 중 문제가 발생했습니다.');
      return;
    }

    // 2) 결제창 요청
    const base = window.location.origin;
    const common = {
      method: payMethod,
      amount,
      orderId: orderIdRef.current,
      orderName: sub?.title || '주문',
      successUrl: `${base}/success`,
      failUrl: `${base}/fail`,
      customerEmail: email || '',
      customerName: userName || '',
    };

    if (payMethod === 'CARD') {
      await payment.requestPayment({
        ...common,
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } else if (payMethod === 'VIRTUAL_ACCOUNT') {
      await payment.requestPayment({
        ...common,
        virtualAccount: {
          cashReceipt: { type: '소득공제' },
          useEscrow: false,
          validHours: 24,
        },
      });
    } else if (payMethod === 'TRANSFER') {
      await payment.requestPayment({
        ...common,
        transfer: {
          cashReceipt: { type: '소득공제' },
          useEscrow: false,
        },
      });
    } else if (payMethod === 'MOBILE_PHONE') {
      await payment.requestPayment({
        ...common,
      });
    } else {
      alert('지원하지 않는 결제 수단입니다.');
    }
  }

  return (
    <button className="button Welcome" onClick={requestPayment}>
      결제하기
    </button>
  );
}
