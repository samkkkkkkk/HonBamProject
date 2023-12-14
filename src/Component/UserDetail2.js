import React from 'react';
import './UserDetail2.css';
const UserDetail2 = () => {
  return (
    <div className='board'>
      <div className='div'>
        <div className='board-wrap'>
          <div className='boardbottom'>
            <div className='date'>
              <div className='text-wrapper'>12월 20일</div>
            </div>
            <div className='comment-add'>
              <div className='text-wrapper-2'>댓글 추가...</div>
            </div>
            <div className='profile' />
            <div className='comment-text'>
              <div className='text-wrapper-3'>댓글 63개 모두 보기</div>
            </div>
            <div className='id-text'>
              <div className='text-wrapper-4'>SARA 혼술하고 싶은 밤</div>
            </div>
            <div className='like-text'>
              <div className='text-wrapper-5'>좋아요 42개</div>
            </div>
            <div className='save' />
            <div className='comment' />
            <div className='like' />
          </div>
          <div className='board-top2'>
            <div className='sns-board-img2' />
            <div className='more' />
            <div className='name'>
              <div className='text-wrapper-6'>SARA</div>
            </div>
            <div className='profile-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail2;
