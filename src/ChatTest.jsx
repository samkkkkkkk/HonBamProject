// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import SockJS from 'sockjs-client/dist/sockjs';
// import { over } from 'stompjs';
// import UserContext from '@/util/UserContext'; // 네가 만든 Context 사용

// const ChatTest = () => {
//   const { id, nickname, fetchUserInfo } = useContext(UserContext);
//   const [stompClient, setStompClient] = useState(null);
//   const [connected, setConnected] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const roomId = '123e4567-e89b-12d3-a456-426614174000'; // 테스트용 채팅방 UUID

//   // 1. 사용자 정보 로드
//   useEffect(() => {
//     fetchUserInfo();
//   }, []);

//   // 2. WebSocket 연결
//   useEffect(() => {
//     const connectWs = async () => {
//       if (!id) {
//         return;
//       } // 사용자 정보 없으면 연결 안 함

//       try {
//         // 2-1. 티켓 발급 API 호출
//         const res = await axios.post(
//           'http://localhost:8181/api/ws-ticket',
//           {},
//           { withCredentials: true } //HttpOnly 쿠키 전달
//         );
//         const ticket = res.data.ticket;
//         console.log('🎫 발급받은 티켓:', ticket);

//         // 2-2. SockJS 연결
//         const socket = new SockJS('http://localhost:8181/ws-chat');
//         const client = over(socket);

//         // 2-3. STOMP 연결 (티켓을 헤더에 담음)
//         client.connect(
//           { ticket: ticket }, // ✅ 서버에서 검증하는 임시 티켓
//           () => {
//             console.log('WebSocket 연결 성공');
//             setConnected(true);

//             // 채팅방 구독
//             client.subscribe(`/topic/room.${roomId}`, (message) => {
//               const body = JSON.parse(message.body);
//               console.log('새 메시지:', body);
//               setMessages((prev) => [...prev, body]);
//             });
//           },
//           (error) => {
//             console.error('WebSocket 연결 실패', error);
//           }
//         );

//         setStompClient(client);
//       } catch (err) {
//         console.error('티켓 발급 실패', err);
//       }
//     };

//     connectWs();

//     // cleanup
//     return () => {
//       if (stompClient) {
//         stompClient.disconnect(() => console.log('🔌 연결 해제'));
//       }
//     };
//   }, [id, roomId]);

//   // 3. 메시지 전송
//   const sendMessage = () => {
//     if (stompClient && connected && id) {
//       const msg = {
//         roomId: roomId,
//         content: input,
//       };

//       stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(msg));
//       setInput('');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>테스트 채팅방</h2>

//       <div
//         style={{
//           border: '1px solid #ddd',
//           padding: '10px',
//           height: '200px',
//           overflowY: 'scroll',
//           marginBottom: '10px',
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div key={i}>
//             <b>{msg.senderName}:</b> {msg.content}
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="메시지를 입력하세요"
//       />
//       <button onClick={sendMessage}>전송</button>
//     </div>
//   );
// };

// export default ChatTest;
