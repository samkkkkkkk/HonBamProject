import React from 'react';
import { Spinner } from 'reactstrap';
import './Loading.scss';

const LoadingPage = () => {
  return (
    <div className='loading'>
      <Spinner color='danger'>loading...</Spinner>
    </div>
  );
};

export default LoadingPage;
