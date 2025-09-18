import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatRoom = ({ roomId }) => {
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(false);

  // 참여자 목록 불러오기
  const fetchParticipants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8181/api/chat/rooms/${roomId}/participants`,
        { withCredentials: true } // HttpOnly 쿠키 사용
      );
      setParticipants(res.data);
    } catch (err) {
      console.error('참여자 목록 불러오기 실패', err);
    }
  };

  // 방 입장
  const joinRoom = async () => {
    try {
      await axios.post(
        `http://localhost:8181/api/chat/rooms/${roomId}/join`,
        {},
        { withCredentials: true }
      );
      setJoined(true);
      fetchParticipants();
    } catch (err) {
      console.error('방 입장 실패', err);
    }
  };

  // 방 퇴장
  const leaveRoom = async () => {
    try {
      await axios.post(
        `http://localhost:8181/api/chat/rooms/${roomId}/leave`,
        {},
        { withCredentials: true }
      );
      setJoined(false);
      fetchParticipants();
    } catch (err) {
      console.error('방 퇴장 실패', err);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [roomId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>채팅방: {roomId}</h2>

      {joined ? (
        <button onClick={leaveRoom} style={{ marginBottom: '10px' }}>
          채팅방 나가기
        </button>
      ) : (
        <button onClick={joinRoom} style={{ marginBottom: '10px' }}>
          채팅방 참여하기
        </button>
      )}

      <h3>참여자 목록</h3>
      <ul>
        {participants.map((p) => (
          <li key={p.id}>
            {p.user.nickname ?? p.user.email} (userId: {p.user.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoom;
