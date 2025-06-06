export interface AvatarTrait {
  type: string;
  value: string;
}

export interface Avatar {
  id: string;
  name: string;
  imageUrl: string;
  traits: AvatarTrait[];
  rarityScore?: number; // Optional for sorting
}
