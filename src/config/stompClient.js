import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import apiClient from './axiosConfig';

let stompClient = null;
const roomSubscriptions = new Map();
const lastSummaryMap = new Map(); // 최근 unReadCount 캐시

/**
 * WebSocket 초기화 (앱 전체에서 1회만 실행)
 * @param {string} userId - 로그인 사용자 ID
 * @param {function} onSummaryUpdate - 방 요약 정보 변경 콜백
 */
export const initializeWebSocket = async (userId, onSummaryUpdate) => {
  if (stompClient && stompClient.connected) {
    console.log('[STOMP] WebSocket already connected.');
    return;
  }

  try {
    const res = await apiClient.post('/api/ws-ticket');
    const ticket = res.data.ticket;
    if (!ticket) {
      throw new Error('WebSocket ticket 발급 실패');
    }

    const socket = new SockJS('/ws-chat');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 10000, // 안정성 향상
      connectHeaders: { ticket },
      debug: (str) => console.log('[STOMP]', str),
    });

    client.onConnect = () => {
      console.log('[STOMP] WebSocket 연결 성공');
      stompClient = client;

      // 사용자별 summary 토픽 (1회만)
      client.subscribe(`/topic/chat.summary.${userId}`, (msg) => {
        const payload = JSON.parse(msg.body);
        if (payload.type === 'ROOM_SUMMARY_UPDATE') {
          const { roomUuid, unReadCount } = payload.body;

          //  동일 값이면 무시 → 무한 루프 방지 핵심
          const prevCount = lastSummaryMap.get(roomUuid);
          if (prevCount === unReadCount) {
            return;
          }
          lastSummaryMap.set(roomUuid, unReadCount);

          console.log('[STOMP] ROOM_SUMMARY_UPDATE:', payload.body);
          onSummaryUpdate?.(payload.body);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('[STOMP ERROR]', frame);
    };

    client.onDisconnect = () => {
      console.log('[STOMP] 연결 종료');
    };

    client.activate();
  } catch (error) {
    console.error('[STOMP] WebSocket 초기화 실패:', error);
  }
};

/**
 * 특정 채팅방 이벤트 구독
 * @param {string} roomUuid - 채팅방 UUID
 * @param {function} onEventReceived - 메시지/읽음 이벤트 콜백
 */
export const subscribeToRoom = (roomUuid, onEventReceived) => {
  if (!stompClient || !stompClient.connected) {
    console.warn('[STOMP] 구독 실패 - 클라이언트 연결 안됨');
    return;
  }

  // 이미 구독 중이면 중복 방지
  if (roomSubscriptions.has(roomUuid)) {
    const subs = roomSubscriptions.get(roomUuid);
    if (subs.every((s) => s?.active)) {
      console.warn(`[STOMP] Already subscribed to room ${roomUuid}`);
      return;
    } else {
      console.warn('[STOMP] Inactive subscription detected, re-subscribing');
      roomSubscriptions.delete(roomUuid);
    }
  }

  // 메시지 구독
  const msgSub = stompClient.subscribe(
    `/topic/chat.room.${roomUuid}`,
    (msg) => {
      const event = JSON.parse(msg.body);
      onEventReceived(event);
    }
  );

  // 읽음 이벤트 구독
  const readSub = stompClient.subscribe(
    `/topic/chat.room.${roomUuid}.read`,
    (msg) => {
      const event = JSON.parse(msg.body);
      onEventReceived(event);
    }
  );

  roomSubscriptions.set(roomUuid, [msgSub, readSub]);
  console.log(`[STOMP] Subscribed to room ${roomUuid}`);
};

/**
 * 특정 채팅방 구독 해제
 * @param {string} roomUuid - 채팅방 UUID
 */
export const unsubscribeFromRoom = (roomUuid) => {
  if (!roomSubscriptions.has(roomUuid)) {
    return;
  }

  const subs = roomSubscriptions.get(roomUuid);
  subs.forEach((s) => s.unsubscribe());
  roomSubscriptions.delete(roomUuid);
  console.log(`[STOMP] Unsubscribed from room ${roomUuid}`);
};

/**
 * 메시지 전송
 * @param {string} roomUuid - 대상 채팅방 UUID
 * @param {string} content - 메시지 내용
 */
export const sendMessage = (roomUuid, content) => {
  if (!stompClient || !stompClient.connected) {
    console.warn('[STOMP] 메시지 전송 실패 - 연결 안됨');
    return;
  }

  stompClient.publish({
    destination: '/app/chat/send',
    body: JSON.stringify({ roomUuid, content }),
  });
};

/**
 * WebSocket 완전 종료
 */
export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
    roomSubscriptions.clear();
    lastSummaryMap.clear(); // 캐시도 초기화
    console.log('[STOMP] WebSocket 완전 종료');
  }
};
