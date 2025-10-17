import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import apiClient from './axiosConfig';

// WebSocket 연결
export const connectWebSocket = async (roomUuid, onEventReceived) => {
  // 티켓 발급
  const res = await apiClient.post('/api/ws-ticket');
  const ticket = res.data.ticket;
  if (!ticket) {
    throw new Error('티켓 발급 실패');
  }

  // sockJs + STOMP Client 설정
  const socket = new SockJS('/ws-chat');
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000, // 자동 재연결
    connectHeaders: { ticket },
    debug: (str) => console.log('[STOMP]', str),
  });

  // 연결 및 구독
  return new Promise((resolve, reject) => {
    client.onConnect = () => {
      console.log('WebSocket 연결 성공');

      // 메시지 수신 구독
      client.subscribe(`/topic/chat.room.${roomUuid}`, (msg) => {
        const event = JSON.parse(msg.body);
        console.log('받은 메시지: ', event);
        onEventReceived(event);
      });

      // 읽음 이벤트 구독
      client.subscribe(`/topic/chat.room.${roomUuid}.read`, (msg) => {
        const event = JSON.parse(msg.body);
        console.log('받은 읽음 이벤트:', event);
        onEventReceived(event);
      });

      resolve(client);
    };

    client.onStompError = (frame) => {
      console.error('[STOMP Error', frame);
      reject(frame);
    };

    client.activate();
  });
};

// 메시지 전송
export const sendMessage = (client, roomUuid, content) => {
  if (!client || !client.connected) {
    console.warn('websocket 연결 안됨');
    return;
  }

  console.log('메시지 내용: ', content);

  client.publish({
    destination: '/app/chat/send',
    body: JSON.stringify({ roomUuid, content }),
  });
};

// 연결 해제
export const disconnectWebSocket = (client) => {
  if (client) {
    client.deactivate();
    console.log('WebSocket 연결 해제');
  }
};
