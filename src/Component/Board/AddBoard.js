import React, { useRef, useState } from 'react';
import './AddBoard.css';
import { API_BASE_URL, POST } from '../../config/host-config';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const AddBoard = () => {
  const redirection = useNavigate();

  const [postData, setPostData] = useState({
    content: '',
    imageUrl: '',
    // 다른 필요한 필드들
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();

      // 서버로부터 받아온 데이터를 콘솔에 출력 (이 부분을 MyDetail 컴포넌트로 전달하면 됨)
      console.log('게시글 추가완료:', responseData);

      setPostData({ content: '', imageUrl: '' });
      setContent('');
      setImgFile(null);

      // MyDetail 컴포넌트로 넘어가는 코드 작성
      // 예를 들어, React Router를 사용한다면 다음과 같이 작성할 수 있음
      redirection('/MyDetail');
    } catch (error) {
      console.error('입력오류:', error);
    }
  };
  const $fileTag = useRef();

  const [content, setContent] = useState('');

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const [imgFile, setImgFile] = useState(null);
  // 이미지파일 상태변수(없으면 안넣어야함)

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
    <div className='AddBoard'>
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
          <div className='intro'>
            <form onSubmit={handleSubmit}>
              <label>
                <textarea
                  className='text-wrapper-9'
                  cols='45'
                  rows='10' // 원하는 높이로 조절할 수 있습니다.
                  placeholder='문구를 작성하거나 설문을 추가하세요.'
                  value={content}
                  onChange={handleContentChange}
                />
                <button
                  type='submit'
                  className='shareBtn'
                ></button>
              </label>
            </form>
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
                src={imgFile || require('../../assets/addboard1.png')}
                alt='addboard'
              />
            </div>
            <label
              className='signup-img-label'
              htmlFor='addboard-img'
            ></label>
            <input
              id='addboard-img'
              type='file'
              style={{ display: 'none' }}
              accept='image/*'
              ref={$fileTag}
              onChange={showThumbnailHandler}
            />
          </Grid>

          <div className='image' />
          <div className='id'>
            <div className='text-wrapper-10'>새 게시글</div>
            <div className='back'>
              <Link to='/MyDetail'>
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

export default AddBoard;
