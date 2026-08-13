// One-off: crop the promo/template text off two decorative menu graphics,
// leaving just the central botanical line-drawing (to match decor-fern etc.).
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const IMG = 'C:\\Users\\jonat\\Downloads\\stones throw website\\public\\images\\';
const OUT = process.argv[2] === 'preview'
  ? 'C:\\Users\\jonat\\AppData\\Local\\Temp\\claude\\C--Users-jonat-Downloads-stones-throw-website\\b18f7abe-ab2e-4a58-bb6c-f3d056d5d39e\\scratchpad\\'
  : IMG;

const jobs = [
  // [src, {left, top, width, height}, destName]
  ['decor-mushroom.png', { left: 110, top: 110, width: 300, height: 300 }, 'decor-mushroom.png'],
  ['decor-herbs.png', { left: 130, top: 205, width: 252, height: 252 }, 'decor-herbs.png'],
];

for (const [src, box, dest] of jobs) {
  const name = process.argv[2] === 'preview' ? 'crop-' + dest : dest;
  // Buffer first: sharp can't read and write the same path in place.
  const buf = await sharp(IMG + src).extract(box).png().toBuffer();
  writeFileSync(OUT + name, buf);
  console.log(`${src} -> ${name}  (${box.width}x${box.height} from ${box.left},${box.top})`);
}
