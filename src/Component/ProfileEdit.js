import React from 'react';
import './ProfileEdit.css';
import { Link } from 'react-router-dom';

const ProfileEdit = () => {
  return (
    <div className='ProfileEdit'>
      <div className='div'>
        <div className='side-bar'>
          <div className='sidebar-content'>
            <div className='logout'>
              <div className='text-wrapper'>Logout</div>
            </div>
            <div className='my-page'>
              <div className='my-page-text'>Mypage</div>
            </div>
            <div className='BOARD'>
              <div className='text-wrapper'>BOARD</div>
            </div>
            <div className='CHAT'>
              <div className='text-wrapper-2'>CHAT</div>
            </div>
            <div className='RECIPE'>
              <div className='text-wrapper-3'>RECIPE</div>
            </div>
            <div className='HOTPLACE'>
              <div className='text-wrapper-4'>HOTPLACE</div>
            </div>
          </div>
          <div className='logo'>
            <div className='text-wrapper-5'>HONBAM</div>
          </div>
        </div>
        <div className='overlap-group'>
          <div className='vector' />
          <div className='vector2' />
          <img
            className='img'
            alt='Vector'
            src='vector-5.png'
          />
          <div className='email'>
            <div className='text-wrapper-6'>사진 수정</div>
          </div>
          <div className='intro'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='이름을 입력하세요.'
            />
          </div>
          <div className='div-wrapper'>
            <div className='text-wrapper-8'>이름</div>
          </div>
          <div className='intro-2'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='메일을 입력하세요.'
            />
          </div>
          <div className='intro-3'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='소개를 입력하세요.'
            />
          </div>
          <div className='intro-4'>
            <div className='text-wrapper-8'>메일</div>
          </div>
          <div className='vector-2' />
          <div className='intro-5'>
            <div className='text-wrapper-8'>소개</div>
            <div className='modifyBtn' />
          </div>

          <div className='image' />
          <div className='id'>
            <div className='text-wrapper-10'>게시글 수정</div>
            <div className='back'>
              <Link to='/Setting'>
                <button
                  type='button'
                  className='backBtn'
                ></button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
