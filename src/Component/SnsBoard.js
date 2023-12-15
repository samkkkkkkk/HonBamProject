import React from 'react';
import './SnsBoard.css';
import { Link } from 'react-router-dom';
const SnsBoard = () => {
  return (
    <div className='board'>
      <div className='div'>
        <div className='board-wrap'>
          <div className='boardbottom'>
            <div className='date'>
              <div className='text-wrapper'>12월 4일</div>
            </div>
            <div className='comment-add'>
              <div className='text-wrapper-2'>
                <Link to='/comment'>
                  <button
                    type='button'
                    className='commentBtn'
                  >
                    댓글 추가...
                  </button>
                </Link>
              </div>
            </div>
            <div className='profile' />
            <div className='comment-text'>
              <div className='text-wrapper-3'>
                <Link to='/comment'>
                  <button
                    type='button'
                    className='commentBtn'
                  >
                    댓글 62개 모두 보기
                  </button>
                </Link>
              </div>
            </div>
            <div className='id-text'>
              <div className='text-wrapper-4'>abc1234 혼술하고 싶은 밤</div>
            </div>
            <div className='like-text'>
              <div className='text-wrapper-5'>좋아요 50개</div>
            </div>
            <div className='save' />
            <div className='comment'>
              <Link to='/comment'>
                <button
                  type='button'
                  className='commentBtn'
                ></button>
              </Link>
            </div>
            <div className='like' />
          </div>
          <div className='board-top'>
            <div className='sns-board-img' />
            <div className='more'>
              <Link to='/Setting'>
                <button
                  type='button'
                  className='moreBtn'
                >
                  :
                </button>
              </Link>
            </div>
            <div className='name'>
              <div className='text-wrapper-6'>
                <Link to='/UserDetail'>
                  <button
                    type='button'
                    className='nickbutton'
                  >
                    SARA
                  </button>
                </Link>
              </div>
            </div>
            <div className='profile-2' />
          </div>
          <div className='board-title'>
            <div className='text-wrapper-7'>BOARD</div>
            <div className='detail'>
              <Link to='/MyDetail'>
                <button
                  type='button'
                  className='myDetail'
                ></button>
              </Link>
            </div>
          </div>
        </div>
        <div className='side-bar'>
          <div className='sidebar-content'>
            <div className='logout'>
              <div className='text-wrapper-8'>Logout</div>
            </div>
            <div className='my-page'>
              <div className='my-page-text'>Mypage</div>
            </div>
            <div className='BOARD'>
              <div className='text-wrapper-8'>BOARD</div>
            </div>
            <div className='CHAT'>
              <div className='text-wrapper-9'>CHAT</div>
            </div>
            <div className='RECIPE'>
              <div className='text-wrapper-10'>RECIPE</div>
            </div>
            <div className='HOTPLACE'>
              <div className='text-wrapper-11'>HOTPLACE</div>
            </div>
          </div>
          <div className='logo'>
            <div className='text-wrapper-12'>HONBAM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnsBoard;
