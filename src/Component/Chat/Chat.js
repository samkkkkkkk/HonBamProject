import React from 'react';
import './Chat.css';
import { Link } from 'react-router-dom';

export const Chat = () => {
  return (
    <div className='go-honbam-chat-frame'>
      <div className='go-honbam-wrapper'>
        <div className='go-honbam'>
          <div className='chat-go-btn'>
            <Link
              to='/ChatMain'
              className='group'
            >
              <div className='text-wrapper'>GO</div>
            </Link>
          </div>
          <div className='div'>
            <div className='chat-intro'>
              <p className='HONBAM'>
                HONBAM에서 술을 좋아하는 여러 사람들과 이야기하고
                <br />
                만남을 가져보세요.
              </p>
            </div>
            <div className='line'></div>
            <div className='chat-title'>
              <div className='text-wrapper-2'>CHAT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
