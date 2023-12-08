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

import main1 from '../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg';
import './Main.scss';

const Mui = () => {
  const [open, setOpen] = useState(true);

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
      <Grid container>
        <Grid>
          <Box
            fixed='true'
            sx={{
              backgroundImage: `url(${main1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              height: '100vh',
              width: '100%',
            }}
          >
            <Navbar />
            <Box
              sx={{
                position: 'absolute',
                left: '10%',
                top: '36%',
              }}
            >
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
    </>
  );
};

export default Mui;
