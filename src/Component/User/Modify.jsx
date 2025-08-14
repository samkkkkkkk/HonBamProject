import React, { useContext, useRef, useState } from 'react';
import { API_BASE_URL as BASE, USER } from '@/config/host-config';
import '@/Component/User/Modify.css';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '@/util/AuthContext';
import beerImage from '@/Component/assets/image-beer.png';

export const Modify = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { userName, address, phoneNumber, onLogout } = useContext(AuthContext);

  // ex) http://.../api/user
  const API_BASE_URL = `${BASE}${USER}`;

  // 폼 입력값
  const [userValue, setUserValue] = useState({
    userName: '',
    password: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  // 검증 메시지
  const [message, setMessage] = useState({
    userName: '',
    password: '',
    passwordCheck: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  // 검증 플래그
  const [correct, setCorrect] = useState({
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
    address: false,
    phoneNumber: false,
  });

  // 비밀번호 확인값(별도 상태)
  const [passwordCheck, setPasswordCheck] = useState('');

  // 썸네일 미리보기
  const [imgFile, setImgFile] = useState(null);

  const saveInputState = ({ key, inputValue, flag, msg }) => {
    if (inputValue !== 'pass') {
      setUserValue((old) => ({ ...old, [key]: inputValue }));
    }
    setMessage((old) => ({ ...old, [key]: msg }));
    setCorrect((old) => ({ ...old, [key]: flag }));
  };

  // 이름
  const nameHandler = (e) => {
    const inputValue = e.target.value.trim();
    const nameRegex = /^[가-힣]{2,5}$/;

    let msg = '';
    let flag = false;

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성하세요!';
    } else if (inputValue === userName) {
      msg = '원래 사용하던 이름입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    saveInputState({ key: 'userName', inputValue, msg, flag });
  };

  // 주소
  const addressHandler = (e) => {
    const inputValue = e.target.value.trim();
    const addrRegex = /^[가-힣]{1,10}$/;

    let msg = '';
    let flag = false;

    if (!inputValue) {
      msg = '주소는 필수입니다.';
    } else if (!addrRegex.test(inputValue)) {
      msg = '1~10글자 사이의 한글로 작성하세요!';
    } else if (inputValue === address) {
      msg = '원래 사용하던 주소입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 주소입니다.';
      flag = true;
    }

    saveInputState({ key: 'address', inputValue, msg, flag });
  };

  // 휴대폰(하이픈 **필수**)
  const phoneNumberHandler = (e) => {
    const inputValue = e.target.value.trim();
    const phoneRegex = /^01([016-9])-\d{3,4}-\d{4}$/;

    let msg = '';
    let flag = false;

    if (!inputValue) {
      msg = '번호는 필수입니다(01X-XXXX-XXXX 형식).';
    } else if (!phoneRegex.test(inputValue)) {
      msg = '하이픈 포함 01X-XXXX-XXXX 형식으로 입력하세요.';
    } else if (inputValue === phoneNumber) {
      msg = '원래 사용하던 번호입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 번호입니다.';
      flag = true;
    }

    saveInputState({ key: 'phoneNumber', inputValue, msg, flag });
  };

  // 이메일 중복 체크
  const fetchDuplicateCheck = async (email) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/check?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        throw new Error(`email check failed: ${res.status}`);
      }
      const json = await res.json();
      const msg = json
        ? '사용하시던 이메일입니다(재사용 가능).'
        : '사용 가능한 이메일 입니다.';
      const flag = true;

      saveInputState({ key: 'email', inputValue: email, msg, flag });
    } catch (e) {
      saveInputState({
        key: 'email',
        inputValue: email,
        msg: '서버 통신에 문제가 있습니다.',
        flag: false,
      });
      // 필요시 콘솔 로깅
      // console.error(e);
    }
  };

  // 이메일
  const emailHandler = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();
    // 다중 도메인/끝 앵커
    const emailRegex = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

    let msg = '';
    const flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      fetchDuplicateCheck(inputValue);
    }

    saveInputState({ key: 'email', inputValue, msg, flag });
  };

  // 비밀번호
  const passwordHandler = (e) => {
    const inputValue = e.target.value;

    // 확인값 리셋(상태 기반)
    setPasswordCheck('');
    setMessage((old) => ({ ...old, passwordCheck: '' }));
    setCorrect((old) => ({ ...old, passwordCheck: false }));

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg = '';
    let flag = false;

    if (!inputValue) {
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '8~20자, 영문/숫자/특수문자 포함.';
    } else {
      msg = '사용 가능한 비밀번호 입니다.';
      flag = true;
    }

    saveInputState({ key: 'password', inputValue, msg, flag });
  };

  // 비밀번호 확인
  const pwCheckHandler = (e) => {
    const value = e.target.value;
    setPasswordCheck(value);

    let msg = '';
    let flag = false;

    if (!value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== value) {
      msg = '패스워드가 일치하지 않습니다.';
    } else {
      msg = '패스워드가 일치합니다.';
      flag = true;
    }

    saveInputState({ key: 'passwordCheck', inputValue: 'pass', msg, flag });
  };

  // 전체 유효성
  const isValid = () => Object.values(correct).every(Boolean);

  // 프로필 이미지 썸네일
  const showThumbnailHandler = () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      return;
    }

    const ext = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
    const allowed = ['jpg', 'jpeg', 'png', 'gif'];
    if (!allowed.includes(ext)) {
      alert('이미지 파일(jpg, jpeg, png, gif)만 등록 가능합니다.');
      fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImgFile(reader.result);
  };

  // 수정 제출(멀티파트)
  const submitModify = async () => {
    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: 'application/json',
    });

    const formData = new FormData();
    formData.append('user', userJsonBlob);

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append('profileImage', file);
    }

    const res = await fetch(API_BASE_URL, {
      method: 'POST', // 서버 규약에 맞게 PUT/PATCH면 바꾸세요.
      body: formData,
    });

    if (res.ok) {
      alert('수정이 완료되었습니다.');
      navigate('/login'); // 요구사항에 맞게 이동 경로 조정
    } else {
      alert('서버 통신 실패. 잠시 후 다시 시도해 주세요.');
    }
  };

  // 로그아웃
  const logoutHandler = async () => {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });
    onLogout();
    navigate('/login');
  };

  // 제출 버튼
  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      submitModify();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  return (
    <div className="join-page">
      <div className="div">
        <div className="overlap-group">
          <div className="group">
            <div className="div-sign-container">
              <form onSubmit={onSubmit}>
                <div className="input">
                  <div className="text-wrapper">
                    <Link to="/login">
                      <button type="button" className="cancleButton">
                        CANCEL
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="div-wrapper">
                  <div className="text-wrapper-2">
                    <button type="submit" className="joinsubmit">
                      MODIFY
                    </button>
                  </div>
                </div>

                <Grid item xs={12}>
                  <div
                    className="thumbnail-box"
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' ? fileInputRef.current?.click() : null
                    }
                  >
                    <img
                      src={imgFile || beerImage}
                      alt="profile"
                      width={400}
                      height={190}
                    />
                  </div>
                  <input
                    id="profile-img"
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={showThumbnailHandler}
                  />
                </Grid>

                <div className="div-placeholder-wrapper">
                  <div className="div-placeholder">
                    <div className="text-wrapper-3">
                      <input
                        className="inputText"
                        type="text"
                        placeholder="ENTER YOUR ADDRESS"
                        onChange={addressHandler}
                      />
                      <div className="addressCheckMessage">
                        <span
                          style={{ color: correct.address ? 'green' : 'red' }}
                        >
                          {message.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-2">
                  <div className="div-placeholder">
                    <div className="text-wrapper-3">
                      <input
                        className="inputText"
                        type="text"
                        placeholder="ENTER YOUR NICKNAME"
                        onChange={nameHandler}
                      />
                      <div className="nameCheckMessage">
                        <span
                          style={{ color: correct.userName ? 'green' : 'red' }}
                        >
                          {message.userName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-4">
                  <div className="div-placeholder">
                    <div className="text-wrapper-4">
                      <input
                        className="inputText"
                        type="password"
                        placeholder="ENTER YOUR PASSWORD"
                        onChange={passwordHandler}
                      />
                      <div className="passwordMessage">
                        <span
                          style={{ color: correct.password ? 'green' : 'red' }}
                        >
                          {message.password}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-3">
                  <div className="div-placeholder">
                    <div className="text-wrapper-4">
                      <input
                        className="inputText"
                        type="password"
                        placeholder="ENTER YOUR PASSWORD(CHECK)"
                        value={passwordCheck}
                        onChange={pwCheckHandler}
                      />
                      <div className="passwordCheckMessage">
                        <span
                          style={{
                            color: correct.passwordCheck ? 'green' : 'red',
                          }}
                        >
                          {message.passwordCheck}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-5">
                  <div className="div-placeholder">
                    <div className="text-wrapper-4">
                      <input
                        className="inputText"
                        type="text"
                        placeholder="ENTER YOUR PHONE NUMBER (01X-XXXX-XXXX)"
                        onChange={phoneNumberHandler}
                      />
                      <div className="phoneNumberMessage">
                        <span
                          style={{
                            color: correct.phoneNumber ? 'green' : 'red',
                          }}
                        >
                          {message.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-7">
                  <div className="text-wrapper-6">
                    <input
                      className="inputTextEmail"
                      type="text"
                      placeholder="ENTER YOUR EMAIL"
                      onChange={emailHandler}
                    />
                    <div className="emailOverlap">
                      <span style={{ color: correct.email ? 'green' : 'red' }}>
                        {message.email}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="join-header">MODIFY</div>
                <div className="heading"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
