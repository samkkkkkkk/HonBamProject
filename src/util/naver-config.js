/*

개발과정에서 API_KEY, DB관련 정보 등 외부로 노출되면 안되는 값들이 있는데,
.env 파일을 통해 내부적으로만 사용할 수 있게 설정할 수 있다. (.env -> 환경변수 설정을 위한 파일)
.env 파일 내의 값을 읽어올 때는 [process.env.지정한이름] 을 통해 값을 불러올 수 있다.

React 환경에서 .env 내의 데이터를 읽어올 때는 반드시 REACT_APP_를 붙여 주셔야 합니다.

*/

const CLIENT_ID = process.env.REACT_APP_REST_API_KEY_NAVER;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL_NAVER;
const test = process.env.REACT_APP_STATE_KEY_test;
const MAP_CLIENT_ID = process.env.REACT_APP_NAVER_ID;
const NAVER_REDIRECT_MAP_URL = process.env.REACT_APP_MAP;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${test}&redirect_uri=${REDIRECT_URI}`;
export const NAVER_MAP_ID = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${MAP_CLIENT_ID}`;
export const NAVER_MAP_URL = NAVER_REDIRECT_MAP_URL;
