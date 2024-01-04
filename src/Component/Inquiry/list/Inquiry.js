import React, { useContext, useEffect, useState } from 'react';
import './Inquiry.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { API_BASE_URL, FREEBOARD } from '../../../util/host-config';
import { getLoginUserInfo } from '../../../util/login-util';
import AuthContext from '../../../util/AuthContext';

const Inquiry = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchInquiryList = async () => {
      const token = getLoginUserInfo().token;

      const requestHeader = {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      };

      try {
        const response = await fetch(`${API_BASE_URL}${FREEBOARD}`, {
          method: 'GET',
          headers: requestHeader,
        });

        console.log('Response:', response);

        if (response.ok) {
          const data = await response.json();
          console.log('Data:', data);

          if (data && Array.isArray(data.posts)) {
            setPostList(data.posts);
          } else {
            console.error('Invalid data format:', data);
            setPostList([]);
          }
        } else {
          console.error('제발 나오지마: ', response.status);
          setPostList([]);
        }
      } catch (error) {
        console.error('너는 왜 나와: ', error);
        setPostList([]);
      }
    };

    fetchInquiryList();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='inquiry_backImg'>
        <h2 className='inquiry_logo'>
          문의글
          <FontAwesomeIcon
            className='inquiry_logo_icon'
            icon={faPenToSquare}
          />
        </h2>
        <div className='inquiry'>
          <h4 className='inquiry-title'>총 게시물 - {postList.length}개</h4>
          <table className='inquiry-table'>
            <colgroup>
              <col
                className='col-no'
                width='15%'
              />
              <col
                className='col-title'
                width='50%'
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
              {currentPosts.map((post) => (
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
                  <td className='col-writer'>{post.userName}</td>
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
              {isLoggedIn ? (
                <Button className='inquiry-create-button'>글쓰기</Button>
              ) : (
                ''
              )}
            </Link>
          </div>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={postPerPage}
            totalItemsCount={postList.length}
            pageRangeDisplayed={5}
            prevPageText={'<'}
            nextPageText={'>'}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Inquiry;
