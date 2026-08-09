import type { IconName } from './icons';

const KEYWORDS: Record<IconName, string> = {
  sofa: 'sofa,couch',
  armchair: 'armchair',
  coffeeTable: 'coffee-table',
  tvStand: 'tv-stand,livingroom',
  bed: 'bed,bedroom',
  wardrobe: 'wardrobe,closet',
  nightstand: 'nightstand',
  vanity: 'dressing-table',
  diningTable: 'dining-table',
  chair: 'dining-chair',
  cabinet: 'cabinet,cupboard',
  wineRack: 'wine-rack',
  desk: 'desk,workspace',
  officeChair: 'office-chair',
  bookshelf: 'bookshelf',
  kitchen: 'kitchen,cabinet',
  island: 'kitchen-island',
  spiceRack: 'kitchen,shelf',
  bathVanity: 'bathroom,sink',
  towelRack: 'bathroom,towel',
  gardenSet: 'garden-furniture',
  swing: 'porch-swing',
  lamp: 'lamp,lighting',
  mirror: 'mirror,interior',
  rug: 'rug,carpet',
  picture: 'wall-art,frame',
};

const lockFor = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 100_000;
  }
  return hash;
};

export const photoUrl = (
  icon: IconName,
  seed: string,
  width = 800,
  height = 800,
): string =>
  `https://loremflickr.com/${width}/${height}/${KEYWORDS[icon]}/all?lock=${lockFor(seed)}`;
