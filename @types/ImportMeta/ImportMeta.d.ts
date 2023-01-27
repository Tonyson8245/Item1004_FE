interface ImportMetaEnv {
  VITE_BASE_URL?: string;
  VITE_API_KEY?: string;
  // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
