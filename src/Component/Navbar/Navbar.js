import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);

  const handleToggleClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`app__navbar ${showLinks ? 'active' : ''}`}>
      <div className='app__navbar-logo'>
        <Link to='/'>HONBAM</Link>
      </div>
      <ul className={`app__navbar-links ${showLinks ? 'active' : ''}`}>
        <li>
          <Link to='/search'>맛집</Link>
        </li>
        <li>
          <Link to='/recipe'>레시피</Link>
        </li>
        <li>
          <Link to='/chat'>대화하기</Link>
        </li>
        <li>
          <Link to='/board'>게시판</Link>
        </li>
      </ul>
      <ul className={`app__navbar-login ${showLinks ? 'active' : ''}`}>
        <li>
          <Link to='/login'>로그인</Link>
        </li>
        <li>
          <Link to='/join'>회원가입</Link>
        </li>
      </ul>
      <li className='menu'>
        <a
          href='#'
          className='app__navbar-toogleBtn'
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
        </a>
      </li>
    </nav>
  );
};

export default Navbar;
