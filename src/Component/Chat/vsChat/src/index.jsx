import ReactDOM from 'react-dom/client';
import '@/Component/Chat/vsChat/src/index.css';
import ChatApp from '@/Component/Chat/vsChat/src/ChatApp';
import reportWebVitals from '@/Component/Chat/vsChat/src/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChatApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
