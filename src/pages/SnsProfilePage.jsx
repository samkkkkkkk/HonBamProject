// src/Component/Feed/SnsProfilePage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '@/Component/Feed/PostList';
import { postApi } from '@/api/post';
import { API_BASE_URL } from '@/config/host-config';
import styles from './SnsProfilePage.module.css';
import { followApi } from '@/api/follow';
import UserContext from '@/util/UserContext';

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

const SnsProfilePage = () => {
  const { authorId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const { id: currentUserId } = useContext(UserContext);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const [profileRes, postRes] = await Promise.all([
        followApi.getFollowInfo(authorId),
        postApi.getUserPosts(authorId, 0, 10),
      ]);
      setProfile(profileRes);
      setPosts(postRes);
    } catch (err) {
      console.error('사용자 게시물 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authorId) {
      return;
    }
    fetchPosts();
  }, [authorId]);

  if (loading) {
    return (
      <div className={styles.profilePage}>
        <h2 className={styles.loadingText}>프로필 로딩 중...</h2>
      </div>
    );
  }

  const postCount = profile.postCount;
  const nickname = profile.nickname;
  const followerCount = profile.followerCount;
  const followingCount = profile.followingCount;
  const isFollowing = profile.following;
  const profileUrl = profile.profileImageUrl;

  const isOwner = currentUserId && currentUserId === profile.userId;

  const handleFollowToggle = async () => {
    if (!currentUserId) {
      return;
    }

    if (!profile) {
      return;
    }

    try {
      setFollowLoading(true);

      if (isFollowing) {
        const { following, followerCount } = await followApi.unfollow(authorId);
        setProfile((prev) => ({
          ...prev,
          following,
          followerCount,
        }));
      } else {
        const { following, followerCount } = await followApi.follow(authorId);
        setProfile((prev) => ({
          ...prev,
          following,
          followerCount,
        }));
      }
    } catch (error) {
      console.error('팔로우 토글 실패: ', error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarWrapper}>
          {profileUrl ? (
            <img
              className={styles.profileAvatar}
              src={resolveProfileUrl(profileUrl)}
              alt={nickname || '프로필 이미지'}
            />
          ) : (
            <div className={styles.profileAvatarPlaceholder}>
              <span className={styles.profileAvatarInitial}>
                {nickname ? nickname[0].toUpperCase() : '?'}
              </span>
            </div>
          )}
        </div>

        <div className={styles.profileMeta}>
          {/* 상단 닉네임 라인 */}
          <div className={styles.topRow}>
            <span className={styles.nickname}>
              {nickname || `user_${authorId}`}
            </span>
            {/* 필요하면 여기에 팔로우 버튼, 메시지 버튼 등 추가 가능 */}
            {!isOwner && (
              <button
                className={`${styles.followButton} ${
                  isFollowing ? styles.followButtonFollowing : ''
                }`}
                onClick={handleFollowToggle}
                disabled={followLoading}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </button>
            )}
          </div>

          <ul className={styles.stats}>
            <li className={styles.statItem}>
              <span className={styles.statNumber}>{postCount}</span>
              <span className={styles.statLabel}>게시물</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statNumber}>{followerCount}</span>
              <span className={styles.statLabel}>팔로워</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statNumber}>{followingCount}</span>
              <span className={styles.statLabel}>팔로잉</span>
            </li>
          </ul>

          {/* 자기소개 영역 (백엔드에서 bio 내려주면 연결, 지금은 기본 문구) */}
          <div className={styles.bio}>
            {nickname
              ? `${nickname} 님의 프로필입니다.`
              : '사용자 프로필 페이지입니다.'}
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <hr className={styles.divider} />

      {/* 게시글 리스트: 타인 프로필이라 삭제 버튼 숨김 */}
      <PostList posts={posts} setPosts={setPosts} showDelete={isOwner} />
    </div>
  );
};

export default SnsProfilePage;
