import { useEffect } from 'react';
import { KAKAO_MAP_API } from '@/util/kakao-config';

const { kakao } = window;

export const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.555744, 126.937569),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, _pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      let isOpen = false; // 마커마다 개별 상태를 갖도록 위치 변경

      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭할 때마다 isOpen 변수의 상태를 토글
        if (isOpen) {
          infowindow.close(); // 이미 열려있는 경우, 정보창을 닫음
        } else {
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;word-break:break-all;width:200px">' +
              '가게 : ' +
              place.place_name +
              '<br>' +
              '주소 : ' +
              place.address_name +
              '<br>' +
              '전화번호 : ' +
              place.phone +
              '<br>' +
              place.category_name +
              '<br>' +
              '홈페이지 : ' +
              '<a href="' +
              place.place_url +
              '" target="_blank" style="color: blue; text-decoration: underline;">장소 상세 정보 보기</a>' +
              '</div>'
          );
          infowindow.open(map, marker); // 닫혀있는 경우, 정보창을 열음
        }
        isOpen = !isOpen; // isOpen 상태 토글
      });
    }
  }, [searchPlace]);
  return (
    <div
      id="myMap"
      style={{
        // width: '1990px',
        width: '',
        height: '816px',
      }}
    ></div>
  );
};

export default MapContainer;
