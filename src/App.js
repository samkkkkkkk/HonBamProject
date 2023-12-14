import './App.css';

import SnsBoard from './Component/SnsBoard';
import MyDetail from './Component/MyDetail';
import UserDetail from './Component/UserDetail';
import UserDetail2 from './Component/UserDetail2';
import UserDetail3 from './Component/UserDetail3';
import UserDetail4 from './Component/UserDetail4';
import Setting from './Component/Setting';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileEdit from './Component/ProfileEdit';
import Comment from './Component/Comment';

import SearchPage from './Component/SearchPage/SearchPage';
import Main from './Component/Main';
import Main2 from './Component/Main2';
import Navbar from './Component/Navbar/Navbar';


function App() {
  return (
    <>
      <div>{/* <Main /> */}</div>
      <div>

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

        <Navbar />
        <div>
    <div>
          <SearchPage />
        </div>
    <div>
        <Main2 />

      </div>
    </>
  );
}

export default App;
