# Stone's Throw Coffee — website

Queer-owned coffee shop, arts space, and community gathering place on
Chapman Highway in South Knoxville. This repo is the whole website: a fast, static [Astro](https://astro.build) site built for local
SEO, designed to deploy on Cloudflare Pages with GitHub as the source of
truth.

## Quick start

```bash
npm install     # once
npm run dev     # local dev server at http://localhost:4321
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Before launch — fill in the TODOs

Almost everything that still needs a human decision lives in **one file**:
[`src/config.ts`](src/config.ts). Fill in:

- [ ] **Domain** — also update `site` in `astro.config.mjs` and the
      `Sitemap:` line in `public/robots.txt`
- [ ] **Phone + email**
- [ ] **Hours** — set to 7 AM–6 PM daily in `src/config.ts`; confirm before launch
- [ ] **Opening date**
- [ ] **GPS coordinates** (right-click your pin in Google Maps)
- [ ] **Social URLs** (Instagram, Facebook, Threads)
- [ ] **Formspree endpoint** — activates the Contact and
      artist-application forms (free at formspree.io)
- [ ] **Newsletter action URL** — activates the email signup bands
      (free at buttondown.com)
- [ ] **Cloudflare Web Analytics token** — privacy-friendly analytics
- [ ] **Verify the address** — `3615 Chapman Hwy, Suite A, Knoxville, TN 37920`
      was confirmed against the old South Press listings; double-check the
      suite letter and ZIP against your lease

A few content TODOs live as HTML comments in the pages themselves — search
the repo for `TODO`:

- `src/pages/our-story.astro` — Casey & Zoey's real story and the real
  origin of the name (drafted as a frame with [bracketed] prompts)
- `src/pages/visit.astro` — parking details, accessibility specifics, KAT
  route number, and a possible Knox Pride Center mention once confirmed
- **Logo** — export the round mushroom-moon logo from Canva as a PNG
  (1000px+, ideally transparent background) to `public/images/logo.png`,
  then set `logoPath: '/images/logo.png'` in `src/config.ts` so it flows
  into the structured data. Use it for the Google Business Profile and
  social avatars too.
- Replace `public/og-default.png` with a real photo or Canva export
  (1200x630) when you have one — the current file is a generated placeholder
  (night sky + cairn, matched to the site palette)

## Everyday editing

### Add an event (do this for every event — never Instagram-only)

1. Copy `src/content/events/_TEMPLATE.md` to a new file in the same folder.
   The filename becomes the URL: `open-mic-july-2026.md` →
   `/events/open-mic-july-2026/`.
2. Fill in the frontmatter, write a couple of paragraphs, set
   `draft: false`.
3. Commit and push — Cloudflare Pages rebuilds automatically.

Each event page gets its own URL, Event structured data for Google, an
add-to-calendar button, and proper share previews on Facebook/Threads.

### Edit the menu

Everything is in `src/data/menu.ts` — items, prices, sizes, descriptions.
The page **and** the structured data Google reads are generated from that
one file.

### Write an update / news post

Add a markdown file to `src/content/posts/` with `title`, `description`,
`pubDate`, and `draft: false`. Three pre-written posts from the content
calendar are already sitting there as drafts (`draft: true`) — review each
one, then flip it live on its planned week. See
[`docs/CONTENT-CALENDAR.md`](docs/CONTENT-CALENDAR.md).

### Business facts (hours, phone, socials)

Edit `src/config.ts`. Header, footer, Visit page, Contact page, and all
structured data update together.

## Deploying (GitHub + Cloudflare Pages)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git**, pick the repo.
3. Build settings: framework preset **Astro**, build command
   `npm run build`, output directory `dist`.
4. Add your custom domain under the Pages project → Custom domains
   (Cloudflare will walk you through DNS).
5. Every push to `main` deploys automatically.

After the first deploy with the real domain:

- Add the site to **Google Search Console** (URL prefix → verify via
  Cloudflare DNS) and submit `https://YOURDOMAIN/sitemap-index.xml`
- Add the site to **Bing Webmaster Tools** (it can import from Search
  Console)

The full opening to-do list — Google Business Profile, directories,
photos — is in [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md).

## How this site does SEO (so future edits don't undo it)

- **The menu is HTML text**, never an image or PDF. Keep it that way.
- **Every event gets its own page** with Event schema — this is the main
  discovery advantage over shops that only post to Instagram.
- **CafeOrCoffeeShop structured data** is on every page, generated from
  `src/config.ts` (`src/layouts/Base.astro`). Empty fields are omitted
  automatically, so it's never wrong — just incomplete until config is
  filled in.
- **Titles and meta descriptions** are set per page and lead with what
  people actually search: "coffee shop South Knoxville", "queer coffee
  shop Knoxville", "mushroom coffee Knoxville", "open mic South Knoxville".
- **Sitemap and robots.txt** are generated/served automatically.
- Keep NAP (name, address, phone) identical everywhere on the web.

## Brand rules

- **South Press gets at most one respectful nod**, on the Our Story page, and
  only if it's already phrased carefully. Don't reference it anywhere else on
  the site, don't frame Stone's Throw as replacing South Press, and don't say
  South Press is "back" — Stone's Throw stands on its own name. (Code comments
  and internal docs don't count.)
- **Coming soon.** Stone's Throw is opening soon in South Knoxville — never
  write copy that implies the café is already open.
- Voice: warm, plainspoken, grounded, deeply Appalachian. Never corporate.
- Queer-owned, sober-friendly, and LGBTQIA2S+ affirming. Drag shows are a
  central part of the community/events identity, not an afterthought.
- Queer-affirming should be clear but tasteful — no rainbow overload.
- **Look is green-witch, not celestial.** Palette is sampled from the logo:
  forest green `#186000` / deep `#143a00`, cream `#faf4e7`, mushroom brown
  `#8a5a30`, honey accent `#c4923a` (all in `src/styles/global.css`, with
  legacy variable names repointed). Motifs are woodland — mushrooms,
  botanical fern sprigs, a crescent moon, a few sparkles. The real logo is
  `public/images/logo.png` (white background keyed to transparent); drop a
  new transparent PNG there to refresh it everywhere.
