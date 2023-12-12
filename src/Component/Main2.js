import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from './scss/MainMui';

import main1 from '../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import main2 from '../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg';
import './Main.scss';
import { ArrowForwardIos, SwipeRight } from '@mui/icons-material';
import ImageGallery from './swiper';
import slides from '../mock.json';

// Import Swiper React components

const Main2 = () => {
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
      <Grid className={classes.mainContiner}>
        <Box
          fixed='true'
          className={classes.mainBack}
        >
          <Box className={classes.mainIntroMui}>
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
          </Box>
        </Box>
        {/* 메인 첫페이지 끝 */}

        {/* 맛집 찾기 시작 */}
        <Box
          fixed='true'
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#27262b',
            position: 'relative',
          }}
        >
          <div className='main2-title'>
            <p>나에게 맞는 맛집 찾기</p>
            <p className='main2-intro'>
              혼밤에서 찾아주는 혼술 맛집을 이용하고 <br />
              공유해 보세요.
            </p>
          </div>
          <Box
            sx={{
              position: 'relative',
              top: '40%',
              width: '100%',
              height: '30%',
              display: 'flex',
              mb: '10%',
              justifyContent: 'center',
            }}
          >
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
          </Box>
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
        </Box>
        {/* 맛집 페이지 끝 */}

        {/* 칵테일 레시피 페이지 시작 */}
        <Box
          fixed='true'
          className={classes.mainrecipeMui}
        >
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
        </Box>
        {/* 칵테일 레시피 끝 */}

        {/* 인증샷 페이지 시작 */}

        <div className='main-shot'>
          <div className='main3-title'>
            <p className='main-title-intro'>오늘의 인증샷</p>
          </div>
          <div className='main-shot-swip'>
            <ImageGallery slides={slides} />
          </div>
        </div>
      </Grid>
      {/* 인증샷 페이지 끝*/}

      {/* 입장제한 안내 시작 */}
      {/* <Dialog open={open}>
        <DialogTitle>입장 제한</DialogTitle>
        <DialogContentText>19세 이상만 입장 가능합니다!</DialogContentText>
        <DialogActions>
          <Button
            variant='outlined'
            size='small'
            color='success'
            onClick={createHandler}
          >
            입장하기
          </Button>
          <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={cancelHandler}
          >
            나가기
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

export default Main2;
