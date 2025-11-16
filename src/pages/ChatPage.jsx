import React, { useContext } from 'react';
import { useChat } from '@/util/ChatContext';
import ChatMessage from '@/Component/Chat/ChatMessage';
import ChatInput from '@/Component/Chat/ChatInput';
import './ChatPage.css';
import ChatMessageList from '@/Component/Chat/ChatMessageList';
import UserContext from '@/util/UserContext';

const ChatPage = ({ room }) => {
  const { messages, sendChatMessage } = useChat();
  const { id: userId } = useContext(UserContext);

  const handleSend = (content) => {
    sendChatMessage(content);
  };

  return (
    <div className="chat-page">
      <div className="chat-header">{room.customName || room.name}</div>
      <ChatMessageList room={room} currentUserId={userId} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
