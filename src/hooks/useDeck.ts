'use client';

import { useState, useEffect } from 'react';
import { ALL_CARDS, Card } from '../lib/constants';

const STORAGE_KEY = 'cocoichi-deck-remaining';

export function useDeck() {
  const [remainingIds, setRemainingIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRemainingIds(JSON.parse(stored));
    } else {
      setRemainingIds(ALL_CARDS.map(c => c.id));
    }
    setIsLoaded(true);
  }, []);

  const saveDeck = (ids: number[]) => {
    setRemainingIds(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const resetDeck = () => {
    const allIds = ALL_CARDS.map(c => c.id);
    saveDeck(allIds);
  };

  const drawCards = (n: number): Card[] => {
    if (remainingIds.length < n) {
      // Not enough cards, but for simplicity we could auto-reset or just return what's left
      // User said "all draws unique", so let's warn or reset.
      // Actually, if we reach the end, we should probably reset.
      const drawn = [...remainingIds];
      const needed = n - drawn.length;
      const allIds = ALL_CARDS.map(c => c.id);
      const shuffled = allIds.sort(() => Math.random() - 0.5);
      const additional = shuffled.slice(0, needed);
      const resultIds = [...drawn, ...additional];
      const newRemaining = shuffled.slice(needed);
      saveDeck(newRemaining);
      return resultIds.map(id => ALL_CARDS.find(c => c.id === id)!);
    }

    const shuffled = [...remainingIds].sort(() => Math.random() - 0.5);
    const drawnIds = shuffled.slice(0, n);
    const nextRemaining = shuffled.slice(n);
    saveDeck(nextRemaining);

    return drawnIds.map(id => ALL_CARDS.find(c => c.id === id)!);
  };

  return {
    remainingCount: remainingIds.length,
    drawCards,
    resetDeck,
    isLoaded,
  };
}
