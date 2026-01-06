import React, { useEffect, useState } from 'react';
import PostCreate from '@/Component/Feed/PostCreate';
import PostList from '@/Component/Feed/PostList';
import { postApi } from '@/api/post';
import styles from './FeedPage.module.css';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await postApi.getFeed(0, 10);
      setPosts(res);
    } catch (err) {
      console.error('피드 로드 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>피드</h2>
      <PostCreate onCreated={fetchPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default FeedPage;
