import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL, TOSS_PAYMENTS, USER } from '@/config/host-config';
import '@/Component/Toss/Success.scss';
import { getLoginUserInfo } from '@/util/login-util';
import LoadingPage from '@/util/Loading';
import axios from 'axios';
import axiosInstance from '@/config/axios-config';
import AuthContext from '@/util/AuthContext';

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { renewToken } = useContext(AuthContext);

  const BASE = API_BASE_URL + TOSS_PAYMENTS;
  const USER_URL = API_BASE_URL + USER;
  const redirection = useNavigate();

  useEffect(() => {
    async function confirm() {
      const confirmRequestData = {
        orderId: searchParams.get('orderId'),
        amount: searchParams.get('amount'),
        paymentKey: searchParams.get('paymentKey'),
      };

      const res = await fetch(BASE + '/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getLoginUserInfo().token,
        },
        body: JSON.stringify(confirmRequestData),
      });

      const data = await res.json();
      setLoading(false);

      // console.log(json);

      if (!res.ok) {
        throw { message: data.message, code: data.code };
      }
      promte();

      return data;
    }

    confirm()
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        navigate(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams]);

  const { amount, discount, orderId, orderName, paidAt, method } =
    responseData || {};

  const promte = async () => {
    try {
      const res = await axiosInstance.put(USER_URL + '/paypromote');
      const json = res.data;
      console.log(json.userPay);

      localStorage.setItem('ACCESS_TOKEN', json.token);
      localStorage.setItem('USER_PAY', json.userPay);
      renewToken(json.token);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = async () => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
      method: searchParams.get('method'),
    };
    const response = await fetch(BASE + '/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
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

          <button className="payment-button" onClick={() => redirection('/')}>
            홈으로
          </button>
        </div>
      )}
      );
    </>
  );
}
