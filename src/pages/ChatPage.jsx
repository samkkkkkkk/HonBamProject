import React from 'react';
import { useChat } from '@/util/ChatContext';
import ChatMessage from '@/Component/Chat/ChatMessage';
import ChatInput from '@/Component/Chat/ChatInput';
import './ChatPage.css';

const ChatPage = ({ room }) => {
  const { messages, sendChatMessage } = useChat();

  const handleSend = (content) => {
    sendChatMessage(room.roomId, content);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">{room.name}</div>
      <div className="chat-messages">
        {messages.map((m, idx) => (
          <ChatMessage key={idx} message={m} />
        ))}
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
