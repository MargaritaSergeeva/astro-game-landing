/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_NOINDEX: 'true' | 'false';
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
