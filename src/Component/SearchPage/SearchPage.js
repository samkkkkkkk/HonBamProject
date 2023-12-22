import React, { useState } from 'react';
import './SearchPage.css';
// FontAwesomeIcon으로부터 아이콘들을 가져옴
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faMapLocationDot,
  faPhone,
  faStar,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

// 외부 데이터 파일을 가져옴
import data from '../SearchPage/TemplateData.json';

// 검색 페이지 컴포넌트 정의
function SearchPage() {
  // 검색어를 저장하는 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 즐겨찾기에 추가된 항목의 ID를 저장하는 배열
  const [favorites, setFavorites] = useState([]);

  // 즐겨찾기에 추가된 항목의 제목을 저장하는 배열
  const [favoritedTitles, setFavoritedTitles] = useState([]);

  // 즐겨찾기(별)를 추가하거나 제거하는 함수
  const toggleFavorite = (id) => {
    // data 배열에서 해당 ID의 템플릿을 찾아옴
    const template = data.find((item) => item.id === id);

    // 이미 즐겨찾기에 추가된 경우
    if (favorites.includes(id)) {
      // 해당 ID를 제거
      setFavorites(favorites.filter((favId) => favId !== id));

      // 만약 favoritedTitles가 존재하면
      if (favoritedTitles) {
        // favoritedTitles를 그대로 유지
        setFavoritedTitles(favoritedTitles);
      }

      // 즐겨찾기에 추가되지 않은 경우
    } else {
      // 해당 ID를 추가하고, 항목의 제목을 favoritedTitles 배열에 추가
      setFavorites([...favorites, id]);
      setFavoritedTitles([...favoritedTitles, `${template.title}`]);
    }
  };

  // 검색어 초기화 함수
  const clearSearch = () => {
    setSearchTerm('');
  };

  // 검색어가 입력되었는지 여부를 확인하는 함수
  const isSearchTermEmpty = () => {
    return searchTerm.trim() === '';
  };

  // JSX로 화면 렌더링
  return (
    <div className='search_page'>
      <p className='logo'>HOTPLACE</p>
      <div className='container'>
        <ul className='local_search'>
          <li>지역검색</li>
        </ul>
        <div className='search_bar'>
          {/* 검색어 입력창 */}
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          {/* 검색 버튼 */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='button'
            style={{ display: isSearchTermEmpty() ? 'block' : 'none' }}
          />
          {/* 검색어 초기화 버튼 */}
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className='clear_button'
              onClick={clearSearch}
              style={{ display: 'block' }}
            />
          )}
        </div>
      </div>
      {/* favoritedTitles 배열에 항목이 있는 경우에만 즐겨찾기 목록 표시 */}
      {favoritedTitles.length > 0 && (
        <div className='favorited-titles'>
          <p className='joy'>즐겨찾기</p>
          {/* favoritedTitles 배열을 매핑하여 각 항목과 삭제 버튼을 표시 */}
          {favoritedTitles.map((title, index) => (
            <div
              key={index}
              className='bye-container'
            >
              <div className='bye'>{title}</div>
              {/* 삭제 버튼을 누르면 해당 항목을 favoritedTitles에서 제거 */}
              <button
                className='delete-button'
                onClick={() => {
                  // 삭제 버튼을 클릭한 항목의 ID를 찾아옴
                  const deletedItemId = data.find(
                    (item) => item.title === title
                  ).id;

                  // favoritedTitles에서 해당 항목을 제거
                  setFavoritedTitles(
                    favoritedTitles.filter((t) => t !== title)
                  );

                  // 해당 ID가 favorites 배열에 포함되어 있다면 버튼을 비활성화
                  if (favorites.includes(deletedItemId)) {
                    // 해당 ID를 제거하여 favorites 상태를 업데이트
                    setFavorites(
                      favorites.filter((favId) => favId !== deletedItemId)
                    );
                  }
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
      {/* data 배열을 필터링하여 검색 결과를 표시 */}
      <div className='template_Container'>
        {data
          .filter((val) => {
            // 검색어가 없는 경우 모든 항목을 표시
            if (searchTerm === '') {
              return val;
            } else if (
              // 검색어가 있는 경우 지역에 포함된 항목을 표시
              val.location.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          // 필터링된 결과를 매핑하여 화면에 표시
          .map((val) => {
            const isFavorite = favorites.includes(val.id);

            return (
              <div
                className='template'
                key={val.id}
              >
                <img
                  src={val.image}
                  alt=''
                />
                <h3>{val.title}</h3>
                <p className='location'>
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className='location-icon'
                  ></FontAwesomeIcon>
                  {val.location}
                </p>
                <p className='number'>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className='number-icon'
                  ></FontAwesomeIcon>
                  {val.number}
                </p>
                {/* 별표 아이콘을 클릭하면 즐겨찾기 토글 함수 호출 */}
                <button className='favorites'>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`favorite-icon ${isFavorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(val.id)}
                  />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
