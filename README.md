# 혼밤 프로젝트

### 커밋 메세지 규약

```
커밋 메세지 첫 시작은 아래 5단어 (첫 글자 대문자)
Fix : 버그 수정, 에러 해결 등
Add : 파일 추가 / 기능 및 함수 추가
Delete : 파일 삭제
Refactor : 기존 파일 개선/보완
Move : 파일 위치 변경 / 이름 변경 등 실제 코드 내용 변경 없을 시
```

## 환경 변수 설정

이 프로젝트는 실행 전 루트에 `.env` 파일이 필요합니다.  
`.env` 파일은 민감한 정보(API 키 등)를 포함하므로, 버전 관리 시스템에 포함되지 않습니다.

**설정 방법:**

1.  프로젝트 루트 디렉토리에서 `.env.example` 파일을 `.env` 파일로 복사합니다.
    *   **Windows:** `copy .env.example .env`
    *   **macOS/Linux:** `cp .env.example .env`

2.  생성된 `.env` 파일을 열고 필요한 환경 변수 값을 채워 넣습니다.
    *   **중요:** Vite는 클라이언트 측 환경 변수에 `VITE_` 접두사를 요구합니다. `.env.example`에 정의된 변수들은 이미 이 규칙을 따르고 있습니다.

예시:
```
VITE_API_BASE_URL=http://localhost:8181
VITE_KAKAO_APP_KEY=YOUR_KAKAO_APP_KEY
```
