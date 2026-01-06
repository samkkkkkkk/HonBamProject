import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { chatApi } from '@/api/chat';
import {
  initializeWebSocket,
  subscribeToRoom,
  unsubscribeFromRoom,
  sendMessage,
  disconnectWebSocket,
} from '@/config/stompClient';
import UserContext from './UserContext';
import AuthContext from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // === 기본 상태 ===
  const [rooms, setRooms] = useState([]);
  const [openRooms, setOpenRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const stompInitialized = useRef(false); // 중복 연결 방지
  const { id: userId, nickname, userName } = useContext(UserContext);
  const { isLoggedIn } = useContext(AuthContext);
  const isFromReadEvent = useRef(false);

  // === 필터링된 목록 ===
  const directRooms = useMemo(() => rooms.filter((r) => r.isDirect), [rooms]);
  const groupRooms = useMemo(
    () => rooms.filter((r) => !r.isDirect && !r.isOpen),
    [rooms]
  );
  const joinedOpenRooms = useMemo(() => rooms.filter((r) => r.isOpen), [rooms]);

  // === 방 목록 불러오기 ===
  const fetchRooms = async () => {
    if (!isLoggedIn) {
      return;
    }
    const res = await chatApi.roomList();
    if (res.success) {
      setRooms(res.data);
    } else {
      console.error('[ChatContext] 방 목록 로드 실패:', res.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userId) {
      fetchRooms();
    }
  }, [isLoggedIn, userId]);

  // === WebSocket 초기화 ===
  useEffect(() => {
    if (!isLoggedIn || !userId || stompInitialized.current) {
      return;
    }
    stompInitialized.current = true;

    // 1회만 WebSocket 연결
    initializeWebSocket(userId, (summary) => {
      const { roomUuid, unReadCount } = summary;

      // 같은 값이면 무시 (렌더링 차단)
      setRooms((prev) =>
        prev.map((r) => {
          if (r.roomUuid === roomUuid && r.unReadCount === unReadCount) {
            return r;
          }
          return r.roomUuid === roomUuid ? { ...r, unReadCount } : r;
        })
      );
    });

    return () => {
      disconnectWebSocket();
      stompInitialized.current = false;
    };
  }, [isLoggedIn, userId]);

  // === 오픈채팅 검색 ===
  const fetchOpenRooms = async (keyword) => {
    const res = await chatApi.openRoomList(keyword);
    if (res.success) {
      setOpenRooms(res.data);
    }
  };

  // === 방 생성 ===
  const createRoom = async (payload) => {
    const res = await chatApi.createRoom(payload);
    if (res.success) {
      await fetchRooms();
    }
    return res;
  };

  // === 오픈채팅 참여 ===
  const joinOpenRoom = async (roomUuid) => {
    const res = await chatApi.joinOpenRoom(roomUuid);
    if (res.success) {
      await fetchRooms();
    }
    return res;
  };

  // === 유저 초대 ===
  const inviteUsers = async (roomUuid, userIds) => {
    return chatApi.invite(roomUuid, userIds);
  };

  // === 방 선택 ===
  const selectRoom = async (room) => {
    if (!room?.roomUuid) {
      return;
    }
    if (currentRoom?.roomUuid === room.roomUuid) {
      return;
    }

    // 서버에 입장 요청
    const joinRes = await chatApi.joinRoom(room.roomUuid);
    if (!joinRes.success) {
      console.error('[ChatContext] 방 입장 실패: ', joinRes.message);
      return;
    }

    const { lastReadMessageId } = joinRes.data || {};

    // 기존 구독 해제
    if (currentRoom?.roomUuid) {
      unsubscribeFromRoom(currentRoom.roomUuid);
    }

    setCurrentRoom((prev) => ({
      ...room,
      lastReadMessageId: lastReadMessageId ?? room.lastReadMessageId ?? null,
    }));
    setMessages([]);

    // 새 구독 등록
    subscribeToRoom(room.roomUuid, (event) => {
      switch (event.type) {
        case 'MESSAGE': {
          const msg = event.body;
          setMessages((prev) => {
            const idx = prev.findIndex(
              (m) =>
                m.id?.toString().startsWith('local-') &&
                m.content === msg.content &&
                m.senderId === userId
            );
            if (idx !== -1) {
              const updated = [...prev];
              const prevMsg = prev[idx];
              const prevFile = prevMsg?.files?.[0];
              if (prevFile?.isLocalPreview && prevFile.fileUrl) {
                URL.revokeObjectURL(prevFile.fileUrl);
              }
              updated[idx] = msg;
              return updated;
            }
            return [...prev, msg];
          });
          break;
        }

        case 'READ_UPDATE': {
          const { messageId, readerId, unReadUserCount } = event.body;
          //  본인 읽음은 무시 (루프 차단)
          if (readerId !== userId) {
            isFromReadEvent.current = true;
            setMessages((prev) =>
              prev.map((m) =>
                Number(m.id) <= Number(messageId)
                  ? { ...m, unReadUserCount }
                  : m
              )
            );
            setTimeout(() => {
              isFromReadEvent.current = false;
            }, 300);
          } else {
            setCurrentRoom((prev) =>
              prev && prev.roomUuid === room.roomUuid
                ? { ...prev, lastReadMessageId: messageId }
                : prev
            );
          }
          break;
        }

        case 'ALL_READ': {
          const { messageId, readerId, unReadUserCount } = event.body;
          if (readerId !== userId) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id <= messageId ? { ...m, unReadUserCount } : m
              )
            );
          }
          break;
        }

        case 'ROOM_SUMMARY_UPDATE': {
          const { roomUuid, unReadCount } = event.body;
          // 동일값 무시 (렌더링 루프 방지)
          setRooms((prev) =>
            prev.map((r) => {
              if (r.roomUuid === roomUuid && r.unReadCount === unReadCount) {
                return r;
              }
              return r.roomUuid === roomUuid ? { ...r, unReadCount } : r;
            })
          );
          break;
        }

        default:
          console.debug('[ChatContext] Unhandled event:', event);
      }
    });
  };

  // === 메시지 전송 ===
  const sendChatMessage = ({ content, messageType, mediaIds, files }) => {
    if (!currentRoom?.roomUuid) {
      return;
    }
    const payload = {
      roomUuid: currentRoom.roomUuid,
      messageType,
      content: content || null,
      mediaIds: mediaIds || [],
    };
    sendMessage(payload);

    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        roomUuid: currentRoom.roomUuid,
        senderId: userId,
        senderName: nickname || userName || '나',
        messageType,
        content,
        files: files?.length
          ? files
          : (mediaIds || []).map((id) => ({
              mediaId: id,
              fileUrl: null,
              fileName: null,
              contentType: null,
              fileSize: null,
            })),
        timestamp: new Date().toISOString(),
        unReadUserCount: null,
      },
    ]);
  };

  // === 로그아웃 처리 ===
  const handleLogoutCleanup = () => {
    disconnectWebSocket();
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
        isFromReadEvent,
        setMessages,
        fetchRooms,
        fetchOpenRooms,
        createRoom,
        joinOpenRoom,
        inviteUsers,
        selectRoom,
        setCurrentRoom,
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
