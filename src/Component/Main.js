import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from './scss/MainMui';

import main1 from '../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import main2 from '../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg';
import './Main.scss';
import {
  ArrowForwardIos,
  Home,
  KeyboardArrowRight,
  SwipeRight,
} from '@mui/icons-material';

// Import Swiper React components

const Main = () => {
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
      <Grid
        container
        className={classes.mainContiner}
      >
        <Grid>
          <Box
            fixed='true'
            className={classes.mainBack}
          >
            {/* <Navbar /> */}
            <Box className={classes.mainIntro}>
              <p className='main-intro'>
                <span className='main-honbam'>
                  HONBAM
                  <br />
                  <br />
                </span>
                <span className='honbam-intro'>
                  지금 어떤 안주를 먹고 있는지 어떤 술을 마시고 있는지,
                  <br />
                </span>
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* 입장제한 안내 시작 */}
      <Dialog open={open}>
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
      </Dialog>
      {/* 맛집찾기 페이지 시작 */}

      <Grid
        container
        className={classes.mainContiner}
      >
        <Box
          fixed='true'
          sx={{
            width: '100%',
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
              top: '30%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '30%',
                display: 'flex',
                justifyContent: 'center', //이미지를 수직 가운데 정렬
              }}
            >
              <img
                alt='메인페이지 이미지'
                src={`${main2}`}
                style={{
                  width: '20%',
                }}
              />
              <img
                alt='메인페이지 이미지'
                src={`${main2}`}
                style={{
                  width: '20%',
                }}
              />
              <img
                alt='메인페이지 이미지'
                src={`${main2}`}
                style={{
                  width: '20%',
                }}
              />
              <img
                alt='메인페이지 이미지'
                src={`${main2}`}
                style={{
                  width: '20%',
                }}
              />
            </Box>
          </Box>
          <div className='main-hotplace'>
            <p>
              혼자서도 즐길 수 있는 <br />
              맛집 보러가기
              <ArrowForwardIos
                className={classes.mainArrow}
                fontSize='samll'
              />
            </p>
          </div>
        </Box>
      </Grid>

      {/* 칵테일 레시피 페이지 */}
      <Grid
        container
        className={classes.mainContiner}
      >
        <Grid className={classes.maincolor}>
          <Box
            fixed='true'
            className={classes.mainrecipe}
          >
            <div className='main-recipe'>
              <p className='main-recipe-title'>나만의 칵테일 만들기</p>
              <p className='main-recipe-intro'>
                혼밤이 제공하는 특별한 레시피를 통해 <br />
                나만의 칵테일을 만들어 보세요.
              </p>
            </div>
            <div className='main-recipe-intro main-recipe-detail'>
              <p>
                혼밤에서는 수백가지의 레시피를 제공하고 있습니다.
                <br />
                <br />
                나만의 칵테일을 만들고 공유해 보세요.
              </p>
              <br />
              자세히보기
              <ArrowForwardIos
                className={classes.mainArrow}
                fontSize='samll'
              />
            </div>
          </Box>
        </Grid>
      </Grid>
      {/* 인증샷 페이지 */}
      <Grid
        container
        className={classes.mainContiner}
      >
        {/* <Grid> */}
        {/* <Box
            fixed='true'
            sx={{
              width: '100vw',
              height: '100vh',
              backgroundColor: '#27262b',
              position: 'relative',
            }}
          >
            <div className='main3-title'>
              <p>오늘의 인증샷</p>
            </div> */}
        {/* <ImageList
              sx={{ width: 500, height: 450 }}
              cols={4}
            >
              <ImageListItem>
                <img
                  alt='인증샷이미지'
                  src={require('../assets/ambitious-studio-rick-barrett-QjUY7auDzUQ-unsplash.jpg')}
                />
                <ImageListItemBar
                  title='안녕'
                  subtitle='안녕'
                  position='right'
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  alt='인증샷이미지'
                  src={require('../assets/ambitious-studio-rick-barrett-QjUY7auDzUQ-unsplash.jpg')}
                />
                <ImageListItemBar
                  title='안녕'
                  subtitle='안녕'
                  position='right'
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  alt='인증샷이미지'
                  src={require('../assets/ambitious-studio-rick-barrett-QjUY7auDzUQ-unsplash.jpg')}
                />
                <ImageListItemBar
                  title='안녕'
                  subtitle='안녕'
                  position='right'
                />
              </ImageListItem>
            </ImageList> */}
        {/* <Box
              className='App'
              padding={2}
            >
              <Typography
                variant={'h4'}
                align={'center'}
                fontWeight={700}
              >
                Swiper + Material-UI example
              </Typography>
              
              <Box marginTop={4}>
                <SwipeRight
                  navigation={true}
                  className='mySwiper'
                >
                  
                  {['Slide 1', 'Slide 2', 'Slide 3'].map((item, i) => (
                    <SwiperSlide key={i}>
                      <Typography
                        variant={'h6'}
                        align={'center'}
                      >
                        {item}
                      </Typography>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </Box>
          </Box>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Main;
