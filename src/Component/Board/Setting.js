import React from 'react';
import './Setting.css';
import { Link } from 'react-router-dom';

const Setting = () => {
  return (
    <div className='setting'>
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
        <div className='board-setting'>
          <div className='overlap'>
            <div className='background' />
            <div className='setting-modal'>
              <div className='overlap-group'>
                <div className='remove'>
                  <Link to='/MyDetail'>
                    <button
                      type='button'
                      className='backMain'
                    >
                      -
                    </button>
                  </Link>
                </div>
                <div className='text-wrapper-6'>
                  <Link to='/MyDetail'>
                    <button
                      type='button'
                      className='backBtn'
                    >
                      뒤로가기
                    </button>
                  </Link>
                </div>
                <div className='hide-image' />
                <div className='vector' />
                <div className='text-wrapper-7'>게시글 삭제</div>
                <div className='person-remove' />
                <div className='img' />
                <div className='text-wrapper-8'>
                  <Link to='/ProfileEdit'>
                    <button
                      type='button'
                      className='profileEdit'
                    >
                      프로필 수정
                    </button>
                  </Link>
                </div>
                <div className='vector-2' />
              </div>
            </div>
            <div className='my-board-bottom'></div>
            <div className='my-board-top'>
              <div className='set-icon' />
              <div className='email'>bambam1234@gmail.com</div>
              <div className='intro'>
                <div className='text-wrapper-9'>Hello</div>
              </div>
              <div className='following'>
                <div className='text-wrapper-10'>팔로잉</div>
              </div>
              <div className='follower'>
                <div className='text-wrapper-10'>팔로워</div>
              </div>
              <div className='board-text'>
                <div className='text-wrapper-10'>게시물</div>
              </div>
              <div className='image' />
              <div className='overlap-2'>
                <div className='id'>
                  <div className='text-wrapper-11'>BAMBAM</div>
                </div>
              </div>
            </div>
            <div className='board-count'>
              <div className='text-wrapper-12'>100</div>
            </div>
            <div className='div-wrapper'>
              <div className='text-wrapper-12'>100</div>
            </div>
            <div className='board-count-2'>
              <div className='text-wrapper-12'>100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
