import React, { useState } from 'react';
import { darkPsychologyData, nonVerbalOSINTData } from '../data/darkPsychologyData';
import { ShieldAlert, Eye, Volume2, ShieldCheck, Zap, Lock, AlertTriangle } from 'lucide-react';

export default function DarkPsychologyDefense({ speechSynthesis, gamification }) {
  const [activeTab, setActiveTab] = useState('defense'); // 'defense' | 'nonverbal'
  const { speak } = speechSynthesis;
  const { addXP } = gamification;

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                OSINT Behavioral Analysis & Counter-Manipulation
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              Dark Psychology Counter-Defense & OSINT Vocal Mastery
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              In high-stakes corporate and financial negotiations, bad actors deploy covert psychological tactics: gaslighting, false urgency, guilt-trips, and double-bind traps. Learn how to verbally disarm them on contact while commanding subconscious authority through calibrated non-verbal cues.
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('defense')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'defense'
                ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Psychological Counter-Shields
          </button>
          <button
            onClick={() => setActiveTab('nonverbal')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'nonverbal'
                ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            OSINT Vocal & Micro-Cues
          </button>
        </div>
      </div>

      {/* TAB 1: DEFENSE SHIELDS */}
      {activeTab === 'defense' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {darkPsychologyData.map((item) => (
            <div
              key={item.id}
              className="bg-obsidian-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-gold-500/40 transition"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Trap: {item.tactic}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 text-gold-400 border border-gold-500/30">
                  {item.powerLawRef}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Counter Script */}
              <div className="p-4 bg-obsidian-950 rounded-xl border border-gold-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Counter-Shield: {item.verbalShield}
                  </span>
                  <button
                    onClick={() => { speak(item.counterScript); addXP(30, false); }}
                    className="p-1 rounded bg-gold-500/20 text-gold-300 hover:bg-gold-500/30"
                    title="Listen to verbal shield delivery"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-gold-200 italic leading-relaxed">
                  "{item.counterScript}"
                </p>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed pt-1">
                <strong className="text-slate-300">Why This Works:</strong> {item.psychologicalMechanic}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: NON-VERBAL OSINT */}
      {activeTab === 'nonverbal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nonVerbalOSINTData.map((cue, idx) => (
            <div
              key={idx}
              className="bg-obsidian-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-gold-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gold-400 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  {cue.cue}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 text-slate-400">
                  {cue.impact}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {cue.description}
              </p>

              <div className="p-3.5 bg-obsidian-950 rounded-xl border border-gold-500/20 text-xs text-gold-200 space-y-1">
                <strong className="text-gold-400 block font-mono text-[10px] uppercase">Actionable Drill:</strong>
                <p>{cue.drills}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
