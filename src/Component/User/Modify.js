import React, { useContext, useEffect, useRef, useState } from 'react';
import { API_BASE_URL as BASE, USER } from '../../util/host-config';
import './Modify.css';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../util/AuthContext';

export const Modify = () => {
  // useRef를 사용해서 태그 참조하기
  const $fileTag = useRef();

  // 리다이렉트 사용하기
  const redirection = useNavigate();

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     // 스낵바 오픈
  //     setOpen(true);
  //     // 일정 시간 뒤 Todo 화면으로 redirect
  //     setTimeout(() => {
  //       redirection('/');
  //     }, 3000);
  //   }
  // }, [isLoggedIn, redirection]);

  // AuthContext에서 로그인 상태를 가져옵니다.
  //const { isLoggedIn, onLogout } = useContext(AuthContext);
  const { isLoggedIn, userName, address, phoneNumber, password, onLogout } =
    useContext(AuthContext);

  const API_BASE_URL = BASE + USER;

  // 상태변수로 회원가입 입력값 관리
  const [userValue, setUserValue] = useState({
    userName: '',
    password: '',
    email: '',
  });

  // 검증 메세지에 대한 상태변수 관리
  // 입력값과 메세지는 따로 상태 관리(메세지는 백엔드로 보내줄 필요 없음.)
  // 메세지 영역이 각 입력창마다 있기 때문에 객체를 활용해서 한 번에 관리.
  const [message, setMessage] = useState({
    userName: '',
    password: '',
    passwordCheck: '',
    email: '',
  });

  // 검증 완료 체크에 대한 상태변수 관리
  // 각각의 입력창마다 검증 상태를 관리해야 하기 때문에 객체로 선언.
  // 상태를 유지하려는 이유 -> 마지막에 회원 가입 버튼을 누를 때 까지 검증 상태를 유지해야 하기 때문.
  const [correct, setCorrect] = useState({
    userName: false,
    password: false,
    passwordCheck: false,
    email: false,
  });

  // 검증된 데이터를 각각의 상태변수에 저장해 주는 함수.
  const saveInputState = ({ key, inputValue, flag, msg }) => {
    // 입력값 세팅
    // 패스워드 확인 입력값은 굳이 userValue 상태로 유지할 필요가 없기 때문에
    // 임의의 문자열 'pass'를 넘기고 있습니다. -> pass가 넘어온다면 setUserValue()를 실행하지 않겠다.
    inputValue !== 'pass' &&
      setUserValue((oldVal) => {
        return { ...oldVal, [key]: inputValue };
      });

    // 메세지 세팅
    setMessage((oldMsg) => {
      return { ...oldMsg, [key]: msg }; // key 변수의 값을 프로퍼티 이름으로 활용.
    });

    // 입력값 검증 상태 세팅
    setCorrect((oldCorrect) => {
      return { ...oldCorrect, [key]: flag };
    });
  };

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = (e) => {
    const nameRegex = /^[가-힣]{2,5}$/;
    const inputValue = e.target.value;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성하세요!';
    } else if (inputValue == userName) {
      msg = '원래 사용하던 이름입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    // 객체 프로퍼티에서 세팅하는 변수의 이름과 키값이 동일한 경우에는
    // 콜론 생략이 가능.
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

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '주소는 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '1~10글자 사이의 한글로 작성하세요!';
    } else if (inputValue == address) {
      msg = '원래 사용하던 주소입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 주소입니다.';
      flag = true;
    }

    // 객체 프로퍼티에서 세팅하는 변수의 이름과 키값이 동일한 경우에는
    // 콜론 생략이 가능.
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

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '번호는 필수입니다(01X-XXXX-XXXX 형식).';
    } else if (!nameRegex.test(inputValue)) {
      msg = '하이픈 필수 입력하셔야합니다';
    } else if (inputValue == phoneNumber) {
      msg = '원래 사용하던 번호입니다!(재사용 가능)';
      flag = true;
    } else {
      msg = '사용 가능한 번호입니다.';
      flag = true;
    }

    // 객체 프로퍼티에서 세팅하는 변수의 이름과 키값이 동일한 경우에는
    // 콜론 생략이 가능.
    saveInputState({
      key: 'phoneNumber',
      inputValue,
      msg,
      flag,
    });
  };

  // 주소 입력창 핸들러

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
        // console.log(json);
        if (json) {
          msg = '사용하시던 이메일입니다(재사용 가능).';
          flag = true;
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
      .catch((err) => {
        console.log('서버 통신이 원활하지 않습니다.');
      });
  };

  // 이메일 입력창 체인지 이벤트 핸들러
  const emailHandler = (e) => {
    const inputValue = e.target.value;
    const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '이메일은 필수값 입니다!';
    } else if (!emailRegex.test(inputValue)) {
      msg = '이메일 형식이 올바르지 않습니다.';
    } else {
      // 이메일 중복 체크
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
    // 패스워드가 변경됐다? -> 패스워드 확인란을 비우고 시작하자.
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
    } else if (inputValue == 'aaaa1111!') {
      msg = '원래 사용하던 번호입니다!(재사용 가능)';
      flag = true;
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

  // 4개의 입력칸이 모두 검증에 통과했는지 여부를 검사
  const isValid = () => {
    for (const key in correct) {
      const flag = correct[key];
      if (!flag) return false;
    }
    return true;
  };

  // 회원 가입 처리 서버 요청
  const fetchSignUpPost = async () => {
    /*
       기존 회원가입은 단순히 텍스트를 객체로 모은 후 JSON으로 변환해서 요청 보내주면 끝.
       그런데 이제는 프로필 이미지가 추가됨. -> 이미지파일 첨부는 json이 아닌 multipart/form-data로 전송해야함.
       FormData 객체를 활용해서 Content-type을 multipart/form-data로 지정한 후 전송하려함
       그럼 원래 JSON 데이터는 ? Content-type이 application/json이다.
       (즉 텍스트는 application/json이고 이미지는 multipart/form-data라 혼합이 안됨)
       Content-type이 서로 다른 데이터를 한번에 formData에 감싸서 보내면 415 에러가 발생함
       그렇다면 -> JSON을 Blob으로 바꿔서 함께 보내자. 
       Blob은 이미지,사운드,비디오 같은 멀티미디어 파일을 바이트 단위로 쪼깨어 파일의 손상을 방지해주는 타입임.
       -> Blob는 Multipart/form-data도 허용이 됨.
     */

    // JSON을 Blob타입으로 변경 후 FormData에 넣기
    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: 'application/json',
    });

    // 이미지 파일과 회원정보 JSON을 하나로 묶어서 보낼 예정.
    // FormData 객체를 활용해서.
    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);
    userFormData.append('profileImage', $fileTag.current.files[0]);

    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      body: userFormData,
    });

    if (res.status === 200) {
      alert('회원가입에 성공했습니다!');
      logoutHandler();
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

  const logoutHandler = async () => {
    const res = await fetch(`${API_BASE_URL}${USER}/logout`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      },
    });

    // AuthContext의 onLogout 함수를 호출하여 로그인 상태를 업데이트 합니다.
    onLogout();
    redirection('/login');
  };

  return (
    <div className='join-page'>
      <div className='div'>
        <div className='overlap-group'>
          <div className='group'>
            <div className='div-sign-container'>
              <form>
                <div className='input'>
                  <div className='text-wrapper'>
                    <Link to='/Login'>
                      <button
                        type='button'
                        className='cancleButton'
                      >
                        CANCLE
                      </button>
                    </Link>
                  </div>
                </div>
                <div className='div-wrapper'>
                  <div className='text-wrapper-2'>
                    <button
                      type='submit'
                      onClick={joinButtonClickHandler}
                      className='joinsubmit'
                    >
                      MODIFY
                    </button>
                  </div>
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
                      src={imgFile || require('../../assets/image-beer.png')}
                      alt='profile'
                      width={400}
                      height={190}
                    />
                  </div>
                  <label
                    className='signup-img-label'
                    htmlFor='profile-img'
                  >
                    THUMBNAIL IMAGE (CLICK)
                  </label>
                  <input
                    id='profile-img'
                    type='file'
                    style={{ display: 'none' }}
                    accept='image/*'
                    ref={$fileTag}
                    onChange={showThumbnailHandler}
                  />
                </Grid>

                <div className='div-placeholder-wrapper'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-3'>
                      <input
                        className='inputText'
                        type='text'
                        placeholder='ENTER YOUR ADDRESS'
                        onChange={addressHandler}
                      ></input>
                      <div className='addressCheckMessage'>
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
                <div className='input-2'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-3'>
                      <input
                        className='inputText'
                        type='text'
                        placeholder='ENTER YOUR NICKNAME'
                        onChange={nameHandler}
                      ></input>
                      <div className='nameCheckMessage'>
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
                <div className='input-4'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-4'>
                      <input
                        className='inputText'
                        type='password'
                        placeholder='ENTER YOUR PASSWORD'
                        onChange={passwordHandler}
                      ></input>
                      <div className='passwordMessage'>
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
                <div className='input-3'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-4'>
                      <input
                        className='inputText'
                        type='password'
                        placeholder='ENTER YOUR PASSWORD(CHECK)'
                        id='password-check'
                        onChange={pwCheckHandler}
                      ></input>
                      <div className='passwordCheckMessage'>
                        <span
                          id='check-span'
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

                <div className='input-5'>
                  <div className='div-placeholder'>
                    <div className='text-wrapper-4'>
                      <input
                        className='inputText'
                        type='text'
                        placeholder='ENTER YOUR PHONE NUMBER'
                        onChange={phoneNumberHandler}
                      ></input>
                      <div className='phoneNumberMessage'>
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

                <div className='input-7'>
                  <div className='text-wrapper-6'>
                    <input
                      className='inputText'
                      type='text'
                      placeholder='ENTER YOUR EMAIL'
                      onChange={emailHandler}
                    ></input>
                    <div className='emailOverlap'>
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
                <div className='join-header'>MODIFY</div>
                <div className='heading'></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
