/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
