import React, { useState } from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  const maxComments = 4;

  const addComment = (text) => {
    setComments([...comments, text]);
  };

  // 현재 페이지의 댓글을 계산하는 함수
  const getCurrentComments = () => {
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    return comments.slice(indexOfFirstComment, indexOfLastComment);
  };

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
            <div className='rectangle'></div>

            <div className='id'>
              <div className='text-wrapper-30'>
                <h2>댓글</h2>
              </div>
              <div>
                <ul className='ulStyle'>
                  {/* 현재 페이지의 댓글만 매핑하여 표시 */}
                  {getCurrentComments().map((comment, index) => (
                    <li
                      className='liStyle'
                      key={index}
                    >
                      <div className='avatar'></div>
                      <span className='litext'>{comment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 페이지네이션 버튼 추가 */}
            <div className='pagination'>
              {Array.from(
                { length: Math.ceil(comments.length / commentsPerPage) },
                (_, index) => (
                  <div className='pageCount'>
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={currentPage === index + 1 ? 'activePage' : ''}
                    >
                      {index + 1}
                    </button>
                  </div>
                )
              )}
            </div>

            <input
              className='addComment'
              type='text'
              placeholder='댓글 추가...'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addComment(e.target.value);
                  e.target.value = '';
                }
              }}
            ></input>

            <div className='comment1' />
            <div className='image' />

            <div className='vector-4' />
          </div>
          <div className='back'>
            <Link to='/board'>
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
