/**
 * Sourcing and community credits.
 *
 * PRIVACY RULE: personal names are NOT published on the site unless the
 * owners explicitly approve it. Business/vendor names are public. The
 * `people` list below only renders when showPersonalNames is true - flip it
 * once each person has said yes (and remove anyone who hasn't).
 *
 * This file also serves as the internal sourcing/credits reference for
 * social captions, vendor pages, and planning.
 */

export const showPersonalNames = false;

/** Public-facing vendor/sourcing lines - business names only. */
export const SOURCING = [
  { what: 'Tea', from: 'Spirit Tea and Barista Underground' },
  { what: 'Syrups & flavors', from: 'Monin, plus small-batch and locally sourced ingredients - honey, lavender, rosemary, and seasonal flavors when available' },
  { what: 'Shop supplies', from: 'Barista Underground' },
];

/**
 * Community partners & associations - organizations and local businesses we
 * work with, distinct from the sourcing suppliers above. Business names are
 * public. Add a `url` to any entry to turn it into a link.
 */
export const PARTNERS: { name: string; url?: string; image?: string; alt?: string; width?: number; height?: number; full?: string }[] = [
  {
    name: 'Frog Juice Kombucha',
    url: 'https://frogjuicekombucha.com/',
    image: 'frog-juice.webp',
    full: 'frog-juice-large.webp', // click-to-enlarge version (1206 px wide)
    alt: 'Frog Juice artisanal kombucha label on a rainbow background, listing its flavors and the local farms it partners with, and ending with "Made with real ingredients, grown by real farmers"',
    width: 960,
    height: 744,
  },
  {
    name: 'SoKno Sourdough',
    url: 'https://soknosourdough.com/',
    image: 'so-kno-sourdough.webp',
    alt: 'SoKno Sourdough logo: a loaf of sourdough in a dark cast-iron pot on a sage green circle',
    width: 480,
    height: 480,
  },
  { name: 'Silver Springs Bakery', url: 'https://www.instagram.com/silverspringsbakery/' },
];

/**
 * INTERNAL - do not publish without approval (see rule above).
 * Renders only when showPersonalNames is true.
 */
export const PEOPLE = [
  { role: 'Merch', name: 'Rachel Ely' },
  { role: 'Website design & socials', name: 'Jonathan Grisham-Burchfield' },
  { role: 'Menu', name: 'Skyler Howard' },
  { role: 'Syrups', name: 'Olivia Sipiczky' },
  { role: 'Pride Interfaith', name: 'Josie Russell' },
  { role: 'Local legislation, government & publicity', name: 'Josie Russell' },
  { role: 'Architect', name: 'Jonah Pruitt' },
];
