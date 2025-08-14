import { useContext, useEffect, useRef, useState } from 'react';
import { API_BASE_URL as BASE, USER } from '@/config/host-config';
import '@/Component/User/Join.css';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '@/util/AuthContext';
import beerImage from '@/assets/image-beer.png';

export const Join = () => {
  // useRef를 사용해서 태그 참조하기
  const $fileTag = useRef();

  // 리다이렉트 사용하기
  const redirection = useNavigate();

  const { isLoggedIn } = useContext(AuthContext);
  const [, setOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      // 스낵바 오픈
      setOpen(true);
      // 일정 시간 뒤 Todo 화면으로 redirect
      setTimeout(() => {
        redirection('/');
      }, 3000);
    }
  }, [isLoggedIn, redirection, setOpen]);

  const API_BASE_URL = BASE + USER;

  // 상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    userName: '',
    password: '',
    email: '',
  });

  // 검증 메세지에 대한 상태변수 관리
  const [message, setMessage] = useState({
    userName: '',
    password: '',
    passwordCheck: '',
    email: '',
  });

  // 검증 완료 체크에 대한 상태변수 관리
  const [correct, setCorrect] = useState({
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
  });

  // 검증된 데이터를 각각의 상태변수에 저장해 주는 함수.
  const saveInputState = ({ key, inputValue, flag, msg }) => {
    inputValue !== 'pass' &&
      setUserValue((oldVal) => {
        return { ...oldVal, [key]: inputValue };
      });

    setMessage((oldMsg) => {
      return { ...oldMsg, [key]: msg };
    });

    setCorrect((oldCorrect) => {
      return { ...oldCorrect, [key]: flag };
    });
  };

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = (e) => {
    const nameRegex = /^[가-힣]{2,5}$/;
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성하세요!';
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    saveInputState({
      key: 'userName',
      inputValue,
      msg,
      flag,
    });
  };

  // 주소 입력창 핸들러
  const addressHandler = (e) => {
    const nameRegex = /^[가-힣]{1,10}$/;
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '주소는 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '1~10글자 사이의 한글로 작성하세요!';
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    saveInputState({
      key: 'address',
      inputValue,
      msg,
      flag,
    });
  };

  // 핸드폰번호 입력창 핸들러
  const phoneNumberHandler = (e) => {
    const nameRegex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '번호는 필수입니다(01X-XXXX-XXXX 형식).';
    } else if (!nameRegex.test(inputValue)) {
      msg = '하이픈 필수 입력하셔야합니다';
    } else {
      msg = '사용 가능한 번호입니다.';
      flag = true;
    }

    saveInputState({
      key: 'phoneNumber',
      inputValue,
      msg,
      flag,
    });
  };

  // 이메일 중복 체크 서버 통신 함수
  const fetchDuplicateCheck = (email) => {
    let msg = '',
      flag = false;
    fetch(`${API_BASE_URL}/check?email=${email}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          msg = '이메일이 중복되었습니다.';
        } else {
          msg = '사용 가능한 이메일 입니다.';
          flag = true;
        }
        saveInputState({
          key: 'email',
          inputValue: email,
          msg,
          flag,
        });
      })
      .catch((_err) => {
        console.log('서버 통신이 원활하지 않습니다.');
      });
  };

  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;

    let msg;
    const flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      fetchDuplicateCheck(inputValue);
    }

    saveInputState({
      key: 'email',
      inputValue,
      msg,
      flag,
    });
  };

  // 패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = (e) => {
    document.getElementById('password-check').value = '';
    setMessage({ ...message, passwordCheck: '' });
    setCorrect({ ...correct, passwordCheck: false });

    const inputValue = e.target.value;
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg;
    let flag = false;
    if (!inputValue) {
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.';
    } else {
      msg = '사용 가능한 비밀번호 입니다.';
      flag = true;
    }

    saveInputState({
      key: 'password',
      inputValue,
      msg,
      flag,
    });
  };

  // 비밀번호 확인란 체인지 이벤트 핸들러
  const pwCheckHandler = (e) => {
    let msg;
    let flag = false;
    if (!e.target.value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== e.target.value) {
      msg = '패스워드가 일치하지 않습니다.';
    } else {
      msg = '패스워드가 일치합니다.';
      flag = true;
    }

    saveInputState({
      key: 'passwordCheck',
      inputValue: 'pass',
      msg,
      flag,
    });
  };

  const isValid = () => {
    for (const key in correct) {
      if (!correct[key]) {
        return false;
      }
    }
    return true;
  };

  // 회원 가입 처리 서버 요청
  const fetchSignUpPost = async () => {
    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: 'application/json',
    });

    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    userFormData.append('profileImage', $fileTag.current.files[0]);

    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      body: userFormData,
    });

    if (res.status === 200) {
      alert('회원가입에 성공했습니다!');
      redirection('/login');
    } else {
      alert('서버와의 통신이 원활하지 않습니다.');
    }
  };

  // 회원가입 버튼 클릭 이벤트 핸들러
  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      fetchSignUpPost();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  const [imgFile, setImgFile] = useState(null);

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
      alert('이미지 파일(jpg,png,jpeg,gif)만 등록이 가능합니다!');
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
    <div className="join-page">
      <div className="div">
        <div className="overlap-group">
          <div className="group">
            <div className="div-sign-container">
              <form>
                <div className="input">
                  <div className="text-wrapper">
                    <Link to="/login">
                      <button type="button" className="cancleButton">
                        CANCLE
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="div-wrapper">
                  <div className="text-wrapper-2">
                    <button
                      type="submit"
                      onClick={joinButtonClickHandler}
                      className="joinsubmit"
                    >
                      JOIN
                    </button>
                  </div>
                </div>

                <Grid item xs={12}>
                  <div
                    className="thumbnail-box"
                    onClick={() => $fileTag.current.click()}
                  >
                    <img
                      src={imgFile || beerImage}
                      alt="profile"
                      width={400}
                      height={190}
                    />
                    <label
                      className="signup-img-label"
                      htmlFor="profile-img"
                    ></label>
                  </div>

                  <input
                    id="profile-img"
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/*"
                    ref={$fileTag}
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
                      ></input>
                      <div className="addressCheckMessage">
                        <span
                          style={
                            correct.address
                              ? { color: 'green' }
                              : { color: 'red' }
                          }
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
                      ></input>
                      <div className="nameCheckMessage">
                        <span
                          style={
                            correct.userName
                              ? { color: 'green' }
                              : { color: 'red' }
                          }
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
                      ></input>
                      <div className="passwordMessage">
                        <span
                          style={
                            correct.password
                              ? { color: 'green' }
                              : { color: 'red' }
                          }
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
                        id="password-check"
                        onChange={pwCheckHandler}
                      ></input>
                      <div className="passwordCheckMessage">
                        <span
                          id="check-span"
                          style={
                            correct.passwordCheck
                              ? { color: 'green' }
                              : { color: 'red' }
                          }
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
                        placeholder="ENTER YOUR PHONE NUMBER"
                        onChange={phoneNumberHandler}
                      ></input>
                      <div className="phoneNumberMessage">
                        <span
                          style={
                            correct.phoneNumber
                              ? { color: 'green' }
                              : { color: 'red' }
                          }
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
                    ></input>
                    <div className="emailOverlap">
                      <span
                        style={
                          correct.email ? { color: 'green' } : { color: 'red' }
                        }
                      >
                        {message.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="join-header">JOIN</div>
                <div className="heading"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
