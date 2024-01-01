import React, { useEffect, useState } from 'react';
import './NaverSearch.css';

const NaverSearch = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=4lscjh9slv';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const location1 = new window.naver.maps.LatLng(37.5898553, 127.0192489);
      const location2 = new window.naver.maps.LatLng(37.6154444, 126.9132682);
      const location3 = new window.naver.maps.LatLng(37.6428054, 127.0165487);
      const location4 = new window.naver.maps.LatLng(37.5418791, 126.9510494);
      const location5 = new window.naver.maps.LatLng(37.5482465, 126.9131681);
      const location6 = new window.naver.maps.LatLng(37.59006, 126.91771);
      const location7 = new window.naver.maps.LatLng(37.5641832, 126.9944846);
      const location8 = new window.naver.maps.LatLng(37.5101987, 127.0350358);
      const location9 = new window.naver.maps.LatLng(37.5225532, 126.8963375);
      const location10 = new window.naver.maps.LatLng(37.4814329, 126.8978234);
      const location11 = new window.naver.maps.LatLng(37.4814329, 126.8978234);
      const location12 = new window.naver.maps.LatLng(37.5816994, 126.9818127);
      const location13 = new window.naver.maps.LatLng(37.532889, 126.9718015);
      const location14 = new window.naver.maps.LatLng(37.5590727, 126.9239251);
      const location15 = new window.naver.maps.LatLng(37.5037511, 126.890455);
      const location16 = new window.naver.maps.LatLng(37.5543465, 126.9299231);
      const location17 = new window.naver.maps.LatLng(37.4859859, 126.9807296);
      const location18 = new window.naver.maps.LatLng(37.5551204, 126.9296084);
      const location19 = new window.naver.maps.LatLng(37.5449129, 126.9476016);
      const location20 = new window.naver.maps.LatLng(37.5549978, 126.9241356);
      const location21 = new window.naver.maps.LatLng(37.5784577, 126.9245624);
      const location22 = new window.naver.maps.LatLng(37.5426843, 126.9714995);
      const location23 = new window.naver.maps.LatLng(37.5598946, 126.9254314);
      const location24 = new window.naver.maps.LatLng(37.5380941, 127.0025734);
      const location25 = new window.naver.maps.LatLng(37.4868513, 126.926148);
      const location26 = new window.naver.maps.LatLng(37.5582972, 126.9361837);
      const location27 = new window.naver.maps.LatLng(37.5611476, 126.6733506);
      const location28 = new window.naver.maps.LatLng(37.57636, 126.8953574);
      const location29 = new window.naver.maps.LatLng(37.538109, 126.965037);
      const location30 = new window.naver.maps.LatLng(37.6056217, 126.9146815);
      const location31 = new window.naver.maps.LatLng(37.5887021, 127.0092286);
      const location32 = new window.naver.maps.LatLng(37.5455526, 127.1392463);
      const location33 = new window.naver.maps.LatLng(37.5397641, 126.9473823);
      const location34 = new window.naver.maps.LatLng(37.5613539, 126.996641);
      const location35 = new window.naver.maps.LatLng(37.5466891, 126.9144038);
      const location36 = new window.naver.maps.LatLng(37.5478399, 126.9240628);
      const location37 = new window.naver.maps.LatLng(37.5434908, 126.9734801);
      const location38 = new window.naver.maps.LatLng(37.5538468, 126.9042477);
      const location39 = new window.naver.maps.LatLng(37.5472665, 126.9172257);
      const location40 = new window.naver.maps.LatLng(37.550817, 126.9200251);
      const location41 = new window.naver.maps.LatLng(37.5539574, 126.9222305);
      const location42 = new window.naver.maps.LatLng(37.5846715, 126.91181);
      const location43 = new window.naver.maps.LatLng(37.5463123, 126.9802994);
      const location44 = new window.naver.maps.LatLng(37.5513096, 126.9561662);
      const location45 = new window.naver.maps.LatLng(37.5582904, 126.9348137);
      const location46 = new window.naver.maps.LatLng(37.5563948, 126.9159392);
      const location47 = new window.naver.maps.LatLng(37.5400062, 126.9439926);
      const location48 = new window.naver.maps.LatLng(37.5589859, 126.9356204);
      const location49 = new window.naver.maps.LatLng(37.5573808, 126.938277);
      const location50 = new window.naver.maps.LatLng(37.5549359, 126.9328463);
      const location51 = new window.naver.maps.LatLng(37.5371732, 126.8956059);
      const location52 = new window.naver.maps.LatLng(37.505772, 126.8916822);
      const location53 = new window.naver.maps.LatLng(37.4885326, 126.8906507);
      const location54 = new window.naver.maps.LatLng(37.4834314, 126.9280819);
      const location55 = new window.naver.maps.LatLng(37.5121109, 126.937616);
      const location56 = new window.naver.maps.LatLng(37.5853176, 126.9482821);
      const location57 = new window.naver.maps.LatLng(37.5876181, 126.9434569);
      const location58 = new window.naver.maps.LatLng(37.5748414, 126.9694889);
      const location59 = new window.naver.maps.LatLng(37.5711676, 126.981274);
      const location60 = new window.naver.maps.LatLng(37.5718599, 126.9812675);

      const mapOptions = {
        center: location1.destinationPoint(0, 0),
        zoom: 13,
      };

      const map = new window.naver.maps.Map('map', mapOptions);
      // Marker 1
      const marker1 = new window.naver.maps.Marker({
        map: map,
        position: location1,
      });

      const contentString1 = [
        '<div class="naverMap">',
        '   <h3>혼술주점혜화동</h3>',
        '   <p>동선동2가 67번지 지층 성북구 서울특별시<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%A3%BC%EC%A0%90%ED%98%9C%ED%99%94%EB%8F%99/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357cbcb86e214af3:0x9e94e9bee3d6a994!8m2!3d37.5898553!4d127.0192489!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11f64dsj6t?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow1 = new window.naver.maps.InfoWindow({
        content: contentString1,
      });

      window.naver.maps.Event.addListener(marker1, 'click', function (e) {
        if (infowindow1.getMap()) {
          infowindow1.close();
        } else {
          infowindow1.open(map, marker1);
        }
      });

      infowindow1.open(map, marker1);

      // Marker 2
      const marker2 = new window.naver.maps.Marker({
        map: map,
        position: location2,
      });

      const contentString2 = [
        '<div class="naverMap">',
        '   <h3>혼술은인생이다.</h3>',
        '   <p>서울특별시 은평구 갈현제2동 496-3<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%9D%80%EC%9D%B8%EC%83%9D%EC%9D%B4%EB%8B%A4/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c99e8ff11bbc9:0xc0163a8e213ee3f0!8m2!3d37.6154444!4d126.9132682!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJMYURsTU1FeG5FQUXgAQA!16s%2Fg%2F11kf9cvdv6?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow2 = new window.naver.maps.InfoWindow({
        content: contentString2,
      });

      window.naver.maps.Event.addListener(marker2, 'click', function (e) {
        if (infowindow2.getMap()) {
          infowindow2.close();
        } else {
          infowindow2.open(map, marker2);
        }
      });

      infowindow2.open(map, marker2);

      // Marker 3
      const marker3 = new window.naver.maps.Marker({
        map: map,
        position: location3,
      });

      const contentString3 = [
        '<div class="naverMap">',
        '   <h3>혼술</h3>',
        '   <p>서울특별시 강북구 수유동 335-11번지 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357cbc3d0f89d539:0xfec3340df5b7ed73!8m2!3d37.6428054!4d127.0165487!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11j4fd7myz?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow3 = new window.naver.maps.InfoWindow({
        content: contentString3,
      });

      window.naver.maps.Event.addListener(marker3, 'click', function (e) {
        if (infowindow3.getMap()) {
          infowindow3.close();
        } else {
          infowindow3.open(map, marker3);
        }
      });

      infowindow3.open(map, marker3);

      // Marker 4
      const marker4 = new window.naver.maps.Marker({
        map: map,
        position: location4,
      });

      const contentString4 = [
        '<div class="naverMap">',
        '   <h3>하네집</h3>',
        '   <p>서울특별시 마포구 도화동 번지 183-6 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%95%98%EB%84%A4%EC%A7%91/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c98a6f95058ed:0xd0b6581b9829846b!8m2!3d37.5418791!4d126.9510494!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11j4fd25m2?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow4 = new window.naver.maps.InfoWindow({
        content: contentString4,
      });

      window.naver.maps.Event.addListener(marker4, 'click', function (e) {
        if (infowindow4.getMap()) {
          infowindow4.close();
        } else {
          infowindow4.open(map, marker4);
        }
      });

      infowindow4.open(map, marker4);

      // Marker 5
      const marker5 = new window.naver.maps.Marker({
        map: map,
        position: location5,
      });

      const contentString5 = [
        '<div class="naverMap">',
        '   <h3>익순</h3>',
        '   <p>서울특별시 마포구 합정동 375-1<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9D%B5%EC%88%9C/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c99e387946be1:0xfd40db3f2c0273f5!8m2!3d37.5482465!4d126.9131681!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU56YkdKcGFraEJFQUXgAQA!16s%2Fg%2F11g_z2j9_h?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow5 = new window.naver.maps.InfoWindow({
        content: contentString5,
      });

      window.naver.maps.Event.addListener(marker5, 'click', function (e) {
        if (infowindow5.getMap()) {
          infowindow5.close();
        } else {
          infowindow5.open(map, marker5);
        }
      });

      infowindow5.open(map, marker5);

      // Marker 6
      const marker6 = new window.naver.maps.Marker({
        map: map,
        position: location6,
      });

      const contentString6 = [
        '<div class="naverMap">',
        '   <h3>혼술남녀</h3>',
        '   <p>응암동 323-6번지 1층 은평구 서울특별시<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EB%82%A8%EB%85%80/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c984e6870fc29:0x17aa43aab93dddf0!8m2!3d37.59006!4d126.91771!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11f64dywmx?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow6 = new window.naver.maps.InfoWindow({
        content: contentString6,
      });

      window.naver.maps.Event.addListener(marker6, 'click', function (e) {
        if (infowindow6.getMap()) {
          infowindow6.close();
        } else {
          infowindow6.open(map, marker6);
        }
      });

      infowindow6.open(map, marker6);

      // Marker 7
      const marker7 = new window.naver.maps.Marker({
        map: map,
        position: location7,
      });

      const contentString7 = [
        '<div class="naverMap">',
        '   <h3>인현골방</h3>',
        '   <p>서울특별시 중구 인현동1가 87-20 2층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9D%B8%ED%98%84%EA%B3%A8%EB%B0%A9/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357ca3d77a907d6f:0xecedfd228b488fc2!8m2!3d37.5641832!4d126.9944846!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJIYVhKTE4xbDNFQUXgAQA!16s%2Fg%2F11rsh216ds?hl=ko&entry=ttu">구글 지도로 보기 / </a>',
        '       <a href="https://www.instagram.com/inhyungolbang/">인스타그램 보기</a>',

        '   </p>',
        '</div>',
      ].join('');

      const infowindow7 = new window.naver.maps.InfoWindow({
        content: contentString7,
      });

      window.naver.maps.Event.addListener(marker7, 'click', function (e) {
        if (infowindow7.getMap()) {
          infowindow7.close();
        } else {
          infowindow7.open(map, marker7);
        }
      });

      infowindow7.open(map, marker7);

      // Marker 8
      const marker8 = new window.naver.maps.Marker({
        map: map,
        position: location8,
      });

      const contentString8 = [
        '<div class="naverMap">',
        '   <h3>혼술대왕</h3>',
        '   <p>서울특별시 강남구 논현동 226번지 202호<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EB%8C%80%EC%99%95/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357ca3737d88d1a5:0x2a00aeea86b89446!8m2!3d37.5101987!4d127.0350358!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11h8jl2szr?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow8 = new window.naver.maps.InfoWindow({
        content: contentString8,
      });

      window.naver.maps.Event.addListener(marker8, 'click', function (e) {
        if (infowindow8.getMap()) {
          infowindow8.close();
        } else {
          infowindow8.open(map, marker8);
        }
      });

      infowindow8.open(map, marker8);

      // Marker 9
      const marker9 = new window.naver.maps.Marker({
        map: map,
        position: location9,
      });

      const contentString9 = [
        '<div class="naverMap">',
        '   <h3>더핸드</h3>',
        '   <p>서울특별시 영등포구 당산동1가 당산로16길 3-1<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8D%94%ED%95%B8%EB%93%9C/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c9eee22092eed:0x4e21e3a9624afebd!8m2!3d37.5225532!4d126.8963375!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU56WjA1SVRIaFJSUkFC4AEA!16s%2Fg%2F11c57kk78v?hl=ko&entry=ttu">구글 지도로 보기／</a>',
        '       <a href="https://www.instagram.com/j.b.thehand?igshid=MWZjMTM2ODFkZg%3D%3D">인스타그램 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow9 = new window.naver.maps.InfoWindow({
        content: contentString9,
      });

      window.naver.maps.Event.addListener(marker9, 'click', function (e) {
        if (infowindow9.getMap()) {
          infowindow9.close();
        } else {
          infowindow9.open(map, marker9);
        }
      });

      infowindow9.open(map, marker9);

      // Marker 10
      const marker10 = new window.naver.maps.Marker({
        map: map,
        position: location10,
      });

      const contentString10 = [
        '<div class="naverMap">',
        '   <h3>혼술청춘</h3>',
        '   <p>서울특별시 구로구 디지털로32가길 48<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%B2%AD%EC%B6%98/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c9e25b4f67033:0x501b0b2195d170c6!8m2!3d37.4814329!4d126.8978234!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQY21KSFZVMW5FQUXgAQA!16s%2Fg%2F11f3xxq5cj?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow10 = new window.naver.maps.InfoWindow({
        content: contentString10,
      });

      window.naver.maps.Event.addListener(marker10, 'click', function (e) {
        if (infowindow10.getMap()) {
          infowindow10.close();
        } else {
          infowindow10.open(map, marker10);
        }
      });

      infowindow10.open(map, marker10);

      // Marker 11
      const marker11 = new window.naver.maps.Marker({
        map: map,
        position: location11,
      });

      const contentString11 = [
        '<div class="naverMap">',
        '   <h3>혼밥혼술</h3>',
        '   <p>서울특별시 마포구 노고산동 19-40번지 1층 우측 1호 48<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%B2%AD%EC%B6%98/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c9e25b4f67033:0x501b0b2195d170c6!8m2!3d37.4814329!4d126.8978234!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJQY21KSFZVMW5FQUXgAQA!16s%2Fg%2F11f3xxq5cj?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow11 = new window.naver.maps.InfoWindow({
        content: contentString11,
      });

      window.naver.maps.Event.addListener(marker11, 'click', function (e) {
        if (infowindow11.getMap()) {
          infowindow11.close();
        } else {
          infowindow11.open(map, marker11);
        }
      });

      infowindow11.open(map, marker11);

      // Marker 12
      const marker12 = new window.naver.maps.Marker({
        map: map,
        position: location12,
      });

      const contentString12 = [
        '<div class="naverMap">',
        '   <h3>Kisa</h3>',
        '   <p>서울특별시 종로구 북촌로5나길 3-15<br />',
        '       <a href="https://www.google.co.kr/maps/place/Kisa/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357ca2cf19d38c77:0x5b704679736c111!8m2!3d37.5816994!4d126.9818127!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJDYWt0TU0wNW5FQUXgAQA!16s%2Fg%2F11j4ff07hm?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow12 = new window.naver.maps.InfoWindow({
        content: contentString12,
      });

      window.naver.maps.Event.addListener(marker12, 'click', function (e) {
        if (infowindow12.getMap()) {
          infowindow12.close();
        } else {
          infowindow12.open(map, marker12);
        }
      });

      infowindow12.open(map, marker12);

      // Marker 13
      const marker13 = new window.naver.maps.Marker({
        map: map,
        position: location13,
      });

      const contentString13 = [
        '<div class="naverMap">',
        '   <h3>h245</h3>',
        '   <p>서울특별시 용산구 한강로1가 245-6<br />',
        '       <a href="https://www.google.co.kr/maps/place/h245/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357ca2176b37316f:0x9bf017e02fd0fabc!8m2!3d37.532889!4d126.9718015!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU0wTms5SGEwbFJFQUXgAQA!16s%2Fg%2F11dyqs85zp?hl=ko&entry=ttu">구글 지도로 보기／</a>',
        '       <a href="https://brunch.co.kr/@auraplantfoodie/2">블로그 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow13 = new window.naver.maps.InfoWindow({
        content: contentString13,
      });

      window.naver.maps.Event.addListener(marker13, 'click', function (e) {
        if (infowindow13.getMap()) {
          infowindow13.close();
        } else {
          infowindow13.open(map, marker13);
        }
      });

      infowindow13.open(map, marker13);

      // Marker 14
      const marker14 = new window.naver.maps.Marker({
        map: map,
        position: location14,
      });

      const contentString14 = [
        '<div class="naverMap">',
        '   <h3>깃털</h3>',
        '   <p>서울특별시 마포구 KR 서울특별시 마포구 동교동 153-11번지 2층 전체<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EA%B9%83%ED%84%B8/data=!4m10!1m2!2m1!1z7Zi87Iig!3m6!1s0x357c98e8306e511b:0xd5b254b6634113bb!8m2!3d37.5590727!4d126.9239251!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJ6TUhGUGRqWm5SUkFC4AEA!16s%2Fg%2F11f64ddtjg?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow14 = new window.naver.maps.InfoWindow({
        content: contentString14,
      });

      window.naver.maps.Event.addListener(marker14, 'click', function (e) {
        if (infowindow14.getMap()) {
          infowindow14.close();
        } else {
          infowindow14.open(map, marker14);
        }
      });

      infowindow14.open(map, marker14);

      // Marker 15
      const marker15 = new window.naver.maps.Marker({
        map: map,
        position: location15,
      });

      const contentString15 = [
        '<div class="naverMap">',
        '   <h3>혼술집려</h3>',
        '   <p>서울특별시 구로구 구로동 33-9번지<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%A7%91%EB%A0%A4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c9e42891c0459:0x5d869bdf4e1ea8ae!8m2!3d37.5037511!4d126.890455!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU56YjBwUWRUaFJSUkFC4AEA!16s%2Fg%2F11ghrgxz5d?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow15 = new window.naver.maps.InfoWindow({
        content: contentString15,
      });

      window.naver.maps.Event.addListener(marker15, 'click', function (e) {
        if (infowindow15.getMap()) {
          infowindow15.close();
        } else {
          infowindow15.open(map, marker15);
        }
      });

      infowindow15.open(map, marker15);

      // Marker 16
      const marker16 = new window.naver.maps.Marker({
        map: map,
        position: location16,
      });

      const contentString16 = [
        '<div class="naverMap">',
        '   <h3>비행술</h3>',
        '   <p>서울특별시 마포구 와우산로 150-2 2층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%B9%84%ED%96%89%EC%88%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98c052d54ddb:0xaa86ae77c11922b5!8m2!3d37.5543465!4d126.9299231!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJSYkMwelVFaEJFQUXgAQA!16s%2Fg%2F11bx44ctt3?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow16 = new window.naver.maps.InfoWindow({
        content: contentString16,
      });

      window.naver.maps.Event.addListener(marker16, 'click', function (e) {
        if (infowindow16.getMap()) {
          infowindow16.close();
        } else {
          infowindow16.open(map, marker16);
        }
      });

      infowindow16.open(map, marker16);

      // Marker 17
      const marker17 = new window.naver.maps.Marker({
        map: map,
        position: location17,
      });

      const contentString17 = [
        '<div class="naverMap">',
        '   <h3>미사키 혼술</h3>',
        '   <p>서울특별시 동작구 동작대로25길 24<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%AF%B8%EC%82%AC%ED%82%A4+%ED%98%BC%EC%88%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca1a36dcf0429:0x8d3a518b7c7dad68!8m2!3d37.4859859!4d126.9807296!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VNMk1rbE1WRlpCRUFF4AEA!16s%2Fg%2F11f5n3z0kp?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow17 = new window.naver.maps.InfoWindow({
        content: contentString17,
      });

      window.naver.maps.Event.addListener(marker17, 'click', function (e) {
        if (infowindow17.getMap()) {
          infowindow17.close();
        } else {
          infowindow17.open(map, marker17);
        }
      });

      infowindow17.open(map, marker17);

      // Marker 18
      const marker18 = new window.naver.maps.Marker({
        map: map,
        position: location18,
      });

      const contentString18 = [
        '<div class="naverMap">',
        '   <h3>아틀란티스</h3>',
        '   <p>서울특별시 마포구 와우산로29길 4-36<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%95%84%ED%8B%80%EB%9E%80%ED%8B%B0%EC%8A%A4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c9986e04428a9:0x5584d5cffb796ca8!8m2!3d37.5551204!4d126.9296084!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11f62rybvp?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow18 = new window.naver.maps.InfoWindow({
        content: contentString18,
      });

      window.naver.maps.Event.addListener(marker18, 'click', function (e) {
        if (infowindow18.getMap()) {
          infowindow18.close();
        } else {
          infowindow18.open(map, marker18);
        }
      });

      infowindow18.open(map, marker18);

      // Marker 19
      const marker19 = new window.naver.maps.Marker({
        map: map,
        position: location19,
      });

      const contentString19 = [
        '<div class="naverMap">',
        '   <h3>팩토리엠(The Factory M)</h3>',
        '   <p>서울특별시 마포구 백범로 152 공덕파크자이 102동 17호<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%8C%A9%ED%86%A0%EB%A6%AC%EC%97%A0+(+The+Factory+M)/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99bb0fca1e63:0x4d8b39e895f8ffd9!8m2!3d37.5449129!4d126.9476016!15sCgbtmLzsiKBaCCIG7Zi87IigkgEMY29ja3RhaWxfYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5qY2pocFZtSlJFQUXgAQA!16s%2Fg%2F11gnpzbb5x?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '       <a href="https://www.instagram.com/barthefactory/">인스타그램 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow19 = new window.naver.maps.InfoWindow({
        content: contentString19,
      });

      window.naver.maps.Event.addListener(marker19, 'click', function (e) {
        if (infowindow19.getMap()) {
          infowindow19.close();
        } else {
          infowindow19.open(map, marker19);
        }
      });

      infowindow19.open(map, marker19);

      // Marker 20
      const marker20 = new window.naver.maps.Marker({
        map: map,
        position: location20,
      });

      const contentString20 = [
        '<div class="naverMap">',
        '   <h3>혼술집노랑</h3>',
        '   <p>서울특별시 마포구 서교동 346-50<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%A7%91%EB%85%B8%EB%9E%91/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99e628eca787:0x3a09545dd1fdb9e0!8m2!3d37.5549978!4d126.9241356!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11l5z94qs2?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow20 = new window.naver.maps.InfoWindow({
        content: contentString20,
      });

      window.naver.maps.Event.addListener(marker20, 'click', function (e) {
        if (infowindow20.getMap()) {
          infowindow20.close();
        } else {
          infowindow20.open(map, marker20);
        }
      });

      infowindow20.open(map, marker20);

      // Marker 21
      const marker21 = new window.naver.maps.Marker({
        map: map,
        position: location21,
      });

      const contentString21 = [
        '<div class="naverMap">',
        '   <h3>완숙</h3>',
        '   <p>서울특별시 서대문구 증가로10길 36-55<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%99%84%EC%88%99/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c985a2da86013:0x9eaa23acbc41d015!8m2!3d37.5784577!4d126.9245624!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJKYXpodVJETlJSUkFC4AEA!16s%2Fg%2F11f0whs4x2?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow21 = new window.naver.maps.InfoWindow({
        content: contentString21,
      });

      window.naver.maps.Event.addListener(marker21, 'click', function (e) {
        if (infowindow21.getMap()) {
          infowindow21.close();
        } else {
          infowindow21.open(map, marker21);
        }
      });

      infowindow21.open(map, marker21);

      // Marker 22
      const marker22 = new window.naver.maps.Marker({
        map: map,
        position: location22,
      });

      const contentString22 = [
        '<div class="naverMap">',
        '   <h3>코메리카</h3>',
        '   <p>서울특별시 용산구 갈월동 번지 지하 93-45 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%BD%94%EB%A9%94%EB%A6%AC%EC%B9%B4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca26b6cdeef57:0x35fc58f366445534!8m2!3d37.5426843!4d126.9714995!15sCgbtmLzsiKBaCCIG7Zi87IigkgEId2luZV9iYXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTTJkamx5TUVaUkVBReABAA!16s%2Fg%2F11j4fd3vgv?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow22 = new window.naver.maps.InfoWindow({
        content: contentString22,
      });

      window.naver.maps.Event.addListener(marker22, 'click', function (e) {
        if (infowindow22.getMap()) {
          infowindow22.close();
        } else {
          infowindow22.open(map, marker22);
        }
      });

      infowindow22.open(map, marker22);

      // Marker 23
      const marker23 = new window.naver.maps.Marker({
        map: map,
        position: location23,
      });

      const contentString23 = [
        '<div class="naverMap">',
        '   <h3>심야식당 하스</h3>',
        '   <p>서울특별시 마포구 연희로1길 19<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%8B%AC%EC%95%BC%EC%8B%9D%EB%8B%B9+%ED%95%98%EC%8A%A4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98e9a427cba5:0xae1058b3af2e3844!8m2!3d37.5598946!4d126.9254314!15sCgbtmLzsiKBaCCIG7Zi87IigkgETamFwYW5lc2VfcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSUmFVeHBlbUZCRUFF4AEA!16s%2Fg%2F11ddydr9hc?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow23 = new window.naver.maps.InfoWindow({
        content: contentString23,
      });

      window.naver.maps.Event.addListener(marker23, 'click', function (e) {
        if (infowindow23.getMap()) {
          infowindow23.close();
        } else {
          infowindow23.open(map, marker23);
        }
      });

      infowindow23.open(map, marker23);

      // Marker 24
      const marker24 = new window.naver.maps.Marker({
        map: map,
        position: location24,
      });

      const contentString24 = [
        '<div class="naverMap">',
        '   <h3>오빠네스튜디오</h3>',
        '   <p>서울특별시 용산구 한남대로27가길 32 19<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%98%A4%EB%B9%A0%EB%84%A4%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca3c91fa31c71:0x937e0a0eae2e4bb2!8m2!3d37.5380941!4d127.0025734!15sCgbtmLzsiKBaCCIG7Zi87IigkgEId2luZV9iYXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTnRNSFJQVEdOM0VBReABAA!16s%2Fg%2F11gs8q48lc?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow24 = new window.naver.maps.InfoWindow({
        content: contentString24,
      });

      window.naver.maps.Event.addListener(marker24, 'click', function (e) {
        if (infowindow24.getMap()) {
          infowindow24.close();
        } else {
          infowindow24.open(map, marker24);
        }
      });

      infowindow24.open(map, marker24);

      // Marker 25
      const marker25 = new window.naver.maps.Marker({
        map: map,
        position: location25,
      });

      const contentString25 = [
        '<div class="naverMap">',
        '   <h3>고래가주</h3>',
        '   <p>서울특별시 관악구 신림동길 23-1 2층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EA%B3%A0%EB%9E%98%EA%B0%80%EC%A3%BC/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c9f85d964ae71:0xbf473a7b7f6ae032!8m2!3d37.4868513!4d126.926148!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5QY1Y5TWJVbDNFQUXgAQA!16s%2Fg%2F11h764kh5n?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow25 = new window.naver.maps.InfoWindow({
        content: contentString25,
      });

      window.naver.maps.Event.addListener(marker25, 'click', function (e) {
        if (infowindow25.getMap()) {
          infowindow25.close();
        } else {
          infowindow25.open(map, marker25);
        }
      });

      infowindow25.open(map, marker25);

      // Marker 26
      const marker26 = new window.naver.maps.Marker({
        map: map,
        position: location26,
      });

      const contentString26 = [
        '<div class="naverMap">',
        '   <h3>코지 라운지</h3>',
        '   <p>서울특별시 서대문구 신촌동 연세로7안길 10-5 2층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%A7%91%EB%85%B8%EB%9E%91/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99e628eca787:0x3a09545dd1fdb9e0!8m2!3d37.5549978!4d126.9241356!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11l5z94qs2?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow26 = new window.naver.maps.InfoWindow({
        content: contentString26,
      });

      window.naver.maps.Event.addListener(marker26, 'click', function (e) {
        if (infowindow26.getMap()) {
          infowindow26.close();
        } else {
          infowindow26.open(map, marker26);
        }
      });

      infowindow26.open(map, marker26);

      // Marker 27
      const marker27 = new window.naver.maps.Marker({
        map: map,
        position: location27,
      });

      const contentString27 = [
        '<div class="naverMap">',
        '   <h3>혼술포차</h3>',
        '   <p>인천광역시 서구 630-1<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%ED%8F%AC%EC%B0%A8/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c81cb85d57b5d:0x8c96ee221d57a007!8m2!3d37.5611476!4d126.6733506!15sCgbtmLzsiKBaCCIG7Zi87IigkgEbamFwYW5lc2VfaXpha2F5YV9yZXN0YXVyYW504AEA!16s%2Fg%2F11gnpj7h1h?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow27 = new window.naver.maps.InfoWindow({
        content: contentString27,
      });

      window.naver.maps.Event.addListener(marker27, 'click', function (e) {
        if (infowindow27.getMap()) {
          infowindow27.close();
        } else {
          infowindow27.open(map, marker27);
        }
      });

      infowindow27.open(map, marker27);

      // Marker 28
      const marker28 = new window.naver.maps.Marker({
        map: map,
        position: location28,
      });

      const contentString28 = [
        '<div class="naverMap">',
        '   <h3>혼술포차</h3>',
        '   <p>서울특별시 마포구 상암동 월드컵북로44길 35-3<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%A7%88%EC%B8%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c990a3648b523:0xc5454cb0a41ab882!8m2!3d37.57636!4d126.8953574!15sCgbtmLzsiKBaCCIG7Zi87IigkgEbamFwYW5lc2VfaXpha2F5YV9yZXN0YXVyYW50mgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU56YlRaRVFUbFJSUkFC4AEA!16s%2Fg%2F11h3b2h149?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow28 = new window.naver.maps.InfoWindow({
        content: contentString28,
      });

      window.naver.maps.Event.addListener(marker28, 'click', function (e) {
        if (infowindow28.getMap()) {
          infowindow28.close();
        } else {
          infowindow28.open(map, marker28);
        }
      });

      infowindow28.open(map, marker28);

      // Marker 29
      const marker29 = new window.naver.maps.Marker({
        map: map,
        position: location29,
      });

      const contentString29 = [
        '<div class="naverMap">',
        '   <h3>COMMUNE 148</h3>',
        '   <p>서울특별시 용산구 원효로2가 백범로 326<br />',
        '       <a href="https://www.google.co.kr/maps/place/COMMUNE+148/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca3cce31b0b95:0x2e914bd176a9cce7!8m2!3d37.538109!4d126.965037!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJEWnpsdE0zRlJSUkFC4AEA!16s%2Fg%2F11j82xhzkg?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow29 = new window.naver.maps.InfoWindow({
        content: contentString29,
      });

      window.naver.maps.Event.addListener(marker29, 'click', function (e) {
        if (infowindow29.getMap()) {
          infowindow29.close();
        } else {
          infowindow29.open(map, marker29);
        }
      });

      infowindow29.open(map, marker29);

      // Marker 30
      const marker30 = new window.naver.maps.Marker({
        map: map,
        position: location30,
      });

      const contentString30 = [
        '<div class="naverMap">',
        '   <h3>혼술가</h3>',
        '   <p>서울특별시 은평구 역촌동 62-3번지 105호 무궁화빌딩<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EA%B0%80/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98324ccdbfd1:0x577dcab1cdaa3baa!8m2!3d37.6056217!4d126.9146815!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11f64df1h_?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow30 = new window.naver.maps.InfoWindow({
        content: contentString30,
      });

      window.naver.maps.Event.addListener(marker30, 'click', function (e) {
        if (infowindow30.getMap()) {
          infowindow30.close();
        } else {
          infowindow30.open(map, marker30);
        }
      });

      infowindow30.open(map, marker30);

      // Marker 31
      const marker31 = new window.naver.maps.Marker({
        map: map,
        position: location31,
      });

      const contentString31 = [
        '<div class="naverMap">',
        '   <h3>곤죠</h3>',
        '   <p>서울특별시 성북구 동소문동2가 283번지 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EA%B3%A4%EC%A3%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357cbcce4092207b:0xff1462c355224ea1!8m2!3d37.5887021!4d127.0092286!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VRd01GcExRbEpSRUFF4AEA!16s%2Fg%2F11f64djw9d?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow31 = new window.naver.maps.InfoWindow({
        content: contentString31,
      });

      window.naver.maps.Event.addListener(marker31, 'click', function (e) {
        if (infowindow31.getMap()) {
          infowindow31.close();
        } else {
          infowindow31.open(map, marker31);
        }
      });

      infowindow31.open(map, marker31);

      // Marker 32
      const marker32 = new window.naver.maps.Marker({
        map: map,
        position: location32,
      });

      const contentString32 = [
        '<div class="naverMap">',
        '   <h3>혼술식당천호점</h3>',
        '   <p>서울특별시 강동구 천호동 39-4번지<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%BC%EC%88%A0%EC%8B%9D%EB%8B%B9%EC%B2%9C%ED%98%B8%EC%A0%90/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357cb01060265917:0xd2e864c677d8b625!8m2!3d37.5455526!4d127.1392463!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudOABAA!16s%2Fg%2F11ghrh24py?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow32 = new window.naver.maps.InfoWindow({
        content: contentString32,
      });

      window.naver.maps.Event.addListener(marker32, 'click', function (e) {
        if (infowindow32.getMap()) {
          infowindow32.close();
        } else {
          infowindow32.open(map, marker32);
        }
      });

      infowindow32.open(map, marker32);

      // Marker 33
      const marker33 = new window.naver.maps.Marker({
        map: map,
        position: location33,
      });

      const contentString33 = [
        '<div class="naverMap">',
        '   <h3>다희투</h3>',
        '   <p>서울특별시 마포구 도화길 10 1층 4호<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8B%A4%ED%9D%AC%ED%88%AC/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c993512d85067:0xd812b575f03bc711!8m2!3d37.5397641!4d126.9473823!15sCgbtmLzsiKBaCCIG7Zi87IigkgEMY29ja3RhaWxfYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU0yY1dRM1R6UjNSUkFC4AEA!16s%2Fg%2F11qh30c_sy?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow33 = new window.naver.maps.InfoWindow({
        content: contentString33,
      });

      window.naver.maps.Event.addListener(marker33, 'click', function (e) {
        if (infowindow33.getMap()) {
          infowindow33.close();
        } else {
          infowindow33.open(map, marker33);
        }
      });

      infowindow33.open(map, marker33);

      // Marker 34
      const marker34 = new window.naver.maps.Marker({
        map: map,
        position: location34,
      });

      const contentString34 = [
        '<div class="naverMap">',
        '   <h3>섬으로간나비</h3>',
        '   <p>서울특별시 중구 필동2가 35-2번지<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%84%AC%EC%9C%BC%EB%A1%9C%EA%B0%84%EB%82%98%EB%B9%84/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca2e29b30ceb5:0xa7df687817ebede8!8m2!3d37.5613539!4d126.996641!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJWT0hKTVgydEJSUkFC4AEA!16s%2Fg%2F11f64dgqc9?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow34 = new window.naver.maps.InfoWindow({
        content: contentString34,
      });

      window.naver.maps.Event.addListener(marker34, 'click', function (e) {
        if (infowindow34.getMap()) {
          infowindow34.close();
        } else {
          infowindow34.open(map, marker34);
        }
      });

      infowindow34.open(map, marker34);

      // Marker 35
      const marker35 = new window.naver.maps.Marker({
        map: map,
        position: location35,
      });

      const contentString35 = [
        '<div class="naverMap">',
        '   <h3>호랑이</h3>',
        '   <p>서울특별시 마포구 합정동 366-19번지 1층 좌측<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%98%B8%EB%9E%91%EC%9D%B4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98d448896177:0x2fad465aae9fbbc1!8m2!3d37.5466891!4d126.9144038!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU41TkhKUFN5MVJSUkFC4AEA!16s%2Fg%2F11f64dy6h5?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow35 = new window.naver.maps.InfoWindow({
        content: contentString35,
      });

      window.naver.maps.Event.addListener(marker35, 'click', function (e) {
        if (infowindow35.getMap()) {
          infowindow35.close();
        } else {
          infowindow35.open(map, marker35);
        }
      });

      infowindow35.open(map, marker35);

      // Marker 36
      const marker36 = new window.naver.maps.Marker({
        map: map,
        position: location36,
      });

      const contentString36 = [
        '<div class="naverMap">',
        '   <h3>육회예술 새우감성</h3>',
        '   <p>서울특별시 마포구 합정동 366-19번지 1층 좌측<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9C%A1%ED%9A%8C%EC%98%88%EC%88%A0+%EC%83%88%EC%9A%B0%EA%B0%90%EC%84%B1/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99ec8fd47153:0xea6ba024e5b46bc0!8m2!3d37.5478399!4d126.9240628!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU5hZURaTVl6SjNSUkFC4AEA!16s%2Fg%2F11t0t8k20l?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow36 = new window.naver.maps.InfoWindow({
        content: contentString36,
      });

      window.naver.maps.Event.addListener(marker36, 'click', function (e) {
        if (infowindow36.getMap()) {
          infowindow36.close();
        } else {
          infowindow36.open(map, marker36);
        }
      });

      infowindow36.open(map, marker36);

      // Marker 37
      const marker37 = new window.naver.maps.Marker({
        map: map,
        position: location37,
      });

      const contentString37 = [
        '<div class="naverMap">',
        '   <h3>마요네즈 남영점</h3>',
        '   <p>서울특별시 용산구 한강대로80길 11-22<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%A7%88%EC%9A%94%EB%84%A4%EC%A6%88+%EB%82%A8%EC%98%81%EC%A0%90/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca397b7b5f279:0x5434b06b80836dc5!8m2!3d37.5434908!4d126.9734801!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJTZEhGZlgxaEJFQUXgAQA!16s%2Fg%2F11khtjlf9h?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow37 = new window.naver.maps.InfoWindow({
        content: contentString37,
      });

      window.naver.maps.Event.addListener(marker37, 'click', function (e) {
        if (infowindow37.getMap()) {
          infowindow37.close();
        } else {
          infowindow37.open(map, marker37);
        }
      });

      infowindow37.open(map, marker37);

      // Marker 38
      const marker38 = new window.naver.maps.Marker({
        map: map,
        position: location38,
      });

      const contentString38 = [
        '<div class="naverMap">',
        '   <h3>공작</h3>',
        '   <p>서울특별시 마포구 망원제1동 희우정로12길 23<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EA%B3%B5%EC%9E%91/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c992ee0f8f54f:0xc64ad679cf76e8d!8m2!3d37.5538468!4d126.9042477!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJ0TUhaUWNuVjNSUkFC4AEA!16s%2Fg%2F11g6xx05z1?hl=ko&entry=ttu">구글 지도로 보기 / </a>',
        '       <a href="https://www.instagram.com/m0jak/">인스타그램 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow38 = new window.naver.maps.InfoWindow({
        content: contentString38,
      });

      window.naver.maps.Event.addListener(marker38, 'click', function (e) {
        if (infowindow38.getMap()) {
          infowindow38.close();
        } else {
          infowindow38.open(map, marker38);
        }
      });

      infowindow38.open(map, marker38);

      // Marker 39
      const marker39 = new window.naver.maps.Marker({
        map: map,
        position: location39,
      });

      const contentString39 = [
        '<div class="naverMap">',
        '   <h3>명월문샤인</h3>',
        '   <p>서울특별시 마포구 독막로6길 18 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%AA%85%EC%9B%94%EB%AC%B8%EC%83%A4%EC%9D%B8+(Moonshine+Hapjeong)/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99778577c4fd:0x6f4429274e64f780!8m2!3d37.5472665!4d126.9172257!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU53YlZrMlRVRm5FQUXgAQA!16s%2Fg%2F11nntyq8dv?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow39 = new window.naver.maps.InfoWindow({
        content: contentString39,
      });

      window.naver.maps.Event.addListener(marker39, 'click', function (e) {
        if (infowindow39.getMap()) {
          infowindow39.close();
        } else {
          infowindow39.open(map, marker39);
        }
      });

      infowindow39.open(map, marker39);

      // Marker 40
      const marker40 = new window.naver.maps.Marker({
        map: map,
        position: location40,
      });

      const contentString40 = [
        '<div class="naverMap">',
        '   <h3>킨더가든바(kindergartenbar)</h3>',
        '   <p>서울특별시 마포구 서교동 395-91<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%82%A8%EB%8D%94%EA%B0%80%EB%93%A0%EB%B0%94(kindergartenbar)/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c9901464f17a7:0xff3a7ef3debf4caa!8m2!3d37.550817!4d126.9200251!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJaT0ZwaFJXOW5SUkFC4AEA!16s%2Fg%2F11h1j22vj5?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow40 = new window.naver.maps.InfoWindow({
        content: contentString40,
      });

      window.naver.maps.Event.addListener(marker40, 'click', function (e) {
        if (infowindow40.getMap()) {
          infowindow40.close();
        } else {
          infowindow40.open(map, marker40);
        }
      });

      infowindow40.open(map, marker40);

      // Marker 41
      const marker41 = new window.naver.maps.Marker({
        map: map,
        position: location41,
      });

      const contentString41 = [
        '<div class="naverMap">',
        '   <h3>BAR다</h3>',
        '   <p>서울특별시 마포구 홍익로3길 7<br />',
        '       <a href="https://www.google.co.kr/maps/place/BAR%EB%8B%A4/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98c4b1db2167:0x977d50711f762fe3!8m2!3d37.5539574!4d126.9222305!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJ2YkY4eVpIVlJSUkFC4AEA!16s%2Fg%2F1td0wdgt?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow41 = new window.naver.maps.InfoWindow({
        content: contentString41,
      });

      window.naver.maps.Event.addListener(marker41, 'click', function (e) {
        if (infowindow41.getMap()) {
          infowindow41.close();
        } else {
          infowindow41.open(map, marker41);
        }
      });

      infowindow41.open(map, marker41);

      // Marker 42
      const marker42 = new window.naver.maps.Marker({
        map: map,
        position: location42,
      });

      const contentString42 = [
        '<div class="naverMap">',
        '   <h3>우주</h3>',
        '   <p>서울특별시 서대문구 북가좌동 342-23<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9A%B0%EC%A3%BC/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c995fba1f369b:0x4baeaa3724f6ce40!8m2!3d37.5846715!4d126.91181!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVJIT0VwWE1UaG5SUkFC4AEA!16s%2Fg%2F11hzxyz34d?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow42 = new window.naver.maps.InfoWindow({
        content: contentString42,
      });

      window.naver.maps.Event.addListener(marker42, 'click', function (e) {
        if (infowindow42.getMap()) {
          infowindow42.close();
        } else {
          infowindow42.open(map, marker42);
        }
      });

      infowindow42.open(map, marker42);

      // Marker 43
      const marker43 = new window.naver.maps.Marker({
        map: map,
        position: location43,
      });

      const contentString43 = [
        '<div class="naverMap">',
        '   <h3>도약도</h3>',
        '   <p>서울특별시 용산구 두텁바위로 73-1<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8F%84%EC%95%BD%EB%8F%84/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca349b7206f03:0x27658977253b9be!8m2!3d37.5463123!4d126.9802994!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU53YlZCaFpWOW5SUkFC4AEA!16s%2Fg%2F11v07cnkn9?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow43 = new window.naver.maps.InfoWindow({
        content: contentString43,
      });

      window.naver.maps.Event.addListener(marker43, 'click', function (e) {
        if (infowindow43.getMap()) {
          infowindow43.close();
        } else {
          infowindow43.open(map, marker43);
        }
      });

      infowindow43.open(map, marker43);

      // Marker 44
      const marker44 = new window.naver.maps.Marker({
        map: map,
        position: location44,
      });

      const contentString44 = [
        '<div class="naverMap">',
        '   <h3>애플비어앤펍</h3>',
        '   <p>서울특별시 마포구 공덕동 마포대로 196<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%95%A0%ED%94%8C%EB%B9%84%EC%96%B4%EC%95%A4%ED%8E%8D/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357ca32b3d82e42d:0xcac7a894b743c0e6!8m2!3d37.5513096!4d126.9561662!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDcHVimgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVU13ZWkwM2R5MW5SUkFC4AEA!16s%2Fg%2F11j02zq0fz?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow44 = new window.naver.maps.InfoWindow({
        content: contentString44,
      });

      window.naver.maps.Event.addListener(marker44, 'click', function (e) {
        if (infowindow44.getMap()) {
          infowindow44.close();
        } else {
          infowindow44.open(map, marker44);
        }
      });

      infowindow44.open(map, marker44);

      // Marker 45
      const marker45 = new window.naver.maps.Marker({
        map: map,
        position: location45,
      });

      const contentString45 = [
        '<div class="naverMap">',
        '   <h3>더빠</h3>',
        '   <p>서울특별시 서대문구 연세로7안길 34-3<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8D%94%EB%B9%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98948ef6cb65:0xd9ce87cce3af1f19!8m2!3d37.5582904!4d126.9348137!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5WZVRWaFRVOW5FQUXgAQA!16s%2Fg%2F11f4vkc0rv?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow45 = new window.naver.maps.InfoWindow({
        content: contentString45,
      });

      window.naver.maps.Event.addListener(marker45, 'click', function (e) {
        if (infowindow45.getMap()) {
          infowindow45.close();
        } else {
          infowindow45.open(map, marker45);
        }
      });

      infowindow45.open(map, marker45);

      // Marker 46
      const marker46 = new window.naver.maps.Marker({
        map: map,
        position: location46,
      });

      const contentString46 = [
        '<div class="naverMap">',
        '   <h3>퍼니스(Furnace)</h3>',
        '   <p>서울특별시 마포구 서교동 월드컵북로5길 54<br />',
        '       <a href="https://www.google.co.kr/maps/place/%ED%8D%BC%EB%8B%88%EC%8A%A4(Furnace)/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c99ce4cafebf1:0xe23242bb07f57d60!8m2!3d37.5563948!4d126.9159392!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5uYzJKVWIwTkJFQUXgAQA!16s%2Fg%2F11g1dz2msz?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow46 = new window.naver.maps.InfoWindow({
        content: contentString46,
      });

      window.naver.maps.Event.addListener(marker46, 'click', function (e) {
        if (infowindow46.getMap()) {
          infowindow46.close();
        } else {
          infowindow46.open(map, marker46);
        }
      });

      infowindow46.open(map, marker46);

      // Marker 47
      const marker47 = new window.naver.maps.Marker({
        map: map,
        position: location47,
      });

      const contentString47 = [
        '<div class="naverMap">',
        '   <h3>작은 섬소년</h3>',
        '   <p>서울특별시 마포구 용강동 토정로37길 3<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9E%91%EC%9D%80+%EC%84%AC%EC%86%8C%EB%85%84/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98afd02d7613:0x38fed741bca89d42!8m2!3d37.5400062!4d126.9439926!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFymgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJuYnpaNWNHRlJFQUXgAQA!16s%2Fg%2F11g6jjpnd8?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow47 = new window.naver.maps.InfoWindow({
        content: contentString47,
      });

      window.naver.maps.Event.addListener(marker47, 'click', function (e) {
        if (infowindow47.getMap()) {
          infowindow47.close();
        } else {
          infowindow47.open(map, marker47);
        }
      });

      infowindow47.open(map, marker47);

      // Marker 48
      const marker48 = new window.naver.maps.Marker({
        map: map,
        position: location48,
      });

      const contentString48 = [
        '<div class="naverMap">',
        '   <h3>안테이쿠</h3>',
        '   <p>서울특별시 서대문구 연세로11길 22 지하<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%95%88%ED%85%8C%EC%9D%B4%EC%BF%A0/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c991d8b221a4f:0x2e35ec346a8ac7e2!8m2!3d37.5589859!4d126.9356204!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11q3zjcmls?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow48 = new window.naver.maps.InfoWindow({
        content: contentString48,
      });

      window.naver.maps.Event.addListener(marker48, 'click', function (e) {
        if (infowindow48.getMap()) {
          infowindow48.close();
        } else {
          infowindow48.open(map, marker48);
        }
      });

      infowindow48.open(map, marker48);

      // Marker 49
      const marker49 = new window.naver.maps.Marker({
        map: map,
        position: location49,
      });

      const contentString49 = [
        '<div class="naverMap">',
        '   <h3>로실링</h3>',
        '   <p>서울특별시 서대문구 창천동 번지 지층 13-49<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%A1%9C%EC%8B%A4%EB%A7%81/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c9896a92625e5:0xb4527cfbe0c315d9!8m2!3d37.5573808!4d126.938277!15sCgbtmLzsiKBaCCIG7Zi87IigkgEDYmFy4AEA!16s%2Fg%2F11f64dvydc?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow49 = new window.naver.maps.InfoWindow({
        content: contentString49,
      });

      window.naver.maps.Event.addListener(marker49, 'click', function (e) {
        if (infowindow49.getMap()) {
          infowindow49.close();
        } else {
          infowindow49.open(map, marker49);
        }
      });

      infowindow49.open(map, marker49);

      // Marker 50
      const marker50 = new window.naver.maps.Marker({
        map: map,
        position: location50,
      });

      const contentString50 = [
        '<div class="naverMap">',
        '   <h3>신촌식당</h3>',
        '   <p>서울특별시 마포구 노고산동 번지 1층 56-43 우측점포<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%8B%A0%EC%B4%8C%EC%8B%9D%EB%8B%B9/data=!4m11!1m3!2m2!1z7Zi87Iig!6e5!3m6!1s0x357c98bffec1be7b:0x393b5ff34840f3c8!8m2!3d37.5549359!4d126.9328463!15sCgbtmLzsiKBaCCIG7Zi87IigkgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSd2R6VmZhVkJuRUFF4AEA!16s%2Fg%2F11tmy0y91j?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow50 = new window.naver.maps.InfoWindow({
        content: contentString50,
      });

      window.naver.maps.Event.addListener(marker50, 'click', function (e) {
        if (infowindow50.getMap()) {
          infowindow50.close();
        } else {
          infowindow50.open(map, marker50);
        }
      });

      infowindow50.open(map, marker50);

      // Marker 51
      const marker51 = new window.naver.maps.Marker({
        map: map,
        position: location51,
      });

      const contentString51 = [
        '<div class="naverMap">',
        '   <h3>23평 23pyung</h3>',
        '   <p>서울특별시 영등포구 양평동4가 147-3<br />',
        '       <a href="https://www.google.co.kr/maps/place/23%ED%8F%89+23pyung/data=!4m10!1m2!2m1!1zMjPtj4k!3m6!1s0x357c9f107f30a6bb:0xc83e53c1e48be308!8m2!3d37.5371732!4d126.8956059!15sCgUyM-2PiVoIIgYyMyDtj4mSAQNiYXLgAQA!16s%2Fg%2F11tnwk35fz?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow51 = new window.naver.maps.InfoWindow({
        content: contentString51,
      });

      window.naver.maps.Event.addListener(marker51, 'click', function (e) {
        if (infowindow51.getMap()) {
          infowindow51.close();
        } else {
          infowindow51.open(map, marker51);
        }
      });

      infowindow51.open(map, marker51);

      // Marker 52
      const marker52 = new window.naver.maps.Marker({
        map: map,
        position: location52,
      });

      const contentString52 = [
        '<div class="naverMap">',
        '   <h3>도림상회</h3>',
        '   <p>서울특별시 구로구 구로동 새말로 102<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8F%84%EB%A6%BC%EC%83%81%ED%9A%8C/data=!4m10!1m2!2m1!1z7Iug64-E66a8IO2YvOyIoA!3m6!1s0x357c9e5d2e144cbd:0x608a852fa62e4bac!8m2!3d37.505772!4d126.8916822!15sChDsi6Drj4Trprwg7Zi87IigWhIiEOyLoOuPhOumvCDtmLzsiKCSAQNiYXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUkxiRXg2WW1aM0VBReABAA!16s%2Fg%2F11c76kz_qf?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow52 = new window.naver.maps.InfoWindow({
        content: contentString52,
      });

      window.naver.maps.Event.addListener(marker52, 'click', function (e) {
        if (infowindow52.getMap()) {
          infowindow52.close();
        } else {
          infowindow52.open(map, marker52);
        }
      });

      infowindow52.open(map, marker52);

      // Marker 53
      const marker53 = new window.naver.maps.Marker({
        map: map,
        position: location53,
      });

      const contentString53 = [
        '<div class="naverMap">',
        '   <h3>달봉비어</h3>',
        '   <p>서울특별시 구로구 구로제3동 디지털로31길 120<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EB%8B%AC%EB%B4%89%EB%B9%84%EC%96%B4/data=!4m10!1m2!2m1!1z6rWs66Gc6rWsIO2YvOyIoA!3m6!1s0x357c9e3d6a3d5e5d:0x3741b0e8ae2627d!8m2!3d37.4885326!4d126.8906507!15sChDqtazroZzqtawg7Zi87IigWhIiEOq1rOuhnOq1rCDtmLzsiKCSAQNiYXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTXdjVFptT1d0UlJSQULgAQA!16s%2Fg%2F11bxb9sgd0?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow53 = new window.naver.maps.InfoWindow({
        content: contentString53,
      });

      window.naver.maps.Event.addListener(marker53, 'click', function (e) {
        if (infowindow53.getMap()) {
          infowindow53.close();
        } else {
          infowindow53.open(map, marker53);
        }
      });

      infowindow53.open(map, marker53);

      // Marker 54
      const marker54 = new window.naver.maps.Marker({
        map: map,
        position: location54,
      });

      const contentString54 = [
        '<div class="naverMap">',
        '   <h3>오술차 신림점</h3>',
        '   <p>서울특별시 관악구 남부순환로 1594-8 1층<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%98%A4%EC%88%A0%EC%B0%A8+%EC%8B%A0%EB%A6%BC%EC%A0%90/data=!4m10!1m2!2m1!1z7Iug66a8IO2YvOyIoA!3m6!1s0x357c9f3e0137c513:0x6309ee8e20fbeeba!8m2!3d37.4834314!4d126.9280819!15sCg3si6Drprwg7Zi87IigWg8iDeyLoOumvCDtmLzsiKCSAQNiYXKaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUkNOVXhFT0RWUlJSQULgAQA!16s%2Fg%2F11jgxv5h7k?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow54 = new window.naver.maps.InfoWindow({
        content: contentString54,
      });

      window.naver.maps.Event.addListener(marker54, 'click', function (e) {
        if (infowindow54.getMap()) {
          infowindow54.close();
        } else {
          infowindow54.open(map, marker54);
        }
      });

      infowindow54.open(map, marker54);

      // Marker 55
      const marker55 = new window.naver.maps.Marker({
        map: map,
        position: location55,
      });

      const contentString55 = [
        '<div class="naverMap">',
        '   <h3>오키노미스토리</h3>',
        '   <p>서울 동작구 노량진로10길 27 1층 오코노미스토리<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%98%A4%EC%BD%94%EB%85%B8%EB%AF%B8%EC%8A%A4%ED%86%A0%EB%A6%AC/data=!3m1!4b1!4m6!3m5!1s0x357c9f76ce0670a9:0xcb1c173caf3b9771!8m2!3d37.5121109!4d126.937616!16s%2Fg%2F11ghk0s1sl?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow55 = new window.naver.maps.InfoWindow({
        content: contentString55,
      });

      window.naver.maps.Event.addListener(marker55, 'click', function (e) {
        if (infowindow55.getMap()) {
          infowindow55.close();
        } else {
          infowindow55.open(map, marker55);
        }
      });

      infowindow55.open(map, marker55);

      // Marker 56
      const marker56 = new window.naver.maps.Marker({
        map: map,
        position: location56,
      });

      const contentString56 = [
        '<div class="naverMap">',
        '   <h3>사꼬</h3>',
        '   <p>서울특별시 서대문구 홍제동 통일로 396-3<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%82%AC%EA%BC%AC/data=!4m10!1m2!2m1!1z7ZmN7KCc7JetIO2YvOyIoA!3m6!1s0x357c99458f473d0d:0x9ded1379d4458160!8m2!3d37.5853176!4d126.9482821!15sChDtmY3soJzsl60g7Zi87IigWhIiEO2ZjeygnOyXrSDtmLzsiKCSAQNiYXLgAQA!16s%2Fg%2F11qh0svsss?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow56 = new window.naver.maps.InfoWindow({
        content: contentString56,
      });

      window.naver.maps.Event.addListener(marker56, 'click', function (e) {
        if (infowindow56.getMap()) {
          infowindow56.close();
        } else {
          infowindow56.open(map, marker56);
        }
      });

      infowindow56.open(map, marker56);

      // Marker 57
      const marker57 = new window.naver.maps.Marker({
        map: map,
        position: location57,
      });

      const contentString57 = [
        '<div class="naverMap">',
        '   <h3>인생술집</h3>',
        '   <p>서울특별시 서대문구 홍제동 번지 1층 307-5<br />',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9D%B8%EC%83%9D%EC%88%A0%EC%A7%91/data=!4m10!1m2!2m1!1z7ZmN7KCc7JetIO2YvOyIoA!3m6!1s0x357c9872a7c3331f:0xe4d38aadc96534a6!8m2!3d37.5876181!4d126.9434569!15sChDtmY3soJzsl60g7Zi87IigWhIiEO2ZjeygnOyXrSDtmLzsiKCSAQNiYXLgAQA!16s%2Fg%2F11tmy12fhz?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow57 = new window.naver.maps.InfoWindow({
        content: contentString57,
      });

      window.naver.maps.Event.addListener(marker57, 'click', function (e) {
        if (infowindow57.getMap()) {
          infowindow57.close();
        } else {
          infowindow57.open(map, marker57);
        }
      });

      infowindow57.open(map, marker57);

      // Marker 58
      const marker58 = new window.naver.maps.Marker({
        map: map,
        position: location58,
      });

      const contentString58 = [
        '<div class="naverMap">',
        '   <h3>일일주</h3>',
        '   <p>서울특별시 종로구 사직동 9 풍림스페이스본 스타벅스 옆 201동 108호<br/>',
        '       <a href="https://www.google.co.kr/maps/place/%EC%9D%BC%EC%9D%BC%EC%A3%BC(%E6%97%A5%E6%97%A5%E9%85%92)/data=!4m10!1m2!2m1!1z6rSR7ZmU66y4IO2YvOyIoA!3m6!1s0x357ca3c6b23e7e6b:0xab7c87e2997811ac!8m2!3d37.5748414!4d126.9694889!15sChDqtJHtmZTrrLgg7Zi87IigWhIiEOq0ke2ZlOusuCDtmLzsiKCSARtqYXBhbmVzZV9pemFrYXlhX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11fmz9ln9p?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow58 = new window.naver.maps.InfoWindow({
        content: contentString58,
      });

      window.naver.maps.Event.addListener(marker58, 'click', function (e) {
        if (infowindow58.getMap()) {
          infowindow58.close();
        } else {
          infowindow58.open(map, marker58);
        }
      });

      infowindow58.open(map, marker58);

      // Marker 59
      const marker59 = new window.naver.maps.Marker({
        map: map,
        position: location59,
      });

      const contentString59 = [
        '<div class="naverMap">',
        '   <h3>탭퍼블릭 광화문점</h3>',
        '   <p>서울특별시 종로구 청진동 종로 33<br/>',
        '       <a href="https://www.google.co.kr/maps/place/%ED%83%AD%ED%8D%BC%EB%B8%94%EB%A6%AD+%EA%B4%91%ED%99%94%EB%AC%B8%EC%A0%90/data=!4m10!1m2!2m1!1z6rSR7ZmU66y4IO2YvOyIoA!3m6!1s0x357ca3f0c5acf6d9:0x1385bb3925634127!8m2!3d37.5711676!4d126.981274!15sChDqtJHtmZTrrLgg7Zi87IigWhIiEOq0ke2ZlOusuCDtmLzsiKCSAQpyZXN0YXVyYW504AEA!16s%2Fg%2F11f8nf8vm3?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow59 = new window.naver.maps.InfoWindow({
        content: contentString59,
      });

      window.naver.maps.Event.addListener(marker59, 'click', function (e) {
        if (infowindow59.getMap()) {
          infowindow59.close();
        } else {
          infowindow59.open(map, marker59);
        }
      });

      infowindow59.open(map, marker59);

      // Marker 60
      const marker60 = new window.naver.maps.Marker({
        map: map,
        position: location60,
      });

      const contentString60 = [
        '<div class="naverMap">',
        '   <h3>바레이 BarRay</h3>',
        '   <p>서울특별시 종로구 종로7길 29-19<br/>',
        '       <a href="https://www.google.co.kr/maps/place/%EB%B0%94%EB%A0%88%EC%9D%B4+BarRay/data=!4m10!1m2!2m1!1z6rSR7ZmU66y4IO2YvOyIoA!3m6!1s0x357ca3378eac98bd:0x4d116b4431ab85a1!8m2!3d37.5718599!4d126.9812675!15sChDqtJHtmZTrrLgg7Zi87IigWhIiEOq0ke2ZlOusuCDtmLzsiKCSAQxjb2NrdGFpbF9iYXLgAQA!16s%2Fg%2F11sh674ks1?hl=ko&entry=ttu">구글 지도로 보기</a>',
        '   </p>',
        '</div>',
      ].join('');

      const infowindow60 = new window.naver.maps.InfoWindow({
        content: contentString60,
      });

      window.naver.maps.Event.addListener(marker60, 'click', function (e) {
        if (infowindow60.getMap()) {
          infowindow60.close();
        } else {
          infowindow60.open(map, marker60);
        }
      });

      infowindow60.open(map, marker60);
    };

    // Clean up when the component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div
      id='map'
      style={{ width: '100%', height: '945px' }}
    ></div>
  );
};

export default NaverSearch;
