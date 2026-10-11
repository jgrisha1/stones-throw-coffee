/**
 * Press coverage, newest first. Rendered on Our Story (#in-the-news).
 * Add new stories here; nothing else needs to change.
 */
export interface PressItem {
  outlet: string;
  headline: string;
  url: string;
  /** ISO date, e.g. 2026-10-02 */
  date: string;
}

export const PRESS: PressItem[] = [
  {
    outlet: 'Knox News',
    headline: "Stone's Throw Coffee opening this month as 'safe space for a stranger'",
    url: 'https://www.knoxnews.com/story/entertainment/dining/2026/10/02/stones-throw-coffee-opening-this-month-as-safe-space-for-a-stranger/91992718007/',
    date: '2026-10-02',
  },
  {
    outlet: 'WBIR 10News',
    headline: "'It's go time': Stone's Throw Coffee moving into Chapman Highway space that formerly housed South Press Coffee",
    url: 'https://www.wbir.com/article/news/local/knoxville/stones-throw-coffee-moving-into-space-formerly-housed-south-press-coffee/51-18ca5204-b2a5-4d81-bd3f-c18752e40f18',
    date: '2026-09-29',
  },
];
