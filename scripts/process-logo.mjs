// Turn the round logo (a JPG on a cream background) into every logo asset the site uses:
//   public/images/logo.png          512px transparent circle (schema.org logo, OG card)
//   public/images/logo-224.webp     header logo at 2x
//   public/images/logo-336.webp     header logo at 3x
//   public/favicon.png              128px, logo on the brand green tile
//   public/apple-touch-icon.png     180px, logo on the brand green tile
//
// Usage:  node scripts/process-logo.mjs "C:\path\to\logo.jpg"
// then:   node scripts/make-og.mjs commit        (rebuilds the social share card from logo.png)
//
// The source has a cream margin outside its dark ring, so the ring's outer edge is detected
// and the image is cropped to it, then given a circular alpha mask. (Chroma-keying the cream
// would punch holes in the cream interior, so a mask is used instead.)
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public');
const SRC = process.argv[2];
if (!SRC) {
  console.error('usage: node scripts/process-logo.mjs <path-to-logo.jpg>');
  process.exit(1);
}
const GREEN = { r: 20, g: 58, b: 0, alpha: 1 }; // #143a00, the brand deep green

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const DARK = 130; // the ring is dark olive green on a cream (~240) background
const isDark = (x, y) => {
  const i = (y * W + x) * 3;
  return 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2] < DARK;
};
// Bounding box of the ring = the outermost dark pixels. Require a few dark pixels in a row or
// column so JPEG speckle can't move it. The ring is not always centered in the source image.
const MIN = 4;
const rowCount = (y) => { let n = 0; for (let x = 0; x < W; x++) if (isDark(x, y)) n++; return n; };
const colCount = (x) => { let n = 0; for (let y = 0; y < H; y++) if (isDark(x, y)) n++; return n; };
const first = (n, count) => { for (let i = 0; i < n; i++) if (count(i) >= MIN) return i; return -1; };
const last = (n, count) => { for (let i = n - 1; i >= 0; i--) if (count(i) >= MIN) return i; return -1; };
const xL = first(W, colCount), xR = last(W, colCount), yT = first(H, rowCount), yB = last(H, rowCount);
if ([xL, xR, yT, yB].some((v) => v < 0)) throw new Error("could not find the logo ring");
const cx = (xL + xR) / 2, cy = (yT + yB) / 2;
const R = Math.max(xR - xL, yB - yT) / 2 + 0.5;
console.log(`source ${W}x${H}; ring bbox x ${xL}-${xR}, y ${yT}-${yB}; center (${cx.toFixed(1)}, ${cy.toFixed(1)}); radius ${R.toFixed(1)}px`);

// Crop a square just outside the ring (centered on the ring), then mask to a circle hugging it.
const half = Math.ceil(R) + 3;
const left = Math.round(cx) - half, top = Math.round(cy) - half, size = half * 2;
if (left < 0 || top < 0 || left + size > W || top + size > H) throw new Error("ring too close to the image edge to crop");
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${half}" cy="${half}" r="${R + 1.5}" fill="#fff"/></svg>`,
);
const squared = await sharp(SRC)
  .extract({ left, top, width: size, height: size })
  .ensureAlpha()
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

const resized = (px) => sharp(squared).resize(px, px, { kernel: 'lanczos3' });

// Write with toBuffer + writeFileSync (plain writes; avoids sharp reading and writing one file).
const logoPng = await resized(512).png({ palette: true, quality: 92, compressionLevel: 9 }).toBuffer();
writeFileSync(join(OUT, 'images', 'logo.png'), logoPng);
writeFileSync(join(OUT, 'images', 'logo-224.webp'), await resized(224).webp({ quality: 92, alphaQuality: 100 }).toBuffer());
writeFileSync(join(OUT, 'images', 'logo-336.webp'), await resized(336).webp({ quality: 92, alphaQuality: 100 }).toBuffer());

// Favicon + touch icon: the circle on a solid green tile (readable on light and dark browser tabs).
async function tile(total, pad, file) {
  const inner = await resized(total - pad * 2).png().toBuffer();
  const buf = await sharp({ create: { width: total, height: total, channels: 4, background: GREEN } })
    .composite([{ input: inner, left: pad, top: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  writeFileSync(join(OUT, file), buf);
}
await tile(128, 8, 'favicon.png');
await tile(180, 12, 'apple-touch-icon.png');

for (const f of ['images/logo.png', 'images/logo-224.webp', 'images/logo-336.webp', 'favicon.png', 'apple-touch-icon.png']) {
  const m = await sharp(join(OUT, f)).metadata();
  console.log(`${f.padEnd(24)} ${m.width}x${m.height} alpha=${m.hasAlpha}`);
}
