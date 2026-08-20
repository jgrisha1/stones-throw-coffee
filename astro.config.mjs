// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Single source of truth for the deploy base path. Used both for Astro's
// `base` and for the markdown link rewriter below, so they can't drift.
// Root '/' for the Cloudflare Pages custom-domain deploy (was
// '/stones-throw-coffee' under the old GitHub Pages project subpath).
const BASE = '/';

/**
 * Rewrite root-relative links/images in markdown content (e.g. `/menu/`) so
 * they include the deploy base path (`/stones-throw-coffee/menu/`).
 *
 * Astro auto-prefixes `base` for links written in .astro files, but NOT for
 * plain-markdown `[text](/menu/)` links — those would 404 on GitHub Pages.
 * This walks the rendered HTML AST and prepends BASE to any internal absolute
 * URL. If BASE is ever set to '' or '/' (custom root domain), it's a no-op,
 * so the markdown can keep using clean `/menu/` paths under any deployment.
 */
function rehypeBaseLinks() {
  if (!BASE || BASE === '/') return () => {};
  const fix = (val) => {
    if (typeof val !== 'string') return val;
    if (val.startsWith('/') && !val.startsWith('//') && val !== BASE && !val.startsWith(BASE + '/')) {
      return BASE + val;
    }
    return val;
  };
  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      if (node.properties.href) node.properties.href = fix(node.properties.href);
      if (node.properties.src) node.properties.src = fix(node.properties.src);
    }
    if (node.children) for (const child of node.children) walk(child);
  };
  return (tree) => walk(tree);
}

// Primary custom domain served by Cloudflare Pages. The sitemap, canonical
// URLs, and Open Graph URLs are all generated from this value.
//
// Main domain: stonesthrowknoxville.com (Active in this Pages account). The
// other owned domains — soknostonesthrow.com and stonesthrowknox.com — 301
// redirect here via Cloudflare Redirect Rules so links and SEO consolidate.
// (stonesthrowcoffeeco.com is stuck in a separate, inaccessible Cloudflare
// account and is not used.)
export default defineConfig({
  site: 'https://stonesthrowknoxville.com',
  base: BASE,
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [rehypeBaseLinks],
  },
});
