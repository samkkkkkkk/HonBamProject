import React from 'react';
import './mainPage2.css';

const MainPage2 = () => {
  return (
    <div className="box">
      <div className="main-contian-box">
        <div className="main-contain">
          <div className="main-contain-image">
            <div className="hot-place-img" />
            <div className="div" />
            <div className="hot-place-img-2" />
            <div className="hot-place-img-3" />
            <div className="hot-place-img-4" />
            <div className="hot-place-img-5" />
            <div className="hot-place-img-6" />
            <div className="hot-place-img-7" />
          </div>
          <div className="main-hot-title">
            <div className="text-wrapper">나에게 맞는 맛집 찾기</div>
          </div>
          <div className="main-hot-intro">
            <p className="p">
              혼밤에서 찾아주는 혼술 맛집을 이용하고 공유해 보세요.
            </p>
          </div>
          <div className="main-place">
            <p className="text-wrapper-2">
              혼자서도 즐길 수 있는 <br />
              맛집 보러가기
            </p>
          </div>
          <div className="main-detail">
            <div className="overlap-group">
              <div className="main-detail-btn">
                <img
                  className="vector"
                  alt="Vector"
                  src="vector.svg"
                />
              </div>
              <div className="text-wrapper-3">자세히보기기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
