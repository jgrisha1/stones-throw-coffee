/**
 * The menu, as data. Edit prices and items HERE - the Menu page renders this
 * as real HTML text (which Google can read, unlike a flattened image) and
 * also generates schema.org Menu structured data from the same object,
 * so the two can never drift apart.
 */

export interface Price {
    /** Size label; omit for single-price items. */
  label?: string;
    amount: number;
}

export interface MenuItem {
    name: string;
    description?: string;
    prices: Price[];
}

export interface MenuSection {
    name: string;
    note?: string;
    items: MenuItem[];
}

export const MENU: MenuSection[] = [
  {
        name: 'Espresso Drinks',
        items: [
          { name: 'Latte', prices: [{ label: 'Medium', amount: 5.0 }, { label: 'Large', amount: 5.25 }] },
          {
                    name: 'Specialty Latte',
                    description: 'Rotating house flavors, announced as we get closer to opening.',
                    prices: [{ label: 'Medium', amount: 5.5 }, { label: 'Large', amount: 6.0 }],
          },
          { name: 'Cappuccino', prices: [{ label: 'Small', amount: 4.75 }, { label: 'Medium', amount: 5.0 }] },
          { name: 'Macchiato', prices: [{ amount: 4.25 }] },
          { name: 'Americano', prices: [{ label: 'Medium', amount: 4.5 }, { label: 'Large', amount: 4.75 }] },
          {
                    name: 'Dirty Chai',
                    description: 'Spiced chai latte with a shot of espresso.',
                    prices: [{ label: 'Medium', amount: 5.0 }, { label: 'Large', amount: 5.25 }],
          },
          { name: 'Double Shot', prices: [{ amount: 2.5 }] },
          { name: 'Add One Shot', prices: [{ amount: 0.75 }] },
          { name: 'Add Two Shots', prices: [{ amount: 1.25 }] },
              ],
  },
  {
        name: 'Tea, Chai & Cocoa',
        note: 'See our full loose leaf tea list, with tasting notes, below.',
        items: [
          {
                    name: 'Premium Loose Leaf Tea',
                    description: 'Hand-steeped loose leaf: black, green, white, oolong, and herbal teas.',
                    prices: [{ label: 'Medium', amount: 5.15 }, { label: 'Large', amount: 5.35 }],
          },
          {
                    name: 'Matcha Latte',
                    description: 'Stone-ground green tea, whisked and served with steamed milk.',
                    prices: [{ label: 'Medium', amount: 5.25 }, { label: 'Large', amount: 5.5 }],
          },
          {
                    name: 'Chai',
                    description: 'Spiced chai latte.',
                    prices: [{ label: 'Medium', amount: 4.5 }, { label: 'Large', amount: 4.75 }],
          },
          {
                    name: 'Steamer',
                    description: 'Steamed milk with your choice of flavor.',
                    prices: [{ label: 'Medium', amount: 3.0 }, { label: 'Large', amount: 3.25 }],
          },
          { name: 'Hot Cocoa', prices: [{ label: 'Medium', amount: 4.0 }, { label: 'Large', amount: 4.25 }] },
              ],
  },
  {
        name: 'Coffee',
        items: [
          { name: 'Iced Coffee', prices: [{ label: 'Medium', amount: 3.75 }, { label: 'Large', amount: 4.0 }] },
          { name: 'Drip Coffee', prices: [{ label: 'Medium', amount: 3.75 }, { label: 'Large', amount: 4.0 }] },
          {
                    name: 'Red Eye',
                    description: 'Drip coffee with a shot of espresso.',
                    prices: [{ label: 'Medium', amount: 4.75 }, { label: 'Large', amount: 5.0 }],
          },
              ],
  },
  {
    name: 'Specialty Drinks',
    items: [
      {
        name: 'Mushroom Coffee',
        description: 'One spoonful of chaga powder added to an iced latte.',
        prices: [{ label: 'Medium', amount: 6.75 }, { label: 'Large', amount: 7.0 }],
      },
    ],
  },
  {
        name: 'Customizations',
        note: 'One complimentary flavor is included with any drink. Whole milk and half and half are standard; soy, oat, and almond milk are available.',
        items: [
          { name: 'Additional Flavor', prices: [{ amount: 0.25 }] },
          { name: 'Alt Milk (soy, oat, or almond)', prices: [{ amount: 0.5 }] },
              ],
  },
  ];

/**
 * Flavor list - rendered as real HTML text on the Menu page (scannable on
 * mobile, readable by Google). One flavor is complimentary with each
 * eligible drink; additional flavors are $0.25 each.
 */
export const FLAVORS = [
    'Butter pecan',
    'Butterscotch',
    'Candied orange',
    'Caramel',
    'Chai',
    'Chocolate',
    'Cinnamon bun',
    'Cookie butter',
    'French vanilla',
    'Lavender',
    'Peanut butter',
    'Pumpkin spice',
    'Roasted hazelnut',
    'Sugar-free caramel',
    'Sugar-free vanilla',
    'White chocolate',
  ];

/** Loose leaf teas with tasting notes, rendered on the Menu page. */
export const TEAS: { name: string; notes?: string }[] = [
    { name: 'Chamomile', notes: 'floral, apple, sweet strawberry' },
    { name: 'Clear Heart White Tea', notes: 'tangerine, allspice, rose water' },
    { name: 'Earl Grey', notes: 'blue cornflower, bergamot, citrus' },
    { name: 'Formosa Green Tea', notes: 'sweet corn, opal apple, mung bean' },
    { name: 'Honey Alpine Black Tea', notes: 'Madagascar vanilla, sandalwood, brûlée' },
    { name: 'Honey Orchid Oolong Tea', notes: 'lychee, elderflower, clover honey' },
    { name: 'Peppermint' },
  ];


export const formatPrice = (p: Price) =>
    `${p.label ? `${p.label} ` : ''}$${p.amount.toFixed(2).replace(/\.00$/, '')}`;
