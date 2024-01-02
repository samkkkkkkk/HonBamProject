import React, { useState, useEffect } from 'react';
import './InquiryDetail.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { API_BASE_URL, FREEBOARD } from '../../../util/host-config';
import { getLoginUserInfo } from '../../../util/login-util';

const InquiryDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // React Router를 사용하여 동적으로 게시물 ID를 가져옴
  const { id } = useParams();

  useEffect(() => {
    // 게시물 상세 정보를 가져오는 API 호출 (예시)
    const fetchPostDetail = async () => {
      const token = getLoginUserInfo().token;
      const requestHeader = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      };
      try {
        const response = await fetch(
          `${API_BASE_URL}${FREEBOARD}/detail/${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPost(data); // data는 상세 정보를 담고 있는 객체로 가정
          setComments(data.comments); // data.comments는 댓글 정보를 담고 있는 배열로 가정
          setIsAdmin(getLoginUserInfo().isAdmin); // isAdmin 값을 초기화
        } else {
          console.error('게시물 상세 정보를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchPostDetail();
  }, [id]); // postId가 변경될 때마다 useEffect가 실행됨

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, isAdmin }]);
      setNewComment('');
    }
  };

  return (
    <div className='inquiry_detail_backImg'>
      <div className='inquiry_detail'>
        <h4 className='inquiry-title'>{post.title}</h4>
        <div className='inquiry_wrapper'>
          <div className='inquiry_header'>
            <p>{`No. ${post.id}`}</p>
            <p>{post.date}</p>
          </div>

          <div className='inquiry_content'>
            <p>{post.content}</p>
          </div>
        </div>

        <div className='comment-section'>
          <h5 className='inquiry_detail_reply'>댓글</h5>
          <ul>
            {comments &&
              comments.map((comment, index) => (
                <li
                  className='inquiry_detail_reply_li'
                  key={index}
                >
                  {comment.text} {comment.isAdmin && '(관리자)'}
                </li>
              ))}
          </ul>
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
          <Link to={`/freeboard/modify/${id}`}>
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
    </div>
  );
};

export default InquiryDetail;
