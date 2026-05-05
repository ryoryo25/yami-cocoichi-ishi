'use client';

import { useState } from 'react';
import { ALL_CARDS, Card, Suit } from '@/lib/constants';
import PlayingCard from '@/components/PlayingCard';
import Link from 'next/link';

export default function ManualInput() {
  const [suit, setSuit] = useState<Suit>('spades');
  const [value, setValue] = useState(1);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleLookup = () => {
    const card = ALL_CARDS.find(c => c.suit === suit && c.value === value);
    if (card) {
      setSelectedCard(card);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <Link href="/" className="text-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-bold mb-4 inline-block">
          ← トップへ戻る
        </Link>
        <h1 className="text-3xl font-black text-gold uppercase tracking-tighter italic">
          Manual Selection
        </h1>
        <p className="text-white/60">お手元のカードに対応するトッピングを確認します</p>
      </header>

      <section className="bg-black/30 p-8 rounded-2xl casino-border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gold text-xs font-bold mb-2 uppercase tracking-widest">
              Suit
            </label>
            <select
              value={suit}
              onChange={(e) => setSuit(e.target.value as Suit)}
              className="bg-black/50 border-2 border-gold/30 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-gold"
            >
              <option value="spades">♠ Spades</option>
              <option value="hearts">♥ Hearts</option>
              <option value="diamonds">♦ Diamonds</option>
              <option value="clubs">♣ Clubs</option>
              <option value="joker">🃏 Joker</option>
            </select>
          </div>

          <div>
            <label className="block text-gold text-xs font-bold mb-2 uppercase tracking-widest">
              Value
            </label>
            {suit === 'joker' ? (
              <select
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="bg-black/50 border-2 border-gold/30 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-gold"
              >
                <option value={1}>Joker 1</option>
                <option value={2}>Joker 2</option>
              </select>
            ) : (
              <select
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="bg-black/50 border-2 border-gold/30 rounded-lg px-4 py-2 text-white w-full focus:outline-none focus:border-gold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((v) => (
                  <option key={v} value={v}>
                    {v === 1 ? 'A' : v === 11 ? 'J' : v === 12 ? 'Q' : v === 13 ? 'K' : v}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <button
          onClick={handleLookup}
          className="btn-casino w-full text-lg"
        >
          Identify Topping
        </button>
      </section>

      {selectedCard && (
        <section className="animate-in fade-in zoom-in-95 duration-300">
          <div className="flex flex-col items-center bg-white/10 p-8 rounded-xl border border-white/5 gap-8">
            <PlayingCard card={selectedCard} />
            <div className="text-center">
              <p className="text-gold/60 text-xs font-bold uppercase tracking-widest mb-1">
                Result
              </p>
              <p className="text-3xl font-bold text-white mb-2">
                {selectedCard.topping ? selectedCard.topping.name : '🌟 任意のトッピング (自由選択)'}
              </p>
              <p className="text-sm text-white/40 italic">
                {selectedCard.suit === 'joker' ? 'Wildcard!' : `Rank ${selectedCard.id + 1} in build list`}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
