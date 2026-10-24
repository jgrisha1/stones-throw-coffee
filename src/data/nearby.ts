/**
 * "While you're in the neighborhood" on the Visit page: places in and around South Knoxville.
 * Each entry links to the place's own site (opens in a new tab). Descriptions only say what
 * those sites say; add or remove entries freely, and check a link still loads before adding it.
 */
export interface NearbyPlace {
  name: string;
  url: string;
  blurb: string;
}

export const NEARBY: NearbyPlace[] = [
  {
    name: 'Ijams Nature Center',
    url: 'https://www.ijams.org/',
    blurb: 'A nonprofit nature center where you can hike, bike, paddle, and climb, with programs and events year-round.',
  },
  {
    name: "Knoxville's Urban Wilderness",
    url: 'https://legacyparks.org/places/knoxvilles-urban-wilderness/',
    blurb: 'More than 1,000 forested acres of trails, quarries, and city parks just south of downtown, from Legacy Parks Foundation.',
  },
  {
    name: 'Baker Creek Preserve',
    url: 'https://legacyparks.org/about-us/our-work/baker-creek-preserve/',
    blurb: 'A 100-acre city preserve with unpaved trails, pump tracks, and a play area.',
  },
  {
    name: "Visit Knoxville's guide to South Knoxville",
    url: 'https://www.visitknoxville.com/blog/post/guide-to-things-to-do-in-south-knoxville/',
    blurb: 'Local shops, restaurants, breweries, and more along Sevier Avenue, Chapman Highway, and beyond.',
  },
];
