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
    // Syndicated copy. Swap in the knoxnews.com link once you have it.
    url: 'https://www.yahoo.com/lifestyle/articles/stones-throw-coffee-opening-month-084232959.html',
    date: '2026-10-02',
  },
  {
    outlet: 'WBIR 10News',
    headline: 'New Knoxville coffee shop opening on Chapman Highway supporting LGBTQ+ community',
    url: 'https://www.wbir.com/video/news/local/knoxville/new-knoxville-coffee-shop-opening-on-chapman-highway-supporting-lgbtq-community/51-43553672-7f0e-4a12-8dc9-ca4911975a19',
    date: '2026-09-30',
  },
];
