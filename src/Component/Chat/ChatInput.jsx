import React, { useEffect, useRef, useState } from 'react';
import './ChatInput.css';
import { uploadToS3 } from '@/util/s3Uploader';
import apiClient from '@/config/axiosConfig';

function detectMessageType(fileName) {
  const ext = fileName.split('.').pop().toLowerCase();

  if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) {
    return 'IMAGE';
  }
  if (['mp4', 'mov', 'avi', 'webm'].includes(ext)) {
    return 'VIDEO';
  }
  return 'FILE';
}

const ChatInput = ({ onSend }) => {
  const [content, setContent] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);

  const textareaRef = useRef(null);

  // 파일 선택 → 미리보기 + 업로드 (전송은 하지 않음)
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    // S3 업로드만 수행
    const [uploaded] = await uploadToS3(file, 'CHAT');

    // 2) /complete로 Media 확정 → mediaId 받기
    const completeBody = [{ fileKey: uploaded.fileKey, purpose: 'CHAT' }];
    const completeRes = await apiClient.post(
      '/api/upload/complete',
      completeBody
    );
    const [media] = completeRes.data;

    setUploadedFileInfo({
      mediaIds: [media.mediaId],
      fileName: uploaded.fileName,
      fileSize: uploaded.fileSize,
      contentType: uploaded.contentType,
    });

    // 같은 파일 재선택할 수 있도록 초기화
    e.target.value = '';
  };

  // 전송 버튼 클릭 또는 Enter
  const handleSend = () => {
    // 파일 전송 우선
    if (uploadedFileInfo) {
      const type = detectMessageType(uploadedFileInfo.fileName);

      onSend({
        messageType: type,
        content: content || null,
        mediaIds: uploadedFileInfo.mediaIds,
        files: [
          {
            mediaId: uploadedFileInfo.mediaIds[0],
            fileUrl: previewUrl, // 로컬 미리보기 URL
            fileName: uploadedFileInfo.fileName,
            contentType:
              detectMessageType(uploadedFileInfo.fileName) === 'IMAGE'
                ? 'image/*'
                : detectMessageType(uploadedFileInfo.fileName) === 'VIDEO'
                  ? 'video/*'
                  : 'application/octet-stream',
            fileSize: uploadedFileInfo.fileSize,
            isLocalPreview: true,
          },
        ],
      });

      // 초기화
      setContent('');
      setPreviewUrl(null);
      setUploadedFileInfo(null);
      return;
    }

    // 텍스트 전송
    if (content.trim()) {
      onSend({
        messageType: 'TEXT',
        content,
      });
      setContent('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // textarea auto-resize
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [content]);

  return (
    <div className="chat-input">
      {/* 파일 미리보기 영역 */}
      {previewUrl && (
        <div className="preview-container">
          <img src={previewUrl} alt="preview" className="preview-image" />
          <button
            className="preview-remove-btn"
            onClick={() => {
              setPreviewUrl(null);
              setUploadedFileInfo(null);
            }}
          >
            삭제
          </button>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요 (Shift + Enter = 줄바꿈)"
        rows={1}
      />

      <input
        type="file"
        id="chat-file-input"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <button
        onClick={() => document.getElementById('chat-file-input').click()}
      >
        파일
      </button>

      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default ChatInput;
