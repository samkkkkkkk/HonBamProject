import React from 'react';
import SubscriptionPage from './SubscriptionPage';
import './SubscriptionItem.css';
import { Route, Routes } from 'react-router-dom';
import SubscriptionCheckout from './SubscriptionCheckout';

const subscriptions = [
  {
    title: '1개월 구독권',
    price: '1,000',
    duration: '1개월',
    description: '한 달 동안 모든 프리미엄 기능을 이용할 수 있습니다.',
  },
  {
    title: '6개월 구독권',
    price: '50,000',
    duration: '6개월',
    description:
      '6개월 동안 모든 프리미엄 기능을 할인된 가격에 이용할 수 있습니다.',
  },
  {
    title: '1년 구독권',
    price: '90,000',
    duration: '1년',
    description: '1년 동안 모든 프리미엄 기능을 최저가에 이용할 수 있습니다.',
  },
  {
    title: '정기 구독권',
    price: '8,000',
    duration: '정기 결제',
    description: '매월 자동 갱신되어 프리미엄 기능을 계속 이용할 수 있습니다.',
  },
];

const SubscriptionItems = () => {
  return (
    <>
      <div className='subsCripntionsBox'>
        <h1>구독권 선택</h1>
        <div className='subscriptions'>
          {subscriptions.map((sub, index) => (
            <SubscriptionPage key={index} sub={sub} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SubscriptionItems;
