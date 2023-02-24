# 아이템 천사 프론트엔드

프론트엔드 구조를 4-Layer로 구분지어서 화면에 보여지는 단과 비즈니스 로직을 분리했습니다.  
응집도를 높이기 위해 각 계층 별로 역할을 나눠, 비슷한 역할은 하나의 모듈 내에서 작동하도록 했습니다.  
유지보수 편의성을 위해 각 계층의 결합도를 낮추고, 모듈의 재사용성을 높이는 것을 지향했습니다.

## 목차

1.  초기 설정
2.  실행 명령어
3.  디렉토리 구조
4.  환경설정 파일

## 초기 설정

1. `npm instll`로 필요한 패키지 설치
2. README.md ➡️ 레포지토리 설명 작성
3. IDE setting ➡️ eslint 및 prettier 사용 활성화
4. /.env ➡️ 파일 추가 및 API KEY 확인

## 실행 명령어

### 환경 구분

- 테스트 환경 : 테스트 API, 로그 기록 OFF
- 실서버 환경 : 실제 API , 로그 기록 OFF

### 로컬 서버 실행

```jsx
npm run dev-serve // 테스트 환경
npm run prod-serve // 실 서버 환경
```

### 배포용 빌드

```jsx
npm run dev-build // 테스트 환경
npm run prod-build // 실 서버 환경
```

### 배포용 빌드 파일을 로컬서버에서 실행

```jsx
npm run dev-preview // 테스트 환경
npm run prod-preview // 실 서버 환경
```

## 디렉토리 구조

```text
├── README.md
├── env.d.ts
├── favicon.ico
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── common.ts
│   ├── components
│   ├── domain
│   ├── favicon.ico
│   ├── index.css
│   ├── main.ts
│   ├── robots.txt
│   ├── router
│   ├── store
│   ├── types
│   └── views
├── tailwind.config.js
├── tsconfig.config.json
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```

<div align="center" >
<img src="https://user-images.githubusercontent.com/72400483/220873649-8fc5200b-f7c0-4639-bc7b-b9cf862a7041.png" alt="외부 이미지" height="auto" width="90%" />
<p style="color:gray"> * 프론트엔드 구조 *</p> </div>

- `src/api` : 외부 서버와 통신하는 로직 위치
- `src/common.ts` : 공통함수
- `src/views` : UI 폴더
- `src/component` : 상호작용 컴포넌트 폴더
- `src/domain` : DTO 및 도메인 관리
- `src/store` : 화면에 보이는 데이터 관리
- `src/router` : 페이지 이동 관리

## 환경설정 파일

앱 전체에서 사용할 고정된 값을 파일에 저장해 사용

### 파일 추가

> /.env

```text
/* 실 API 경로 */
 VITE_BASE_URL_USER_BASE = 'http://example.url'
 VITE_BASE_URL_AUTH_BASE = 'http://example.url'
 VITE_BASE_URL_HOME_BASE = 'http://example.url'
 VITE_BASE_URL_PAYMENT_BASE = 'http://example.url'
 VITE_BASE_URL_CHAT_BASE  = 'http://example.url'

/* 테스트 API 경로 */
 VITE_BASE_URL_USER_TEST = 'http://example.url'
 VITE_BASE_URL_AUTH_TEST = 'http://example.url'
 VITE_BASE_URL_HOME_TEST = 'http://example.url'
 VITE_BASE_URL_PAYMENT_TEST = 'http://example.url'
 VITE_BASE_URL_CHAT_TEST = 'http://example.url'

/* 톡 플러스 API 키 */
 VITE_TALK_PLUS_PUBLIC_API_KEY = 'API_KEY'

/* 톡 플러스 테스트 API 키 */
 VITE_TALK_PLUS_TEST_API_KEY = 'API_KEY'


/* Sentry/GA/Hotjar/Naver */
 VITE_SENTRY_DSN = 'http://example.url'
 VITE_GA_KEY = 'API_KEY'
 VITE_HOTJAR_ID = 'API_ID'
 VITE_NAVER_SEARCH_KEY = 'API_KEY'
 VITE_NAVER_SITE_KEY = 'API_KEY'
```

### 환경설정 파일 사용

vite.config.ts

```typescript
import { createHtmlPlugin } from "vite-plugin-html";

require("dotenv").config();
const VITE_GA_KEY = process.env.VITE_GA_KEY;
const VITE_HOTJAR_ID = process.env.VITE_HOTJAR_ID;
const VITE_NAVER_SEARCH_KEY = process.env.VITE_NAVER_SEARCH_KEY;
const VITE_NAVER_SITE_KEY = process.env.VITE_NAVER_SITE_KEY;
```
