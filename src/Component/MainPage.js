import React from 'react';
import './mainPage.css';

const MainPage = () => {
  return (
    <div className="box">
      <div className="main-contain">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="main-intro">
              <div className="main-explain">
                <p className="HONBAM">
                  <span className="text-wrapper">
                    HONBAM
                    <br />
                    <br />
                  </span>
                  <span className="span">
                    지금 어떤 안주를 먹고 있는지 어떤 술을 마시고 있는지,
                    <br />
                  </span>
                </p>
              </div>
            </div>
            <div className="side-bar">
              <div className="logo">
                <div className="div">HONBAM</div>
              </div>
              <div className="sidebar-content">
                <div className="div-wrapper">
                  <div className="text-wrapper-2">HOTPLACE</div>
                </div>
                <div className="overlap-group">
                  <div className="HOTPLACE">
                    <div className="text-wrapper-2">HOTPLACE</div>
                  </div>
                  <div className="CHAT">
                    <div className="text-wrapper-2">CHAT</div>
                  </div>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">RECIPE</div>
                  </div>
                </div>
                <div className="login">
                  <div className="text-wrapper-3">Login</div>
                </div>
                <div className="join">
                  <div className="text-wrapper-3">Join</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
