import React, { useState } from 'react';
import { powerLawsData } from '../data/powerLawsData';
import { Crown, Volume2, ShieldCheck, ArrowRight, Zap, Target, BookOpen, AlertOctagon } from 'lucide-react';

export default function PowerLawsModule({ speechSynthesis, onSelectPractice }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLawId, setActiveLawId] = useState(powerLawsData[0].id);
  const { speak } = speechSynthesis;

  const categories = ['All', ...new Set(powerLawsData.map(l => l.lawsCategory))];

  const filteredLaws = selectedCategory === 'All'
    ? powerLawsData
    : powerLawsData.filter(l => l.lawsCategory === selectedCategory);

  const activeLaw = powerLawsData.find(l => l.id === activeLawId) || powerLawsData[0];

  return (
    <div className="space-y-8">
      {/* Module Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Crown className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Machiavellian Spoken English & Persuasion Architecture
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              The 48 Laws of Power: Verbal Mastery Engine
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Transform passive language into undeniable executive presence. Master conversational frame control, strategic ambiguity, tactical silence, and psychological commands that compel respect and compliance.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-obsidian-950 p-2 rounded-xl border border-slate-800 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-slate-300 font-medium">OSINT Persuasion Models Active</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                  : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Law Selector & Active Law Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Law Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredLaws.map((law) => {
            const isSelected = law.id === activeLawId;
            return (
              <div
                key={law.id}
                onClick={() => setActiveLawId(law.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-obsidian-850 border-gold-500/60 shadow-lg shadow-gold-500/10'
                    : 'bg-obsidian-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-obsidian-850/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-gold-400">
                    LAW {law.lawNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {law.lawsCategory}
                  </span>
                </div>
                <h3 className="text-sm font-serif font-bold text-slate-100 mb-1">
                  {law.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {law.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Law Tactical Blueprint */}
        <div className="lg:col-span-7 bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-mono text-xs font-bold">
                  Law {activeLaw.lawNumber}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeLaw.psychologicalPrinciple}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-slate-100">
                {activeLaw.title}
              </h2>
            </div>

            <button
              onClick={() => speak(activeLaw.powerSpeech)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 text-xs font-semibold border border-gold-500/30 transition"
              title="Hear how an executive speaks this law"
            >
              <Volume2 className="w-4 h-4" />
              Listen to Delivery
            </button>
          </div>

          {/* Description & Verbal Tactic */}
          <div className="space-y-3">
            <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 font-semibold block mb-1">
                Tactical Mechanism: {activeLaw.verbalTactic}
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLaw.description}
              </p>
            </div>
          </div>

          {/* Side by Side Verbal Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-obsidian-950/80 border border-red-950/50 rounded-xl p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold block mb-2">
                Submissive / Weak Wording (Fatal Flaw)
              </span>
              <p className="text-xs text-red-200/80 italic leading-relaxed">
                "{activeLaw.weakSpeech}"
              </p>
            </div>

            <div className="bg-obsidian-950/80 border border-gold-500/40 rounded-xl p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 font-bold block mb-2">
                Sovereign Power Delivery (Adopt)
              </span>
              <p className="text-xs text-gold-200 italic leading-relaxed">
                "{activeLaw.powerSpeech}"
              </p>
            </div>
          </div>

          {/* Counter-Trap Drill */}
          <div className="p-4 bg-obsidian-950 rounded-xl border border-amber-900/40">
            <div className="flex items-center gap-2 mb-2">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                High-Stakes Counter-Trap Drill
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeLaw.counterTrap}
            </p>
          </div>

          {/* Practice Action Banner */}
          <div className="p-4 bg-gradient-to-r from-obsidian-950 via-obsidian-850 to-obsidian-950 rounded-xl border border-gold-500/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-100 block">
                Practice Audio Simulation for Law {activeLaw.lawNumber}
              </span>
              <span className="text-[11px] text-slate-400">
                Model this cadence with your own voice to earn +150 XP.
              </span>
            </div>

            <button
              onClick={() => onSelectPractice && onSelectPractice(activeLaw)}
              className="px-4 py-2 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs shadow-md shadow-gold-500/20 transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Launch Voice Drill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
