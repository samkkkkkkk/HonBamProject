import { useEffect, useRef, useState } from 'react';
import { KAKAO_MAP_API } from '@/util/kakao-config';
import '@/Component/SearchPlace/MapTest.scss';
const { kakao } = window;

const MapTest = () => {
  const container = useRef();
  const ps = new kakao.maps.services.Places();
  const mapRef = useRef(); // map 객체를 useRef로 관리
  const infowindowRef = useRef(); // infowindow 객체를 useRef로 관리

  // 키워드 상태관리 변수
  const [searchValue, setSearchValue] = useState('');

  const searchInputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  // 마커를 담을 배열입니다
  let markers = [];

  // 키워드 검색 요청 함수
  const searchPlaces = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }
    ps.keywordSearch(searchValue, placesSearchCB); // 외부에서 placesSearchCB 호출 가능
  };
  // 키워드로 장소를 검색합니다
  // searchPlaces();

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    const listEl = document.getElementById('placesList'),
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(),
      bounds = new kakao.maps.LatLngBounds();

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title, address) {
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title, address);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindowRef.current.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title, address);
        };

        itemEl.onmouseout = function () {
          infowindowRef.current.close();
        };
      })(marker, places[i].place_name, places[i].address_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    mapRef.current.setBounds(bounds);
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index, places) {
    const el = document.createElement('li');
    let itemStr =
      '<span className="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div className="info">' +
      '   <h5>' +
      places.place_name +
      '</h5>';

    if (places.road_address_name) {
      itemStr +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span className="jibun gray">' +
        places.address_name +
        '</span>';
    } else {
      itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span className="tel">' + places.phone + '</span>' + '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  const addMarker = (position, idx) => {
    const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(mapRef.current); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title, address) {
    const content = `<div style="padding:5px;z-index:1;">${title}<br>${address}</div>`;

    infowindowRef.current.setContent(content);
    infowindowRef.current.open(mapRef.current, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  useEffect(() => {
    let lat, lon;

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude; // 위도
        lon = position.coords.longitude; // 경도

        console.log('위도: ', lat);
        console.log('경도: ', lon);

        const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        mapRef.current.setCenter(locPosition);
        mapRef.current.setLevel(3);

        // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      const locPosition = new kakao.maps.LatLng(37.5760222, 126.9769);
      mapRef.current.setCenter(locPosition);
      mapRef.current.setLevel(3);

      // displayMarker(locPosition, message);
    }

    const options = {
      center: new kakao.maps.LatLng(37.5760222, 126.9769),
      level: 3,
    };

    // map 객체와 infowindow 객체를 useRef에 저장
    mapRef.current = new kakao.maps.Map(container.current, options);
    infowindowRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });
  }, []);

  return (
    <>
      <div className="map_wrap">
        <div
          id="map"
          style={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
          }}
          ref={container}
        ></div>

        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <form onSubmit={searchPlaces}>
                키워드 :{' '}
                <input
                  type="text"
                  id="keyword"
                  size="15"
                  onChange={searchInputHandler}
                />
                <button type="submit">검색하기</button>
              </form>
            </div>
          </div>
          <hr />
          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>
      </div>
    </>
  );
};

export default MapTest;
