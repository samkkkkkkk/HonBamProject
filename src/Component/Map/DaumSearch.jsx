import { useEffect } from 'react';

const toRad = (deg) => (deg * Math.PI) / 180;
const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371000; // meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const KakaoMultiMarkers = () => {
  useEffect(() => {
    const { kakao } = window;

    // 1) 지도
    const container = document.getElementById('map');
    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.5642135, 127.0016985),
      level: 7,
    });

    // 2) 서비스
    const places = new kakao.maps.services.Places();
    const geocoder = new kakao.maps.services.Geocoder();

    // 3) 좌표 배열
    const rawPositions = [
      [37.5898553, 127.0192489],
      [37.6154444, 126.9132682],
      [37.6428054, 127.0165487],
      [37.5418791, 126.9510494],
      [37.5482465, 126.9131681],
      [37.59006, 126.91771],
      [37.5641832, 126.9944846],
      [37.5101987, 127.0350358],
      [37.5225532, 126.8963375],
      [37.4814329, 126.8978234],
      [37.5816994, 126.9818127],
      [37.532889, 126.9718015],
      [37.5590727, 126.9239251],
      [37.5037511, 126.890455],
      [37.5543465, 126.9299231],
      [37.4859859, 126.9807296],
      [37.5551204, 126.9296084],
      [37.5449129, 126.9476016],
      [37.5549978, 126.9241356],
      [37.5784577, 126.9245624],
      [37.5426843, 126.9714995],
      [37.5598946, 126.9254314],
      [37.5380941, 127.0025734],
      [37.4868513, 126.926148],
      [37.5582972, 126.9361837],
      [37.5611476, 126.6733506],
      [37.57636, 126.8953574],
      [37.538109, 126.965037],
      [37.6056217, 126.9146815],
      [37.5887021, 127.0092286],
      [37.5455526, 127.1392463],
      [37.5397641, 126.9473823],
      [37.5613539, 126.996641],
      [37.5466891, 126.9144038],
      [37.5478399, 126.9240628],
      [37.5434908, 126.9734801],
      [37.5538468, 126.9042477],
      [37.5472665, 126.9172257],
      [37.550817, 126.9200251],
      [37.5539574, 126.9222305],
      [37.5846715, 126.91181],
      [37.5463123, 126.9802994],
      [37.5513096, 126.9561662],
      [37.5582904, 126.9348137],
      [37.5563948, 126.9159392],
      [37.5400062, 126.9439926],
      [37.5589859, 126.9356204],
      [37.5573808, 126.938277],
      [37.5549359, 126.9328463],
      [37.5371732, 126.8956059],
      [37.505772, 126.8916822],
      [37.4885326, 126.8906507],
      [37.4834314, 126.9280819],
      [37.5121109, 126.937616],
      [37.5853176, 126.9482821],
      [37.5876181, 126.9434569],
      [37.5748414, 126.9694889],
      [37.5711676, 126.981274],
      [37.5718599, 126.9812675],
    ];

    // 4) 카테고리/반경
    const CATEGORY_CODES = ['FD6', 'CE7', 'CS2', 'AT4', 'AD5'];
    const SEARCH_RADIUS = 100; // m

    // 콜백 → Promise
    const categorySearchOnce = (code, center) =>
      new Promise((resolve) => {
        places.categorySearch(
          code,
          (data, status) =>
            resolve(status === kakao.maps.services.Status.OK ? data : []),
          { location: center, radius: SEARCH_RADIUS }
        );
      });

    const coord2Address = (latlng) =>
      new Promise((resolve) => {
        geocoder.coord2Address(
          latlng.getLng(),
          latlng.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK && result.length) {
              const r = result[0];
              resolve({
                road: r.road_address?.address_name || '',
                jibun: r.address?.address_name || '',
              });
            } else {
              resolve({ road: '', jibun: '' });
            }
          }
        );
      });

    // 5) 포인트 정보 보강
    const enrichPoint = async (lat, lng) => {
      const center = new kakao.maps.LatLng(lat, lng);
      const address = await coord2Address(center);

      const categoryResults = await Promise.all(
        CATEGORY_CODES.map((code) => categorySearchOnce(code, center))
      );
      const merged = categoryResults.flat();

      let best = null;
      let bestDist = Infinity;

      merged.forEach((p) => {
        let d;
        if (kakao.maps.geometry?.spherical?.computeDistanceBetween) {
          d = kakao.maps.geometry.spherical.computeDistanceBetween(
            center,
            new kakao.maps.LatLng(p.y, p.x)
          );
        } else {
          d = haversine(
            center.getLat(),
            center.getLng(),
            Number(p.y),
            Number(p.x)
          ); // 폴백
        }
        if (d < bestDist) {
          best = p;
          bestDist = d;
        }
      });

      return {
        lat,
        lng,
        name: best?.place_name || '주변 상호 미확인',
        category: best?.category_name || '',
        phone: best?.phone || '',
        placeUrl: best?.place_url || '',
        address: address.road || address.jibun || '',
        imageUrl: '',
      };
    };

    // 6) 클러스터러 + 마커/오버레이
    const bounds = new kakao.maps.LatLngBounds();
    const clusterer = new kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 6,
    });

    let openedOverlay = null;

    const createOverlayContent = (info) => {
      const img = info.imageUrl
        ? `<img src="${info.imageUrl}" alt="${info.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;margin-right:10px;" />`
        : '<div style="width:80px;height:80px;background:#f2f2f2;border-radius:8px;margin-right:10px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#777;">No Image</div>';

      return `
        <div style="background:#fff;border:1px solid #ddd;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,.12);overflow:hidden;">
          <div style="display:flex;padding:10px 12px;">
            ${img}
            <div style="min-width:220px;">
              <div style="font-weight:700;font-size:14px;line-height:1.2;margin-bottom:4px;">${info.name}</div>
              <div style="font-size:12px;color:#666;margin-bottom:2px;">${info.address || ''}</div>
              <div style="font-size:12px;color:#666;margin-bottom:6px;">${info.category || ''}</div>
              ${info.phone ? `<div style="font-size:12px;color:#444;margin-bottom:6px;">${info.phone}</div>` : ''}
              ${info.placeUrl ? `<a href="${info.placeUrl}" target="_blank" rel="noreferrer" style="font-size:12px;color:#2b6cb0;text-decoration:underline;">카카오 자세히 보기</a>` : ''}
            </div>
          </div>
          <div style="padding:6px 8px;border-top:1px solid #eee;display:flex;justify-content:flex-end;">
            <button class="overlay-close-btn" style="font-size:12px;padding:4px 8px;border:1px solid #ddd;border-radius:6px;background:#fafafa;cursor:pointer;">닫기</button>
          </div>
        </div>
      `;
    };

    const markers = [];
    (async () => {
      for (const [lat, lng] of rawPositions) {
        const info = await enrichPoint(lat, lng);
        const pos = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({ position: pos });
        markers.push(marker);
        bounds.extend(pos);

        const overlay = new kakao.maps.CustomOverlay({
          position: pos,
          yAnchor: 1.05,
          zIndex: 3,
          clickable: true,
          content: createOverlayContent(info),
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          if (openedOverlay) {
            openedOverlay.setMap(null);
          }
          overlay.setMap(map);
          openedOverlay = overlay;

          setTimeout(() => {
            const el = document.querySelector('.overlay-close-btn');
            if (el) {
              el.onclick = () => {
                overlay.setMap(null);
                openedOverlay = null;
              };
            }
          }, 0);
        });
      }

      clusterer.addMarkers(markers);
      if (!bounds.isEmpty()) {
        map.setBounds(bounds);
      }
    })();
  }, []);

  return <div id="map" style={{ width: '100vw', height: '100vh' }} />;
};

export default KakaoMultiMarkers;
