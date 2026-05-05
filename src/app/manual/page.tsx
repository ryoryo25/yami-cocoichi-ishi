'use client';

import { useState } from 'react';
import { ALL_CARDS, Card, Suit } from '@/lib/constants';
import PlayingCard from '@/components/PlayingCard';
import Link from 'next/link';

export default function ManualInput() {
  const [suit, setSuit] = useState<Suit>('spades');
  const [value, setValue] = useState(1);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const handleAddCard = () => {
    const card = ALL_CARDS.find(c => c.suit === suit && c.value === value);
    if (card) {
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handleRemoveCard = (index: number) => {
    setSelectedCards(prev => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setSelectedCards([]);
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
        <p className="text-white/60">手元にあるトランプを登録してトッピングを確認します</p>
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

        <div className="flex gap-4">
          <button
            onClick={handleAddCard}
            className="btn-casino flex-1 text-lg"
          >
            Add Card
          </button>
          {selectedCards.length > 0 && (
            <button
              onClick={handleClear}
              className="px-6 py-2 border-2 border-white/10 rounded-lg text-white/40 hover:text-white/60 hover:border-white/20 transition-all text-sm uppercase font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {selectedCards.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-gold mb-6 uppercase tracking-widest italic">
            Selected Cards ({selectedCards.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCards.map((card, idx) => (
              <div key={`${card.id}-${idx}`} className="relative group flex items-center bg-white/10 p-4 rounded-xl border border-white/5 gap-6">
                <PlayingCard card={card} />
                <div className="flex-1">
                  <p className="text-gold/60 text-xs font-bold uppercase tracking-widest mb-1">
                    Topping
                  </p>
                  <p className="text-xl font-bold text-white">
                    {card.topping ? card.topping.name : '🌟 任意のトッピング (自由選択)'}
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 italic">
                    {card.suit === 'joker' ? 'Joker Luck!' : `Card: ${card.name.replace('_', ' ')}`}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveCard(idx)}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-black/40 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80 hover:text-white"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
