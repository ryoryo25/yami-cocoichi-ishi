import { Card, Suit } from '@/lib/constants';

interface PlayingCardProps {
  card: Card;
}

const SUIT_SYMBOLS: Record<Suit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  joker: '🃏',
};

const VALUE_LABELS: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export default function PlayingCard({ card }: PlayingCardProps) {
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const colorClass = card.suit === 'joker' ? 'text-purple-600' : (isRed ? 'card-red' : 'card-black');
  const label = card.suit === 'joker' ? 'JK' : (VALUE_LABELS[card.value] || card.value.toString());
  const symbol = SUIT_SYMBOLS[card.suit];

  return (
    <div className={`card ${colorClass}`}>
      <div className="flex justify-between items-start">
        <span className="text-xl font-bold leading-none">{label}</span>
        <span className="text-xl leading-none">{symbol}</span>
      </div>
      
      <div className="flex justify-center items-center flex-1">
        <span className="text-4xl">{symbol}</span>
      </div>
      
      <div className="flex justify-between items-end rotate-180">
        <span className="text-xl font-bold leading-none">{label}</span>
        <span className="text-xl leading-none">{symbol}</span>
      </div>
    </div>
  );
}
