// src/components/Feed/PostCard.jsx
import React from 'react';
import styles from './PostCard.module.css';
import { FaHeart, FaRegHeart, FaCommentDots } from 'react-icons/fa';
import defaltImage from '@/assets/2-1.png';
import { API_BASE_URL } from '@/config/host-config';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onLike, onDelete, showDelete }) => {
  const navigate = useNavigate();
  const {
    id,
    authorId,
    authorProfileUrl,
    authorNickname,
    content,
    imageUrls = [],
    likeCount,
    commentCount,
    likeByMe,
    createdAt,
  } = post;

  const goProfile = () => {
    if (!authorId) {
      return;
    }
    navigate(`/sns/profile/${authorId}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            <img src={`${API_BASE_URL}/${authorProfileUrl}`} />
          </div>
          <div>
            <p
              className={styles.author}
              onClick={goProfile}
              style={{ cursor: 'pointer' }}
            >
              @{authorNickname}
            </p>
            <p className={styles.date}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        {showDelete && (
          <button className={styles.delete} onClick={() => onDelete(id)}>
            삭제
          </button>
        )}
      </div>

      <p className={styles.content}>{content}</p>

      {imageUrls.length > 0 && (
        <div className={styles.images}>
          {imageUrls.map((url, i) => (
            <img key={i} src={url} alt={`img-${i}`} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button
          className={`${styles.likeBtn} ${likeByMe ? styles.liked : ''}`}
          onClick={() => onLike(id)}
        >
          {likeByMe ? <FaHeart /> : <FaRegHeart />} <span>{likeCount}</span>
        </button>

        <div className={styles.comment}>
          <FaCommentDots /> <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
