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
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import { useStyles } from './scss/MainMui';

import main1 from '../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import main2 from '../assets/michele-blackwell-rAyCBQTH7ws-unsplash.jpg';
import './Main.scss';
import { Row } from 'reactstrap';

const Mui = () => {
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
            <Navbar />
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
      {/* <Grid container>
        <Grid
          item
          xs={12}
        >
          <p className='main2-title'>나에게 맞는 맛집 찾기</p>
        </Grid>
        <Box
          fixed='true'
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#27262b',
            position: 'relative',
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
      </Grid> */}

      <Grid
        container
        sx={{
          direction: 'row',
        }}
      >
        <Grid>
          <Box
            fixed='true'
            sx={{
              width: '100vw',
              height: '100vh',
              backgroundColor: '#27262b',
              position: 'relative',
            }}
          >
            <p className='main2-title'>나에게 맞는 맛집 찾기</p>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Mui;
