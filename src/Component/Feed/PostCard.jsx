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
    postId,
    authorId,
    authorProfileUrl,
    authorNickname,
    content,
    medias = [],
    likeCount,
    commentCount,
    liked,
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
            <img
              src={authorProfileUrl || '/assets/default_profile.png'}
              alt="profile"
            />
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
          <button className={styles.delete} onClick={() => onDelete(postId)}>
            삭제
          </button>
        )}
      </div>

      <p className={styles.content}>{content}</p>

      {medias.length > 0 && (
        <div className={styles.images}>
          {medias.map((media, i) => (
            <img key={media.mediaId} src={media.url} alt={`img-${i}`} />
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
          onClick={() => onLike(postId)}
        >
          {liked ? <FaHeart /> : <FaRegHeart />} <span>{likeCount}</span>
        </button>

        <div className={styles.comment}>
          <FaCommentDots /> <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
