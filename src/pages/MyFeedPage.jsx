import React, { useEffect, useState } from 'react';
import PostList from '@/Component/Feed/PostList';
import { postApi } from '@/api/post';
import styles from './FeedPage.module.css';

const MyFeedPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await postApi.getMyFeed(0, 10);
      setPosts(res);
    } catch (err) {
      console.error('내 게시물 로드 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 게시물</h2>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default MyFeedPage;
