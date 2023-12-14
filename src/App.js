import './App.css';
import SearchPage from './Component/SearchPage/SearchPage';
import Main from './Component/mainpage/Main';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Main />}
          ></Route>
          <Route
            path='/search'
            element={<SearchPage />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
