import React from 'react';
import { useChat } from '@/util/ChatContext';
import ChatMessage from '@/Component/Chat/ChatMessage';
import ChatInput from '@/Component/Chat/ChatInput';
import './ChatPage.css';
import ChatMessageList from '@/Component/Chat/ChatMessageList';

const ChatPage = ({ room }) => {
  const { messages, sendChatMessage } = useChat();

  const handleSend = (content) => {
    sendChatMessage(content);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">{room.customName || room.name}</div>
      <ChatMessageList room={room} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
