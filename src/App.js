import './App.css';


import { Modify } from './Component/Modify';
import { Login } from './Component/Login';
import { MyPage } from './Component/MyPage';
import { Join } from './Component/Join';
import { AuthContextProvider } from './util/AuthContext';
// import SnsBoard from './Component/SnsBoard';
// import MyDetail from './Component/MyDetail';
// import UserDetail from './Component/UserDetail';
// import UserDetail2 from './Component/UserDetail2';
// import UserDetail3 from './Component/UserDetail3';
// import UserDetail4 from './Component/UserDetail4';
// import Setting from './Component/Setting';
import SearchPage from './Component/SearchPage/SearchPage';
import Main from './Component/mainpage/Main';
import Navbar from './Component/Navbar/Navbar';
// import Main2 from './Component/mainpage/Main';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import ProfileEdit from './Component/ProfileEdit';
// import Comment from './Component/Comment';


function App() {
  return (
    <>
      <div>



function App() {
  return (
    <>
      <AuthContextProvider>
        <div>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/Modify' element={<Modify />} />
              <Route path='/MyPage' element={<MyPage />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/Join' element={<Join />} />
            </Routes>
          </Router>
        </div>
      </AuthContextProvider>
              <Router>
          <Routes>
            <Route
              path='/'
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
          </Routes>
        </Router>

      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
