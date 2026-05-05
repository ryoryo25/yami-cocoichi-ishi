'use client';

import { ALL_CARDS, getCardLabel } from '@/lib/constants';
import Link from 'next/link';

export default function MappingTable() {
  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <Link href="/" className="text-gold hover:text-white transition-colors text-sm uppercase tracking-widest font-bold mb-4 inline-block">
          ← Back to Casino
        </Link>
        <h1 className="text-3xl font-black text-gold uppercase tracking-tighter italic">
          Mapping Reference
        </h1>
        <p className="text-white/60">トランプとトッピングの全対応表</p>
      </header>

      <section className="bg-black/30 rounded-2xl casino-border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gold/10 border-b border-gold/20">
              <th className="p-4 text-gold text-xs font-bold uppercase tracking-widest">Card</th>
              <th className="p-4 text-gold text-xs font-bold uppercase tracking-widest">Topping</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ALL_CARDS.map((card) => (
              <tr key={card.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-mono text-white/80 whitespace-nowrap">
                  {getCardLabel(card)}
                </td>
                <td className="p-4 font-bold text-white">
                  {card.topping ? card.topping.name : (
                    <span className="text-gold italic">🌟 自由選択</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
