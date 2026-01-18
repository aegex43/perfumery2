export interface Perfume {
  name: string;
  brand: string;
  price2ml: number;
  price6ml: number;
  price8ml: number;
  price30ml: number;
  retailPrice: number;
  inspiration: string;
  // Image paths (computed)
  bottleImage?: string;
  notesImage?: string;
  scentProfileImage?: string;
}

export type DecantSize = '2ml' | '6ml' | '8ml' | '30ml' | 'retail';

export interface CartItem extends Perfume {
  selectedSize: DecantSize;
  quantity: number;
}
