import React, { useState } from 'react';
import './InquiryDetail.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const InquiryDetail = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // 상태 추가

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, isAdmin }]);
      setNewComment('');
    }
  };

  return (
    <div className='inquiry_detail'>
      <h4 className='inquiry-title'>제목</h4>
      <div className='inquiry_wrapper'>
        <div className='inquiry_header'>
          <p>No.1(번호)</p>
          <p>2023.12.30(날짜)</p>
        </div>

        <div className='inquiry_content'>
          <p>내용</p>
        </div>
      </div>

      {/* 댓글 목록 표시 */}
      <div className='comment-section'>
        <h5 className='inquiry_detail_reply'>댓글</h5>
        <ul>
          {comments.map((comment, index) => (
            <li
              className='inquiry_detail_reply_li'
              key={index}
            >
              {comment.text} {comment.isAdmin && '(관리자)'}
            </li>
          ))}
        </ul>
        {/* 댓글 입력 폼 - 관리자만 표시 */}
        {isAdmin && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className='inquiry_detail_reply_textarea_content'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='댓글을 입력하세요.'
            />
            <Button type='submit'>댓글 작성</Button>
          </form>
        )}
      </div>

      <div className='grid-2'>
        <Link to='/freeboard/modify'>
          <Button
            className='inquiry_detail_modify_button'
            children='수정'
          />
        </Link>
        <Link to='/freeboard'>
          <Button
            className='inquiry_detail_list_button'
            children='목록'
          />
        </Link>
      </div>
    </div>
  );
};

export default InquiryDetail;
