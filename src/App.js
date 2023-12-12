import './App.css';
import Navbar from './Component/Navbar/Navbar';
import SearchPage from './Component/SearchPage/SearchPage';

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <SearchPage />
        </div>
      </div>
    </>
  );
}

export default App;
