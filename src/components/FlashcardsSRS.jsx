import React, { useState } from 'react';
import { vocabularyData } from '../data/vocabularyData';
import lastSyncData from '../data/lastSync.json';
import { Volume2, RotateCcw, Check, Zap, Sparkles, Filter, RefreshCw, Calendar } from 'lucide-react';

export default function FlashcardsSRS({ speechSynthesis, gamification }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { speak } = speechSynthesis;
  const { addXP } = gamification;

  // Combine static vocabulary with any freshly auto-synced words from lastSyncData
  const combinedVocab = [
    ...vocabularyData,
    ...(lastSyncData?.newEntries || []).map((e, idx) => ({
      ...e,
      id: `sync-${idx}`,
      powerScore: e.powerScore || 90
    }))
  ];

  const categories = [
    'All', 
    'Tip-of-the-Tongue Verbs', 
    'Tip-of-the-Tongue Words', 
    'Daily Spoken', 
    'Executive English', 
    '48 Laws & Persuasion', 
    'Wealth & Finance'
  ];

  const filteredDeck = activeCategory === 'All'
    ? combinedVocab
    : combinedVocab.filter(v => v.category === activeCategory);

  const currentCard = filteredDeck[currentIndex % filteredDeck.length] || combinedVocab[0];

  const handleNext = (ratingXP) => {
    setIsFlipped(false);
    addXP(ratingXP, ratingXP >= 40);
    setCurrentIndex(prev => (prev + 1) % filteredDeck.length);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Volume2 className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Leitner Spaced Repetition & High-Stakes Lexicon
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              Power Vocabulary & Spaced Repetition Deck
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Permanent retention through active recall. Master high-frequency daily spoken idioms, Machiavellian persuasion terminology, executive boardroom precision, and high-net-worth financial vernacular.
            </p>
          </div>

          {/* Auto-Sync Status Badge */}
          <div className="bg-obsidian-950 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gold-400" />
            <div className="text-[11px]">
              <span className="text-slate-400 block font-mono">Auto-Sync Engine:</span>
              <span className="text-gold-300 font-bold font-mono">Updated {lastSyncData?.dateString || 'Today'} (Active)</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                  : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Container */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Card { (currentIndex % filteredDeck.length) + 1 } of {filteredDeck.length}</span>
          <span>Category: <strong className="text-gold-400">{currentCard.category}</strong></span>
        </div>

        {/* Flippable Card */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="min-h-[320px] bg-obsidian-900 border border-gold-500/40 rounded-2xl p-8 cursor-pointer flex flex-col justify-between hover:border-gold-500 transition shadow-2xl relative overflow-hidden group select-none"
        >
          {/* Subtle Corner Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30">
              Power Score: {currentCard.powerScore}/100
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); speak(`${currentCard.term}. ${currentCard.meaning}`); }}
              className="p-2 rounded-lg bg-obsidian-950 text-gold-400 hover:bg-gold-500/20 border border-slate-800 transition"
              title="Pronounce word"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {!isFlipped ? (
            /* FRONT OF CARD */
            <div className="text-center my-auto py-8">
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-100 mb-2 group-hover:text-gold-300 transition">
                {currentCard.term}
              </h2>
              <span className="text-sm font-mono text-slate-400 block mb-6">
                {currentCard.phonetic}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-gold-500/80 font-mono">
                <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                Click anywhere to flip and reveal definition & sovereign application
              </span>
            </div>
          ) : (
            /* BACK OF CARD */
            <div className="space-y-4 my-auto py-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-gold-400 font-bold block mb-1">Definition:</span>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">{currentCard.meaning}</p>
              </div>

              {currentCard.whatPeopleForget && (
                <div className="p-2.5 bg-amber-950/40 rounded-xl border border-amber-500/30 text-xs text-amber-200">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block mb-0.5">Tip-of-the-Tongue Trigger:</span>
                  {currentCard.whatPeopleForget}
                </div>
              )}

              <div className="p-3 bg-obsidian-950 rounded-xl border border-red-950/40 text-xs text-red-300/80 italic">
                <span className="text-[10px] font-mono text-red-400 font-bold block mb-0.5">Weak Alternative:</span>
                "{currentCard.weakAlternative}"
              </div>

              <div className="p-3 bg-obsidian-950 rounded-xl border border-gold-500/30 text-xs text-gold-200 italic">
                <span className="text-[10px] font-mono text-gold-400 font-bold block mb-0.5">Sovereign Usage:</span>
                "{currentCard.sovereignUsage}"
              </div>

              {currentCard.dailyPractice && (
                <div className="text-[11px] text-emerald-300 font-mono">
                  {currentCard.dailyPractice}
                </div>
              )}

              {currentCard.origin && (
                <div className="text-[10px] text-slate-400 font-mono">
                  Etymology: {currentCard.origin}
                </div>
              )}
            </div>
          )}

          <div className="text-center text-[11px] text-slate-500 font-mono">
            {isFlipped ? "Tap card to flip back" : "Tap card to reveal"}
          </div>
        </div>

        {/* SRS Interval Buttons */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          <button
            onClick={() => handleNext(10)}
            className="p-3 bg-obsidian-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-red-400 block">Again</span>
            <span className="text-[10px] text-slate-500 font-mono">+10 XP</span>
          </button>

          <button
            onClick={() => handleNext(20)}
            className="p-3 bg-obsidian-900 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-amber-400 block">Hard</span>
            <span className="text-[10px] text-slate-500 font-mono">+20 XP</span>
          </button>

          <button
            onClick={() => handleNext(35)}
            className="p-3 bg-obsidian-900 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/50 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-blue-400 block">Good</span>
            <span className="text-[10px] text-slate-500 font-mono">+35 XP</span>
          </button>

          <button
            onClick={() => handleNext(50)}
            className="p-3 bg-obsidian-900 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 rounded-xl text-center transition"
          >
            <span className="text-xs font-bold text-emerald-400 block">Mastered</span>
            <span className="text-[10px] text-slate-500 font-mono">+50 XP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
