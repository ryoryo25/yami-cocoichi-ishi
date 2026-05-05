'use client';

import { useState } from 'react';
import { useDeck } from '@/hooks/useDeck';
import { Card } from '@/lib/constants';
import PlayingCard from '@/components/PlayingCard';
import Link from 'next/link';

export default function Home() {
  const { drawCards, remainingCount, resetDeck, isLoaded } = useDeck();
  const [drawCount, setDrawCount] = useState(3);
  const [results, setResults] = useState<Card[]>([]);

  const handleDraw = () => {
    const drawn = drawCards(drawCount);
    setResults(drawn);
  };

  if (!isLoaded) return <div className="p-8 text-center text-gold">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-gold mb-4 tracking-tighter uppercase italic">
          闇ココイチいし
        </h1>
        <p className="text-lg text-white/80">トランプで選ぶ、運命のトッピング</p>
      </header>

      <section className="bg-black/30 p-8 rounded-2xl casino-border mb-8 text-center">
        <div className="mb-6">
          <label className="block text-gold text-sm font-bold mb-2 uppercase tracking-widest">
            Draw Amount (n)
          </label>
          <input
            type="number"
            min="1"
            max="54"
            value={drawCount}
            onChange={(e) => setDrawCount(parseInt(e.target.value) || 1)}
            className="bg-black/50 border-2 border-gold/50 rounded-lg px-4 py-2 text-gold text-2xl font-bold w-24 text-center focus:outline-none focus:border-gold"
          />
        </div>

        <button
          onClick={handleDraw}
          disabled={remainingCount === 0 && results.length === 0}
          className="btn-casino text-xl px-12 py-4 mb-4"
        >
          {remainingCount === 0 ? 'Shuffle & Draw' : 'Draw Cards'}
        </button>

        <p className="text-sm text-gold/60 mt-2">
          Remaining cards in deck: <span className="font-bold">{remainingCount}</span> / 54
        </p>

        <button
          onClick={resetDeck}
          className="text-xs text-white/40 hover:text-white/60 mt-4 underline"
        >
          Reset Deck
        </button>
      </section>

      {results.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-gold mb-6 text-center uppercase tracking-widest italic">
            Your Fate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((card, idx) => (
              <div key={`${card.id}-${idx}`} className="flex items-center bg-white/10 p-4 rounded-xl border border-white/5 gap-6">
                <PlayingCard card={card} />
                <div className="flex-1">
                  <p className="text-gold/60 text-xs font-bold uppercase tracking-widest mb-1">
                    Topping
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {card.topping ? card.topping.name : '🌟 任意のトッピング (自由選択)'}
                  </p>
                  <p className="text-xs text-white/40 mt-2 italic">
                    {card.suit === 'joker' ? 'Joker Luck!' : `Card: ${card.name.replace('_', ' ')}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-16 flex flex-col items-center gap-8 border-t border-white/10 pt-8 pb-12">
        <div className="flex justify-center gap-8">
          <Link href="/manual" className="text-gold/80 hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold">
            Manual Input
          </Link>
          <Link href="/mapping" className="text-gold/80 hover:text-gold transition-colors text-sm uppercase tracking-widest font-bold">
            Mapping Table
          </Link>
        </div>
        
        <div className="w-full max-w-2xl px-4">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-4 text-center">Inspired by</p>
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gold/20 shadow-2xl shadow-gold/5">
            <iframe
              src="https://www.youtube.com/embed/S3t48wgO_1A"
              title="僕らの別荘 - 闇ココイチいし"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
          <p className="mt-3 text-center">
            <a 
              href="https://youtu.be/S3t48wgO_1A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors text-xs font-bold italic"
            >
              僕らの別荘 - 闇ココイチいし
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
