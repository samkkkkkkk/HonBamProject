import ImageGallery from '@/Component/mainpage/swiper';
import apiClient from '@/config/axiosConfig';
import { useEffect, useState } from 'react';
import TodayShotModal from './TodayShotModal';

const MainShot = () => {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedShot, setSelectedShot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTodayShots = async () => {
      try {
        const res = await apiClient.get('/api/sns/feed/today-shots', {
          params: { limit: 10 },
        });
        setShots(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayShots();
  }, []);

  const slides = shots.map((shot, index) => ({
    id: shot.postId,
    image: shot.firstImageUrl,
    title: `♥ ${shot.likeCount}  ${shot.content?.slice(0, 20) ?? ''}`,
    nickname: shot.authorNickname,
    rank: index + 1,
  }));

  const handleSlideClick = (slide) => {
    const shot = shots.find((s) => s.postId === slide.id);
    if (!shot) {
      return;
    }
    setSelectedShot({ ...shot, rank: slide.rank });
    setModalOpen(true);
  };

  return (
    <div className="main-shot">
      <div className="main3-title">
        <p className="main-title-intro">오늘의 인증샷</p>
      </div>
      <div className="main-shot-swip">
        {loading && <div>오늘의 인증샷을 불러오는 중입니다...</div>}
        {!loading && slides.length === 0 && (
          <div>
            오늘 올라온 인증샷이 없습니다. 첫 번째 인증샷의 주인이 되어보세요.
          </div>
        )}
        {!loading && slides.length > 0 && (
          <ImageGallery slides={slides} onSlideClick={handleSlideClick} />
        )}
      </div>

      <TodayShotModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        shot={selectedShot}
      />
    </div>
  );
};

export default MainShot;
