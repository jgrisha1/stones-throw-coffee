# Launch checklist — Stone's Throw Coffee

The website is one leg of local visibility. This is the rest. Work top to
bottom; the early items compound.

## 1. Before anything else

- [ ] Register the domain (then update `astro.config.mjs`,
      `public/robots.txt`, and `src/config.ts`)
- [ ] Create the business email on that domain (e.g. hello@…)
- [ ] Get the business phone number
- [ ] Fill in every TODO in `src/config.ts`
- [ ] Verify address/suite/ZIP against the lease

## 2. Google Business Profile (as important as the website)

Set up or claim **before opening** at business.google.com:

- [ ] Primary category: **Coffee shop**
- [ ] Secondary categories as allowed: Cafe, Tea house, Event venue, Art cafe
- [ ] Exact NAP — identical to the website, character for character
- [ ] Opening date
- [ ] Website URL, Menu URL (`/menu/`), Events URL (`/events/`)
- [ ] Hours (+ holiday hours)
- [ ] Attributes as available: **LGBTQ+ friendly**, **queer-owned**,
      **women-owned** (if applicable), **accessible entrance** (once
      verified), Wi-Fi, etc.
- [ ] Logo + photos: exterior with signage, interior, counter, seating,
      drinks, art wall (Google favors profiles with fresh real photos)
- [ ] Add menu items as Products with prices
- [ ] Post weekly (Updates) before AND after opening — reuse the
      `/updates/` posts
- [ ] After opening: ask happy regulars for reviews, respond to every one

## 3. Other listings (same NAP everywhere)

- [ ] Apple Maps (Apple Business Connect)
- [ ] Bing Places (can import from Google)
- [ ] Yelp
- [ ] Facebook page + Instagram + Threads
- [ ] Knoxville LGBTQ Friendly Business Directory (knoxlgbtbusinesses.com)
- [ ] Visit Knoxville business listing
- [ ] Knox Pride community calendar / partnerships (if appropriate)
- [ ] SoKno community listings
- [ ] Nextdoor business page

## 4. Search engines & analytics

- [ ] Google Search Console — verify domain, submit
      `/sitemap-index.xml`
- [ ] Bing Webmaster Tools — import from Search Console
- [ ] Cloudflare Web Analytics — create token, paste into
      `src/config.ts`
- [ ] Test structured data: paste the live URL into
      https://search.google.com/test/rich-results (expect
      CafeOrCoffeeShop everywhere, Event on event pages)
- [ ] Test social sharing: https://developers.facebook.com/tools/debug/

## 5. Photos (replace placeholders)

Shoot list — real photos beat anything generated; export from Canva at
1200x630 for share images:

- [ ] Exterior with signage (daylight)
- [ ] Counter + menu board
- [ ] 3–4 hero drinks (incl. the mushroom coffee)
- [ ] Art wall, stage corner, seating
- [ ] Casey & Zoey for Our Story
- [ ] Replace `public/og-default.png` with a real 1200x630 image

## 6. Press & community (first 60 days)

- [ ] Pitch Inside of Knoxville (insideofknoxville.com) — "new
      queer-owned coffee shop opening in former South Press space" is a
      story they cover
- [ ] WBIR / WVLT community calendars + story pitch near opening
- [ ] UT Daily Beacon if hosting student-friendly events
- [ ] Invite local authors/musicians you book to link to their event page
      from their own sites (real local backlinks)
- [ ] List bigger events on Eventbrite (free listings link back)

## 7. Recurring rhythm (after launch)

- Weekly: one `/updates/` post (see CONTENT-CALENDAR.md) + GBP post
- Per event: site event page FIRST, then Instagram/Facebook pointing to it
- Monthly: check Search Console for new queries worth a post
- Quarterly: confirm NAP consistency across all listings
