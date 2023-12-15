import React from 'react';
import './Modify.css';
import { Link } from 'react-router-dom';

export const Modify = () => {
  return (
    <div className='box3'>
      <div className='group'>
        <div className='LOGIN'>
          <div className='overlap-group'>
            <div className='div-sign-container'>
              <div className='input'>
                <div className='text-wrapper'>
                  <Link to='/MainPage'>
                    <button type='button' className='cancleButton'>
                      CANCLE
                    </button>
                  </Link>
                </div>
              </div>
              <div className='div-wrapper'>
                <div className='div'>MODIFY</div>
              </div>
              <div className='div-placeholder-wrapper'>
                <div className='div-placeholder'>
                  <input
                    className='inputText'
                    type='text'
                    placeholder='ENTER YOUR PHONE NUMBER'
                  ></input>
                </div>
              </div>
              <div className='input-2'>
                <div className='div-placeholder'>
                  <input
                    className='inputText'
                    type='text'
                    placeholder='ENTER YOUR NICKNAME'
                  ></input>
                </div>
              </div>
              <div className='input-3'>
                <div className='div-placeholder'>
                  <input
                    className='inputText'
                    type='password'
                    placeholder='ENTER YOUR PASSWORD(CHECK)'
                  ></input>
                </div>
              </div>
              <div className='input-4'>
                <div className='div-placeholder-2'>
                  <input
                    className='inputText'
                    type='password'
                    placeholder='ENTER YOUR PASSWORD'
                  ></input>
                </div>
              </div>
              <div className='input-5'>
                <div className='div-placeholder-2'>
                  <div className='text-wrapper-4'>CAN'T CHANGE ID</div>
                </div>
              </div>
              <div className='heading'>MODIFY</div>
            </div>
          </div>
          <div className='side-bar'>
            <div className='sidebar-content'>
              <div className='join'>
                <div className='text-wrapper-5'>Join</div>
              </div>
              <div className='login'>
                <div className='text-wrapper-6'>Login</div>
              </div>
              <div className='BOARD'>
                <div className='text-wrapper-7'>BOARD</div>
              </div>
              <div className='CHAT'>
                <div className='text-wrapper-8'>CHAT</div>
              </div>
              <div className='RECIPE'>
                <div className='text-wrapper-9'>RECIPE</div>
              </div>
              <div className='HOTPLACE'>
                <div className='text-wrapper-10'>HOTPLACE</div>
              </div>
            </div>
            <div className='logo'>
              <div className='text-wrapper-11'>HONBAM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
