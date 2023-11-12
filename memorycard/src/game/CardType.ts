// Enum (numaralandırılmış tür)
export enum CardType { // Enumlar belirli bir sabit setini açıklar.
  // Plane = 'paper-plane-o',
  // Bolt = 'bolt',
  // Cube = 'cube',
  // Bomb = 'bomb',
  // Heart = 'heart',
  // Gift = 'gift',
  // Cloud = 'cloud',
  // Star = 'star',

  // FontAwesome
  Music = 'music',
  Diamond = 'diamond',
  Bicycle = 'bicycle',
  Camera = 'camera',
  Automobile = 'automobile',
  Cake = 'birthday-cake',
  Leaf = 'leaf',
  Anchor = 'anchor',
}

// Her enum değerinin hem type (enum değeri) hem de typeName (okunabilir isim) özelliklerini içeren bir nesne.
export const CardTypeInfo: Record<
  CardType,
  { type: string; typeName: string }
> = {
  [CardType.Music]: { type: CardType.Music, typeName: 'Music' },
  [CardType.Diamond]: { type: CardType.Diamond, typeName: 'Diamond' },
  [CardType.Bicycle]: { type: CardType.Diamond, typeName: 'Bicycle' },
  [CardType.Camera]: { type: CardType.Diamond, typeName: 'Camera' },
  [CardType.Automobile]: { type: CardType.Diamond, typeName: 'Automobile' },
  [CardType.Cake]: { type: CardType.Diamond, typeName: 'Cake' },
  [CardType.Leaf]: { type: CardType.Diamond, typeName: 'Leaf' },
  [CardType.Anchor]: { type: CardType.Diamond, typeName: 'Anchor' },
}
