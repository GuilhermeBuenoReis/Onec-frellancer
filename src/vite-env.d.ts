/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_URL_DEVELOPMENT;
  readonly PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
