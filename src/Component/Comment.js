import React, { useState } from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';

const Comment = () => {
  return (
    <div className='comment'>
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
        <div className='overlap-group-wrapper'>
          <div className='overlap-group'>
            <div className='rectangle' />
            <div className='vector' />
            <div className='img' />
            <div className='vector-2' />

            <div className='intro'>
              <div className='text-wrapper-6'>bmabam1234</div>
            </div>
            <div className='div-wrapper'>
              <p className='text-wrapper-25'>많은 댓글 부탁드려요</p>
            </div>
            <div className='intro-2'>
              <div className='text-wrapper-8'>1일</div>
            </div>
            <div className='id'>
              <div className='text-wrapper-9'>댓글</div>
            </div>

            <div className='image' />
            <div className='intro-3'>
              <div className='text-wrapper-10'>abc1234</div>
            </div>
            <div className='intro-4'>
              <div className='text-wrapper-7'>게시글 잘보고 가요</div>
            </div>
            <div className='intro-5'>
              <div className='text-wrapper-8'>3일</div>
            </div>
            <div className='nature-person-girl' />
            <div className='commentTxt' />
            <div className='vector-3' />
            <div className='intro-6'>
              <div className='text-wrapper-10'>abc1234</div>
            </div>
            <div className='intro-7'>
              <div className='text-wrapper-7'>즐거운 혼술되세요</div>
            </div>
            <div className='intro-8'>
              <div className='text-wrapper-8'>5일</div>
            </div>
            <div className='person' />
            <div className='comment1' />
            <input
              className='intro-9'
              type='text'
              placeholder='댓글 추가...'
            ></input>

            <div className='vector-4' />
          </div>
          <div className='back'>
            <Link to='/'>
              <button
                type='button'
                className='backBtn1'
              ></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
