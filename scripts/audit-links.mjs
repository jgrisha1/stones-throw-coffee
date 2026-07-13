import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const BASE = '/stones-throw-coffee';
const htmlFiles = [];

(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }
})(DIST);

const pageUrl = (file) => {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return `${BASE}/`;
  return `${BASE}/${rel.replace(/index\.html$/, '')}`;
};

const resolveFile = (pathname) => {
  if (!pathname.startsWith(BASE)) return null;
  let rel = pathname.slice(BASE.length).replace(/^\//, '');
  if (!rel || pathname.endsWith('/')) rel += 'index.html';
  const candidate = path.resolve(DIST, rel);
  return candidate.startsWith(DIST) ? candidate : null;
};

const pagesByPath = new Map();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  pagesByPath.set(pageUrl(file), {
    file,
    html,
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  });
}

const failures = [];
let checkedLinks = 0;
let checkedImages = 0;

for (const [fromPath, page] of pagesByPath) {
  const seenIds = new Set();
  for (const id of [...page.html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])) {
    if (seenIds.has(id)) failures.push(`${fromPath}: duplicate id #${id}`);
    seenIds.add(id);
  }

  for (const match of page.html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const [tag, href] = [match[0], match[1]];
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) {
      failures.push(`${fromPath}: target=_blank without noopener (${href})`);
    }
    if (/^(mailto:|tel:|https?:|javascript:)/.test(href)) continue;

    const resolved = new URL(href, `https://audit.local${fromPath}`);
    checkedLinks++;
    const targetFile = resolveFile(resolved.pathname);
    if (!targetFile || !fs.existsSync(targetFile)) {
      failures.push(`${fromPath}: broken link ${href}`);
      continue;
    }
    if (resolved.hash) {
      const targetPath = resolved.pathname.endsWith('/') || resolved.pathname.endsWith('.html')
        ? resolved.pathname
        : `${resolved.pathname}/`;
      const targetPage = pagesByPath.get(targetPath);
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (!targetPage?.ids.has(id)) failures.push(`${fromPath}: missing fragment ${href}`);
    }
  }

  for (const match of page.html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    checkedImages++;
    if (!/\balt="[^"]*"/.test(tag)) failures.push(`${fromPath}: image missing alt (${src ?? 'unknown'})`);
    if (src?.startsWith(BASE)) {
      const target = resolveFile(new URL(src, 'https://audit.local').pathname);
      if (!target || !fs.existsSync(target)) failures.push(`${fromPath}: missing image ${src}`);
    }
  }
}

console.log(`Checked ${htmlFiles.length} HTML pages, ${checkedLinks} internal links, and ${checkedImages} images.`);
if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  console.error(`\n${failures.length} failure(s).`);
  process.exitCode = 1;
} else {
  console.log('All internal links, fragments, images, alt attributes, duplicate IDs, and blank-target rel attributes pass.');
}
