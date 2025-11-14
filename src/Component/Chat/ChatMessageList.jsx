import { chatApi } from '@/api/chat';
import { useChat } from '@/util/ChatContext';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ChatMessage from './ChatMessage';
import apiClient from '@/config/axiosConfig';
import { CHAT } from '@/config/host-config';

const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const ChatMessageList = ({ room, currentUserId }) => {
  const { messages, setMessages, setCurrentRoom } = useChat();
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [pendingScrollRestore, setPendingScrollRestore] = useState(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const scrollTimeoutRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);
  const loaderRef = useRef();
  const containerRef = useRef();

  // 중복 읽음 처리 방지
  const lastReadMessageIdRef = useRef(null);
  const isMarkingReadRef = useRef(false);
  const readRequestTimeRef = useRef(0);

  const roomRef = useRef(room);
  useEffect(() => {
    roomRef.current = room;
  }, [room]);

  // 읽음 처리 함수
  const markMessagesAsRead = useMemo(
    () =>
      debounce(async (messageId) => {
        const currentRoom = roomRef.current;
        if (!messageId || !currentRoom?.roomUuid) {
          return;
        }

        const numericId = Number(messageId);

        if (
          lastReadMessageIdRef.current &&
          numericId <= Number(lastReadMessageIdRef.current)
        ) {
          return;
        }

        if (isMarkingReadRef.current) {
          return;
        }

        const now = Date.now();
        if (now - readRequestTimeRef.current < 500) {
          return;
        }

        isMarkingReadRef.current = true;
        readRequestTimeRef.current = now;

        console.log('[읽음 처리 요청]', {
          roomUuid: currentRoom.roomUuid,
          messageId: numericId,
        });

        try {
          await apiClient.post(`${CHAT}/rooms/read`, null, {
            params: { roomUuid: currentRoom.roomUuid, messageId: numericId },
          });

          lastReadMessageIdRef.current = numericId;

          setCurrentRoom((prev) =>
            prev && prev.roomUuid === currentRoom.roomUuid
              ? { ...prev, lastReadMessageId: numericId }
              : prev
          );
        } catch (err) {
          console.error('[읽음 처리 실패]', err);
        } finally {
          setTimeout(() => {
            isMarkingReadRef.current = false;
          }, 1000);
        }
      }, 500),
    [setCurrentRoom]
  );

  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      setIsUserScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 300);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const target = containerRef.current;
        if (!target || isMarkingReadRef.current) {
          return;
        }

        const isBottom =
          Math.abs(
            target.scrollHeight - target.scrollTop - target.clientHeight
          ) < 30;

        if (isBottom) {
          const currentMessages = messagesRef.current;
          const lastVisibleMessage =
            currentMessages[currentMessages.length - 1];
          if (
            lastVisibleMessage &&
            lastVisibleMessage.senderId !== currentUserId &&
            Number(lastVisibleMessage.id) > Number(lastReadMessageIdRef.current)
          ) {
            markMessagesAsRead(lastVisibleMessage.id);
          }
        }
      }, 500),
    [currentUserId, markMessagesAsRead]
  );

  const isInitialLoad = useRef(false);

  // 첫 로드: 최신 메시지 30개
  useEffect(() => {
    if (!room) {
      return;
    }

    isInitialLoad.current = true;
    lastReadMessageIdRef.current = null;
    isMarkingReadRef.current = false;
    readRequestTimeRef.current = 0;
    setHasMore(true);
    setCursor(null);

    (async () => {
      const res = await chatApi.getMessagesCursor(room.roomUuid, null, 30);
      if (res.success) {
        const sorted = [...res.data].reverse();
        setMessages(sorted);
        if (sorted.length > 0) {
          setCursor(sorted[0].timestamp);
        }
      }
    })();
  }, [room, setMessages]);

  // 초기 스크롤 - 채팅방 입장 시 맨 아래로
  useLayoutEffect(() => {
    if (!isInitialLoad.current || messages.length === 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    // 맨 아래로 스크롤
    container.scrollTop = container.scrollHeight;
    isInitialLoad.current = false;
  }, [messages.length]); // messages.length만 의존

  // IntersectionObserver로 읽음 처리
  const observerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isMarkingReadRef.current) {
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.messageId;
            const senderId = entry.target.dataset.senderId;
            if (String(senderId) !== String(currentUserId)) {
              markMessagesAsRead(id);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const targets = container.querySelectorAll('.chat-message-item');
    targets.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [messages.length, currentUserId, markMessagesAsRead]);

  // 과거 메시지 추가 로드
  const loadOlderMessages = useCallback(async () => {
    if (isLoadingOlder || !hasMore || !cursor) {
      return;
    }
    setIsLoadingOlder(true);

    try {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const scrollHeightBefore = container.scrollHeight;

      const res = await chatApi.getMessagesCursor(room.roomUuid, cursor, 30);
      if (res.success && res.data.length > 0) {
        const newMessages = [...res.data].reverse();

        setPendingScrollRestore(scrollHeightBefore);
        setMessages((prev) => [...newMessages, ...prev]);

        setCursor(newMessages[0].timestamp);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoadingOlder(false);
    }
  }, [isLoadingOlder, hasMore, cursor, room, setMessages]);

  // 스크롤 복원
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (pendingScrollRestore !== null && container) {
      const scrollHeightAfter = container.scrollHeight;
      container.scrollTop = scrollHeightAfter - pendingScrollRestore;
      setPendingScrollRestore(null);
    }
  }, [messages, pendingScrollRestore]);

  // 상단 감지 (이전 메시지 로드)
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadOlderMessages();
        }
      },
      {
        root: containerRef.current,
        rootMargin: '50px',
        threshold: 0.5,
      }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadOlderMessages, hasMore]);

  // 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) {
      prevMessagesLength.current = messages.length;
      return;
    }

    const newLength = messages.length;
    const newMessagesAppended = newLength > prevMessagesLength.current;

    if (newMessagesAppended) {
      const lastMessage = messages[messages.length - 1];
      const isMine = String(lastMessage.senderId) === String(currentUserId);

      const nearBottom =
        Math.abs(
          container.scrollHeight - container.scrollTop - container.clientHeight
        ) < 50;

      if (isMine) {
        // 본인 메시지: 무조건 맨 아래로
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 0);
      } else if (nearBottom && !isUserScrolling) {
        // 타인 메시지: 하단 근처 + 스크롤 중이 아닐 때만
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 50);
      }
    }

    prevMessagesLength.current = messages.length;
  }, [messages, currentUserId, isUserScrolling]);

  return (
    <div
      ref={containerRef}
      className="chat-messages"
      style={{
        overflow: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      onScroll={handleScroll}
    >
      <div ref={loaderRef} style={{ height: '1px' }}></div>
      {messages.map((msg) => (
        <div
          key={msg.id}
          id={`msg-${msg.id}`}
          data-message-id={msg.id}
          data-sender-id={msg.senderId}
          className="chat-message-item"
        >
          <ChatMessage message={msg} currentUserId={currentUserId} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessageList;
