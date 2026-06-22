// One-off: turn the new round logo (cream-background JPG) into transparent
// PNG + WebP for the header and schema. Circular mask = clean edge for a
// round mark; keeps the interior cream intact (chroma-keying would punch holes).
import sharp from 'sharp';

const SRC = 'C:\\Users\\jonat\\Downloads\\stone s throw.jpg';
const OUT = 'C:\\Users\\jonat\\Downloads\\stones throw website\\public\\images\\';

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

// Square the canvas (cover-crop centered) so the circle is true. Cap at 600px:
// header shows it at 112px (crisp past 2x retina) and schema wants 600px+.
const size = Math.min(meta.width, meta.height, 600);

// Circular alpha mask. Inset 1px so the dark-green ring isn't clipped.
const r = size / 2;
const mask = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r - 1}" fill="#fff"/></svg>`
);

const base = sharp(SRC)
  .resize(size, size, { fit: 'cover', position: 'centre' })
  .composite([{ input: mask, blend: 'dest-in' }]);

await base.clone().png().toFile(OUT + 'logo.png');
await base.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(OUT + 'logo.webp');

const p = await sharp(OUT + 'logo.png').metadata();
const w = await sharp(OUT + 'logo.webp').metadata();
console.log(`logo.png: ${p.width}x${p.height} hasAlpha=${p.hasAlpha}`);
console.log(`logo.webp: ${w.width}x${w.height} hasAlpha=${w.hasAlpha}`);
