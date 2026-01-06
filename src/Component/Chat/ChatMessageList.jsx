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

  const [cursorId, setCursorId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [pendingScrollRestore, setPendingScrollRestore] = useState(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const containerRef = useRef();
  const loaderRef = useRef();
  const scrollTimeoutRef = useRef(null);

  const prevMessagesLength = useRef(messages.length);
  const messagesRef = useRef(messages);

  const lastReadMessageIdRef = useRef(null);
  const isMarkingReadRef = useRef(false);
  const readRequestTimeRef = useRef(0);

  const roomRef = useRef(room);
  useEffect(() => {
    roomRef.current = room;
  }, [room]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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
          console.error('읽음 처리 실패', err);
        } finally {
          setTimeout(() => {
            isMarkingReadRef.current = false;
          }, 1000);
        }
      }, 500),
    [setCurrentRoom]
  );

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

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = useMemo(
    () =>
      debounce(() => {
        const target = containerRef.current;
        if (!target) {
          return;
        }

        const isBottom =
          Math.abs(
            target.scrollHeight - target.scrollTop - target.clientHeight
          ) < 30;

        if (!isBottom) {
          return;
        }

        const currentMessages = messagesRef.current;
        const lastMessage = currentMessages[currentMessages.length - 1];

        if (
          lastMessage &&
          lastMessage.senderId !== currentUserId &&
          Number(lastMessage.id) > Number(lastReadMessageIdRef.current)
        ) {
          markMessagesAsRead(lastMessage.id);
        }
      }, 300),
    [currentUserId, markMessagesAsRead]
  );

  const isInitialLoad = useRef(false);

  useEffect(() => {
    if (!room) {
      return;
    }

    isInitialLoad.current = true;
    lastReadMessageIdRef.current = null;
    isMarkingReadRef.current = false;
    readRequestTimeRef.current = 0;

    setHasMore(true);
    setCursorId(null);

    (async () => {
      const res = await chatApi.getMessagesCursor(room.roomUuid, null, 30);
      if (res.success) {
        const sorted = [...res.data].reverse();
        setMessages(sorted);
        if (sorted.length > 0) {
          setCursorId(sorted[0].id);
        }
      }
    })();
  }, [room, setMessages]);

  useLayoutEffect(() => {
    if (!isInitialLoad.current || messages.length === 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
    isInitialLoad.current = false;
  }, [messages.length]);

  const loadOlderMessages = useCallback(async () => {
    if (isLoadingOlder || !hasMore || !cursorId) {
      return;
    }

    setIsLoadingOlder(true);
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const before = container.scrollHeight;

    try {
      const res = await chatApi.getMessagesCursor(room.roomUuid, cursorId, 30);
      if (res.success && res.data.length > 0) {
        const newMsgs = [...res.data].reverse();

        setPendingScrollRestore(before);
        setMessages((prev) => [...newMsgs, ...prev]);

        setCursorId(newMsgs[0].id);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoadingOlder(false);
    }
  }, [cursorId, hasMore, isLoadingOlder, room, setMessages]);

  useLayoutEffect(() => {
    if (!pendingScrollRestore) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const after = container.scrollHeight;
    container.scrollTop = after - pendingScrollRestore;
    setPendingScrollRestore(null);
  }, [messages, pendingScrollRestore]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadOlderMessages();
        }
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [loadOlderMessages, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) {
      prevMessagesLength.current = messages.length;
      return;
    }

    const newLength = messages.length;
    const appended = newLength > prevMessagesLength.current;

    if (appended) {
      const lastMessage = messages[messages.length - 1];
      const mine = String(lastMessage.senderId) === String(currentUserId);

      const nearBottom =
        Math.abs(
          container.scrollHeight - container.scrollTop - container.clientHeight
        ) < 40;

      if (mine || (nearBottom && !isUserScrolling)) {
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 20);
      }
    }

    prevMessagesLength.current = messages.length;
  }, [messages, currentUserId, isUserScrolling]);

  return (
    <div ref={containerRef} className="chat-messages" onScroll={handleScroll}>
      <div ref={loaderRef} style={{ height: '1px' }}></div>

      {messages.map((msg) => (
        <div
          key={msg.id}
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
