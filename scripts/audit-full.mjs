// One-off full technical audit over the built dist/.
import fs from 'node:fs';
import path from 'node:path';

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})('dist');

let imgTotal = 0, imgNoAlt = 0;
const noAltList = [], missingLang = [], noSkip = [], noViewport = [], noOg = [], noCanon = [], headingIssues = [];

for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const rel = f.split(path.sep).slice(1).join('/');
  const imgs = h.match(/<img\b[^>]*>/g) || [];
  for (const img of imgs) { imgTotal++; if (!/\balt\s*=/.test(img)) { imgNoAlt++; noAltList.push(rel); } }
  if (!/<html[^>]*\blang=/.test(h)) missingLang.push(rel);
  if (!/skip-link|skip to (main|content)/i.test(h)) noSkip.push(rel);
  if (!/name="viewport"/.test(h)) noViewport.push(rel);
  if (!/property="og:title"/.test(h)) noOg.push(rel);
  if (!/rel="canonical"/.test(h) && !/noindex/.test(h) && !rel.includes('404')) noCanon.push(rel);
  const heads = [...h.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
  const h1count = heads.filter((x) => x === 1).length;
  if (h1count !== 1) headingIssues.push(`${rel}: ${h1count} h1s`);
  for (let i = 1; i < heads.length; i++) {
    if (heads[i] - heads[i - 1] > 1) { headingIssues.push(`${rel}: h${heads[i - 1]}->h${heads[i]} skip`); break; }
  }
}

const j = (a) => (a.length ? [...new Set(a)].join(', ') : 'none ✓');
console.log('Pages scanned:', files.length);
console.log('Images total:', imgTotal, '| missing alt:', imgNoAlt, imgNoAlt ? '(' + j(noAltList) + ')' : '✓');
console.log('Missing <html lang>:', j(missingLang));
console.log('Missing skip-link:', j(noSkip));
console.log('Missing viewport:', j(noViewport));
console.log('Missing OG tags:', j(noOg));
console.log('Missing canonical (indexable):', j(noCanon));
console.log('Heading structure issues:', headingIssues.length ? headingIssues.join(' | ') : 'none ✓');
