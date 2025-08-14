import { useRef, useState } from 'react';
import '@/Component/Board/AddBoard.css';
import { API_BASE_URL, POST } from '@/config/host-config';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { getLoginUserInfo } from '@/util/login-util';
import addboard1 from '@/assets/addboard1.png';

const AddBoard = () => {
  const { token } = getLoginUserInfo();

  const API_BASE_POST = API_BASE_URL + POST;
  const redirection = useNavigate();
  const $fileTag = useRef();

  const [content, setContetnt] = useState('');
  const [postImg, setPostImg] = useState(null);

  const addBoard = async () => {
    const contentBlob = new Blob([JSON.stringify({ content })], {
      type: 'application/json',
    });
    const postFormData = new FormData();
    postFormData.append('content', contentBlob);
    postFormData.append('postImg', $fileTag.current.files[0]);
    const res = await fetch(API_BASE_POST + '/addboard', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: postFormData,
    });
    if (res.status === 200) {
      await res.json();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    addBoard();
    redirection('/mydetail');
  };

  const addContentHanler = (e) => {
    setContetnt(e.target.value);
  };

  const showThumbnailHandler = () => {
    const file = $fileTag.current.files[0];

    if (!file) {
      return;
    }

    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();
    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jpeg' &&
      fileExt !== 'gif'
    ) {
      alert('이미지 파일(jpg, png, jpeg, gif)만 등록이 가능합니다!');
      $fileTag.current.value = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPostImg(reader.result);
    };
  };

  return (
    <div className="AddBoard">
      <form onSubmit={submitHandler}>
        <div className="div">
          <div className="overlap-group">
            <div className="intro">
              <label>
                <textarea
                  className="text-wrapper-9"
                  cols="45"
                  rows="10" // 원하는 높이로 조절할 수 있습니다.
                  placeholder="게시글"
                  value={content}
                  onChange={addContentHanler}
                />
                <button type="submit" className="shareBtn"></button>
              </label>
            </div>
            <Grid item xs={1}>
              <div
                className="thumbnail-box"
                onClick={() => $fileTag.current.click()}
              >
                <img
                  className="thumnail-img-box"
                  src={postImg || addboard1}
                  alt="addboard"
                />
              </div>
              <label
                className="signup-img-label"
                htmlFor="addboard-img"
              ></label>
              <input
                id="addboard-img"
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                ref={$fileTag}
                onChange={showThumbnailHandler}
              />
            </Grid>

            <div className="image" />
            <div className="id">
              <div className="text-wrapper-10">새 게시글</div>
              <div className="back">
                <Link to="/mydetail">
                  <button type="submit" className="backBtn"></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBoard;
