import React from 'react';
import './SubscriptionPage.css';
import { Link } from 'react-router-dom';

const SubscriptionPage = ({ sub }) => {
  const { title, price, duration, description } = sub;

  const onClickHandler = () => {};

  return (
    <div className='subscription-card'>
      <h2>{title}</h2>
      <p>\{price}</p>
      <p>{duration}</p>
      <p>{description}</p>
      <Link to='/subscriptionCheckout' state={sub}>
        <button onClick={onClickHandler}>구독하기</button>
      </Link>
    </div>
  );
};

export default SubscriptionPage;
