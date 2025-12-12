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

  const renderContent = () => {
    switch (message.messageType) {
      case 'TEXT':
        return <div className="bubble">{message.content}</div>;

      case 'IMAGE':
        return (
          <div className="bubble media-bubble">
            <img
              src={message.fileUrl}
              alt={message.fileName}
              className="chat-image"
            />
            {message.content && (
              <div className="caption">{message.content}</div>
            )}
          </div>
        );

      case 'VIDEO':
        return (
          <div className="bubble media-bubble">
            <video src={message.fileUrl} controls className="chat-video" />
            {message.content && (
              <div className="caption">{message.content}</div>
            )}
          </div>
        );

      case 'FILE':
        return (
          <div className="bubble file-bubble">
            <a href={message.fileUrl} download>
              📄 {message.fileName}
            </a>
            {message.content && (
              <div className="caption">{message.content}</div>
            )}
          </div>
        );

      case 'SYSTEM':
        return <div className="system-message">{message.content}</div>;

      default:
        return <div className="bubble">{message.content}</div>;
    }
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
