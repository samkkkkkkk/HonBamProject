import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { chatApi } from '@/api/chat';
import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from '@/config/stompClient';
import UserContext from './UserContext';
import AuthContext from './AuthContext';

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

  const addMessages = (newMessages, prepend = false) => {
    setMessages((prev) =>
      prepend ? [...newMessages, ...prev] : [...prev, ...newMessages]
    );
  };

  const stompRef = useRef(null);
  const { fetchUserInfo, userInfo } = useContext(UserContext);
  const { isLoggedIn } = useContext(AuthContext);

  // 내 채팅방 목록 불러오기
  const fetchRooms = async () => {
    if (!isLoggedIn) {
      return;
    }
    const res = await chatApi.roomList();

    if (res.success) {
      const allRooms = res.data;
      setRooms(allRooms);

      // 필터링해서 저장
      setDirectRooms(allRooms.filter((r) => r.isDirect));
      setGroupRooms(allRooms.filter((r) => !r.isDirect && !r.isOpen));
      setJoinedOpenRooms(allRooms.filter((r) => r.isOpen));
    } else {
      console.error('[ChatContext] 방 목록 로드 실패:', res.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
      fetchRooms();
    }
  }, [isLoggedIn]);

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
      await fetchRooms(); // 목록 갱신
    }
    return res;
  };

  // 오픈채팅방 참여
  const joinOpenRoom = async (roomUuid) => {
    const res = await chatApi.joinOpenRoom(roomUuid);
    if (res.success) {
      await fetchRooms(); // 목록 갱신
    }
    return res;
  };

  // 유저 초대
  const inviteUsers = async (roomUuid, userIds) => {
    return chatApi.invite(roomUuid, userIds);
  };

  // 방 선택 → WebSocket 연결
  const selectRoom = async (room) => {
    if (!room?.roomUuid) {
      return;
    }

    // 기존 연결 해제
    if (stompRef.current) {
      disconnectWebSocket(stompRef.current);
      stompRef.current = null;
    }

    setCurrentRoom(room);
    setMessages([]); // 메시지 초기화

    // 새 연결
    try {
      stompRef.current = await connectWebSocket(room.roomUuid, (msg) => {
        console.log('메시지 수신:', msg);

        setMessages((prev) => [...prev, msg]);
      });
    } catch (err) {
      console.error('[ChatContext] webSocket 연결 실패:'.err);
    }
  };

  // 메시지 전송
  const sendChatMessage = (content) => {
    if (!stompRef.current) {
      console.warn('[ChatContext] 연결되지 않음');
      return;
    }

    sendMessage(stompRef.current, currentRoom.roomUuid, content);

    // 로컬 반영
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        senderId: userInfo?.id,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 로그아웃/인증 만료 처리
  const handleLogoutCleanup = () => {
    if (stompRef.current) {
      disconnectWebSocket(stompRef.current);
      stompRef.current = null;
    }
    setCurrentRoom(null);
    setMessages([]);
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
        setMessages,
        addMessages,
        fetchRooms,
        fetchOpenRooms,
        createRoom,
        joinOpenRoom,
        inviteUsers,
        selectRoom,
        sendChatMessage,
        handleLogoutCleanup,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
export default ChatContext;
