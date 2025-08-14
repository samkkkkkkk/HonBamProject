import { useEffect, useState } from 'react';
import '@/Component/Board/SnsBoard.css';
import { Link, Route, Routes } from 'react-router-dom';
import { API_BASE_URL, POST } from '@/config/host-config';
import { getLoginUserInfo } from '@/util/login-util';
import Comment from '@/Component/Board/Comment';

const SnsBoard = () => {
  const token = getLoginUserInfo().token;

  const API_BASE_POST = API_BASE_URL + POST;

  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const [snscontents, setSnsContents] = useState([]);
  const [isLiked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const snsList = async () => {
      const res = await fetch(API_BASE_POST, {
        method: 'GET',
        headers: requestHeader,
      });

      const json = await res.json();
      console.log(json);
      setSnsContents(json.posts);
    };
    snsList();
  }, [API_BASE_POST, requestHeader]);

  const toggleLike = () => {
    setLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
  };

  return (
    <>
      {snscontents.map((content) => (
        <div className="board" key={content.id}>
          <div className="div">
            <div className="board-wrap">
              <div className="boardbottom">
                <div className="id-text">
                  <div key={content.postId} className="text-wrapper-4">
                    {content.content}
                  </div>
                </div>
                <div className="comment-text">
                  <div className="profile"></div>
                  <div className="text-wrapper-12">
                    <Routes>
                      <Route path="/comment/:postId" element={<Comment />} />
                    </Routes>
                    <Link to={`/comment/${content.postId}`}>
                      <button type="button" className="commentBtn">
                        댓글 추가...
                      </button>
                    </Link>
                  </div>
                  <div className="date">
                    <div key={content.postId} className="text-wrapper">
                      {content.updateDate}
                    </div>
                  </div>
                </div>
                <div className="like-text"></div>
                <div className="comment1">
                  <Link to="/comment">
                    <button type="button" className="comment"></button>
                  </Link>
                </div>
                <div className="like">
                  <button onClick={toggleLike}>
                    <span className={`heart ${isLiked ? 'liked' : ''}`}>
                      &#10084;
                    </span>
                  </button>
                  <p className="pLike">{likeCount + 49}명의 좋아요</p>
                </div>
              </div>
              <div className="board-top">
                <div className="sns-board-img">
                  <img
                    key={content.postId}
                    className="sns-post-img"
                    src={content.postImg}
                    alt="사진"
                  ></img>
                </div>
                <div className="more">
                  <Link to="/Setting">
                    <button type="button" className="moreBtn">
                      :
                    </button>
                  </Link>
                </div>
                <div className="name">
                  <div className="text-wrapper-6">
                    <Link to="/UserDetail">
                      <button type="button" className="nickbutton">
                        SARA
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="profile-2" />
              </div>
              <div className="board-title">
                <div className="text-wrapper-7">BOARD</div>
                <div className="detail">
                  <Link to="/MyDetail">
                    <button type="button" className="myDetail"></button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SnsBoard;
