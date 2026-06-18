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
    "Stone's Throw Coffee is a queer-owned, LGBTQIA2S+ affirming coffee shop and community arts space opening soon on Chapman Highway in South Knoxville, serving handcrafted espresso, specialty teas, matcha, and chaga coffee alongside drag shows, local art, author readings, acoustic music, vendor markets, and sober-friendly community events.",

  // --- Location (the former South Press space) ---
  // Street address cross-checked against the Knoxville LGBTQ Business
  // Directory and Yelp listings for South Press.
  // TODO: verify the suite letter and ZIP against your lease before launch.
  address: {
    street: '3615 Chapman Hwy, Suite A',
    city: 'Knoxville',
    state: 'TN',
    zip: '37920',
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
  // 7 AM – 6 PM, seven days a week.
  hours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '07:00',
      closes: '18:00',
    },
  ] as HoursRule[],

  // Tentative opening date. Update on your Google Business Profile too once firm.
  openingDate: '2026-09-01',

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

  // --- Google Business Profile ---
  // TODO: Claim and verify your GBP at https://business.google.com, then paste
  // the public profile URL here. It feeds the footer and Visit page.
  // Format: 'https://maps.app.goo.gl/YOURLINK' or the full g.co URL.
  googleBusinessProfile: '',

  // --- Integrations ---
  // TODO: create a free form at https://formspree.io and paste the endpoint
  // (looks like https://formspree.io/f/abcdwxyz). Powers the Contact/Booking
  // and artist-application forms. Can be swapped for a Cloudflare Pages
  // Function later.
  formspreeEndpoint: '',
  // TODO: newsletter — create a free https://buttondown.com account and paste
  // your embed action URL (https://buttondown.com/api/emails/embed-subscribe/YOURNAME),
  // or use a Mailchimp embed action URL.
  newsletterAction: '',
  // TODO: Cloudflare Web Analytics token (Cloudflare dashboard -> Web Analytics).
  // Privacy-friendly, free, no cookie banner needed.
  cloudflareAnalyticsToken: '',
};

/** True once a value is filled in — used to hide placeholders gracefully. */
export const has = (v: string | undefined | null): v is string =>
  typeof v === 'string' && v.trim().length > 0;

/** "3615 Chapman Hwy, Suite A, Knoxville, TN 37920" */
export const fullAddress = () => {
  const a = BUSINESS.address;
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
