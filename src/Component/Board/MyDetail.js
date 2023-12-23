import React, { useRef, useState } from 'react';
import './MyDetail.css';

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import AddBoard from './AddBoard';

const MyDetail = () => {
  const [contents, setContents] = useState([]);

  const handleAddContent = (newContent) => {
    setContents([...contents, newContent]);
  };
  // AddBoard와 연결

  const $fileTag = useRef();

  // 이미지파일 상태변수(없으면 안넣어야함)
  const [imgFile, setImgFile] = useState(null);

  // 이미지
  const showThumbnailHandler = (e) => {
    // 첨부된 파일의 정보
    const file = $fileTag.current.files[0]; // e.target.files[0]도 가능

    // 첨부한 파일 이름을 얻은 후 확장자만 추출.(소문자로 일괄 변경)
    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();

    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jpeg' &&
      fileExt !== 'gif'
    ) {
      alert('이미지 파일(jpg,png,jpeg,gif)만 등록이 가능합니다!');
      // 이미지가 아닌 파일을 넣어서 막았더라도 , 로그에는 남아있어서 그거까지 지워야함
      // 그렇지 않으면 잘못된 파일을 input 태그가 여전히 가지고 있게 됨. -> 서버 요청시 에러 유발!
      $fileTag.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  return (
    <div className='user-detail'>
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
        <div className='div-2'>
          <div className='user-board-bottom'>
            <div className='user-bottom'>
              <div className='addBoard'>
                <Link to='/AddBoard'>
                  <button
                    type='button'
                    className='addboard'
                  ></button>
                </Link>
              </div>
              <div className='image' />
              <div className='img' />
              <div className='image-2' />
            </div>
          </div>

          <div className='user-top'>
            <Grid
              item
              xs={12}
            >
              <div
                className='thumbnail-box1'
                onClick={() => $fileTag.current.click()}
              >
                <img
                  src={imgFile || require('../../assets/bambam.png')}
                  alt='profile'
                />
              </div>
              <label
                className='signup-img-label'
                htmlFor='profile-img'
              ></label>
              <input
                id='profile-img'
                type='file'
                style={{ display: 'none' }}
                accept='image/*'
                ref={$fileTag}
                onChange={showThumbnailHandler}
              />
            </Grid>
            <div className='set-icon' />
            <div className='email'>bambam1234@gmail.com</div>
            <div className='intro'>
              <div className='text-wrapper-6'>Hello</div>
            </div>
            <div className='following'>
              <div className='text-wrapper-7'>팔로잉</div>
            </div>
            <div className='following-count'>
              <div className='text-wrapper-18'>100</div>
            </div>
            <div className='follower'>
              <div className='text-wrapper-7'>팔로워</div>
            </div>
            <div className='follower-count'>
              <div className='text-wrapper-19'>100</div>
            </div>
            <div className='board-text'>
              <div className='text-wrapper-7'>게시물</div>
            </div>
            <div className='board-count'>
              <div className='text-wrapper-20'>3</div>
            </div>
            <div className='boardtext1'>최근 업로드한 게시글</div>
            <div className='overlap-group'>
              <div className='id-icon'>
                <Link to='/Setting'>
                  <button
                    type='button'
                    className='set'
                  ></button>
                </Link>
              </div>
              <div className='id'>
                <div className='text-wrapper-9'>BAMBAM</div>
              </div>
              <div className='back'>
                <Link to='/board'>
                  <button
                    type='button'
                    className='backBtn'
                  ></button>
                </Link>
              </div>
            </div>
            <div className='profileImg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetail;
