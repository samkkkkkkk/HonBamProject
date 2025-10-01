import React, { useEffect } from 'react';
import { useChat } from '@/util/ChatContext';
import './ChatRoomList.css';

const ChatRoomList = ({ rooms, onSelectRoom, fetchRooms }) => {
  useEffect(() => {
    if (fetchRooms) {
      fetchRooms();
    }
    console.log(rooms);
  }, []);

  return (
    <div className="chatroom-list">
      {rooms.map((room) => (
        <div
          key={room.roomId}
          className="chatroom-item"
          onClick={() => onSelectRoom(room)}
        >
          <div className="room-name">{room.name}</div>
          <div className="last-message">{room.lastMessage || '대화 없음'}</div>
          {room.unReadCount > 0 && (
            <span className="unread-badge">{room.unReadCount}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
