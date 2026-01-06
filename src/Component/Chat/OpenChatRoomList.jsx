import React, { useEffect } from 'react';
import { useChat } from '@/util/ChatContext';
import './OpenChatRoomList.css';

const OpenChatRoomList = ({ onJoinRoom }) => {
  const { openRooms, fetchOpenRooms } = useChat();

  useEffect(() => {
    fetchOpenRooms();
  }, []);

  return (
    <div className="openchat-list">
      {openRooms.map((room) => (
        <div
          key={room.roomUuid}
          className="openchat-item"
          onClick={() => onJoinRoom(room)}
        >
          <div className="room-name">{room.name}</div>
          <div className="room-info">참여자 {room.participantCount}명</div>
        </div>
      ))}
    </div>
  );
};

export default OpenChatRoomList;
