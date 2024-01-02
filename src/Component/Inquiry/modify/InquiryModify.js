import React, { useEffect, useState } from 'react';
import './InquiryModify.css';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, FREEBOARD } from '../../../util/host-config';
import { getLoginUserInfo } from '../../../util/login-util';

const InquiryModify = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  useEffect(() => {
    // 게시물 내용을 불러오는 API 호출
    const fetchPostContent = async () => {
      try {
        const token = getLoginUserInfo().token;
        const requestHeader = {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        };

        const response = await fetch(
          `${API_BASE_URL}${FREEBOARD}/detail/${id}`,
          {
            method: 'GET',
            headers: requestHeader,
          }
        );
        console.log('Response:', response);

        if (response.ok) {
          const data = await response.json();
          // 불러온 데이터를 폼 데이터로 설정
          console.log('Data:', data);
          setFormData({
            title: data.title,
            content: data.content,
          });
        } else {
          console.error('게시물 내용을 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchPostContent();
  }, [id]);

  const formSave = async () => {
    try {
      const token = getLoginUserInfo().token;
      const requestHeader = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      const response = await fetch(`${API_BASE_URL}${FREEBOARD}/${id}`, {
        method: 'PUT',
        headers: requestHeader,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: '저장',
          text: '수정이 완료되었습니다!',
          icon: 'success',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/freeboard');
        });
      } else {
        console.error('수정 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
        navigate('/freeboard');
      }
    });
  };

  const formDelete = async () => {
    Swal.fire({
      title: '삭제',
      text: '정말로 삭제하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = getLoginUserInfo().token;
          const requestHeader = {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + token,
          };

          const response = await fetch(`${API_BASE_URL}${FREEBOARD}/${id}`, {
            method: 'DELETE',
            headers: requestHeader,
          });

          if (response.ok) {
            Swal.fire({
              title: '삭제 완료',
              text: '삭제가 완료되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
            }).then(() => {
              navigate('/freeboard');
            });
          } else {
            console.error('삭제 실패');
          }
        } catch (error) {
          console.error('에러 발생:', error);
        }
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
    <div className='inquiry_modify_backImg'>
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
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
    </div>
  );
};

export default InquiryModify;
