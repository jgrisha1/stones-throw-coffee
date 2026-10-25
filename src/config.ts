/**
 * Single source of truth for every business fact on the site.
 *
 * The header, footer, Visit page, Contact page, and ALL structured data
 * (the JSON-LD that Google reads) pull from this file. Fill in every TODO
 * before launch. Empty strings are automatically omitted from structured
 * data, so nothing incorrect ships - but Google can't rank what isn't here.
 *
 * Keep these values byte-for-byte identical to your Google Business Profile,
 * Yelp, Apple Maps, and Facebook listings. Consistent NAP (name, address,
 * phone) across the web is a core local-SEO signal.
 */

export interface HoursRule {
  /** schema.org day names: Monday, Tuesday, ... Sunday */
  days: string[];
  /** 24h time, e.g. '07:00'. Omit for a closed day. */
  opens?: string;
  /** 24h time, e.g. '18:00'. Omit for a closed day. */
  closes?: string;
  /** True for a day the shop is closed: shown on the page, left out of structured data. */
  closed?: boolean;
}

export const BUSINESS = {
  name: "Stone's Throw Coffee",
  tagline: 'Coffee, community, and local art in South Knoxville.',
  description:
    "Stone's Throw Coffee is a queer-owned, LGBTQIA2S+ affirming coffee shop and community arts space opening October 31, 2026 in South Knoxville, serving handcrafted espresso, specialty teas, matcha, and mushroom coffee alongside drag shows, local art, author readings, acoustic music, vendor markets, and sober-friendly community events.",

  // --- Location ---
  // Lease signed October 2026: former South Press space. Keep this formatted
  // exactly as it appears on the Google Business Profile.
  address: {
    street: '3615 Chapman Hwy, Ste A',
    city: 'Knoxville',
    state: 'TN',
    zip: '37920',
  },

  // Matched by the US Census geocoder and OpenStreetMap. Swap in the Google
  // Maps pin coordinates once the Business Profile is verified, if they differ.
  geo: { latitude: '35.94103', longitude: '-83.91029' },

  // --- Contact ---
  // TODO: fill in before launch. phone is E.164 for structured data,
  // phoneDisplay is what humans see.
  phone: '', // e.g. '+18655551234'
  phoneDisplay: '', // e.g. '(865) 555-1234'
  email: 'stonesthrowcoffeeco@gmail.com',

  // --- Hours ---
  // 8am to 6pm every day except Tuesday (closed). Shown on the site now, but only emitted
  // to structured data (schema.org) once openingDate is set, so search engines never show
  // the shop as open before it has opened.
  hours: [
    { days: ['Monday'], opens: '08:00', closes: '18:00' },
    { days: ['Tuesday'], closed: true },
    { days: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '18:00' },
  ] as HoursRule[],

  // Opening date (ISO). Set Oct 19, 2026: officially opening Saturday, October 31, 2026.
  // Setting it turns on the dated copy across the site and emits hours to structured data
  // (valid from this date). If it ever slips, change it here and update Google Business Profile.
  openingDate: '2026-10-31',

  priceRange: '$',

  // Round mushroom-and-moon logo, white background keyed to transparent.
  // Flows into the CafeOrCoffeeShop structured data. To refresh it, drop a new
  // PNG at public/images/logo.png (transparent, 600px+).
  logoPath: '/images/logo.png',

  // --- Social profiles ---
  // These become schema.org sameAs links, footer icons, and contact fallbacks.
  social: {
    instagram: 'https://www.instagram.com/stonesthrowcoffeeknox/',
    facebook: 'https://www.facebook.com/stonesthrowcoffeeknox/',
    threads: '',
  },

  // --- Community funding ---
  gofundme: 'https://www.gofundme.com/f/stones-throw-community-coffee-shop',
  // Cash App: cashtag for display, cashAppUrl is the canonical cash.app link.
  cashApp: '$StonesThrowCoffee',
  cashAppUrl: 'https://cash.app/$StonesThrowCoffee',

  // --- Merch ---
  // Sold through a Knoxville designer's Etsy shop. This links to the shop's "Stone's Throw Coffee"
  // section only (section_id), because the same shop also sells the designer's unrelated designs.
  merchUrl: 'https://www.etsy.com/shop/MeowMimiDesigns?section_id=60971555',
  merchShopName: 'MeowMimiDesigns',

  // --- Story video ---
  // The owners' "A message from us to you" video (1:51, captioned), posted on Facebook Oct 19, 2026.
  // Linked, not embedded, so nothing loads from Facebook until someone chooses to watch.
  storyVideoUrl: 'https://www.facebook.com/reel/933174852949904/',

  // --- Google Business Profile ---
  // Public listing (Google Maps place id as a cid link; it opens the Stone's Throw listing).
  // It feeds the footer link and the structured-data sameAs list.
  googleBusinessProfile: 'https://maps.google.com/?cid=9070852357310786264',

  // --- Integrations ---
  // Formspree form "Stone's Throw Coffee - Email Signup" (separate from the
  // Jonathan's-website form). Submissions are collected in Formspree AND
  // emailed to stonesthrowcoffeeco@gmail.com once that address is verified as
  // the form's recipient. Powers the Contact/Booking + artist-application forms.
  formspreeEndpoint: 'https://formspree.io/f/mnpazbaz',
  // Email-signup band posts to the same Formspree form (one form = one shared
  // 50/mo free quota); a hidden _subject line keeps signups distinct from
  // contact messages in the inbox.
  newsletterAction: 'https://formspree.io/f/mnpazbaz',
  // TODO: Cloudflare Web Analytics token (Cloudflare dashboard -> Web Analytics).
  // Privacy-friendly, free, no cookie banner needed.
  cloudflareAnalyticsToken: '',

  // --- Search engine verification ---
  // Paste the token from each tool's "HTML tag" verification method (just the
  // content value, not the whole tag). Rendered as a <meta> only when filled.
  // Google: Search Console -> add property -> HTML tag. Bing: Webmaster Tools.
  // (A domain-level DNS TXT record via Cloudflare is an alternative to these.)
  verification: {
    google: 'EdbTnniyo59pCt2wLHTaVxuse9J9r94nhjRQNj8yzro', // <meta name="google-site-verification" content="..."> (Search Console, owned by stonesthrowcoffeeco@gmail.com)
    bing: '', //   <meta name="msvalidate.01" content="...">
  },
};

/** True once a value is filled in - used to hide placeholders gracefully. */
export const has = (v: string | undefined | null): v is string =>
  typeof v === 'string' && v.trim().length > 0;

/** True only after a complete street address has been confirmed. */
export const hasStreetAddress = () =>
  has(BUSINESS.address.street) &&
  has(BUSINESS.address.city) &&
  has(BUSINESS.address.state) &&
  has(BUSINESS.address.zip);

/** Complete address when confirmed; otherwise the known city/state only. */
export const fullAddress = () => {
  const a = BUSINESS.address;
  if (!hasStreetAddress()) return [a.city, a.state].filter(has).join(', ');
  return `${a.street}, ${a.city}, ${a.state} ${a.zip}`;
};

const DAY_ABBREV: Record<string, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

const formatTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${ampm}` : `${hour}:${String(m).padStart(2, '0')}${ampm}`;
};

/** Human-readable hour lines, e.g. ["Mon–Fri: 7am–6pm", "Sat–Sun: 8am–5pm"] */
export const hoursDisplay = (): string[] =>
  BUSINESS.hours.map((rule) => {
    const days =
      rule.days.length > 2
        ? `${DAY_ABBREV[rule.days[0]]}–${DAY_ABBREV[rule.days[rule.days.length - 1]]}`
        : rule.days.map((d) => DAY_ABBREV[d]).join(' & ');
    if (rule.closed || !rule.opens || !rule.closes) return `${days}: Closed`;
    return `${days}: ${formatTime(rule.opens)}–${formatTime(rule.closes)}`;
  });

const openingFmt = (opts: Intl.DateTimeFormatOptions): string =>
  has(BUSINESS.openingDate)
    ? new Date(`${BUSINESS.openingDate}T00:00:00Z`).toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' })
    : '';
/** "October 31" (empty until openingDate is set) */
export const openingDateShort = (): string => openingFmt({ month: 'long', day: 'numeric' });
/** "Saturday, October 31" (empty until openingDate is set) */
export const openingDateWeekday = (): string => openingFmt({ weekday: 'long', month: 'long', day: 'numeric' });

/** Today's date in Eastern time (YYYY-MM-DD). Evaluated at BUILD time: the site is static, so it
 *  is rebuilt on opening day (see .github/workflows/open-day-rebuild.yml) to flip the copy. */
const todayET = (): string => new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
/** True once the build date reaches openingDate. Drives every "coming soon" / "now open" switch. */
export const isOpen = (): boolean => has(BUSINESS.openingDate) && todayET() >= BUSINESS.openingDate;

/** Short hours line for hero/strip use, e.g. "8am–6pm, closed Tuesdays" (empty if hours are irregular). */
export const hoursSummary = (): string => {
  const open = BUSINESS.hours.filter((r) => !r.closed && r.opens && r.closes);
  if (!open.length) return '';
  const spans = new Set(open.map((r) => `${formatTime(r.opens!)}–${formatTime(r.closes!)}`));
  if (spans.size !== 1) return '';
  const closedDays = BUSINESS.hours.filter((r) => r.closed).flatMap((r) => r.days);
  const span = [...spans][0];
  return closedDays.length ? `${span}, closed ${closedDays.map((d) => `${d}s`).join(' and ')}` : `${span} daily`;
};

/** One shared note shown wherever hours appear, so hours never read as "open now" before opening.
 *  Empty once the shop is open (callers hide it). */
export const hoursNote = (): string => {
  if (isOpen()) return '';
  if (!has(BUSINESS.openingDate)) return 'Starting opening day. Date coming soon.';
  return `Starting ${openingFmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.`;
};
