/**
 * Knoxville happenings that are NOT Stone's Throw events: festivals, light
 * shows, and community events run by other organizations. They show in the
 * "Around Knoxville" section of the Events page, link out to the organizer,
 * and drop off automatically once `end` has passed (the site rebuilds on every
 * push, so stale items clear the next time anything is deployed).
 *
 * RULES: facts only (date, time, place, a one-line blurb) in our own words, no
 * ticket prices, no personal names, and always link to the organizer's own
 * page. Times are Eastern. Source: Visit Knoxville flyers, Nov 2026.
 */

export interface CommunityEvent {
  title: string;
  /** Shown as written, e.g. "Sunday, December 6, 3:30 to 5:30 PM" */
  when: string;
  where?: string;
  blurb: string;
  /** Organizer's page */
  url: string;
  /** Link text, e.g. "FilmFestKnox.com" */
  linkLabel: string;
  start: string; // ISO, used for sorting
  end: string; // ISO, item is hidden after this moment
}

export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    title: 'Film Fest Knox',
    when: 'November 12 to 15, 2026',
    blurb: 'Four days of films at Knoxville’s annual film festival.',
    url: 'https://www.filmfestknox.com/',
    linkLabel: 'FilmFestKnox.com',
    start: '2026-11-12T00:00:00-05:00',
    end: '2026-11-15T23:59:00-05:00',
  },
  {
    title: 'Sunsphere Sessions',
    when: 'Friday, November 20, 6 to 7 PM',
    where: 'Sunsphere Welcome Center',
    blurb: 'Free live music in the Sunsphere. This is the final session of 2026.',
    url: 'https://www.visitknoxville.com/events/',
    linkLabel: 'Visit Knoxville calendar',
    start: '2026-11-20T18:00:00-05:00',
    end: '2026-11-20T19:00:00-05:00',
  },
  {
    title: 'Fantasy of Trees',
    when: 'November 25 to 29, 2026 (hours vary by day)',
    where: 'Knoxville Convention Center',
    blurb:
      'Hundreds of decorated Christmas trees, family activities, and holiday vendors, all raising money for Dolly Parton Children’s Hospital.',
    url: 'https://www.dollychildrens.org/ways-to-give/events/fantasy-of-trees/fantasy-at-a-glance/',
    linkLabel: 'Fantasy of Trees',
    start: '2026-11-25T09:00:00-05:00',
    end: '2026-11-29T18:00:00-05:00',
  },
  {
    title: 'Regal Celebration of Lights',
    when: 'Friday, November 27, 5:15 to 9 PM',
    where: 'Krutch Park Extension and Market Square',
    blurb:
      'The city lights its 42-foot Christmas in the City tree at 6 PM, with live holiday music and kids’ activities after the lighting.',
    url: 'https://www.knoxvilletn.gov/1008/Regal-Celebration-of-Lights',
    linkLabel: 'City of Knoxville',
    start: '2026-11-27T17:15:00-05:00',
    end: '2026-11-27T21:00:00-05:00',
  },
  {
    title: 'Holidays on Ice',
    when: 'November 27, 2026 to January 3, 2027 (hours vary by day)',
    where: 'Market Square',
    blurb:
      'Outdoor ice skating in the heart of downtown, with themed nights, skate parties, and Sunday ice cream sundaes.',
    url: 'https://www.knoxvilletn.gov/1013/Knoxvilles-Holidays-on-Ice',
    linkLabel: 'City of Knoxville',
    start: '2026-11-27T12:00:00-05:00',
    end: '2027-01-03T21:00:00-05:00',
  },
  {
    title: 'Santa at the Sunsphere',
    when: 'December 4 to 6, 2026',
    where: 'Sunsphere',
    blurb: 'A festive family holiday photo experience with Santa. Reservations are online.',
    url: 'https://www.visitknoxville.com/santa-at-the-sunsphere/',
    linkLabel: 'SunsphereSanta.com',
    start: '2026-12-04T00:00:00-05:00',
    end: '2026-12-06T23:59:00-05:00',
  },
  {
    title: 'Chanukah in the City: Light Up Knoxville',
    when: 'Sunday, December 6, 3:30 to 5:30 PM',
    where: 'Market Square',
    blurb:
      'Ice skating, hot cocoa, hot latkes, a fire show, fresh jelly donuts, and crafts. Presented by Chabad of Knoxville and the Knoxville Jewish Alliance.',
    url: 'https://www.chabadknoxville.org/',
    linkLabel: 'Chabad of Knoxville',
    start: '2026-12-06T15:30:00-05:00',
    end: '2026-12-06T17:30:00-05:00',
  },
  {
    title: 'Tour de Lights',
    when: 'Saturday, December 12, 3:30 to 7:30 PM',
    where: 'Covenant Health Park',
    blurb:
      'A holiday bike ride and festival with a costume contest, live holiday music, and a grand prize drawing. Registration is online.',
    url: 'https://www.visitknoxville.com/tourdelights/',
    linkLabel: 'VisitKnoxville.com/TourDeLights',
    start: '2026-12-12T15:30:00-05:00',
    end: '2026-12-12T19:30:00-05:00',
  },
  {
    title: 'Sunset at the Sunsphere',
    when: 'First Fridays, November to March (next: January 8, 2027)',
    where: 'Sunsphere Observation Deck',
    blurb:
      'Watch the sunset over Knoxville from the observation deck, with refreshments and a featured local maker. Times vary with sunset.',
    url: 'https://sunspheresunsets.com/',
    linkLabel: 'SunsphereSunsets.com',
    start: '2027-01-08T00:00:00-05:00',
    end: '2027-03-05T23:59:00-05:00',
  },
];
