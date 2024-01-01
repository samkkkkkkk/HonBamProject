import React, { useEffect, useState } from 'react';
import './Inquiry.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { API_BASE_URL, FREEBOARD } from '../../../util/host-config';

const Inquiry = () => {
  const [postList, setPostList] = useState([]);
  const postPerPage = 5;

  useEffect(() => {
    const fetchInquiryList = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${FREEBOARD}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPostList(data);
        } else {
          console.error('제발 나오지마: ', response.status);
        }
      } catch (error) {
        console.error('너는 왜 나와: ', error);
      }
    };

    fetchInquiryList();
  }, []);

  return (
    <>
      <h2 className='inquiry_logo'>
        문의글
        <FontAwesomeIcon
          className='inquiry_logo_icon'
          icon={faPenToSquare}
        />
      </h2>
      <div className='inquiry'>
        <h4 className='inquiry-title'>Total post: {postList.length}개</h4>
        <table className='inquiry-table'>
          <colgroup>
            <col
              className='col-no'
              width='15%'
            />
            <col
              className='col-title'
              width='65%'
            />
            <col
              className='col-writer'
              width='15%'
            ></col>
            <col
              className='col-date'
              width='20%'
            />
          </colgroup>
          <thead>
            <tr>
              <th className='col-no'>No</th>
              <th className='col-title'>Title</th>
              <th className='col-writer'>Writer</th>
              <th className='col-date'>Date</th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => (
              <tr key={post.id}>
                <td className='col-no'>{post.id}</td>
                <td className='col-title'>
                  <Link
                    to={`/freeboard/${post.id}`}
                    className='inquiry-link'
                  >
                    {post.title}
                  </Link>
                </td>
                <td className='col-writer'>{post.writer}</td>
                <td className='col-date'>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='grid-2'>
          <Link
            to='/freeboard/create'
            className='inquiry-create-link'
          >
            <Button className='inquiry-create-button'>글쓰기</Button>
          </Link>
        </div>
        <Pagination
          itemsCountPerPage={postPerPage}
          totalItemsCount={postList.length}
          pageRangeDisplayed={5}
          prevPageText={'<'}
          nextPageText={'>'}
        />
      </div>
    </>
  );
};

export default Inquiry;
