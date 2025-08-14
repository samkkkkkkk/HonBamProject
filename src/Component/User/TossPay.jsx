import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import '@/Component/User/TossPay.scss';
import { getLoginUserInfo } from '@/util/login-util';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_BASE_URL, TOSS_PAYMENTS } from '@/config/host-config';

// ------  SDK 초기화 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = 'test_ck_yZqmkKeP8gBg1P1nEOqdrbQRxB9l';
const customerKey = uuidv4();
let orderId;

const successUrl = API_BASE_URL + TOSS_PAYMENTS;

export function PaymentCheckoutPage({ sub, payMethod }) {
  const { username } = getLoginUserInfo();

  const [payment, setPayment] = useState(null);
  const [amount] = useState({
    currency: 'KRW',
    value: +sub.price.replace(',', ''),
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const token = getLoginUserInfo().token;

  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        orderId = uuidv4();
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  async function paymentInfo() {
    const requestData = {
      orderId: orderId,
      amount: +sub.price.replace(',', ''),
      userId: getLoginUserInfo().userId,
      method: payMethod,
    };

    const res = await fetch(API_BASE_URL + '/api/tosspay/info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(requestData),
    });

    if (res.status === 200) {
      alert('데이터 전송 완료');
    } else {
      alert('오류 발생');
    }
  }

  // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
  // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
  async function requestPayment() {
    console.log('결제창 띄우기');
    paymentInfo();
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    if (payMethod === 'CARD') {
      await payment.requestPayment({
        method: payMethod, // 카드 및 간편결제
        amount: amount,
        orderId: orderId, // 고유 주분번호
        orderName: sub.title,
        successUrl: window.location.origin + '/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: '',
        customerName: username,
        // customerMobilePhone: '',
        // 카드 결제에 필요한 정보
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT', // 통합결제창 여는 옵션
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } else if (payMethod === 'VIRTUAL_ACCOUNT') {
      await payment.requestPayment({
        method: payMethod, // 카드 및 간편결제
        amount: amount,
        orderId: orderId, // 고유 주분번호
        orderName: sub.title,
        successUrl: window.location.origin + '/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: '',
        customerName: username,
        // customerMobilePhone: '',

        // 가상계좌에 필요한 정보
        virtualAccount: {
          cashReceipt: {
            type: '소득공제',
          },
          useEscrow: false,
          validHours: 24,
        },
      });
    } else if (payMethod === 'TRANSFER') {
      await payment.requestPayment({
        method: payMethod, // 카드 및 간편결제
        amount: amount,
        orderId: orderId, // 고유 주분번호
        orderName: sub.title,
        successUrl: window.location.origin + '/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: '',
        customerName: username,
        // customerMobilePhone: '',

        transfer: {
          cashReceipt: {
            type: '소득공제',
          },
          useEscrow: false,
        },
      });
    } else if (payMethod === 'MOBILE_PHONE') {
      await payment.requestPayment({
        method: payMethod, // 카드 및 간편결제
        amount: amount,
        orderId: orderId, // 고유 주분번호
        orderName: sub.title,
        successUrl: window.location.origin + '/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: '',
        customerName: username,
        // customerMobilePhone: '',
      });
    }
  }

  return (
    // 결제하기 버튼
    <button className="button Welcome" onClick={() => requestPayment()}>
      결제하기
    </button>
  );
}
