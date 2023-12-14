import {} from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from '../scss/MainMui';

import main1 from '../../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import main2 from '../../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg';
import './main2.scss';
import { ArrowForwardIos } from '@mui/icons-material';
import MainDialog from './MainDialog';
import MainShot from './MainShot';
import { useNavigate } from 'react-router-dom';

// Import Swiper React components

const Main2 = () => {
  const redirection = useNavigate();

  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const closeHandler = () => {
    setOpen(false);
  };
  const createHandler = () => {
    setOpen(false);
  };

  const cancelHandler = () => {
    setOpen(false);
  };
  return (
    <>
      <div className='main-container'>
        <div className='main-back'>
          <div className='main-intro'>
            <span className='main-honbam'>
              HONBAM
              <br />
              <br />
            </span>
            <span className='honbam-intro'>
              지금 어떤 안주를 먹고 있는지 어떤 술을 마시고 있는지,
              <br />
            </span>
          </div>
        </div>
      </div>
      {/* </Box> */}
      {/* 메인 첫페이지 끝 */}

      {/* 맛집 찾기 시작 */}
      {/* <Box
        fixed='true'
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#27262b',
          position: 'relative',
        }}
      > */}
      <div className='main2-container'>
        <div className='main2-title'>
          <p>나에게 맞는 맛집 찾기</p>
          <p className='main2-intro'>
            혼밤에서 찾아주는 혼술 맛집을 이용하고 <br />
            공유해 보세요.
          </p>
        </div>

        <div className='main2-box'>
          <img
            alt='메인페이지 이미지'
            src={`${main2}`}
            style={
              {
                // width: '15%',
              }
            }
          />
          <img
            alt='메인페이지 이미지'
            src={`${main2}`}
            style={
              {
                // width: '15%',
              }
            }
          />
          <img
            alt='메인페이지 이미지'
            src={`${main2}`}
            style={
              {
                // width: '15%',
              }
            }
          />
          <img
            alt='메인페이지 이미지'
            src={`${main2}`}
            style={
              {
                // width: '15%',
              }
            }
          />
        </div>

        <div className='main-hotplace'>
          <p className='main-hot-intro'>
            혼자서도 즐길 수 있는 <br />
            맛집 보러가기
            <ArrowForwardIos
              className={classes.mainArrow}
              fontSize='samll'
            />
          </p>
        </div>
      </div>
      {/* </Box> */}
      {/* 맛집 페이지 끝 */}
      {/* 칵테일 레시피 페이지 시작 */}
      <div className='main-recipe-main'>
        <div className='main-recipe'>
          <p className='main-recipe-title'>나만의 칵테일 만들기</p>
          <p className='main-recipe-intro'>
            혼밤이 제공하는 특별한 레시피를 통해 <br />
            나만의 칵테일을 만들어 보세요.
          </p>
        </div>
        <div className='main-recipe-detail'>
          <p className='main-recipe-route'>
            혼밤에서는 수백가지의 레시피를 제공하고 있습니다.
            <br />
            <br />
            나만의 칵테일을 만들고 공유해 보세요.
            <br />
            자세히보기
            <ArrowForwardIos fontSize='samll' />
          </p>
        </div>
      </div>
      {/* 칵테일 레시피 끝 */}
      <MainShot />
      <MainDialog />
    </>
  );
};

export default Main2;
