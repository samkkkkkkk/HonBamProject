import '@/Component/Chat/ChatMain.css';
import { Link } from 'react-router-dom';

export const ChatMain = () => {
  return (
    <div className="chat-main">
      <div className="div">
        <div className="div-2">
          <div className="chat-body">
            <div className="ai-btn">
              <Link to="/AiChat" className="overlap-group">
                밤밤이 Ai와 채팅하기
              </Link>
            </div>
            <Link to="/ChatApp" className="random-btn">
              <div className="div-wrapper">회원들과 채팅하기</div>
            </Link>
          </div>
          <div className="chat-title-text">HONBAM CHAT</div>
        </div>
      </div>
    </div>
  );
};
