// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the real domain once registered, and keep it matching
// the custom domain you attach in Cloudflare Pages. The sitemap, canonical
// URLs, and Open Graph URLs are all generated from this value.
export default defineConfig({
  site: 'https://stonesthrowcoffee.com',
  base: '/stones-throw-coffee',
  integrations: [sitemap()],
});
