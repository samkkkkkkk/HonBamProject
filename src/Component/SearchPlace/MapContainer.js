import React, { useEffect } from 'react';

const { kakao } = window;
<script
  type='text/javascript'
  src='//dapi.kakao.com/v2/maps/sdk.js?appkey=9744bd2d6deea0a62f8265bace50c30f&libraries=services'
></script>;
export const MapContainer = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            '<br>' +
            place.address_name +
            '</div>'
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <div
      id='myMap'
      style={{
        width: '1920px',
        height: '793px',
      }}
    ></div>
  );
};

export default MapContainer;
