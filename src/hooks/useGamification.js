import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const RANKS = [
  { title: "Verbal Novice", minXP: 0, badge: "🌱", color: "text-slate-400" },
  { title: "Articulate Apprentice", minXP: 300, badge: "⚡", color: "text-blue-400" },
  { title: "Tactical Rhetorician", minXP: 800, badge: "⚔️", color: "text-indigo-400" },
  { title: "Executive Diplomat", minXP: 1800, badge: "🛡️", color: "text-purple-400" },
  { title: "Machiavellian Strategist", minXP: 3500, badge: "👑", color: "text-amber-400" },
  { title: "Sovereign Orator", minXP: 6000, badge: "⚜️", color: "text-gold-400" }
];

export function useGamification() {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('sovereign_xp');
    return saved ? parseInt(saved, 10) : 150; // Welcome starter bonus
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('sovereign_streak');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [completedChallenges, setCompletedChallenges] = useState(() => {
    const saved = localStorage.getItem('sovereign_completed_challenges');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sovereign_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('sovereign_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('sovereign_completed_challenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  const addXP = (amount, triggerConfetti = true) => {
    setXp((prev) => {
      const nextXP = prev + amount;
      return nextXP;
    });

    if (triggerConfetti) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#c59325', '#ffd700', '#ffffff', '#6366f1']
        });
      } catch (e) {
        // confetti fallback
      }
    }
  };

  const completeChallenge = (id, rewardXP = 150) => {
    if (!completedChallenges.includes(id)) {
      setCompletedChallenges((prev) => [...prev, id]);
      addXP(rewardXP, true);
    }
  };

  const currentRank = [...RANKS].reverse().find(r => xp >= r.minXP) || RANKS[0];
  const nextRank = RANKS.find(r => r.minXP > xp) || null;
  const progressPercent = nextRank
    ? Math.min(100, Math.round(((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100))
    : 100;

  return {
    xp,
    streak,
    currentRank,
    nextRank,
    progressPercent,
    completedChallenges,
    addXP,
    completeChallenge
  };
}
