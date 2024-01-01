import React, { useState } from 'react';
import './InquiryCreate.css';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_BASE_URL, FREEBOARD } from '../../../util/host-config';

const InquiryCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formCreate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${FREEBOARD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: '등록',
          text: '등록이 완료되었습니다!',
          icon: 'success',
          confirmButtonText: '확인',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/freeboard';
          }
        });
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error during create post:', error);
    }
  };

  const formCancel = () => {
    Swal.fire({
      title: '취소',
      text: '정말로 작업을 이전으로 돌아가시겠습니까?',
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

  return (
    <div className='inquiry_create'>
      <form>
        <div>
          <label
            className='inquiry_create_title'
            htmlFor='title'
          >
            Title
          </label>
          <input
            className='inquiry_create_input_title'
            type='text'
            id='title'
            name='title'
            placeholder='제목을 입력해주세요.'
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className='inquiry_create_content'
            htmlFor='content'
          >
            Content
          </label>
          <textarea
            className='inquiry_create_content_textarea_content'
            name='content'
            id='content'
            placeholder='내용을 입력해주세요'
            value={formData.content}
            onChange={handleChange}
          />
        </div>
      </form>

      <div className='grid-2'>
        <Button
          className='inquiry_create_ok'
          children='등록'
          onClick={formCreate}
        />
        <Button
          className='inquiry_create_cancel'
          children='취소'
          onClick={formCancel}
        />
      </div>
    </div>
  );
};

export default InquiryCreate;
