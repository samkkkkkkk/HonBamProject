import React from 'react';
import './MyDetail.css';
import { Link } from 'react-router-dom';

const MyDetail = () => {
  return (
    <div className='user-detail'>
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
        <div className='div-2'>
          <div className='user-board-bottom'>
            <div className='user-bottom'>
              <div className='image' />
              <div className='img' />
              <div className='image-2' />
              <div className='messagebtn' />
              <div className='followimg' />
            </div>
          </div>
          <div className='user-top'>
            <div className='set-icon' />
            <div className='email'>bambam1234@gmail.com</div>
            <div className='intro'>
              <div className='text-wrapper-6'>Hello</div>
            </div>
            <div className='following'>
              <div className='text-wrapper-7'>팔로잉</div>
            </div>
            <div className='following-count'>
              <div className='text-wrapper-8'>100</div>
            </div>
            <div className='follower'>
              <div className='text-wrapper-7'>팔로워</div>
            </div>
            <div className='follower-count'>
              <div className='text-wrapper-8'>100</div>
            </div>
            <div className='board-text'>
              <div className='text-wrapper-7'>게시물</div>
            </div>
            <div className='board-count'>
              <div className='text-wrapper-8'>100</div>
            </div>
            <div className='overlap-group'>
              <div className='id-icon'>
                <Link to='/Setting'>
                  <button
                    type='button'
                    className='set'
                  ></button>
                </Link>
              </div>
              <div className='id'>
                <div className='text-wrapper-9'>BAMBAM</div>
              </div>
              <div className='back'>
                <Link to='/'>
                  <button
                    type='button'
                    className='backBtn'
                  ></button>
                </Link>
              </div>
            </div>
            <div className='profileImg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetail;
