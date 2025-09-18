import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatRoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');

  // 채팅방 목록 불러오기
  useEffect(() => {
    axios
      .get('http://localhost:8181/api/chat/rooms', { withCredentials: true })
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.error('채팅방 불러오기 실패:', err));
  }, []);

  // 채팅방 생성
  const createRoom = () => {
    if (!roomName.trim()) {
      return;
    }

    axios
      .post(
        'http://localhost:8181/api/chat/rooms',
        { name: roomName },
        { withCredentials: true }
      )
      .then((res) => {
        console.log('채팅방 생성 성공:', res.data);
        setRooms((prev) => [...prev, res.data]); // 방 목록 갱신
        setRoomName('');
      })
      .catch((err) => console.error('채팅방 생성 실패:', err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>채팅방 목록</h2>

      <div>
        <input
          type="text"
          placeholder="채팅방 이름 입력"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={createRoom}>방 생성</button>
      </div>

      <ul>
        {rooms.map((room) => (
          <li key={room.roomId}>
            {room.name} (UUID: {room.roomId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomManager;
