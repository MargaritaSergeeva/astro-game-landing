import type { APIRoute } from 'astro';
import process from 'node:process';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const noindex = process.env.SITE_NOINDEX === 'true';

  if (noindex) {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const baseUrl = site ?? new URL('http://localhost:4321');
  const sitemapUrl = new URL('/sitemap-index.xml', baseUrl);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
