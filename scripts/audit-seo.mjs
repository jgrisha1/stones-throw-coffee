import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(DIST);

const titles = {};
const descs = {};

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(DIST, f).split(path.sep).join('/');
  const decode = (s) =>
    s
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&rsquo;|&#8217;|&#x2019;/g, '’')
      .replace(/&lsquo;/g, '‘')
      .replace(/&rdquo;|&ldquo;/g, '”')
      .replace(/&mdash;/g, '—')
      .replace(/&ndash;/g, '–')
      .replace(/&amp;/g, '&')
      .replace(/&middot;/g, '·')
      .replace(/&hellip;/g, '…');
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  const lang = (html.match(/<html lang="([^"]*)"/) || [])[1] || '';
  const canonical = /rel="canonical"/.test(html);
  const noindex = /name="robots" content="noindex"/.test(html);
  const ogimg = /property="og:image"/.test(html);
  const viewport = /name="viewport"/.test(html);

  const heads = [...html.matchAll(/<h([1-6])[ >]/g)].map((m) => +m[1]);
  let skip = '';
  let prev = 0;
  for (const h of heads) {
    if (prev && h > prev + 1) skip += ` h${prev}->h${h}`;
    prev = h;
  }

  titles[title] = (titles[title] || []).concat(rel);
  descs[desc] = (descs[desc] || []).concat(rel);

  const flags = [];
  if (h1s !== 1) flags.push('H1count=' + h1s);
  if (title.length < 15 || title.length > 62) flags.push('titleLen=' + title.length);
  if (desc.length < 70 || desc.length > 165) flags.push('descLen=' + desc.length);
  if (lang !== 'en') flags.push('lang=' + lang);
  if (!canonical && !noindex) flags.push('NO-canonical');
  if (!ogimg) flags.push('NO-ogimage');
  if (!viewport) flags.push('NO-viewport');
  if (skip) flags.push('HEAD-SKIP:' + skip);
  console.log((flags.length ? '⚠ ' : '✓ ') + rel + (flags.length ? '  [' + flags.join(', ') + ']' : ''));
}

console.log('\n--- duplicate titles ---');
for (const t in titles) if (titles[t].length > 1) console.log('DUP TITLE:', JSON.stringify(t), '->', titles[t].join(', '));
console.log('--- duplicate descriptions ---');
for (const d in descs) if (descs[d].length > 1) console.log('DUP DESC ->', descs[d].join(', '));
