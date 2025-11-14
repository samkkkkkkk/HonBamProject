// src/Component/mainpage/TodayShotModal.jsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import apiClient from '@/config/axiosConfig';
import { API_BASE_URL } from '@/config/host-config';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const resolveProfileUrl = (url) => {
  if (!url) {
    return null;
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const normalized = url.startsWith('/') ? url.slice(1) : url;
  return `${API_BASE_URL}/${normalized}`;
};

const TodayShotModal = ({ open, onClose, shot }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open || !shot) {
      setPost(null);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/api/sns/feed/${shot.postId}`);
        setPost(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [open, shot]);

  const goProfile = () => {
    if (!post?.authorId) {
      return;
    }
    onClose();
    navigate(`/sns/profile/${post.authorId}`);
  };

  const images = post?.imageUrls || [];
  const hasMultipleImages = images.length > 1;

  const rankLabel =
    shot?.rank != null ? `오늘의 인증샷 ${shot.rank}위` : '오늘의 인증샷';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {rankLabel} - @
        {post?.authorNickname ?? shot?.authorNickname ?? '알 수 없음'}{' '}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading || !post ? (
          <div
            style={{
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={32} />
          </div>
        ) : (
          <>
            {/* 이미지 슬라이드 */}
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation={hasMultipleImages}
              pagination={hasMultipleImages ? { clickable: true } : false}
            >
              {(post.imageUrls || []).map((url, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={url}
                    alt={post.content}
                    style={{
                      width: '100%',
                      maxHeight: 400,
                      objectFit: 'cover',
                      borderRadius: 12,
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* 작성자 정보 + 날짜 */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {post.authorProfileUrl && (
                <img
                  src={resolveProfileUrl(post.authorProfileUrl)}
                  alt={post.authorNickname}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              )}
              <div>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600 }}
                  onClick={goProfile}
                >
                  @{post.authorNickname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.createdAt &&
                    new Date(post.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                </Typography>
              </div>
            </div>

            {/* 내용 */}
            <Typography variant="body1" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
              {post.content}
            </Typography>

            {/* 통계 */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              ♥ {post.likeCount} · 댓글 {post.commentCount}
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        {/* 나중에 SNS 상세 페이지(/feed/:id)로 이동하는 버튼 추가해도 됨 */}
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};
export default TodayShotModal;
