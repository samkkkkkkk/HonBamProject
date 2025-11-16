// src/components/Feed/PostList.jsx
import React from 'react';
import styles from './PostList.module.css';
import PostCard from './PostCard';
import { likeApi } from '@/api/like';
import { postApi } from '@/api/post';

const PostList = ({ posts = [], setPosts, showDelete = true }) => {
  if (!posts || posts.length === 0) {
    return <p className={styles.empty}>게시물이 없습니다.</p>;
  }

  const handleLike = async (postId) => {
    const post = posts.find((p) => p.id === postId);
    const res = await likeApi.toggle({
      postId,
      liked: post.likeByMe,
    });

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likeByMe: res.liked, likeCount: res.likeCount }
          : p
      )
    );
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }
    await postApi.deletePost(postId);
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onDelete={handleDelete}
          showDelete={showDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
