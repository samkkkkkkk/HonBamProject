import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from '../scss/MainMui';
import { Container } from 'reactstrap';

const MainDialog = () => {
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
      {/* 입장제한 안내 시작 */}

      <Dialog open={open}>
        <DialogTitle
          sx={{
            textAlign: 'center',
          }}
        >
          입장 제한
        </DialogTitle>
        <DialogContentText
          sx={{
            textAlign: 'center',
          }}
        >
          19세 이상만 입장 가능합니다!
        </DialogContentText>
        <DialogActions>
          <Button
            variant='outlined'
            size='small'
            color='success'
            onClick={createHandler}
            sx={{
              mr: '30%',
              opacity: '0.5',
            }}
          >
            입장하기
          </Button>
          {/* <Button
            variant='outlined'
            size='small'
            color='error'
            onClick={cancelHandler}
          >
            나가기
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainDialog;
