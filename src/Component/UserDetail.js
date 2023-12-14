import React from 'react';
import './UserDetail.css';
import { Link } from 'react-router-dom';

const UserDetail = () => {
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
              <div className='boardtext'>최근 업로드한 게시글</div>

              <div className='image' />
              <div className='img' />
              <div className='image-2' />
              <div className='messagebtn' />
              <div className='followimg' />
            </div>
          </div>
          <div className='user-top'>
            <div className='set-icon' />
            <div className='email'>abc1234@gmail.com</div>
            <div className='intro'>
              <div className='text-wrapper-6'>Hello</div>
            </div>
            <div className='following'>
              <div className='text-wrapper-7'>팔로잉</div>
            </div>
            <div className='following-count'>
              <div className='text-wrapper-8'>30</div>
            </div>
            <div className='follower'>
              <div className='text-wrapper-7'>팔로워</div>
            </div>
            <div className='follower-count'>
              <div className='text-wrapper-8'>132</div>
            </div>
            <div className='board-text'>
              <div className='text-wrapper-7'>게시물</div>
            </div>
            <div className='board-count'>
              <div className='text-wrapper-8'>164</div>
            </div>
            <div className='overlap-group'>
              <div className='id'>
                <div className='text-wrapper-9'>SARA</div>
              </div>
            </div>
            <div className='nature-person-girl' />
          </div>
          <div className='back'>
            <Link to='/'>
              <button
                type='button'
                className='backBt'
              ></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
