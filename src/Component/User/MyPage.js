import React, { useContext, useEffect, useState } from 'react';

import { Spinner } from 'reactstrap';
import './MyPage.css';
import { API_BASE_URL as BASE, TODO, USER } from '../../util/host-config';
import { Link, useNavigate } from 'react-router-dom';
import { getLoginUserInfo } from '../../util/login-util';
import AuthContext from '../../util/AuthContext';
import HttpService from '../../util/HttpService';

export const MyPage = () => {
  const redirection = useNavigate();
  const { onLogout } = useContext(AuthContext);

  // 로그인 인증 토큰 얻어오기
  const [token, setToken] = useState(getLoginUserInfo().token);

  // fetch 요청 보낼 때 사용할 요청 헤더 설정
  const requestHeader = {
    'content-type': 'application/json',
    // JWT에 대한 인증 토큰이라는 타입을 선언
    Authorization: 'Bearer ' + token,
  };

  // 서버에 할 일 목록(json)을 요청(fetch)해서 받아와야 함.
  const API_BASE_URL = BASE + TODO;
  const API_USER_URL = BASE + USER;

  // todos 배열을 상태 관리
  const [todos, setTodos] = useState([]);

  // 로딩 상태값 관리(처음에는 무조건 로딩이 필요하기 때문에 true -> 로딩 끝나면 false로 전환)
  const [loading, setLoading] = useState(true);

  // id값 시퀀스 함수 (DB 연동시키면 필요없게 됨.)
  const makeNewId = () => {
    if (todos.length === 0) return 1;
    return todos[todos.length - 1].id + 1; // 맨 마지막 할일 객체의 id보다 하나 크게
  };

  /*
    todoInput에게 todoText를 받아오는 함수
    자식 컴포넌트가 부모컴포넌트에게 데이터를 전달할 때는 
    일반적인 props 사용이 불가능.
    부모 컴포넌트에서 함수를 선언(매개변수 꼭 선언) -> props로 함수를 전달
    자식 컴포넌트에서 전달받은 함수를 호출하면서 매개값으로 데이터를 전달.
  */
  const addTodo = async (todoText) => {
    const newTodo = {
      title: todoText,
    }; // 나중에 fetch를 이용해서 백엔드에 insert 요청 보내야됨.

    // todos.push(newTodo); (x) -> useState 변수는 setter로 변경
    // setTodos(todos.push(newTodo)); (x)
    // react의 상태변수는 불변성(immutable)을 가지기 때문에
    // 기존 상태에서 변경은 불가능 -> 새로운 상태로 만들어서 변경해야 한다.
    // setTodos((oldTodos) => {
    //   return [...oldTodos, newTodo];
    // });

    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify(newTodo),
    });

    if (res.status === 200) {
      const json = await res.json();
      setTodos(json.todos);
    } else if (res.status === 401) {
      alert('일반 회원은 일정 등록이 5개로 제한됩니다 ㅠㅠ');
    } else if (res.status === 400) {
      alert('올바르지 않은 입력값 입니다.');
    }

    // fetch(API_BASE_URL, {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/json' },
    //   body: JSON.stringify(newTodo),
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setTodos(json.todos);
    //   });
  };

  return (
    <div className='box12'>
      <div className='group'>
        <div className='LOGIN'>
          <div className='overlap-group'>
            <div className='input-wrapper'>
              <div className='input'>
                <div className='text-wrapper'>
                  <Link to='/Modify'>USER MODIFY</Link>
                </div>
              </div>
            </div>
            <div className='div-wrapper'>
              <div className='input2'>
                <div className='text-wrapper'>LIKE LIST</div>
              </div>
            </div>
            <div className='div'>
              <div className='input3'>
                <div className='text-wrapper'>WRITE PAGE</div>
              </div>
            </div>
          </div>
          <div className='side-bar'>
            <div className='sidebar-content'>
              <div className='join'>
                <div className='text-wrapper-2'>Join</div>
              </div>
              <div className='login'>
                <div className='text-wrapper-3'>Login</div>
              </div>
              <div className='BOARD'>
                <div className='text-wrapper-4'>BOARD</div>
              </div>
              <div className='CHAT'>
                <div className='text-wrapper-5'>CHAT</div>
              </div>
              <div className='RECIPE'>
                <div className='text-wrapper-6'>RECIPE</div>
              </div>
              <div className='HOTPLACE'>
                <div className='text-wrapper-7'>HOTPLACE</div>
              </div>
            </div>
            <div className='logo'>
              <div className='text-wrapper-8'>HONBAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
