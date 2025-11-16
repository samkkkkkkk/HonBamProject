import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, currentUserId }) => {
  console.log('currentUserId: ', currentUserId);

  const isMine = message.senderId === currentUserId;
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

  return (
    <div className={`chat-message ${isMine ? 'mine' : 'other'}`}>
      {!isMine && <div className="sender-name">{message.senderName}</div>}

      <div className="bubble-continer">
        <div className="bubble">{message.content}</div>
        <div className="meta">
          <span className="time">{time}</span>
          {isMine && message.unReadUserCount > 0 && (
            <span className="unread">{message.unReadUserCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
