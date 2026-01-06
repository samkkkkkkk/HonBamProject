import React, { useEffect, useState } from 'react';
import PostList from '@/Component/Feed/PostList';
import { postApi } from '@/api/post';
import styles from './FeedPage.module.css';

const ExploreFeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('popular');

  const fetchPosts = async () => {
    try {
      const res = await postApi.getExplore(sort, 0, 10);
      setPosts(res);
    } catch (err) {
      console.error('탐색 피드 로드 실패:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [sort]);

  return (
    <div className={styles.container}>
      <div className={styles.exploreHeader}>
        <h2 className={styles.title}>탐색</h2>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="popular">인기순</option>
          <option value="latest">최신순</option>
        </select>
      </div>
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default ExploreFeedPage;
