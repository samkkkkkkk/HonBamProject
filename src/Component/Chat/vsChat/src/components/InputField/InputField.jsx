import React, { useState } from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';
import './InputField.css';
import EmojiPicker from '../Emoji/EmojiPicker';

const InputField = ({ message, setMessage, sendMessage }) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji);
    setIsEmojiPickerVisible(false);
  };

  const toggleEmojiPicker = (event) => {
    event.preventDefault();
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
  };

  return (
    <div className='input-area'>
      <form
        onSubmit={sendMessage}
        className='input-container'
      >
        <button
          type='button'
          onClick={toggleEmojiPicker}
          onKeyDown={(event) => event.preventDefault()}
        >
          🍺
        </button>
        {isEmojiPickerVisible && (
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        )}
        <Input
          className='chat-input-field'
          placeholder='메시지를 입력하세요..'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
          rows={1}
        />
        <Button
          disabled={message === ''}
          type='submit'
          className='send-button'
        >
          전송
        </Button>
      </form>
    </div>
  );
};

export default InputField;
