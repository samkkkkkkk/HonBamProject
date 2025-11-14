// src/Component/Feed/SnsProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostList from '@/Component/Feed/PostList';
import { postApi } from '@/api/post';
import styles from './FeedPage.module.css';
import { API_BASE_URL } from '@/config/host-config';

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
  const { authorId } = useParams(); // URL의 :authorId
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 상단 프로필 영역에 쓸 정보
  const nickname = posts[0]?.authorNickname;
  const profileUrl = posts[0]?.authorProfileUrl;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await postApi.getUserPosts(authorId, 0, 10);
      setPosts(res);
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
      <div className={styles.container}>
        <h2 className={styles.title}>프로필 로딩 중...</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 상단 프로필 영역 */}
      <div className={styles.profileHeader}>
        {profileUrl && (
          <img
            className={styles.profileAvatar}
            src={resolveProfileUrl(profileUrl)}
            alt={nickname}
          />
        )}
        <div>
          <h2 className={styles.title}>
            {nickname ? `@${nickname} 님의 게시물` : '사용자 게시물'}
          </h2>
          {/* 나중에 팔로워 수, 자기소개 등 추가 가능 */}
        </div>
      </div>

      {/* 게시글 리스트: 타인 프로필이라 삭제 버튼 숨김 */}
      <PostList posts={posts} setPosts={setPosts} showDelete={false} />
    </div>
  );
};

export default SnsProfilePage;
