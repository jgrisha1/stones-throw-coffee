/**
 * Site image manifest — every visual asset the site needs, whether created or not.
 *
 * Status values:
 *   'needed'      — not yet created; site shows a CSS placeholder
 *   'placeholder' — generic placeholder image in place; needs real asset
 *   'created'     — created via Canva / generated; needs review/approval
 *   'approved'    — final approved asset, in place
 *
 * To add a new asset: add an entry here, then drop the file into public/images/.
 * Canva exports: File → Download → PNG (transparent) or WebP.
 */

export interface SiteImage {
  filename: string;
  page: string;
  section: string;
  purpose: string;
  alt: string;
  width: number;
  height: number;
  format: 'webp' | 'png' | 'svg' | 'jpg';
  lazy: boolean;
  status: 'needed' | 'placeholder' | 'created' | 'approved';
  canvaPrompt: string;
  sourceNote: string;
}

export const SITE_IMAGES: SiteImage[] = [
  // ── Large scene images (WebP, lazy except hero) ──────────────────────────

  {
    filename: 'home-hero-forest-coffeehouse.webp',
    page: 'Homepage',
    section: 'Hero background',
    purpose: 'Warm first impression; reinforces green-witch / Appalachian forest café identity.',
    alt: 'Cozy plant-filled coffee shop interior with local art, books, warm lighting, and earthy green decor.',
    width: 1600,
    height: 900,
    format: 'webp',
    lazy: false,
    status: 'approved',
    canvaPrompt:
      'Cozy queer-owned South Knoxville coffee shop interior with a maximalist forest aesthetic: lush plants, ferns, warm beige walls, deep green accents, cozy seating, coffee cups, local art on the walls, books, soft natural light, subtle witchy botanical details, mushrooms and herbs as decor, welcoming community atmosphere, Appalachian creative energy, not corporate, not overly polished, no readable text, no fake logos, no distorted people, warm and inviting.',
    sourceNote: 'Generate in Canva AI (Magic Media) or source from Unsplash/Pexels (creative commons).',
  },
  {
    filename: 'menu-specialty-latte.webp',
    page: 'Menu',
    section: 'Page header / featured drink',
    purpose: 'Visual anchor for the menu page; sets earthy coffeehouse mood.',
    alt: 'Specialty latte on a wooden table with coffee beans, herbs, and botanical accents.',
    width: 1200,
    height: 800,
    format: 'webp',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'A handcrafted specialty latte on a warm wooden table surrounded by botanical accents, ferns, cinnamon, coffee beans, syrup bottles, and a subtle cozy witchy café mood. Earth tones, soft light, realistic coffee texture, no readable text, no hands, no logo.',
    sourceNote: 'Canva AI or Unsplash (search: "specialty latte botanical").',
  },
  {
    filename: 'menu-flavors-botanical-syrups.webp',
    page: 'Menu',
    section: 'Flavors section accent',
    purpose: 'Decorative accent beside the flavor list; apothecary-coffeehouse feeling.',
    alt: 'Coffee syrups, herbs, honey, lavender, rosemary, orange peel, and coffee beans arranged in a botanical still life.',
    width: 1200,
    height: 800,
    format: 'webp',
    lazy: true,
    status: 'approved',
    canvaPrompt:
      'A warm botanical still life with coffee syrups, herbs, honey, lavender, rosemary, orange peel, cinnamon, vanilla, hazelnuts, and coffee beans arranged in a cozy apothecary coffeehouse style. Earthy green and beige palette, vintage botanical mood, no readable labels, no brand names.',
    sourceNote: 'Canva AI or Unsplash (search: "botanical coffee syrup flat lay").',
  },
  {
    filename: 'events-open-mic-community.webp',
    page: 'Events',
    section: 'Page hero / card',
    purpose: 'Anchors the events page; signals live music and community gathering.',
    alt: 'Small coffee shop stage with a microphone, acoustic guitar, plants, books, and local art.',
    width: 1600,
    height: 900,
    format: 'webp',
    lazy: false,
    status: 'approved',
    canvaPrompt:
      'A cozy small coffee shop stage corner with a microphone, acoustic guitar, books, plants, warm lighting, local art wall, and a welcoming community gathering vibe. Subtle queer-affirming energy without rainbow overload, earthy forest café aesthetic, no readable text, no distorted people.',
    sourceNote: 'Canva AI or Unsplash (search: "coffee shop open mic stage plants").',
  },
  {
    filename: 'local-art-makers-wall.webp',
    page: 'Local Art & Makers',
    section: 'Page hero',
    purpose: 'Represents the local art wall and maker goods.',
    alt: 'Coffee shop wall with local art, handmade goods, plants, ceramics, prints, and zines.',
    width: 1600,
    height: 900,
    format: 'webp',
    lazy: false,
    status: 'approved',
    canvaPrompt:
      'A warm coffee shop art wall featuring local handmade art, small maker shelves, ceramics, zines, prints, plants, and cozy forest-inspired decor. Earthy colors, maximalist but welcoming, no readable text, no fake brand names.',
    sourceNote: 'Canva AI or Unsplash (search: "indie coffee shop art wall maker").',
  },
  {
    filename: 'support-community-hands.webp',
    page: 'Support Us',
    section: 'Hero background',
    purpose: 'Symbolizes community-powered opening; warm and hopeful, not transactional.',
    alt: 'Community support table with coffee cups, plants, tools, art supplies, and donation items.',
    width: 1600,
    height: 900,
    format: 'webp',
    lazy: false,
    status: 'approved',
    canvaPrompt:
      'A symbolic community support image for a queer-owned coffee shop: hands placing coffee cups, small plants, tools, art supplies, and donation items on a wooden table. Warm, hopeful, earthy, community-built feeling. Avoid distorted hands. No readable text. No logos.',
    sourceNote: 'Canva AI. Note: avoid AI hands — use objects-on-table composition instead.',
  },
  {
    filename: 'our-story-coffee-plants-books.webp',
    page: 'Our Story',
    section: 'Header background',
    purpose: 'Storytelling scene; intimate and welcoming, no people required.',
    alt: 'Two coffee cups on a cozy table with books, plants, candles, and botanical art.',
    width: 1600,
    height: 900,
    format: 'webp',
    lazy: false,
    status: 'approved',
    canvaPrompt:
      'A cozy storytelling scene inside an earthy coffee shop: two coffee cups on a table, books, plants, candles, botanical art, warm light, forest-inspired decor, intimate and welcoming mood. No readable text, no fake people, no logos.',
    sourceNote: 'Canva AI or Unsplash (search: "cozy coffee books plants candle table").',
  },

  // ── Open Graph social share ───────────────────────────────────────────────

  {
    filename: 'og-stones-throw-coffee.webp',
    page: 'All pages (social share)',
    section: 'Open Graph image',
    purpose: 'Default social preview when a page link is shared on Facebook / Threads / iMessage.',
    alt: 'Warm plant-filled coffee shop scene with coffee cups, books, ferns, mushrooms, and cozy lighting.',
    width: 1200,
    height: 630,
    format: 'webp',
    lazy: false,
    status: 'needed',
    canvaPrompt:
      'A warm, plant-filled, earthy coffee shop scene with coffee cups, books, mushrooms, ferns, and cozy lighting. Leave clear negative space for optional logo/text overlay. Queer-owned South Knoxville community coffeehouse feeling. No readable generated text, no fake logo.',
    sourceNote: 'Canva — create at 1200×630px. Overlay logo + site name in Canva text layer.',
  },

  // ── Founder portraits (once approved by Casey & Zoey) ────────────────────

  {
    filename: 'portrait-casey.webp',
    page: 'Our Story',
    section: 'Founder card — Casey',
    purpose: 'Personal photo to replace the SVG placeholder circle.',
    alt: 'Casey Stone, co-owner of Stone\'s Throw Coffee.',
    width: 600,
    height: 600,
    format: 'webp',
    lazy: true,
    status: 'approved',
    canvaPrompt: 'N/A — use a real photo provided by Casey.',
    sourceNote: 'Owner-supplied photo only. Crop to square, optimize to WebP at 600×600.',
  },
  {
    filename: 'portrait-zoey.webp',
    page: 'Our Story',
    section: 'Founder card — Zoey',
    purpose: 'Personal photo to replace the SVG placeholder circle.',
    alt: 'Zoey Stone, co-owner of Stone\'s Throw Coffee.',
    width: 600,
    height: 600,
    format: 'webp',
    lazy: true,
    status: 'needed',
    canvaPrompt: 'N/A — use a real photo provided by Zoey.',
    sourceNote: 'Owner-supplied photo only. Crop to square, optimize to WebP at 600×600.',
  },

  // ── Decorative botanical SVG / PNG elements ───────────────────────────────

  {
    filename: 'decor-fern.png',
    page: 'Site-wide decorative',
    section: 'Section accents',
    purpose: 'Transparent-background fern illustration for section breaks and page accents.',
    alt: '',
    width: 512,
    height: 512,
    format: 'png',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'Vintage botanical line art illustration of a fern frond, transparent background, simple deep green linework, hand-drawn, earthy, witchy, coffeehouse style, no text, isolated element.',
    sourceNote: 'Canva AI or Vecteezy (free license). Export PNG with transparent background.',
  },
  {
    filename: 'decor-mushroom.png',
    page: 'Site-wide decorative',
    section: 'Section accents / hero',
    purpose: 'Transparent mushroom illustration matching the logo motif.',
    alt: '',
    width: 512,
    height: 512,
    format: 'png',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'Vintage botanical line art illustration of a mushroom (cap and stem), transparent background, deep green or brown linework, hand-drawn, earthy, witchy, coffeehouse style, no text, isolated element.',
    sourceNote: 'Canva AI or Vecteezy (free license). Export PNG with transparent background.',
  },
  {
    filename: 'decor-coffee-cup.png',
    page: 'Site-wide decorative',
    section: 'Menu / support section accents',
    purpose: 'Cozy latte-style cup illustration for decorative use.',
    alt: '',
    width: 512,
    height: 512,
    format: 'png',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'Vintage botanical line art illustration of a steaming coffee cup with a latte art leaf, transparent background, warm brown or deep green linework, hand-drawn, cozy witchy coffeehouse style, no text, isolated element.',
    sourceNote: 'Canva AI or Vecteezy (free license). Export PNG with transparent background.',
  },
  {
    filename: 'decor-moon-stars.png',
    page: 'Site-wide decorative',
    section: 'Dividers / footer accents',
    purpose: 'Crescent moon and stars illustration matching the logo crescent.',
    alt: '',
    width: 512,
    height: 512,
    format: 'png',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'Vintage botanical line art illustration of a crescent moon with small sparkle stars, transparent background, honey or cream linework, hand-drawn, witchy, coffeehouse style, no text, isolated element.',
    sourceNote: 'Canva AI or Vecteezy (free license). Export PNG with transparent background.',
  },
  {
    filename: 'decor-herbs.png',
    page: 'Site-wide decorative',
    section: 'Menu / flavors section accents',
    purpose: 'Small herb bundle illustration (lavender, rosemary) for flavor section.',
    alt: '',
    width: 512,
    height: 512,
    format: 'png',
    lazy: true,
    status: 'needed',
    canvaPrompt:
      'Vintage botanical line art illustration of a tied herb bundle (lavender, rosemary, thyme), transparent background, deep green linework, hand-drawn, earthy apothecary style, no text, isolated element.',
    sourceNote: 'Canva AI or Vecteezy (free license). Export PNG with transparent background.',
  },
];

/** All images in 'needed' or 'placeholder' state — still to be created. */
export const IMAGES_NEEDED = SITE_IMAGES.filter(
  (img) => img.status === 'needed' || img.status === 'placeholder',
);
