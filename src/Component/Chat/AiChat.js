import React from 'react';
import './AiChat.css';
import { Link } from 'react-router-dom';
export const AiChat = () => {
  return (
    <div className='ai-chat'>
      <div className='div'>
        <div className='overlap'>
          <div className='rectangle'>
            <div className='chat-header'>
              <Link
                to='/ChatMain'
                className='left-btn'
              ></Link>
              <div className='ai-2' />
            </div>
            <iframe
              className='bamchat'
              allow='microphone;'
              src='https://console.dialogflow.com/api-client/demo/embedded/af1c2e7c-0433-4713-ade0-22cd8251b9a4'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
