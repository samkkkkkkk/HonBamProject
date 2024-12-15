import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SubscriptionCheckout.scss';
import { PaymentCheckoutPage } from '../User/TossPay';
import { CheckoutPage } from '../Toss/Checkout';
import { getLoginUserInfo } from '../../util/login-util';

const SubscriptionCheckout = () => {
  const [payMethod, setPayMethod] = useState();

  const selectedMethod = (e) => {
    setPayMethod(e.target.value);
  };

  console.log(payMethod);

  const location = useLocation();
  const sub = location.state;

  const { username } = getLoginUserInfo();

  console.log(sub);

  if (!sub) {
    return <p>선택된 구독권이 없습니다.</p>;
  }

  return (
    <div className='Checkout'>
      <h1>결제 화면</h1>
      <div className='checkout-details'>
        <p>
          <strong>회원 이름:</strong> {username}
        </p>
        <p>
          <strong>구독권:</strong> {sub.title}
        </p>
        <p>
          <strong>가격:</strong> {sub.price}원
        </p>
        <div>
          <strong>결제방법: </strong>
          <select className='methodBox' onChange={selectedMethod}>
            <option value=''>결제방식</option>
            <option value='CARD'>카드결제</option>
            <option value='VIRTUAL_ACCOUNT'>가상계좌</option>
            <option value='TRANSFER'>계좌이체</option>
            <option value='MOBILE_PHONE'>휴대폰결제</option>
          </select>
        </div>
        {payMethod && <PaymentCheckoutPage sub={sub} payMethod={payMethod} />}
        {/* <Link to='/checkout' state={sub}>
          <button>결제하기</button>
        </Link> */}
      </div>
    </div>
  );
};

export default SubscriptionCheckout;
