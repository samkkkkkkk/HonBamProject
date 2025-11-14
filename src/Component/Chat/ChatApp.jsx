import React, { useState } from 'react';
import { useChat } from '@/util/ChatContext';
import ChatRoomList from './ChatRoomList';
import OpenChatRoomList from './OpenChatRoomList';
import ChatPage from '@/pages/ChatPage';
import NewChatModal from './NewChatModal';
import './ChatApp.css';
import ChatTabs from './ChatTabs';

const ChatApp = () => {
  const {
    currentRoom,
    selectRoom,
    directRooms,
    groupRooms,
    joinedOpenRooms,
    fetchRooms,
  } = useChat();
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [activeTab, setActiveTab] = useState('direct');
  return (
    <div className="chat-app-wrapper">
      <div className="chat-app-container">
        {/* 왼쪽 사이드바 */}
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>채팅</h2>
            <button
              className="new-chat-btn"
              onClick={() => setShowNewChatModal(true)}
            >
              +
            </button>
          </div>

          {/* 탭 영역 */}
          <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="sidebar-section">
            <ChatRoomList type={activeTab} onSelectRoom={selectRoom} />
          </div>
        </div>

        {/* 오른쪽 채팅 메인 영역 */}
        <div className="chat-main">
          {currentRoom ? (
            <ChatPage room={currentRoom} />
          ) : (
            <div className="chat-placeholder">채팅방을 선택하세요</div>
          )}
        </div>
      </div>

      {/* 모달 */}
      {showNewChatModal && (
        <NewChatModal onClose={() => setShowNewChatModal(false)} />
      )}
    </div>
  );
};

export default ChatApp;
