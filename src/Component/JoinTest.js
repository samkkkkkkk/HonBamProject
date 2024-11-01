import React, { useCallback, useReducer, useRef, useState } from 'react';
import './JoinTest.scss'; // 스타일은 따로 정의해야 합니다.
import { initailState, initialState, joinReducer } from './User/joinReducer';
import { debounce } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL, USER } from '../util/host-config';
import { json } from 'react-router-dom';

const JoinTest = () => {
  // 기본 요청 url
  const REQUEST_URI = API_BASE_URL + USER;

  const $fileTag = useRef();

  // 입력받은 휴대폰 번호 상태 관리
  const [phone, setPhone] = useState('');

  // 이미지파일 상태관리
  const [imgFile, setImgFile] = useState(null);

  // 리듀서 함수 등록
  const [state, dispatch] = useReducer(joinReducer, initialState);

  const { userValue, message, correct } = state;

  const updateState = (key, inputValue, msg, flag) => {
    key !== 'passwordCheck' &&
      dispatch({
        type: 'SET_USER_VALUE',
        key,
        value: inputValue,
      });

    dispatch({
      type: 'SET_MESSAGE',
      key,
      value: msg,
    });

    dispatch({
      type: 'SET_CORRECT',
      key,
      value: flag,
    });
  };

  // 각각의 핸들러에 붙어 있는 디바운스 함수를 일괄적 처리
  // useCallback: 함수의 메모이제이션을 위한 훅. (함수의 선언을 기억했다가 재사용하기 위한 훅)
  // 상태값 변경에 의해 화면의 재 렌더링이 발생할 때, 컴포넌트의 함수들도 재 선언이 됩니다.
  // useCallback으로 함수를 감싸 주시면 이전에 생성된 함수를 기억했다가 재 사용하도록 하기 때문에
  // 불필요한 함수 선언을 방지할 수 있습니다. (성능 최적화에 도움이 됩니다.)
  const debounceUpdateState = useCallback(
    debounce((key, inputValue, msg, flag) => {
      console.log('debounce called! key: ', key);
      updateState(key, inputValue, msg, flag);
    }, 500),
    []
  );

  const fetchDuplicateCheck = async (target, value) => {
    let targetName = '';
    if (target === 'userId') targetName = '닉네임';
    else if (target === 'email') targetName = '이메일';

    let msg = '';
    let flag = false;

    const res = await axios.get(
      `${REQUEST_URI}/check?value=${value}&target=${target}`
    );
    if (res.data) {
      msg = `중복된 ${targetName}입니다.`;
    } else {
      msg = `사용 가능한 ${targetName}입니다.`;
      flag = true;
    }

    debounceUpdateState(target, value, msg, flag);
  };

  const idCheckHandler = (e) => {
    const inputValue = e.target.value;
    const target = e.target.id;
    const idRegex = /^[가-힣a-zA-Z][가-힣a-zA-Z0-9!@#_]{4,9}$/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '닉네임 필수입니다.';
    } else if (!idRegex.test(inputValue)) {
      msg =
        '한글 또는 영어로 시작하고 숫자와 특수문자(!@#)을 조합하여 (5~10)글자를 작성해주세요.';
    } else {
      fetchDuplicateCheck(target, inputValue);
      return;
    }
    debounceUpdateState('userId', inputValue, msg, flag);
  };

  // 이메일 입력창 검증
  const emailCheckHandler = (e) => {
    const inputValue = e.target.value;
    const target = e.target.id;

    let msg;
    let flag = false;

    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!inputValue) {
      msg = '이메일은 필수입니다.';
    } else if (!emailRegex.test(inputValue)) {
      msg = '올바른 이메일 형식이 아닙니다.';
    } else {
      fetchDuplicateCheck(target, inputValue);
      return;
    }

    debounceUpdateState('email', inputValue, msg, flag);
  };

  // 비밀번호 입력란
  const passwordHandler = (e) => {
    const inputValue = e.target.value;

    // 비밀번호 입력창이 변하면 비밀번호 확인란을 비워준다.
    document.getElementById('confirmPassword').value = '';
    updateState('passwordCheck', '', '', false);

    let msg;
    let flag = false;
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (!inputValue) {
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.';
    } else {
      msg = '사용 가능한 비밀번호입니다.';
      flag = true;
    }

    debounceUpdateState('password', inputValue, msg, flag);
  };

  const pwCheckHandler = (e) => {
    const inputValue = document.getElementById('confirmPassword').value;
    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== inputValue) {
      msg = '비밀번호가 일치하지 않습니다.';
    } else {
      msg = '사용 가능한 비밀번호 입니다.';
      flag = true;
    }

    debounceUpdateState('passwordCheck', inputValue, msg, flag);
  };

  const nameHandler = (e) => {
    console.log('nameHandler 리듀서 함수가 동작함');
    const inputValue = e.target.value;
    const nameRegex = /^[가-힣]{2,5}$/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성 해주세요.';
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    debounceUpdateState('userName', inputValue, msg, flag);
  };

  const phoneNumHandler = (e) => {
    let inputValue = e.target.value;
    let msg;
    let flag = false;

    // 정규 표현식 01로 시작,
    const phoneRegex = /^01[016789]\d{3,4}\d{4}$/;

    // 입력 받은 번호에서 숫자만 남기기
    const number = inputValue.replace(/\D/g, '');
    // 포맷함수 호출
    e.target.value = formatNumber(number);

    if (!inputValue) {
      msg = '휴대폰 번호를 입력해 주세요.';
    } else if (!phoneRegex.test(number)) {
      msg = '휴대폰 번호를 정확히 입력해 주세요.';
    } else {
      msg = '';
      flag = true;
    }
    updateState('phoneNumber', number, msg, flag);
  };

  // 휴대폰 번호 형식 포맷 하기
  const formatNumber = (number) => {
    if (number.length <= 3) {
      return number;
    } else if (number.length <= 7) {
      return `${number.slice(0, 3)}-${number.slice(3)}`;
    } else if (number.length <= 10) {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
    } else {
      return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
    }
  };

  const isValid = () => {
    for (let key in correct) {
      console.log('key', key);
      if (!correct[key]) return false;
    }
    return true;
  };

  const fetchSignupPost = async () => {
    /*
      기존 회원가입은 단순히 텍스트를 객체로 모은 후 JSON으로 변환해서 요청 보내주면 끝.
      이제는 프로필 이미지가 추가됨. -> 파일 첨부 요청은 multipart/form-data로 전송해야 함.
      FormData 객체를 활용해서 Content-type을 multipart/form-data로 지정한 후 전송하려 함.
      그럼 JSON 데이터는? Content-type이 application/json이다. 
      Content-type이 서로 다른 데이터를 한번에 FormData에 감싸서 보내면 
      415(unsupported Media Type) 에러가 발생함.
      그렇다면 -> JSON을 Blob으로 바꿔서 함께 보내자. 
      Blob은 이미지, 사운드, 비디오 같은 멀티미디어 파일을 바이트 단위로 쪼개어 파일 손상을 방지하게 
      해 주는 타입. -> multipart/form-data에도 허용됨.
    */

    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: 'application/json',
    });

    // 이미지 파일과 회원정보 JSON을 하나로 묶어서 보낼 예정.
    // formData 객체를 활용해서.
    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    userFormData.append('profileImage', $fileTag.current.files[0]);

    try {
      const res = await axios.post(REQUEST_URI, userFormData);
      console.log(res.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  // 이미지를 추가하면 썸네일을 보여주는 핸들러
  const showThumbnailHandler = (e) => {
    // 첨부파일 정보
    const file = $fileTag.current.files[0];

    // 첨부한 파일 이름을 얻은 후 확장자만 추출. (소문자로 일괄 변경)
    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();

    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jepg' &&
      fileExt !== 'gif'
    ) {
      alert('(이미지 파일(jpg, png, jpeg, gif)만 등록이 가능합니다.');

      // 형식이 맞지 않는 파일을 첨부했다면, input의 상태도 원래대로 돌려놓아야 한다.
      // 그렇지 않으면 잘못된 파일을 input 태그가 여전히 기어하게 됨 -> 서버요청 시 에러 유발!
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
    <div className='signup-container'>
      <div className='signup-box'>
        <h1 className='signup-title'>회원가입</h1>
        <form className='signup-form'>
          <div className='input-group'>
            <label htmlFor='email' className='input-label'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              className='input-field'
              placeholder='이메일을 입력하세요'
              onChange={emailCheckHandler}
            />
            <span style={correct.email ? { color: 'green' } : { color: 'red' }}>
              {message.email}
            </span>
          </div>
          <div className='input-group'>
            <label htmlFor='userId' className='input-label'>
              닉네임
            </label>
            <input
              type='text'
              id='userId'
              className='input-field'
              placeholder='아이디를 입력하세요'
              onChange={idCheckHandler}
            />
            <span
              style={correct.userId ? { color: 'green' } : { color: 'red' }}
            >
              {message.userId}
            </span>
          </div>
          <div className='input-group'>
            <label htmlFor='password' className='input-label'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              className='input-field'
              placeholder='비밀번호를 입력하세요'
              onChange={passwordHandler}
            />
            <span
              style={correct.password ? { color: 'green' } : { color: 'red' }}
            >
              {message.password}
            </span>
          </div>
          <div className='input-group'>
            <label htmlFor='confirmPassword' className='input-label'>
              비밀번호 확인
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='input-field'
              placeholder='비밀번호를 다시 입력하세요'
              onChange={pwCheckHandler}
            />
            <span
              style={
                correct.passwordCheck ? { color: 'green' } : { color: 'red' }
              }
            >
              {message.passwordCheck}
            </span>
          </div>
          <div className='input-group'>
            <label htmlFor='name' className='input-label'>
              이름
            </label>
            <input
              type='text'
              id='name'
              className='input-field'
              placeholder='이름을 입력하세요'
              onChange={nameHandler}
            />
            <span
              style={correct.userName ? { color: 'green' } : { color: 'red' }}
            >
              {message.userName}
            </span>
          </div>

          <div className='input-group'>
            <label htmlFor='phone' className='input-label'>
              휴대폰 번호
            </label>
            <input
              type='tel'
              id='phone'
              className='input-field'
              placeholder='-을 제외한 숫자만 입력하세요'
              maxLength={13}
              onChange={phoneNumHandler}
            />
            <span
              style={
                correct.phoneNumber ? { color: 'green' } : { color: 'red' }
              }
            >
              {message.phoneNumber}
            </span>
          </div>
          <div className='input-group'>
            <div className='profile-container'>
              <div
                className='profile-preview'
                onClick={() => $fileTag.current.click()}
              >
                <img
                  src={imgFile || require('../assets/addboard1.png')}
                  alt='프로필 이미지'
                />
              </div>
              <label
                htmlFor='profileImage'
                className='input-label profile-label'
              >
                프로필 사진 추가
              </label>
              <div className='profile-upload'>
                <input
                  type='file'
                  id='profileImage'
                  className='input-file'
                  accept='image/*'
                  ref={$fileTag}
                  onChange={showThumbnailHandler}
                />
              </div>
            </div>
          </div>
          <button type='submit' className='signup-button'>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinTest;
