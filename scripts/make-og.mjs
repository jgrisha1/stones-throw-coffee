// Build the social-share card (og-stones-throw-coffee.webp): the circular logo
// on the brand deep-green, with a tagline. Preview to scratchpad first, then
// pass "commit" to write it into public/images/.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const IMG = 'C:\\Users\\jonat\\Downloads\\stones throw website\\public\\images\\';
const OUT = process.argv[2] === 'commit'
  ? IMG + 'og-stones-throw-coffee.webp'
  : 'C:\\Users\\jonat\\AppData\\Local\\Temp\\claude\\C--Users-jonat-Downloads-stones-throw-website\\b18f7abe-ab2e-4a58-bb6c-f3d056d5d39e\\scratchpad\\og-preview.webp';

const W = 1200, H = 630, GREEN = '#143a00', CREAM = '#faf4e7', GOLD = '#d3a13d';
const LOGO = 360, LOGO_X = Math.round((W - LOGO) / 2), LOGO_Y = 64;

// Solid brand-green base with a few faint star dots (echoing the site's pine sections).
const base = Buffer.from(`<svg width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${GREEN}"/>
  <circle cx="150" cy="120" r="2" fill="${CREAM}" opacity="0.5"/>
  <circle cx="1040" cy="150" r="2" fill="${GOLD}" opacity="0.55"/>
  <circle cx="1080" cy="470" r="2" fill="${CREAM}" opacity="0.4"/>
  <circle cx="120" cy="500" r="2" fill="${GOLD}" opacity="0.45"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${GOLD}"/>
</svg>`);

const text = Buffer.from(`<svg width="${W}" height="${H}">
  <text x="${W / 2}" y="500" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-weight="700" fill="${CREAM}">Coming soon to South Knoxville</text>
  <text x="${W / 2}" y="556" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="27" fill="${GOLD}">Queer-owned coffee &#183; community &#183; local art</text>
</svg>`);

const logo = await sharp(IMG + 'logo.png').resize(LOGO, LOGO, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();

const buf = await sharp(base)
  .composite([
    { input: logo, left: LOGO_X, top: LOGO_Y },
    { input: text, left: 0, top: 0 },
  ])
  .webp({ quality: 90 })
  .toBuffer();

writeFileSync(OUT, buf);
const m = await sharp(buf).metadata();
console.log(`wrote ${OUT}  (${m.width}x${m.height}, ${Math.round(buf.length / 1024)} KB)`);
