// src/components/Feed/PostCreate.jsx
import React, { useEffect, useState } from 'react';
import { postApi } from '@/api/post';
import apiClient from '@/config/axiosConfig';
import styles from './PostCreate.module.css';
import { useNavigate } from 'react-router-dom';
import { uploadToS3 } from '@/util/s3Uploader';

const PostCreate = ({ onCreated }) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const [previews, setPreviews] = useState([]);
  const [mediaIds, setMediaIds] = useState([]);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);

  // 언마운트/삭제 시 로컬 URL 정리
  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) {
      return;
    }

    setUploading(true);
    try {
      // 미리보기 만들기
      const nextPreviews = files.map((f) => ({
        url: URL.createObjectURL(f),
        name: f.name,
      }));
      setPreviews((prev) => [...prev, ...nextPreviews]);

      // presigned -> S3 PUT
      const uploaded = await uploadToS3(files, 'POST');

      // /complete로 Media 확정 → mediaId 받기
      const completeBody = uploaded.map((u) => ({
        fileKey: u.fileKey,
        purpose: 'POST',
      }));

      const completeRes = await apiClient.post(
        '/api/upload/complete',
        completeBody
      );
      const medias = completeRes.data;
      setMediaIds((prev) => [...prev, ...medias.map((m) => m.mediaId)]);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드 실패');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveAll = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    setMediaIds([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return alert('내용을 입력해주세요.');
    }

    try {
      const res = await postApi.createPost({
        content,
        mediaIds,
      });

      setContent('');
      handleRemoveAll();

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

      {previews.length > 0 && (
        <div className={styles.preview}>
          {previews.map((p, idx) => (
            <img key={`${p.name}-${idx}`} src={p.url} alt={p.name} />
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
            disabled={uploading}
          />
        </label>

        {previews.length > 0 && (
          <button
            type="button"
            onClick={handleRemoveAll}
            className={styles.submitBtn}
          >
            첨부 취소
          </button>
        )}
        <button type="submit" disabled={uploading} className={styles.submitBtn}>
          {uploading ? '업로드 중...' : '게시'}
        </button>
      </div>
    </form>
  );
};

export default PostCreate;
