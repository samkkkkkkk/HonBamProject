import React from 'react';
import './App.css';
import { Modify } from './Component/User/Modify';
import { AuthContextProvider } from './util/AuthContext';
import { MyPage } from './Component/User/MyPage';
import { Login } from './Component/User/Login';
import { Join } from './Component/User/Join';
import SnsBoard from './Component/Board/SnsBoard';
import MyDetail from './Component/Board/MyDetail';
import UserDetail from './Component/Board/UserDetail';
import UserDetail2 from './Component/Board/UserDetail2';
import UserDetail3 from './Component/Board/UserDetail3';
import UserDetail4 from './Component/Board/UserDetail4';
import Setting from './Component/Board/Setting';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileEdit from './Component/Board/ProfileEdit';
import Comment from './Component/Board/Comment';
import KakaoLoginHandler from './Component/User/KakaoLoginHandler';
import NaverLoginHandler from './Component/User/NaverLoginHandler';
// import SnsBoard from './Component/SnsBoard';
// import MyDetail from './Component/MyDetail';
// import UserDetail from './Component/UserDetail';
// import UserDetail2 from './Component/UserDetail2';
// import UserDetail3 from './Component/UserDetail3';
// import UserDetail4 from './Component/UserDetail4';
// import Setting from './Component/Setting';
import SearchPage from './Component/SearchPage/SearchPage';
import Main from './Component/mainpage/Main';
import { Navbar } from './Component/Navbar/Navbar';
import Recipe from './Component/Recipe/Recipe';

// import ProfileEdit from './Component/ProfileEdit';
// import Comment from './Component/Comment';

function App() {
  return (
    <>
      <AuthContextProvider>
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route
              path='/Modify'
              element={<Modify />}
            />
            <Route
              path='/MyPage'
              element={<MyPage />}
            />
            <Route
              path='/Login'
              element={<Login />}
            />
            <Route
              path='/Join'
              element={<Join />}
            />
          </Routes>
        </div>

        <Routes>
          <Route
            path='/board'
            element={<SnsBoard />}
          />
          <Route
            path='/UserDetail'
            element={<UserDetail />}
          />
          <Route
            path='/Setting'
            element={<Setting />}
          />
          <Route
            path='/Comment'
            element={<Comment />}
          />
          <Route
            path='/ProfileEdit'
            element={<ProfileEdit />}
          />
          <Route
            path='/MyDetail'
            element={<MyDetail />}
          />
          <Route
            path='/oauth/redirected/HonBam'
            element={<KakaoLoginHandler />}
          />
          <Route
            path='/oauth/redirected/Naver'
            element={<NaverLoginHandler />}
          />
        </Routes>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          ></Route>
          <Route
            path='/search'
            element={<SearchPage />}
          ></Route>
          <Route
            path='/recipe'
            element={<Recipe />}
          ></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
