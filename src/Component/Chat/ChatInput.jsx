import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (!content.trim()) {
      return;
    }
    onSend(content);
    setContent('');
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default ChatInput;
