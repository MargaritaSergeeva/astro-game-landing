import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import 'dotenv/config';
import process from 'node:process';
import { URL } from 'node:url';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const noindex = process.env.SITE_NOINDEX === 'true';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !noindex && new URL(page).pathname !== '/',
    }),
  ],
});
