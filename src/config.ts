/**
 * Single source of truth for every business fact on the site.
 *
 * The header, footer, Visit page, Contact page, and ALL structured data
 * (the JSON-LD that Google reads) pull from this file. Fill in every TODO
 * before launch. Empty strings are automatically omitted from structured
 * data, so nothing incorrect ships — but Google can't rank what isn't here.
 *
 * Keep these values byte-for-byte identical to your Google Business Profile,
 * Yelp, Apple Maps, and Facebook listings. Consistent NAP (name, address,
 * phone) across the web is a core local-SEO signal.
 */

export interface HoursRule {
  /** schema.org day names: Monday, Tuesday, ... Sunday */
  days: string[];
  /** 24h time, e.g. '07:00' */
  opens: string;
  /** 24h time, e.g. '18:00' */
  closes: string;
}

export const BUSINESS = {
  name: "Stone's Throw Coffee",
  tagline: 'Coffee, community, and local art in South Knoxville.',
  description:
    "Stone's Throw Coffee is a queer-owned, LGBTQIA2S+ affirming coffee shop and community arts space opening soon in South Knoxville, serving handcrafted espresso, specialty teas, matcha, and chaga coffee alongside drag shows, local art, author readings, acoustic music, vendor markets, and sober-friendly community events.",

  // --- Location ---
  // Keep street and ZIP empty until a lease is signed. Empty location fields
  // are omitted from visible pages and structured data.
  address: {
    street: '',
    city: 'Knoxville',
    state: 'TN',
    zip: '',
  },

  // TODO: paste exact coordinates from Google Maps
  // (right-click the map pin -> first menu item copies "lat, lng")
  geo: { latitude: '', longitude: '' },

  // --- Contact ---
  // TODO: fill in before launch. phone is E.164 for structured data,
  // phoneDisplay is what humans see.
  phone: '', // e.g. '+18655551234'
  phoneDisplay: '', // e.g. '(865) 555-1234'
  email: 'stonesthrowcoffeeco@gmail.com',

  // --- Hours ---
  // Add confirmed operating hours after the location and staffing plan are set.
  hours: [] as HoursRule[],

  // Tentative opening date, e.g. '2026-09-26'. Left blank until the occupancy
  // certificate is in hand — while empty, the home page shows "coming soon"
  // messaging with no specific date. Set it (and update Google Business Profile)
  // once a date is firm.
  openingDate: '',

  priceRange: '$',

  // Round mushroom-and-moon logo, white background keyed to transparent.
  // Flows into the CafeOrCoffeeShop structured data. To refresh it, drop a new
  // PNG at public/images/logo.png (transparent, 600px+).
  logoPath: '/images/logo.png',

  // --- Social profiles ---
  // These become schema.org sameAs links, footer icons, and contact fallbacks.
  social: {
    instagram: '',
    facebook: 'https://www.facebook.com/stonesthrowcoffeeknox/',
    threads: '',
  },

  // --- Community funding ---
  gofundme: 'https://www.gofundme.com/f/stones-throw-community-coffee-shop',
  // Cash App: cashtag for display, cashAppUrl is the canonical cash.app link.
  cashApp: '$StonesThrowCoffee',
  cashAppUrl: 'https://cash.app/$StonesThrowCoffee',

  // --- Google Business Profile ---
  // TODO: Claim and verify your GBP at https://business.google.com, then paste
  // the public profile URL here. It feeds the footer and Visit page.
  // Format: 'https://maps.app.goo.gl/YOURLINK' or the full g.co URL.
  googleBusinessProfile: '',

  // --- Integrations ---
  // Formspree form "Stone's Throw Coffee — Email Signup" (separate from the
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
    google: '', // <meta name="google-site-verification" content="...">
    bing: '', //   <meta name="msvalidate.01" content="...">
  },
};

/** True once a value is filled in — used to hide placeholders gracefully. */
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
    return `${days}: ${formatTime(rule.opens)}–${formatTime(rule.closes)}`;
  });
