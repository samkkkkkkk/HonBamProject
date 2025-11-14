import React, { useEffect } from 'react';
import { useChat } from '@/util/ChatContext';
import './ChatRoomList.css';

const ChatRoomList = ({ type, onSelectRoom }) => {
  const { directRooms, groupRooms, joinedOpenRooms, fetchRooms } = useChat();

  useEffect(() => {
    if (fetchRooms) {
      fetchRooms();
    }
    console.log(rooms);
  }, []);

  const rooms =
    type === 'direct'
      ? directRooms
      : type === 'group'
        ? groupRooms
        : joinedOpenRooms;

  return (
    <div className="chatroom-list">
      {rooms.map((room) => (
        <div
          key={room.roomUuid}
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
