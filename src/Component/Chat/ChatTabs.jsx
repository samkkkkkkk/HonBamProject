// src/Component/Chat/ChatTabs.js
import React from 'react';
import './ChatTabs.css';

const ChatTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="chat-tabs">
      <button
        className={activeTab === 'direct' ? 'active' : ''}
        onClick={() => onTabChange('direct')}
      >
        1:1 채팅
      </button>
      <button
        className={activeTab === 'group' ? 'active' : ''}
        onClick={() => onTabChange('group')}
      >
        그룹 채팅
      </button>
      <button
        className={activeTab === 'open' ? 'active' : ''}
        onClick={() => onTabChange('open')}
      >
        오픈 채팅
      </button>
    </div>
  );
};

export default ChatTabs;
