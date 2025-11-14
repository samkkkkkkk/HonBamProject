import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postApi } from '@/api/post';

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      // 단일 조회 API가 없다면 feed 리스트에서 임시로 찾기
      const feed = await postApi.getFeed();
      const found = feed.find((p) => p.id === Number(postId));
      setPost(found || null);
    })();
  }, [postId]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{post.content}</h2>
      <p>작성자: {post.authorId}</p>
      <p>
        {post.likeCount} 좋아요 / {post.commentCount} 댓글
      </p>
      {post.imageUrls?.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`img-${i}`}
          style={{ width: '300px', marginTop: '10px' }}
        />
      ))}
    </div>
  );
};

export default PostDetailPage;
