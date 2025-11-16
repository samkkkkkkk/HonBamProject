# HonBam 프로젝트 아키텍처 및 프로세스

이 문서는 HonBam 프론트엔드 프로젝트의 전반적인 아키텍처와 주요 프로세스를 설명합니다.

## 1. 개요

HonBam은 React 기반의 웹 애플리케이션으로, 사용자 인증, 소셜 미디어 기능, 채팅, 결제, 지도/검색 등 다양한 기능을 제공합니다. Vite를 사용하여 개발 및 빌드 효율성을 높였습니다.

## 2. 기술 스택

*   **프론트엔드 프레임워크:** React.js
*   **빌드 도구:** Vite
*   **상태 관리:** (추정: React Context API 또는 별도 라이브러리)
*   **라우팅:** React Router DOM
*   **스타일링:** CSS, SCSS, Emotion, Material-UI
*   **API 통신:** Axios
*   **실시간 통신:** Socket.io-client
*   **결제:** Toss Payments (아임포트 연동)
*   **지도:** Kakao Maps API, Naver Maps API
*   **로그인:** 카카오, 네이버, 구글 소셜 로그인

## 3. 프로젝트 구조

```
C:\myworkspace\HonBam\HonBam-front\
├───public/                 # 정적 자산 (index.html은 루트로 이동)
├───src/                    # 소스 코드
│   ├───assets/             # 이미지, 아이콘 등 정적 자산
│   ├───Component/          # 재사용 가능한 UI 컴포넌트 및 기능별 모듈
│   │   ├───Board/          # 게시판 관련 컴포넌트 (AddBoard, SnsBoard, Comment 등)
│   │   ├───Chat/           # 채팅 관련 컴포넌트 (Chat, AiChat, vsChat 등)
│   │   ├───Inquiry/        # 문의 관련 컴포넌트
│   │   ├───mainpage/       # 메인 페이지 관련 컴포넌트
│   │   ├───Map/            # 지도 관련 컴포넌트
│   │   ├───Navbar/         # 네비게이션 바 컴포넌트
│   │   ├───Payment/        # 결제 관련 컴포넌트
│   │   ├───Recipe/         # 레시피 관련 컴포넌트
│   │   ├───SearchPage/     # 검색 페이지 컴포넌트
│   │   ├───SearchPlace/    # 장소 검색 컴포넌트
│   │   ├───Toss/           # 토스 결제 관련 컴포넌트
│   │   └───User/           # 사용자 인증 및 프로필 관련 컴포넌트
│   ├───config/             # Axios 설정, 호스트 설정 등
│   ├───util/               # API 서비스, 인증 컨텍스트, 유틸리티 함수 등
│   ├───App.jsx             # 메인 애플리케이션 컴포넌트
│   ├───index.css           # 전역 CSS
│   └───main.jsx            # 애플리케이션 진입점
├───.env.example            # 환경 변수 예시 파일
├───package.json            # 프로젝트 의존성 및 스크립트
├───vite.config.js          # Vite 설정 파일
└───README.md               # 프로젝트 개요 및 기본 설정
```

## 4. 주요 기능 및 프로세스

### 4.1. 사용자 인증 및 관리

*   **로그인/회원가입:** `src/Component/User/Login.jsx`, `src/Component/User/Join.jsx` 등을 통해 일반 로그인 및 회원가입을 처리합니다.
*   **소셜 로그인:** `src/Component/User/KakaoLoginHandler.jsx`, `src/Component/User/NaverLoginHandler.jsx`, `src/Component/User/GoogleLoginHandler.jsx` (추정)를 통해 카카오, 네이버, 구글 소셜 로그인을 지원합니다.
*   **세션/토큰 관리:** `src/util/AuthContext.js` 또는 유사한 파일을 통해 사용자 인증 상태 및 토큰을 관리합니다.

### 4.2. 소셜 미디어 (게시판)

*   **게시물 목록:** `src/Component/Board/SnsBoard.jsx`에서 게시물 목록을 표시합니다.
*   **게시물 작성:** `src/Component/Board/AddBoard.jsx`를 통해 새로운 게시물을 작성합니다.
*   **게시물 상세/수정:** `src/Component/Board/UserDetail.jsx`, `src/Component/Board/MyDetail.jsx` 등을 통해 게시물 상세 내용을 확인하고 수정합니다.
*   **댓글:** `src/Component/Board/Comment.jsx`를 통해 댓글 기능을 제공합니다.

### 4.3. 채팅

*   **실시간 채팅:** `src/Component/Chat/Chat.jsx` 및 `socket.io-client`를 사용하여 실시간 채팅 기능을 구현합니다.
*   **AI 채팅:** `src/Component/Chat/AiChat.jsx`를 통해 AI와의 채팅 기능을 제공합니다.
*   **vsChat:** `src/Component/Chat/vsChat/` 디렉토리에 별도의 채팅 모듈이 존재합니다.

### 4.4. 결제 및 구독

*   **구독 페이지:** `src/Component/Payment/SubscriptionPage.jsx`에서 구독 상품을 표시합니다.
*   **결제 처리:** `src/Component/User/TossPay.jsx`, `src/Component/User/Pay.jsx` 등을 통해 토스페이먼츠를 이용한 결제를 처리합니다.

### 4.5. 지도 및 장소 검색

*   **지도 표시:** `src/Component/Map/NaverSearch.jsx`, `src/Component/SearchPlace/MapContainer.jsx` 등을 통해 지도 및 장소 검색 기능을 제공합니다.
*   **API 연동:** 카카오 지도 API 및 네이버 지도 API를 활용합니다.

## 5. API 통신

프로젝트는 `axios`를 사용하여 백엔드 API와 통신합니다. `src/config/axios-config.js`, `src/config/host-config.js`, `src/util/apiService.js`, `src/util/HttpService.js` 파일에서 API 요청 및 응답 처리를 담당합니다.

## 6. 개발 및 배포

*   **개발 서버 실행:** `npm run dev`
*   **프로덕션 빌드:** `npm run build`
*   **빌드 결과 미리보기:** `npm run preview`

이 문서는 프로젝트의 전반적인 이해를 돕기 위한 개요입니다. 각 기능의 상세 구현은 해당 컴포넌트 및 유틸리티 파일을 참조하십시오.
