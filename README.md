## NPM 명령어

### 환경 구분

테스트 환경 : 테스트 API, 로그 기록 OFF
실서버 환경 : 실제 API , 로그 기록 OFF

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
