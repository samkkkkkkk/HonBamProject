import React, { useState } from 'react';
import './SnsBoard.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
const SnsBoard = () => {
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const toggleLike = () => {
    setLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };
  const handleCommentClick = () => {
    setCommentOpen(!isCommentOpen);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    // 댓글 추가 로직을 수행한 후, 댓글 리스트 업데이트
    setComments([...comments, newComment]);
    // 새로운 댓글 입력 창 초기화
    setNewComment('');
  };

  return (
    <div className='board'>
      <div className='div'>
        <div className='board-wrap'>
          <div className='boardbottom'>
            <div className='date'>
              <div className='text-wrapper'>12월 4일</div>
            </div>
            <div className='comment-add'>
              <div onClick={handleCommentClick}>
                <input
                  className='intro-15'
                  type='text'
                  placeholder='댓글 추가...'
                ></input>
              </div>
              {isCommentOpen && <button className='write'>작성</button>}
            </div>

            <div className='profile' />
            <div className='comment-text'>
              <div>
                <button
                  className='commentList'
                  onClick={handleOpenModal}
                >
                  댓글 보기
                </button>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel='댓글 리스트'
                >
                  <div className='comment'>
                    <div className='div'>
                      <div className='overlap-group-wrapper'>
                        <div className='overlap-group'>
                          <div className='rectangle'></div>
                          <div className='vector' />
                          <div className='img' />
                          <div className='vector-2' />

                          <div className='intro'>
                            <div className='text-wrapper-6'>bambam1234</div>
                          </div>
                          <div className='div-wrapper'>
                            <p className='text-wrapper-25'>
                              많은 댓글 부탁드려요
                            </p>
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
                            <div className='text-wrapper-7'>
                              게시글 잘보고 가요
                            </div>
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
                            <div className='text-wrapper-7'>
                              즐거운 혼술되세요
                            </div>
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
                          <button
                            className='closed'
                            onClick={handleCloseModal}
                          >
                            닫기
                          </button>
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
                </Modal>
              </div>
            </div>
            <div className='id-text'>
              <div className='text-wrapper-4'>abc1234 혼술하고 싶은 밤</div>
            </div>
            <div className='like-text'></div>
            <div className='comment'>
              <Link to='/comment'>
                <button
                  type='button'
                  className='commentBtn'
                ></button>
              </Link>
            </div>
            <div className='like'>
              <button onClick={toggleLike}>
                <span className={`heart ${isLiked ? 'liked' : ''}`}>
                  &#10084;
                </span>
              </button>
              <p>{likeCount + 49}명의 좋아요</p>
            </div>
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
