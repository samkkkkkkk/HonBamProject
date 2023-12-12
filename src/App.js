import './App.css';
import SearchPage from './Component/SearchPage/SearchPage';
// import Main from './Component/Main';
import Main2 from './Component/Main2';
import Navbar from './Component/Navbar/Navbar';

function App() {
  return (
    <>
      <div>{/* <Main /> */}</div>
      <div>
        <Navbar />
      </div>
      <div>{/* <SearchPage /> */}</div>
      <div>
        <Main2 />
      </div>
    </>
  );
}

export default App;
