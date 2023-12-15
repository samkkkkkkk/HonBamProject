import React from 'react';
import './HonbamChat.css';

export const HonbamChat = () => {
  return (
    <div className='TAESEUNG-RANDOM-CHAT'>
      <div className='div'>
        <div className='overlap-group'>
          <div className='text-wrapper'>HONBAM CHAT</div>
          <div className='overlap'>
            <div className='text-wrapper-2'>With Random Someone</div>
          </div>
          <div className='div-wrapper'>
            <div className='text-wrapper-2'>With Matched One</div>
          </div>
          <div className='overlap-2'>
            <div className='text-wrapper-2'>With Ai Friend</div>
          </div>
        </div>
        <div className='side-bar'>
          <div className='sidebar-content'>
            <div className='logout'>
              <div className='text-wrapper-3'>Logout</div>
            </div>
            <div className='my-page'>
              <div className='my-page-text'>Mypage</div>
            </div>
            <div className='BOARD'>
              <div className='text-wrapper-3'>BOARD</div>
            </div>
            <div className='CHAT'>
              <div className='text-wrapper-4'>CHAT</div>
            </div>
            <div className='RECIPE'>
              <div className='text-wrapper-5'>RECIPE</div>
            </div>
            <div className='HOTPLACE'>
              <div className='text-wrapper-6'>HOTPLACE</div>
            </div>
          </div>
          <div className='logo'>
            <div className='text-wrapper-7'>HONBAM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
