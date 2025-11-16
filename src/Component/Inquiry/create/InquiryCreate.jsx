import { useState } from 'react';
import '@/Component/Inquiry/create/InquiryCreate.css';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_BASE_URL, FREEBOARD } from '@/config/host-config';
import { getLoginUserInfo } from '@/util/login-util';

const InquiryCreate = () => {
  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  //컨텐트
  const contentHandler = (e) => {
    setContent(e.target.value);
  };
  console.log('내용', content);

  //이름
  const handleChange = (e) => {
    setTitle(e.target.value);
    console.log('이름', e.target.value);
  };
  console.log('제목', title);
  const formData = {
    title: title,
    content: content,
    userName: localStorage.getItem('LOGIN_USERNAME'),
  };

  const token = getLoginUserInfo().token;

  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
  console.log('토큰', requestHeader);
  console.log('폼데이터 정보', formData);
  const formCreate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${FREEBOARD}`, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify({
          title: title,
          content: content,
          userName: localStorage.getItem('LOGIN_USERNAME'),
        }),
      });
      console.log('응답데이터', response);
      console.log(response.status);
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
    <div className="inquiry_create_backImg">
      <div className="inquiry_create">
        <form>
          <div>
            <label className="inquiry_create_title" htmlFor="title">
              Title
            </label>
            <input
              className="inquiry_create_input_title"
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력해주세요."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="inquiry_create_content" htmlFor="content">
              Content
            </label>
            <textarea
              className="inquiry_create_content_textarea_content"
              name="content"
              id="content"
              placeholder="내용을 입력해주세요"
              value={formData.content}
              onChange={contentHandler}
            />
          </div>
        </form>

        <div className="grid-2">
          <Button className="inquiry_create_ok" onClick={formCreate}>
            등록
          </Button>
          <Button className="inquiry_create_cancel" onClick={formCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InquiryCreate;
