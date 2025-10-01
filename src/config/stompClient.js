import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import apiClient from './axiosConfig';

// WebSocket 연결
export const connectWebSocket = async (roomId, onMessageReceived) => {
  // 티켓 발급
  const res = await apiClient.post('/api/ws-ticket');
  const ticket = res.data.ticket;

  // sockJs + STOMP Client 설정
  const socket = new SockJS('http://localhost:8181/ws-chat');
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000, // 자동 재연결
    connectHeaders: {
      ticket: ticket,
    },
    debug: (str) => console.log('[STOMP]', str),
  });

  return new Promise((resolve) => {
    client.onConnect = () => {
      console.log('WebSocket 연결 성공');

      client.subscribe(`/topic/chat/${roomId}`, (msg) => {
        const body = JSON.parse(msg.body);
        onMessageReceived(body);
      });

      resolve(client);
    };

    client.activate();
  });
};

// 메시지 전송
export const sendMessage = (client, roomId, content) => {
  if (!client || !client.connected) {
    return;
  }

  client.publish({
    destination: '/app/chat.sendMessage',
    body: JSON.stringify({ roomId, content }),
  });
};

// ✅ 연결 해제
export const disconnectWebSocket = (client) => {
  if (client) {
    client.deactivate();
    console.log('WebSocket 연결 해제');
  }
};
