import toppingsData from '../../data/toppings.json';

export type Topping = {
  name: string;
  image: string;
};

export const TOPPINGS: Topping[] = toppingsData.items;
export const TOPPINGS_UPDATED_AT: string = toppingsData.updatedAt;

export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs' | 'joker';

export type Card = {
  id: number; // 0-53
  suit: Suit;
  value: number; // 1-13, or 1-2 for joker
  name: string;
  topping: Topping | null; // null means "Free Choice"
};

const SUITS: Suit[] = ['spades', 'hearts', 'diamonds', 'clubs'];
const SUIT_LABELS: Record<Suit, string> = {
  spades: '♠️ スペード',
  hearts: '♥️ ハート',
  diamonds: '♦️ ダイヤ',
  clubs: '♣️ クラブ',
  joker: '🃏 ジョーカー',
};

const VALUE_LABELS: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export function getCardLabel(card: Card): string {
  if (card.suit === 'joker') {
    return `ジョーカー ${card.value}`;
  }
  const valueLabel = VALUE_LABELS[card.value] || card.value.toString();
  const suitSymbol = SUIT_LABELS[card.suit].split(' ')[0];
  return `${suitSymbol} ${valueLabel}`;
}

export const ALL_CARDS: Card[] = [];

// Generate 52 cards
for (let s = 0; s < 4; s++) {
  const suit = SUITS[s];
  for (let v = 1; v <= 13; v++) {
    const id = s * 13 + (v - 1);
    ALL_CARDS.push({
      id,
      suit,
      value: v,
      name: `${suit}_${v}`,
      topping: id < TOPPINGS.length ? TOPPINGS[id] : null,
    });
  }
}

// Generate 2 jokers
ALL_CARDS.push({
  id: 52,
  suit: 'joker',
  value: 1,
  name: 'joker_1',
  topping: null,
});
ALL_CARDS.push({
  id: 53,
  suit: 'joker',
  value: 2,
  name: 'joker_2',
  topping: null,
});
