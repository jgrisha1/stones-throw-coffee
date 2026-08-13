/**
 * Sourcing and community credits.
 *
 * PRIVACY RULE: personal names are NOT published on the site unless the
 * owners explicitly approve it. Business/vendor names are public. The
 * `people` list below only renders when showPersonalNames is true — flip it
 * once each person has said yes (and remove anyone who hasn't).
 *
 * This file also serves as the internal sourcing/credits reference for
 * social captions, vendor pages, and planning.
 */

export const showPersonalNames = false;

/** Public-facing vendor/sourcing lines — business names only. */
export const SOURCING = [
  { what: 'Tea', from: 'Spirit Tea and Barista Underground' },
  { what: 'Syrups & flavors', from: 'Monin, plus small-batch and locally sourced ingredients — honey, lavender, rosemary, and seasonal flavors when available' },
  { what: 'Shop supplies', from: 'Barista Underground' },
];

/**
 * Community partners & associations — organizations and local businesses we
 * work with, distinct from the sourcing suppliers above. Business names are
 * public. Add a `url` to any entry to turn it into a link.
 */
export const PARTNERS: { name: string; url?: string }[] = [
  { name: 'Choice Health Network' },
  { name: 'Coffee and Chocolate' },
  { name: 'Counter Culture Coffee' },
  { name: 'Frog Juice Kombucha' },
  { name: 'Small Comforts Kitchen' },
];

/**
 * INTERNAL — do not publish without approval (see rule above).
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
