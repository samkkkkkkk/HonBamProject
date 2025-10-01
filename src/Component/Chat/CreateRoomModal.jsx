// import React, { useState } from 'react';
// import { chatApi } from '@/api/chat';
// import './NewChatModal.css';

// const CreateRoomModal = ({ mode, onClose }) => {
//   const [name, setName] = useState('');
//   const [targetId, setTargetId] = useState('');
//   const [participants, setParticipants] = useState('');
//   const [allowJoinAll, setAllowJoinAll] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleCreate = async () => {
//     let payload = {};

//     if (mode === 'direct') {
//       payload = { participantIds: [targetId] };
//     } else if (mode === 'group') {
//       payload = {
//         name,
//         participantIds: participants.split(',').map((id) => id.trim()),
//       };
//     } else if (mode === 'open') {
//       payload = { name, isOpen: true, allowJoinAll };
//     }

//     const res = await chatApi.createRoom(payload);

//     if (res.success) {
//       setMessage('채팅방이 생성되었습니다!');
//       setTimeout(() => onClose(), 1000);
//     } else {
//       setMessage(res.message || '생성 실패');
//     }
//   };

//   return (
//     <div className="modal-backdrop">
//       <div className="modal">
//         <h3>
//           {mode === 'direct'
//             ? '1:1 대화 생성'
//             : mode === 'group'
//               ? '그룹 채팅 생성'
//               : '오픈 채팅 생성'}
//         </h3>

//         {mode === 'direct' && (
//           <input
//             type="text"
//             placeholder="대상 사용자 ID"
//             value={targetId}
//             onChange={(e) => setTargetId(e.target.value)}
//           />
//         )}

//         {mode === 'group' && (
//           <>
//             <input
//               type="text"
//               placeholder="방 이름"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="참여자 IDs (쉼표 구분)"
//               value={participants}
//               onChange={(e) => setParticipants(e.target.value)}
//             />
//           </>
//         )}

//         {mode === 'open' && (
//           <>
//             <input
//               type="text"
//               placeholder="방 이름"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>
//               <input
//                 type="checkbox"
//                 checked={allowJoinAll}
//                 onChange={(e) => setAllowJoinAll(e.target.checked)}
//               />
//               누구나 참여 가능
//             </label>
//           </>
//         )}

//         <div className="modal-actions">
//           <button className="option-btn" onClick={handleCreate}>
//             생성
//           </button>
//           <button className="close-btn" onClick={onClose}>
//             취소
//           </button>
//         </div>

//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default CreateRoomModal;
