import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import '@/Component/Inquiry/detail/InquiryDetail.css';
import { API_BASE_URL, FREEBOARD } from '@/config/host-config';
import { getLoginUserInfo } from '@/util/login-util';

const InquiryDetail = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isMyPost, setIsMyPost] = useState(false);
  const [editedComments, setEditedComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = getLoginUserInfo().token;
      const requestHeader = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      try {
        const postResponse = await fetch(
          `${API_BASE_URL}${FREEBOARD}/detail/${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );

        if (postResponse.ok) {
          const postData = await postResponse.json();
          setPost(postData);

          const userInfo = getLoginUserInfo();
          setIsMyPost(userInfo.userId === postData.userId);
        } else {
          console.error('게시물 상세 정보를 가져오지 못했습니다.');
        }

        const commentListResponse = await fetch(
          `${API_BASE_URL}${FREEBOARD}/comment?id=${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );

        if (commentListResponse.ok) {
          const commentListData = await commentListResponse.json();
          setComments(commentListData);
          setEditedComments(new Array(commentListData.length).fill(null));
        } else {
          console.error('댓글 목록을 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [id, newComment, editingCommentIndex]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = getLoginUserInfo().token;
    const requestHeader = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${FREEBOARD}/comment`, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify({
          id: id,
          comment: newComment,
        }),
      });

      if (response.ok) {
        const commentListResponse = await fetch(
          `${API_BASE_URL}${FREEBOARD}/comment?id=${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );

        if (commentListResponse.ok) {
          const commentListData = await commentListResponse.json();
          setComments(commentListData);
          setNewComment('');
          setEditedComments(new Array(commentListData.length).fill(null));
        } else {
          console.error('댓글 목록을 불러오지 못했습니다.');
        }
      } else {
        console.error('댓글 등록 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleModifyComment = (commentIndex) => {
    const commentItem = comments[commentIndex];

    setEditingCommentIndex(commentIndex);

    setEditedComments((prevEditedComments) => {
      const updatedComments = [...prevEditedComments];
      updatedComments[commentIndex] = commentItem?.comment || '';
      return updatedComments;
    });
  };

  const handleSaveEditedComment = async (commentIndex) => {
    const token = getLoginUserInfo().token;
    const requestHeader = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const commentId =
      comments[commentIndex]?.commentId || comments[commentIndex]?.id;

    try {
      const response = await fetch(
        `${API_BASE_URL}${FREEBOARD}/comment?id=${commentId}`,
        {
          method: 'PUT',
          headers: requestHeader,
          body: JSON.stringify({
            id: commentId,
            comment: editedComments[commentIndex],
          }),
        }
      );
      if (response.ok) {
        setEditingCommentIndex(null);

        const commentListResponse = await fetch(
          `${API_BASE_URL}${FREEBOARD}/comment?id=${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );

        if (commentListResponse.ok) {
          const commentListData = await commentListResponse.json();
          setComments(commentListData);
          setEditedComments(new Array(commentListData.length).fill(null));
        } else {
          console.error('댓글 목록을 불러오지 못했습니다.');
        }
      } else {
        console.error('댓글 수정 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  const handleDeleteComment = async (commentIndex) => {
    const token = getLoginUserInfo().token;
    const requestHeader = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };

    const commentId =
      comments[commentIndex]?.commentId || comments[commentIndex]?.id;

    try {
      const response = await fetch(
        `${API_BASE_URL}${FREEBOARD}/comment/${commentId}`,
        {
          method: 'DELETE',
          headers: requestHeader,
        }
      );

      if (response.ok) {
        const updatedComments = [...comments];
        updatedComments.splice(commentIndex, 1);
        setComments(updatedComments);
        setEditedComments(new Array(updatedComments.length).fill(null));
      } else {
        console.error('댓글 삭제 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <div className="inquiry_detail_backImg">
      <div className="inquiry_detail">
        <h4 className="inquiry-title">{post.title}</h4>
        <div className="inquiry_wrapper">
          <div className="inquiry_header">
            <p>{`No. ${post.id}`}</p>
            <p>{post.date}</p>
          </div>

          <div className="inquiry_content">
            <p>{post.content}</p>
          </div>
        </div>

        <div className="comment-section">
          <h5 className="inquiry_detail_reply">댓글</h5>
          <ul>
            {comments &&
              comments.length > 0 &&
              comments.map((commentItem, index) => (
                <li key={index} className="inquiry_detail_reply_li">
                  {editingCommentIndex === index ? (
                    <>
                      <textarea
                        value={editedComments[index]}
                        onChange={(e) =>
                          setEditedComments((prevEditedComments) => {
                            const updatedComments = [...prevEditedComments];
                            updatedComments[index] = e.target.value;
                            return updatedComments;
                          })
                        }
                      />
                      <Button onClick={() => handleSaveEditedComment(index)}>
                        저장
                      </Button>
                    </>
                  ) : (
                    <div>
                      <div className="comment-item-writer">
                        {commentItem.writer}
                      </div>
                      <div className="comment-item-comment">
                        {commentItem.comment}
                      </div>
                      <>
                        {getLoginUserInfo().userId === commentItem.userId && (
                          <Button onClick={() => handleModifyComment(index)}>
                            수정
                          </Button>
                        )}
                        {getLoginUserInfo().userId === commentItem.userId ||
                        localStorage.getItem('USER_ROLE') === 'ADMIN' ? (
                          <Button onClick={() => handleDeleteComment(index)}>
                            삭제
                          </Button>
                        ) : (
                          ''
                        )}
                      </>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          {isMyPost || localStorage.getItem('USER_ROLE') === 'ADMIN' ? (
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="inquiry_detail_reply_textarea_content"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요."
              />

              <Button type="submit">댓글 작성</Button>
            </form>
          ) : (
            ''
          )}
        </div>
        <div className="grid-2">
          {isMyPost || localStorage.getItem('USER_ROLE') === 'ADMIN' ? (
            <Link to={`/freeboard/modify/${id}`}>
              <Button className="inquiry_detail_modify_button">수정</Button>
            </Link>
          ) : (
            ''
          )}
          <Link to="/freeboard">
            <Button className="inquiry_detail_list_button">목록</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;
