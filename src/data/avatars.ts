import type { Avatar } from '@/types/avatar';

const avatars: Avatar[] = [
  {
    id: '001',
    name: 'Punk #001',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Alien' },
      { type: 'Accessory', value: 'Cap Forward' },
      { type: 'Eyes', value: 'VR' },
    ],
    rarityScore: 98.5,
  },
  {
    id: '002',
    name: 'Punk #002',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Zombie' },
      { type: 'Hair', value: 'Wild Hair' },
      { type: 'Accessory', value: 'Earring' },
    ],
    rarityScore: 92.1,
  },
  {
    id: '003',
    name: 'Punk #003',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Ape' },
      { type: 'Eyes', value: 'Regular Shades' },
      { type: 'Mouth', value: 'Smile' },
    ],
    rarityScore: 88.7,
  },
  {
    id: '004',
    name: 'Punk #004',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Human' },
      { type: 'Hair', value: 'Mohawk Thin' },
      { type: 'Accessory', value: 'Cigarette' },
    ],
    rarityScore: 76.3,
  },
  {
    id: '005',
    name: 'Punk #005',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Human' },
      { type: 'Accessory', value: 'Medical Mask' },
      { type: 'Eyes', value: '3D Glasses' },
    ],
    rarityScore: 81.0,
  },
  {
    id: '006',
    name: 'Punk #006',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Alien' },
      { type: 'Hair', value: 'Knitted Cap' },
      { type: 'Mouth', value: 'Frown' },
    ],
    rarityScore: 95.2,
  },
   {
    id: '007',
    name: 'Punk #007',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Zombie' },
      { type: 'Hair', value: 'Messy Hair' },
      { type: 'Accessory', value: 'Pipe' },
    ],
    rarityScore: 90.5,
  },
  {
    id: '008',
    name: 'Punk #008',
    imageUrl: 'https://placehold.co/300x300.png',
    traits: [
      { type: 'Type', value: 'Ape' },
      { type: 'Accessory', value: 'Gold Chain' },
      { type: 'Eyes', value: 'Big Shades' },
    ],
    rarityScore: 85.9,
  },
];

export function getAllAvatars(): Avatar[] {
  return avatars.map(avatar => ({
    ...avatar,
    imageUrl: `${avatar.imageUrl}?id=${avatar.id}` // Ensure unique image URLs if needed
  }));
}

export function getAvatarById(id: string): Avatar | undefined {
  return avatars.find(avatar => avatar.id === id);
}

export function getAvailableTraits(): Record<string, string[]> {
  const traitsMap: Record<string, Set<string>> = {};
  avatars.forEach(avatar => {
    avatar.traits.forEach(trait => {
      if (!traitsMap[trait.type]) {
        traitsMap[trait.type] = new Set();
      }
      traitsMap[trait.type].add(trait.value);
    });
  });
  
  const result: Record<string, string[]> = {};
  for (const type in traitsMap) {
    result[type] = Array.from(traitsMap[type]).sort();
  }
  return result;
}
