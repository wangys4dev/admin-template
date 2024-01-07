/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_ENABLE_MOCK: 'true' | 'false'
  readonly VITE_REQUEST_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
