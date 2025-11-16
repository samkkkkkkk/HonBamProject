import React, { useEffect, useRef, useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!content.trim()) {
      return;
    }
    onSend(content);
    setContent('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSend();
      }
    }
  };

  // 내용 길이에 따라 textarea 높이 자동 조정
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }
    textarea.style.height = 'auto'; // 높이 초기화
    textarea.style.height = `${textarea.scrollheight}px`; // 내용에 맞게 조정
  }, [content]);

  return (
    <div className="chat-input">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요 (Shift + Enter = 줄바꿈)"
        rows={1}
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default ChatInput;
