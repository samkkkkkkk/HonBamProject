import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from 'swiper/modules';
// import 'swiper/swiper-bundle.css';
import 'swiper/css';

const ImageGallery = ({ slides, onSlideClick }) => {
  return (
    <Swiper
      modules={[
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        EffectCoverflow,
        Autoplay,
      ]}
      spaceBetween={30}
      slidesPerView={2}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      effect="coverflow"
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 150,
        modifier: 2,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      centeredSlides={true}
      style={{ width: '70%', padding: '40px 0' }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id ?? `${slide.image}-${index}`}>
          <div
            className="shot-slide"
            onClick={() => onSlideClick && onSlideClick(slide)}
          >
            <img src={slide.image} alt={slide.title} className="shot-image" />
            <div className="shot-meta">
              <span className="shot-nickname">@{slide.nickname}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageGallery;
