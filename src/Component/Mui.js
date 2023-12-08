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
} from '@mui/material';
import React, { useState } from 'react';

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
        <Box fixed>
          <img
            alt='배경이미지'
            src={require('../assets/komarov-egor-yp20k9i_mZ4-unsplash.jpg')}
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
        <Grid>
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
        </Grid>
      </Grid>
    </>
  );
};

export default Mui;
