import React, { createContext, useState, useContext, useRef } from 'react';
import { chatApi } from '@/api/chat';
import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from '@/config/stompClient';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // 채팅방 전체 목록
  const [rooms, setRooms] = useState([]);

  // 구분된 목록
  const [directRooms, setDirectRooms] = useState([]); // 1:1 채팅방
  const [groupRooms, setGroupRooms] = useState([]); // 그룹 채팅방
  const [joinedOpenRooms, setJoinedOpenRooms] = useState([]); // 내가 속한 오픈 채팅방
  const [openRooms, setOpenRooms] = useState([]); // 검색용 오픈 채팅방

  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]); // 현재 방 메시지
  const stompRef = useRef(null);

  // 내 채팅방 목록 불러오기
  const fetchRooms = async () => {
    const res = await chatApi.roomList();

    if (res.success) {
      const allRooms = res.data;
      setRooms(allRooms);

      // 필터링해서 저장
      setDirectRooms(allRooms.filter((r) => r.isDirect));
      setGroupRooms(allRooms.filter((r) => !r.isDirect && !r.isOpen));
      setJoinedOpenRooms(allRooms.filter((r) => r.isOpen));
    }
  };

  // 오픈 채팅방 검색/필터
  const fetchOpenRooms = async (keyword) => {
    const res = await chatApi.openRoomList(keyword);
    if (res.success) {
      setOpenRooms(res.data);
    }
  };

  // 채팅방 생성
  const createRoom = async (payload) => {
    const res = await chatApi.createRoom(payload);
    if (res.success) {
      setRooms((prev) => [...prev, res.data]);
      await fetchRooms(); // 목록 갱신
    }
    return res;
  };

  // 오픈채팅방 참여
  const joinOpenRoom = async (roomId) => {
    const res = await chatApi.joinOpenRoom(roomId);
    if (res.success) {
      setRooms((prev) => [...prev, res.data]);
      await fetchRooms(); // 목록 갱신
    }
    return res;
  };

  // 유저 초대
  const inviteUsers = async (roomId, userIds) => {
    return chatApi.invite(roomId, userIds);
  };

  // 방 선택 → WebSocket 연결
  const selectRoom = async (room) => {
    setCurrentRoom(room);
    setMessages([]); // 메시지 초기화

    // 기존 연결 해제
    if (stompRef.current) {
      disconnectWebSocket(stompRef.current);
      stompRef.current = null;
    }

    // 새 연결
    stompRef.current = await connectWebSocket(room.roomId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  };

  // 메시지 전송
  const sendChatMessage = (roomId, content) => {
    if (!stompRef.current) {
      return;
    }

    sendMessage(stompRef.current, roomId, content);

    // 로컬 반영
    setMessages((prev) => [
      ...prev,
      { senderId: 'me', content, timestamp: new Date() },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        rooms,
        directRooms,
        groupRooms,
        joinedOpenRooms,
        openRooms,
        currentRoom,
        messages,
        fetchRooms,
        fetchOpenRooms,
        createRoom,
        joinOpenRoom,
        inviteUsers,
        selectRoom,
        sendChatMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatContext;
