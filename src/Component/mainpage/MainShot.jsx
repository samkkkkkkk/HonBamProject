import ImageGallery from '@/Component/mainpage/swiper';
import slides from '@/mock.json';

const MainShot = () => {
  return (
    <>
      {/* 인증샷 페이지 시작 */}
      <div className="main-shot">
        <div className="main3-title">
          <p className="main-title-intro">오늘의 인증샷</p>
        </div>
        <div className="main-shot-swip">
          <ImageGallery slides={slides} />
        </div>
      </div>
      {/* 인증샷 페이지 끝*/}
    </>
  );
};

export default MainShot;
