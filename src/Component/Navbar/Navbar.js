import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleToggleClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`app__navbar ${showLinks ? 'active' : ''}`}>
      <div className='app__navbar-logo'>
        <a href='#home'>HONBAM</a>
      </div>
      <ul className={`app__navbar-links ${showLinks ? 'active' : ''}`}>
        <li>
          <a href='#hotplace'>맛집</a>
        </li>
        <li>
          <a href='#recipe'>레시피</a>
        </li>
        <li>
          <a href='#chat'>대화하기</a>
        </li>
        <li>
          <a href='#board'>게시판</a>
        </li>
      </ul>
      <ul className={`app__navbar-login ${showLinks ? 'active' : ''}`}>
        <li>
          <a href='#login'>로그인</a>
        </li>
        <li>
          <a href='#join'>회원가입</a>
        </li>
      </ul>
      <li className='menu'>
        <a
          href='#'
          className='app__navbar-toogleBtn'
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: '#ffffff' }}
          />
        </a>
      </li>
    </nav>
  );
};

export default Navbar;
