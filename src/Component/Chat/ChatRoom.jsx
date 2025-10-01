import React, { useEffect, useState } from 'react';
import { connectWebSocket, sendMessage } from '@/config/stompClient';

const ChatRoom = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // WebSocket 연결
  useEffect(() => {
    if (!room) {
      return;
    }

    connectWebSocket(room.roomId, (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      console.log('연결 해제');
    };
  }, [room]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(room.roomId, input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{room.name}</h2>
      <div
        style={{
          border: '1px solid #ddd',
          height: '200px',
          overflowY: 'scroll',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.senderName}:</b> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요"
      />
      <button onClick={handleSend}>전송</button>
    </div>
  );
};

export default ChatRoom;
