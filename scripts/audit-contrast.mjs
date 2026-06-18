// WCAG 2.1 contrast audit for the Stone's Throw palette.
// Computes the contrast ratio for every foreground/background pair the site
// actually uses, and flags anything under AA (4.5 normal text, 3.0 large/UI).
const hex = (h) => {
  const n = h.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};
const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const L = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const mix = (a, b) => {
  const [ra, ga, ba] = hex(a), [rb, gb, bb] = hex(b);
  const m = (x, y) => Math.round((x + y) / 2).toString(16).padStart(2, '0');
  return `#${m(ra, rb)}${m(ga, gb)}${m(ba, bb)}`;
};

const P = {
  cream: '#faf4e7', creamDeep: '#f1e6d0', card: '#fffdf6',
  green: '#186000', greenDeep: '#143a00', brown: '#8a5a30', honey: '#d3a13d',
  clayBright: '#a06a38', plum: '#6f4626', ink: '#23291c', inkSoft: '#49513f',
  e9: '#e9e0cb', footer: '#d8d2bd', white: '#ffffff',
};
// midpoint of the pine gradient (greenDeep -> green) — where centred text sits
const pineMid = mix(P.greenDeep, P.green);

const pairs = [
  // [fg, bg, label, minimum]
  [P.ink, P.cream, 'body text on cream', 4.5],
  [P.inkSoft, P.cream, 'soft text (lede/meta) on cream', 4.5],
  [P.brown, P.cream, 'links on cream', 4.5],
  [P.plum, P.cream, 'eyebrow / link-hover on cream', 4.5],
  [P.green, P.cream, 'headings on cream', 4.5],
  [P.inkSoft, P.creamDeep, 'soft text on tint (cream-deep)', 4.5],
  [P.brown, P.creamDeep, 'links on tint', 4.5],
  [P.green, P.creamDeep, 'headings on tint', 4.5],
  [P.inkSoft, P.card, 'card desc/meta on white card', 4.5],
  [P.brown, P.card, 'resource links on white card', 4.5],
  // .section--pine is now solid green-deep (no gradient to the lighter --green)
  [P.cream, P.greenDeep, 'cream text on pine (solid green-deep)', 4.5],
  [P.honey, P.greenDeep, 'honey/gold text on pine (solid green-deep)', 4.5],
  [P.e9, P.greenDeep, 'cream-tint (#e9e0cb) on pine', 4.5],
  // .hero keeps its gradient; its only gold text is the eyebrow at the dark top
  [P.honey, P.greenDeep, 'hero eyebrow (gold) at gradient top', 4.5],
  [P.cream, P.green, 'cream text over hero gradient light end', 4.5],
  [P.footer, P.greenDeep, 'footer text on footer', 4.5],
  [P.honey, P.greenDeep, 'footer gold links on footer', 4.5],
  [P.greenDeep, P.honey, 'dark text on gold pill / solid button', 4.5],
  [P.cream, P.brown, 'cream text on clay button', 4.5],
  [P.white, P.clayBright, 'white text on clay-hover button', 4.5],
  [P.honey, P.greenDeep, 'gold nav underline / border (UI)', 3.0],
];

let fails = 0;
console.log(`pine gradient: ${P.greenDeep} -> ${P.green}  (midpoint ${pineMid})\n`);
for (const [fg, bg, label, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fails++;
  console.log(`${ok ? ' ok ' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (need ${min})  ${fg} on ${bg}  — ${label}`);
}
console.log(`\n${fails} failure(s).`);
