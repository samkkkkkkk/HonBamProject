import React, { useRef, useState } from 'react';
import './ProfileEdit.css';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const ProfileEdit = () => {
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
    <div className='ProfileEdit'>
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
        <div className='overlap-group'>
          <div className='vector' />
          <div className='vector2' />
          <img
            className='img'
            alt='Vector'
            src='vector-5.png'
          />
          <div className='email'>
            <div className='text-wrapper-6'>사진 수정</div>
          </div>
          <div className='intro'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='이름을 입력하세요.'
            />
          </div>
          <div className='div-wrapper'>
            <div className='text-wrapper-8'>이름</div>
          </div>
          <div className='intro-2'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='메일을 입력하세요.'
            />
          </div>
          <div className='intro-3'>
            <input
              type='text'
              className='text-wrapper-9'
              placeholder='소개를 입력하세요.'
            />
          </div>
          <div className='intro-4'>
            <div className='text-wrapper-8'>메일</div>
          </div>
          <div className='vector-2' />
          <div className='intro-5'>
            <div className='text-wrapper-8'>소개</div>
            <div className='modifyBtn' />
          </div>
          <Grid
            item
            xs={12}
          >
            <div
              className='thumbnail-box'
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

          <div className='image' />
          <div className='id'>
            <div className='text-wrapper-10'>프로필 수정</div>
            <div className='back'>
              <Link to='/Setting'>
                <button
                  type='button'
                  className='backBtn'
                ></button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
