import React from 'react';
import './UserDetail4.css';
const UserDetail4 = () => {
  return (
    <div className='board'>
      <div className='div'>
        <div className='board-wrap'>
          <div className='boardbottom'>
            <div className='date'>
              <div className='text-wrapper'>11월 20일</div>
            </div>
            <div className='comment-add'>
              <div className='text-wrapper-2'>댓글 추가...</div>
            </div>
            <div className='profile' />
            <div className='comment-text'>
              <div className='text-wrapper-3'>댓글 81개 모두 보기</div>
            </div>
            <div className='id-text'>
              <div className='text-wrapper-4'>SARA 와인 한잔</div>
            </div>
            <div className='like-text'>
              <div className='text-wrapper-5'>좋아요 68개</div>
            </div>
            <div className='save' />
            <div className='comment' />
            <div className='like' />
          </div>
          <div className='board-top'>
            <div className='sns-board-img3' />
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

export default UserDetail4;
