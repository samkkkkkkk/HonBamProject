import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, currentUserId }) => {
  const isMine = String(message.senderId) === String(currentUserId);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    if (isNaN(date)) {
      return '';
    }
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12 || 12;
    return `${ampm} ${hours}:${minutes}`;
  };

  const time = formatTime(message.timestamp);
  // B 방식: files 기반
  const file = message.files?.[0] ?? null;

  const renderFile = () => {
    if (!file) {
      return null;
    }

    const ct = file.contentType || '';
    const isImage = ct.startsWith('image/');
    const isVideo = ct.startsWith('video/');

    if (isImage) {
      return (
        <div className="bubble media-bubble">
          <img
            src={file.fileUrl}
            alt={file.fileName || 'image'}
            className="chat-image"
          />
          {message.content && <div className="caption">{message.content}</div>}
        </div>
      );
    }

    if (isVideo) {
      return (
        <div className="bubble media-bubble">
          <video src={file.fileUrl} controls className="chat-video" />
          {message.content && <div className="caption">{message.content}</div>}
        </div>
      );
    }

    return (
      <div className="bubble file-bubble">
        <a href={file.fileUrl} download>
          {file.fileName || '파일'}
        </a>
        {message.content && <div className="caption">{message.content}</div>}
      </div>
    );
  };

  const renderContent = () => {
    // 시스템 메시지는 그대로
    if (message.messageType === 'SYSTEM') {
      return <div className="system-message">{message.content}</div>;
    }

    // 첨부가 있으면 첨부 우선 렌더링(텍스트는 캡션)
    if (file) {
      return renderFile();
    }

    // 첨부 없으면 텍스트 렌더링
    return <div className="bubble">{message.content}</div>;
  };

  return (
    <div className={`chat-message ${isMine ? 'mine' : 'other'}`}>
      {!isMine && message.messageType !== 'SYSTEM' && (
        <div className="sender-name">{message.senderName}</div>
      )}

      <div className="bubble-container">
        {renderContent()}

        {message.messageType !== 'SYSTEM' && (
          <div className="meta">
            <span className="time">{time}</span>
            {isMine && message.unReadUserCount > 0 && (
              <span className="unread">{message.unReadUserCount}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
