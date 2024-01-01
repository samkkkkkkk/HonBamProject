import { useEffect, useState } from 'react';
import './ChatApp.css';
import socket from './server';
import InputField from './components/InputField/InputField';
import MessageContainer from './components/MessageContainer/MessageContainer';

function ChatApp() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  console.log('message list', messageList);
  //이름 입력 부분
  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);
  // ^ 이름을 받음
  const askUserName = () => {
    const userName = prompt('당신의 이름을 입력하세요');
    console.log('uuu', userName); // 이름 받았는지 확인

    socket.emit('login', userName, (res) => {
      // console.log('Res', res);
      if (res?.ok) {
        setUser(res.data);
      }
    }); // 유저 이름 말하기 - 이제 백엔드에서 들어야 된다. (12/24 11:01)
  };
  const sendMessage = (event) => {
    // 금지어 목록
    const forbiddenWords = ['심한욕', '심한말', '금지어', '욕설']; // 여기에 금지어를 추가.

    //submit 작업이 페이지 리프레시 시키는것을 막는 작업
    event.preventDefault();
    // 금지어 체크
    if (forbiddenWords.some((word) => message.includes(word))) {
      // 금지어가 포함된 경우 처리
      alert('금지어가 포함되어 메시지를 전송할 수 없습니다.');
    } else {
      // 금지어가 없는 경우 메시지 전송
      socket.emit('sendMessage', message, (res) => {
        console.log('sendMessage res', res);
      });
      setMessage('');
    }
  };
  return (
    <div className='chatForm'>
      <div className='App'>
        <div className='defaultMessage'>
          HONBAM
          <br />
          honbam은 회원님들의 안전한 대화를 위해 노력하고 있습니다. <br />
          음란, 욕설, 인종차별, 금전 요구, 홍보 행위시 영구 정지되고 <br />
          형사처분을 받을 수 있습니다.
          <br />
        </div>
        <div className='line'></div>
        <MessageContainer
          messageList={messageList}
          user={user}
        />
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}
export { ChatApp };
