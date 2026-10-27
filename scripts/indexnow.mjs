/**
 * Tell IndexNow-supporting search engines (Bing, Yahoo, DuckDuckGo and Ecosia through Bing, Yandex,
 * Naver, Seznam, and others) about every URL in the built sitemap. No account is needed: the engine
 * checks that the key file at https://<site>/<key>.txt matches.
 *
 * Usage (after the site is deployed):  node scripts/indexnow.mjs [--dry-run]
 * Reads dist/sitemap-0.xml (run `npm run build` first). Safe to re-run after any content change.
 */
import { readFileSync, readdirSync } from 'node:fs';

const HOST = 'stonesthrowknoxville.com';
const SITE = `https://${HOST}`;

// The key is the name of the one hex .txt file in public/ (see that file's contents).
const keyFile = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file found in public/ (expected <32 hex>.txt).');
const key = keyFile.replace('.txt', '');
if (readFileSync(`public/${keyFile}`, 'utf8').trim() !== key) throw new Error('Key file contents do not match its name.');

const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error('No URLs found in dist/sitemap-0.xml.');

const body = { host: HOST, key, keyLocation: `${SITE}/${keyFile}`, urlList: urls };
console.log(`${urls.length} URLs, key file ${SITE}/${keyFile}`);
if (process.argv.includes('--dry-run')) {
  console.log(urls.join('\n'));
  process.exit(0);
}

// First check the key file is live, so the engine will accept the submission.
const keyRes = await fetch(body.keyLocation);
const keyText = (await keyRes.text()).trim();
if (!keyRes.ok || keyText !== key) {
  throw new Error(`Key file not live yet (${keyRes.status}). Deploy first, then run again.`);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
// 200 = accepted, 202 = accepted (key validation pending). Anything else is a problem.
if (![200, 202].includes(res.status)) {
  console.log(await res.text());
  process.exit(1);
}
