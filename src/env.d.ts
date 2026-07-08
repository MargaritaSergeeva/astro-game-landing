/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_NOINDEX?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
