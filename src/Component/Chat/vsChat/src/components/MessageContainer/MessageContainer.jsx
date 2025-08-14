import { useEffect, useRef } from 'react';
import '@/Component/Chat/vsChat/src/components/MessageContainer/MessageContainer.css';
import { Container } from '@mui/system';

const MessageContainer = ({ messageList, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messageList]);

  return (
    <div className="chatForm">
      {messageList.map((message, index) => {
        const senderName = message.user.name;
        const prevMessage = index > 0 ? messageList[index - 1] : null;
        return (
          <Container key={message._id} className="message-container">
            {message.user.name === 'system' ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <div
                  className="profile"
                  style={
                    !prevMessage ||
                    prevMessage.user.name !== senderName ||
                    prevMessage.user.name === 'system'
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                >
                  {senderName}
                </div>
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageContainer;
