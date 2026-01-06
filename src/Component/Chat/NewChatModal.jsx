import React, { useState } from 'react';
import { useChat } from '@/util/ChatContext';
import './NewChatModal.css';

const NewChatModal = ({ onClose }) => {
  const { createRoom, fetchRooms } = useChat();

  const [roomName, setRoomName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [allowJoinAll, setAllowJoinAll] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');

  const handleAddParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant)) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter((p) => p !== id));
  };

  const handleSubmit = async () => {
    if (isOpen && !roomName.trim()) {
      alert('채팅방 이름을 입력하세요');
      return;
    }

    const payload = {
      name: roomName,
      isOpen,
      allowJoinAll,
      participantIds: participants,
    };

    console.log('createRoom payload', payload);

    const res = await createRoom(payload);

    if (res.success) {
      alert('채팅방이 생성되었습니다!');
      await fetchRooms(); // 목록 갱신 보장
      onClose();
    } else {
      alert(res.message || '채팅방 생성 실패');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>새 채팅방 만들기</h2>

        {/* 방 이름 */}
        <div className="form-group">
          <label>방 이름</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="채팅방 이름 입력"
          />
        </div>

        {/* 오픈 채팅 여부 */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={isOpen}
              onChange={(e) => setIsOpen(e.target.checked)}
            />
            오픈 채팅방
          </label>
        </div>

        {/* 자유입장 허용 (isOpen이 true일 때만 활성화) */}
        {isOpen && (
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={allowJoinAll}
                onChange={(e) => setAllowJoinAll(e.target.checked)}
              />
              누구나 참여 가능
            </label>
          </div>
        )}

        {/* 참여자 추가 */}
        <div className="form-group">
          <label>참여자 추가</label>
          <div className="participant-input">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              placeholder="사용자 ID 입력"
            />
            <button onClick={handleAddParticipant}>추가</button>
          </div>
          <ul className="participant-list">
            {participants.map((p) => (
              <li key={p}>
                {p}{' '}
                <button onClick={() => handleRemoveParticipant(p)}>❌</button>
              </li>
            ))}
          </ul>
        </div>

        {/* 버튼 */}
        <div className="modal-actions">
          <button onClick={handleSubmit} className="create-btn">
            생성
          </button>
          <button onClick={onClose} className="cancel-btn">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
