import React, { useState } from 'react';
import './UserDetail.css';
import { Link } from 'react-router-dom';

const UserDetail = () => {
  const [isFollowed, setFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const toggleFollow = () => {
    setFollowed(!isFollowed);
    setFollowerCount((prevCount) =>
      isFollowed ? prevCount - 1 : prevCount + 1
    );
  };

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
        </div>
        <div className='div-2'>
          <div className='user-board-bottom'>
            <div className='boardtext'>최근 업로드한 게시글</div>
            <div className='image' />
            <div className='img' />
            <div className='image-2' />
          </div>
          <div className='messageBtn' />
          <div className='user-top'>
            <div className='set-icon' />
            <div className='email'>abc1234@gmail.com</div>
            <div className='intro'>
              <div className='text-wrapper-6'>Hello</div>
            </div>
            <div className='follow-button'>
              <button
                onClick={toggleFollow}
                className={isFollowed ? 'followed' : ''}
              >
                {isFollowed ? '팔로잉 해제' : '팔로우'}
              </button>
              <p className='count'>{followerCount + 131}</p>
            </div>
            <div className='following-count'></div>
            <div className='follower'>
              <div className='text-wrapper-7'>팔로워</div>
            </div>
            <div className='text-wrapper-23'>팔로잉</div>
            <div className='text-wrapper-24'>152</div>
            <div className='follower-count'>
              <div className='text-wrapper-8'></div>
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
            <Link to='/board'>
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
