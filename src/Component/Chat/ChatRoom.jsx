// import React, { useEffect, useRef, useState } from 'react';
// import {
//   connectWebSocket,
//   disconnectWebSocket,
//   sendMessage,
// } from '@/config/stompClient';

// const ChatRoom = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState('');
//   const clientRef = useRef(null);

//   // WebSocket 연결
//   useEffect(() => {
//     if (!room) {
//       return;
//     }

//     connectWebSocket(room.roomUuid, (newMsg) => {
//       setMessages((prev) => [...prev, newMsg]);
//     }).then((client) => {
//       clientRef.current = client;
//     });

//     return () => {
//       disconnectWebSocket(clientRef.current);
//     };
//   }, [room]);

//   const handleSend = () => {
//     if (content.trim() && clientRef.current) {
//       sendMessage(clientRef.current, room.roomUuid, content);
//       setContent('');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>{room.name}</h2>
//       <div
//         style={{
//           border: '1px solid #ddd',
//           height: '200px',
//           overflowY: 'scroll',
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
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="메시지를 입력하세요"
//       />
//       <button onClick={handleSend}>전송</button>
//     </div>
//   );
// };

// export default ChatRoom;
