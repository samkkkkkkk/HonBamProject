import { chatApi } from '@/api/chat';
import { useChat } from '@/util/ChatContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import apiClient from '@/config/axiosConfig';
import { stringify } from 'uuid';

const ChatMessageList = ({ room, currentUserId }) => {
  const { messages, setMessages } = useChat();
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const loaderRef = useRef();
  const containerRef = useRef();

  // 중복 읽음 처리 방지
  const lastReadMesageIdRef = useRef(null);

  // 읽음 처리 함수
  const markMessagesAsRead = useCallback(async () => {
    if (isReading || !messages.length || !room?.roomUuid) {
      return;
    }

    // 가장 최근 '상대방 메시지' 찾기
    const targetMessage = [...messages]
      .reverse()
      .find(
        (m) =>
          !String(m.id).startsWith('local-') &&
          String(m.senderId) !== String(currentUserId)
      );

    if (!targetMessage) {
      return;
    }

    if (lastReadMesageIdRef.current === targetMessage.id) {
      return;
    }

    setIsReading(true);
    lastReadMesageIdRef.current = targetMessage.id;

    console.log('[읽음처리 요청]', {
      roomUuid: room.roomUuid,
      messageId: targetMessage.id,
    });

    try {
      await apiClient.post('/api/chat/rooms/read', null, {
        params: {
          roomUuid: room.roomUuid,
          messageId: targetMessage.id,
        },
      });
    } catch (err) {
      console.error('[ChatMessageList] 읽음 처리 실패:', err);
    } finally {
      setTimeout(() => setIsReading(false), 200);
    }
  }, [messages, room, currentUserId, isReading]);

  // 스크롤이 가장 아래로 내려갔을 때 읽음 처리
  const handleScroll = useCallback(() => {
    const target = containerRef.current;
    if (!target) {
      return;
    }
    const isBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      30;
    if (isBottom) {
      markMessagesAsRead();
    }
  }, [markMessagesAsRead]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 첫 로드: 최신 메시지 30개
  useEffect(() => {
    if (!room) {
      return;
    }

    lastReadMesageIdRef.current = null;

    (async () => {
      const res = await chatApi.getMessagesCursor(room.roomUuid, null, 30);
      if (res.success) {
        const sorted = [...res.data].reverse();
        setMessages(sorted); // 최신 메시지를 아래쪽으로
        if (sorted.length > 0) {
          setCursor(sorted[0].timestamp);
        }
      }
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
          // 하단일 경우 자동 읽음 처리
          markMessagesAsRead();
        }
      }, 50);
    })();
  }, [room]);

  // 과거 메시지 추가 로드
  const loadOlderMessages = async () => {
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
        setMessages((prev) => [...newMessages, ...prev]);
        setCursor(newMessages[0].timestamp);

        await new Promise((r) => setTimeout(r, 0));
        const scrollHeightAfter = containerRef.scrollHeight;
        container.scrollTop = scrollHeightAfter - scrollHeightBefore; // 스크롤 복원
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoadingOlder(false);
    }
  };

  // IntersectionObserver: 상단 감지
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
  }, [cursor, hasMore]);

  // 새 메시지 추가 시 자동 스크롤 + 읽음 처리
  useEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) {
      return;
    }

    // 마지막 메시지가 내 메시지인지 확인
    const lastMessage = messages[messages.length - 1];
    const isLastMessageMine =
      String(lastMessage.senderId) === String(currentUserId);

    // 사용자가 최하단 근처에 있는지 확인
    const nearBottom =
      Math.abs(
        container.scrollHeight - container.scrollTop - container.clientHeight
      ) < 100;

    if (nearBottom) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
        // 스크롤을 맨 아래로 내린 후, 마지막 메시지가 상대방 메시지일 경우 읽음 처리
        if (!isLastMessageMine) {
          markMessagesAsRead();
        }
      }, 50);
    }
  }, [messages, currentUserId, markMessagesAsRead]);

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
    >
      <div ref={loaderRef} style={{ height: '1px' }}></div>
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} currentUserId={currentUserId} />
      ))}
    </div>
  );
};

export default ChatMessageList;
