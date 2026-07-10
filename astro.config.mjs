import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import 'dotenv/config';
import process from 'node:process';
import { URL } from 'node:url';

const siteUrl = process.env.SITE_URL;
const noindexValue = process.env.SITE_NOINDEX;

if (!siteUrl) {
  throw new Error('SITE_URL is required. Add it to .env.');
}

let site;

try {
  site = new URL(siteUrl);
} catch {
  throw new Error(`SITE_URL must be an absolute URL. Received: "${siteUrl}".`);
}

if (!['http:', 'https:'].includes(site.protocol)) {
  throw new Error(`SITE_URL must use http or https. Received: "${site.protocol}".`);
}

if (noindexValue !== 'true' && noindexValue !== 'false') {
  throw new Error('SITE_NOINDEX is required and must be either "true" or "false".');
}

const noindex = noindexValue === 'true';

export default defineConfig({
  site: site.toString(),
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !noindex && new URL(page).pathname !== '/',
    }),
  ],
});
