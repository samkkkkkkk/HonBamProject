import { LabelRounded } from '@mui/icons-material';
import React from 'react';
import './InquiryModify.css';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const InquiryModify = () => {
  const formSave = () => {
    Swal.fire({
      title: '저장',
      text: '수정이 완료되었습니다!',
      icon: 'success',
      confirmButtonText: '확인',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/freeboard';
      }
    });
  };

  const formCancel = () => {
    Swal.fire({
      title: '취소',
      text: '정말로 취소하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/freeboard';
      }
    });
  };

  const formDelete = () => {
    Swal.fire({
      title: '삭제',
      text: '정말로 삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '삭제 완료',
          text: '삭제가 완료되었습니다.',
          icon: 'success',
          confirmButtonText: '확인',
        }).then(() => {
          window.location.href = '/freeboard';
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: '취소',
          text: '삭제가 취소되었습니다.',
          icon: 'info',
          confirmButtonText: '확인',
        });
      }
    });
  };
  return (
    <div className='inquiry_modify'>
      <form>
        <div>
          <label
            className='inquiry_modify_title'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='inquiry_modify_input_title'
            type='text'
            id='title'
            placeholder='제목을 입력해주세요.'
          />
        </div>
        <div>
          <label
            className='inquiry_modify_content'
            htmlFor='content'
          >
            Content
          </label>
          <textarea
            className='inquiry_modify_textarea_content'
            name='content'
            id='content'
            placeholder='내용을 입력해주세요'
          />
        </div>
      </form>

      <div className='grid-2'>
        <Button
          className='inquiry_modify_save_button'
          children='저장'
          onClick={formSave}
        />
        <Button
          className='inquiry_modify_cancel_button'
          children='취소'
          onClick={formCancel}
        />
        <Button
          className='inquiry_modify_delete_button'
          children='삭제'
          onClick={formDelete}
        />
      </div>
    </div>
  );
};

export default InquiryModify;
