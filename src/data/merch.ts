/**
 * Merch, as data. Rendered on the Merch page. Each item links to its listing on the
 * designer's Etsy shop; photos are self-hosted copies in public/images/merch/.
 * No prices on purpose: the shop sets those and they change.
 */
export interface MerchItem {
  name: string;
  image: string; // file in public/images/merch/
  alt: string;
  url: string;
}

const ETSY = 'https://www.etsy.com';

export const MERCH: MerchItem[] = [
  {
    name: 'Signature Unisex Tee',
    image: 'tee.webp',
    alt: 'Mustard yellow t-shirt with the small Stone\u2019s Throw Coffee logo on the chest',
    url: `${ETSY}/listing/4536827301/stones-throw-coffee-signature-unisex-tee`,
  },
  {
    name: 'Lightweight Hooded Sweatshirt',
    image: 'hoodie.webp',
    alt: 'Light blue hooded sweatshirt with the small Stone\u2019s Throw Coffee logo on the chest',
    url: `${ETSY}/listing/4597616618/stones-throw-lightweight-hooded`,
  },
  {
    name: 'Ceramic Camp Mug, 13 oz',
    image: 'camp-mug.webp',
    alt: 'Speckled cream ceramic camp mug with a navy rim and the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597563633/stones-throw-ceramic-camp-mug-speckled`,
  },
  {
    name: 'Clear Glass Mug',
    image: 'glass-mug.webp',
    alt: 'Clear glass mug with the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597551191/stones-throw-clear-mug-glass`,
  },
  {
    name: 'Thermal Tumbler, 16 oz',
    image: 'tumbler.webp',
    alt: 'White thermal tumbler with a black lid and the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597587928/stones-throw-thermal-tumbler-16-oz`,
  },
  {
    name: 'Heavy Tote Bag',
    image: 'tote.webp',
    alt: 'Natural canvas tote bag with the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597556540/stones-throw-tote-bag-heavy`,
  },
  {
    name: 'Vinyl Sticker, 3 x 3 in',
    image: 'sticker.webp',
    alt: 'Round vinyl sticker of the Stone\u2019s Throw Coffee logo: a steaming cup framed by ferns and mushrooms',
    url: `${ETSY}/listing/4597606639/stones-throw-vinyl-sticker-3-x-3`,
  },
  {
    name: 'Medium Drip Discount Key Chain',
    image: 'key-chain.webp',
    alt: 'Round white key chain printed with the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597586327/stones-throw-medium-drip-discount-key`,
  },
  {
    name: 'Small Breed Pet Bandana',
    image: 'pet-bandana.webp',
    alt: 'White triangular pet bandana printed with the Stone\u2019s Throw Coffee logo',
    url: `${ETSY}/listing/4597612213/stones-throw-small-breed-pet-bandana`,
  },
];
