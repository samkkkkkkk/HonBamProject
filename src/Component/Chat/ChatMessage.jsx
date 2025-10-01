import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isMine = message.senderId === 'me';

  return (
    <div className={`chat-message ${isMine ? 'mine' : 'other'}`}>
      <div className="bubble">{message.content}</div>
    </div>
  );
};

export default ChatMessage;
