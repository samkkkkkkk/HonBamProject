import React, { useState } from 'react';
import './Comment.css';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../util/host-config';
import { POST } from '../../config/host-config';
import { getLoginUserInfo } from '../../util/login-util';

const Comment = () => {
  const token = getLoginUserInfo().token;
  const API_BASE_COMMENT = API_BASE_URL + POST + '/comment';
  const postId = useParams();
  console.log('postId', postId);
  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;
  // const [postId, setPostId] = useState('');
  // setPostId(props.postId);

  // const getPostid = async () => {
  //   const res = await fetch(API_BASE_COMMENT, {
  //     method: 'GET',
  //   });
  //   if (res.status === 200) {
  //     const json = await res.text();
  //     setPostId(json);
  //   }
  // };
  // getPostid();

  // console.log(postId);

  const commentRegist = async () => {
    const res = await fetch(`${API_BASE_COMMENT} + '/' + ${postId}`, {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({ comment: comment, postId: postId }),
    });
  };

  const commentChangeHander = (e) => {
    setComment(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    commentRegist();
    setComment('');
  };

  const maxComments = 4;

  const addComments = (text) => {
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
          <div className='sidebar-content'></div>
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
            <form onSubmit={submitHandler}>
              <div>
                <input
                  className='addComment'
                  type='text'
                  placeholder='댓글 추가...'
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') {
                  //     addComments(e.target.value);
                  //     e.target.value = '';
                  //   }
                  // }}
                  onChange={commentChangeHander}
                  value={comment}
                ></input>
              </div>
            </form>
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
