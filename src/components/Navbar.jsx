import React from 'react';
import { Crown, Flame, Award, Rocket, Sparkles, Volume2, Mic, BookOpen, ShieldAlert, DollarSign, BrainCircuit, Target } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, xp, streak, currentRank, progressPercent, onOpenDeploy, onOpenFeatures }) {
  return (
    <header className="sticky top-0 z-40 bg-obsidian-900/90 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('daily')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-700 flex items-center justify-center shadow-lg shadow-gold-500/20">
              <Crown className="w-5 h-5 text-obsidian-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-lg tracking-wider text-slate-100">SOVEREIGN<span className="text-gold-400">SPEECH</span></span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">v2.4</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans hidden sm:block">Executive Spoken English • 48 Laws Persuasion • Wealth Mindset OS</p>
            </div>
          </div>

          {/* Gamification Status Bar (XP, Streak, Rank) */}
          <div className="flex items-center gap-3">
            {/* Daily Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800/80 border border-slate-700/60 text-xs font-medium">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-amber-300 font-bold">{streak}</span>
              <span className="text-slate-400 hidden sm:inline">day streak</span>
            </div>

            {/* Rank & XP */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-800/80 border border-gold-500/30 text-xs">
              <span className="text-sm">{currentRank.badge}</span>
              <div className="flex flex-col">
                <span className={`font-semibold ${currentRank.color} leading-none`}>{currentRank.title}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-gold-500 to-amber-400 transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-medium">{xp} XP</span>
                </div>
              </div>
            </div>

            {/* 20 Extra Features Pill */}
            <button
              onClick={onOpenFeatures}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/40 text-purple-200 hover:text-white hover:border-purple-400 transition text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>20 Extra Features</span>
            </button>

            {/* Free Deploy Button */}
            <button
              onClick={onOpenDeploy}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs shadow-md shadow-gold-500/20 transition-all transform hover:scale-[1.02]"
            >
              <Rocket className="w-3.5 h-3.5 text-obsidian-950" />
              <span className="hidden sm:inline">Free Deploy</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80 text-xs">
          {[
            { id: 'daily', label: "Daily Challenge & Voice", icon: Target },
            { id: 'power', label: "48 Laws Persuasion", icon: Crown },
            { id: 'interview', label: "Interview Command (STAR)", icon: Award },
            { id: 'sparring', label: "Live Power Sparring", icon: BrainCircuit },
            { id: 'rich', label: "Rich Mindset & Wealth", icon: DollarSign },
            { id: 'rewriter', label: "Passive → Sovereign Rewriter", icon: Sparkles },
            { id: 'dark', label: "Dark Psych & OSINT", icon: ShieldAlert },
            { id: 'books', label: "Classical English Books", icon: BookOpen },
            { id: 'vocab', label: "Power Vocab & SRS Flashcards", icon: Volume2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all font-medium ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
