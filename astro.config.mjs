import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import process from 'node:process';
import { URL } from 'node:url';

const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
    }),
  ],
});
