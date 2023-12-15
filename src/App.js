import './App.css';
import { Modify } from './Component/Modify';
import { Login } from './Component/Login';
import { MainPage } from './Component/MainPage';
import { MyPage } from './Component/MyPage';
import { Join } from './Component/Join';
import { Navbar } from './Component/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './util/AuthContext';

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
    </>
  );
}

export default App;
