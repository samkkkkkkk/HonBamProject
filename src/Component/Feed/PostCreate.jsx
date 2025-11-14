// src/components/Feed/PostCreate.jsx
import React, { useState } from 'react';
import { postApi } from '@/api/post';
import apiClient from '@/config/axiosConfig';
import styles from './PostCreate.module.css';
import { useNavigate } from 'react-router-dom';

const PostCreate = ({ onCreated }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const res = await apiClient.post('/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadedUrls.push(res.data.url);
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드 실패');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return alert('내용을 입력해주세요.');
    }

    try {
      const res = await postApi.createPost({
        content,
        imageUrls: images,
      });

      const createdPost = res;
      setContent('');
      setImages([]);

      // 피드 갱신
      onCreated?.();
    } catch (err) {
      console.error('게시글 등록 실패:', err);
      alert('게시글 등록 실패');
    }
  };

  return (
    <form className={styles.create} onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="무슨 생각을 하고 있나요?"
        rows="3"
        className={styles.textarea}
      />

      {images.length > 0 && (
        <div className={styles.preview}>
          {images.map((url, idx) => (
            <img key={idx} src={url} alt={`img-${idx}`} />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <label className={styles.uploadBtn}>
          이미지 선택
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
        <button type="submit" disabled={uploading} className={styles.submitBtn}>
          {uploading ? '업로드 중...' : '게시'}
        </button>
      </div>
    </form>
  );
};

export default PostCreate;
