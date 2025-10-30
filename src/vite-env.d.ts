/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEY: string;
  readonly VITE_NBT_LABEL: string;
  readonly VITE_NBT_URL: string;
  readonly VITE_FB_LABEL: string;
  readonly VITE_FB_URL: string;
  readonly VITE_AUTOTEST_1_LABEL: string;
  readonly VITE_AUTOTEST_1_URL: string;
  readonly VITE_AUTOTEST_2_LABEL: string;
  readonly VITE_AUTOTEST_2_URL: string;
  readonly VITE_TOKEN_KEYS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}