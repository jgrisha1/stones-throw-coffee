/**
 * The menu, as data. Edit prices and items HERE — the Menu page renders this
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
                    description: 'Rotating house flavors — announced as we get closer to opening.',
                    prices: [{ label: 'Medium', amount: 5.5 }, { label: 'Large', amount: 6.0 }],
          },
          { name: 'Cappuccino', prices: [{ label: 'Small', amount: 4.75 }, { label: 'Medium', amount: 5.0 }] },
          { name: 'Macchiato', prices: [{ amount: 4.25 }] },
          { name: 'Americano', prices: [{ label: 'Medium', amount: 4.5 }, { label: 'Large', amount: 4.75 }] },
          { name: 'Double Shot', prices: [{ amount: 2.5 }] },
          { name: 'Add One Shot', prices: [{ amount: 0.75 }] },
          { name: 'Add Two Shots', prices: [{ amount: 1.25 }] },
              ],
  },
  {
        name: 'Tea, Chai & Cocoa',
        note: 'Specialty teas are also available — selections will be announced as we get closer to opening.',
        items: [
          {
                    name: 'Premium Loose Leaf Tea',
                    description: 'Hand-steeped specialty loose leaf — Black, Oolong, White, Green, Earl Grey, or Citrus Chamomile.',
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
                    name: 'Dirty Chai',
                    description: 'Spiced chai latte with a shot of espresso.',
                    prices: [{ label: 'Medium', amount: 5.0 }, { label: 'Large', amount: 5.25 }],
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
          { name: 'Alt Milk — soy, oat, or almond', prices: [{ amount: 0.5 }] },
              ],
  },
  ];

/**
 * Flavor list — rendered as real HTML text on the Menu page (scannable on
 * mobile, readable by Google). One flavor is complimentary with each
 * eligible drink; additional flavors are $0.25 each.
 */
export const FLAVORS = [
    'Butter pecan',
    'Butterscotch',
    'Candied orange',
    'Caramel',
    'Chai',
    'Cinnamon bun',
    'Cookie butter',
    'French vanilla',
    'Mocha',
    'Peanut butter',
    'Pistachio',
    'Roasted hazelnut',
    'Sugar-free caramel',
    'Sugar-free vanilla',
    'White chocolate',
  ];


export const formatPrice = (p: Price) =>
    `${p.label ? `${p.label} ` : ''}$${p.amount.toFixed(2).replace(/\.00$/, '')}`;
