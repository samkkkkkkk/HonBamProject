import { chatApi } from '@/api/chat';
import { useChat } from '@/util/ChatContext';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import apiClient from '@/config/axiosConfig';

const ChatMessageList = ({ room, currentUserId }) => {
  const { messages, setMessages, fetchrooms } = useChat();
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const containerRef = useRef();

  // 읽음 처리 함수
  const markMessagesAsRead = async () => {
    if (!messages.length) {
      return;
    }
    const lastMessage = messages[messages.length - 1];
    try {
      await apiClient.post('/api/chat/read', null, {
        params: {
          roomUuid: room.roomUuid,
          messageId: lastMessage.id,
        },
      });

      // 방 목록에서 읽은 수 갱신
      fetchrooms?.();
    } catch (err) {
      console.error('[ChatMessageList] 읽음 처리 실패: ', err);
    }
  };

  // 스크롤이 가장 아래로 내려갔을 때 읽음 처리
  const handleScroll = (e) => {
    const target = e.target;
    const isBottom =
      Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <
      3;
    if (isBottom) {
      markMessagesAsRead();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);

  // 첫 로드: 최신 메시지 30개
  useEffect(() => {
    if (!room) {
      return;
    }
    (async () => {
      const res = await chatApi.getMessagesCursor(room.roomUuid, null, 30);
      if (res.success) {
        const sorted = [...res.data].reverse();
        setMessages(sorted); // 최신 메시지를 아래쪽으로
        if (sorted.length > 0) {
          setCursor(sorted[0].timestamp);
        }
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    })();
  }, [room]);

  // 과거 메시지 추가 로드
  const loadOlderMessages = async () => {
    if (!hasMore || !cursor) {
      return;
    }

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
  };

  // IntersectionObserver: 상단 감지
  useEffect(() => {
    if (!loaderRef.current || messages.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadOlderMessages();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [cursor, hasMore, messages.length]);

  return (
    <div
      ref={containerRef}
      className="chat-messages"
      style={{
        overflow: 'auto',
        height: '400px',
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
