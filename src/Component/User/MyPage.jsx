import '@/Component/User/MyPage.css';
import { Link } from 'react-router-dom';

export const MyPage = () => {
  return (
    <div className="box12">
      <div className="group">
        <div className="LOGIN">
          <div className="overlap-group">
            <div className="input-wrapper">
              <div className="input">
                <div className="text-wrapper">
                  <Link to="/Modify">USER MODIFY</Link>
                </div>
              </div>
            </div>
            <div className="div-wrapper">
              <div className="input2">
                <div className="text-wrapper">LIKE LIST</div>
              </div>
            </div>
            <div className="div">
              <div className="input3">
                <div className="text-wrapper">WRITE PAGE</div>
              </div>
            </div>
          </div>
          <div className="side-bar">
            <div className="sidebar-content">
              <div className="join">
                <div className="text-wrapper-2">Join</div>
              </div>
              <div className="login">
                <div className="text-wrapper-3">Login</div>
              </div>
              <div className="BOARD">
                <div className="text-wrapper-4">BOARD</div>
              </div>
              <div className="CHAT">
                <div className="text-wrapper-5">CHAT</div>
              </div>
              <div className="RECIPE">
                <div className="text-wrapper-6">RECIPE</div>
              </div>
              <div className="HOTPLACE">
                <div className="text-wrapper-7">HOTPLACE</div>
              </div>
            </div>
            <div className="logo">
              <div className="text-wrapper-8">HONBAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
