/**
 * Image optimizer: converts PNG/JPG sources in assets-src/image-originals
 * to WebP in public/images. Drop new Canva exports into assets-src/image-originals,
 * add a job below, then run:
 *
 *   node scripts/optimize-images.mjs
 *
 * Re-running is safe — it skips outputs that are newer than their source.
 * Originals never ship: only public/ deploys.
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const SOURCES = path.resolve('assets-src/image-originals');
const IMAGES = path.resolve('public/images');

// [source, output, max width, webp quality]
const JOBS = [
  ['home-hero-forest-coffeehouse.png', 'home-hero-forest-coffeehouse.webp', 1920, 80],
  ['support-community-hands.png', 'support-community-hands.webp', 1920, 80],
  ['our-story-coffee-plants-books.png', 'our-story-coffee-plants-books.webp', 1920, 80],
  ['local-art-makers-wall.png', 'local-art-makers-wall.webp', 1920, 80],
  ['menu-flavors-botanical-syrups.png', 'menu-flavors-botanical-syrups.webp', 1920, 80],
  ['events-open-mic-community.png', 'events-open-mic-community.webp', 1920, 80],
  ['decor-botanicals.png', 'decor-botanicals.webp', 1200, 80],
  // portraits render at 120px circles — 480px covers 4x DPR
  ['portrait-casey.jpg', 'portrait-casey.webp', 480, 82],
  ['portrait-zoey.jpg', 'portrait-zoey.webp', 480, 82],
  // logo renders up to ~176px in the header badge — 512px covers retina
  ['logo.png', 'logo.webp', 512, 90],
];

const fresh = async (src, out) => {
  try {
    const [s, o] = await Promise.all([stat(src), stat(out)]);
    return o.mtimeMs > s.mtimeMs;
  } catch {
    return false; // output missing
  }
};

for (const [srcName, outName, maxWidth, quality] of JOBS) {
  const src = path.join(SOURCES, srcName);
  const out = path.join(IMAGES, outName);
  try {
    await stat(src);
  } catch {
    console.log(`skip (no source): ${srcName}`);
    continue;
  }
  if (await fresh(src, out)) {
    console.log(`up to date: ${outName}`);
    continue;
  }
  const { size: inSize } = await stat(src);
  await sharp(src)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out);
  const { size: outSize } = await stat(out);
  console.log(
    `${srcName} → ${outName}: ${(inSize / 1024).toFixed(0)}KB → ${(outSize / 1024).toFixed(0)}KB`
  );
}
