import React from 'react';
import { 
  Sparkles, Mic, Volume2, Shield, BrainCircuit, Target, 
  Layers, Flame, Award, Rocket, CheckCircle2, RefreshCw, 
  Cpu, FileText, Download, Share2, Compass, Radio, 
  BookMarked, Eye, Clock, Key
} from 'lucide-react';

export const EXTRA_FEATURES_LIST = [
  {
    num: 1,
    title: "Real-Time Microphone Voice-to-Text & Cadence AI",
    icon: Mic,
    category: "Speech AI",
    description: "Live browser speech recognition using Web Speech API that transcribes your spoken voice continuously and analyzes speed in real-time."
  },
  {
    num: 2,
    title: "Executive Native Accent Text-to-Speech Engine",
    icon: Volume2,
    category: "Acoustic AI",
    description: "Hear every benchmark answer, 48 Laws script, and wealth term spoken in authentic executive British, American, or Global accents."
  },
  {
    num: 3,
    title: "Words Per Minute (WPM) & Hesitation Pacing Meter",
    icon: Clock,
    category: "Vocal Mastery",
    description: "Evaluates whether you speak too fast (>170 WPM, anxious) or too slow (<110 WPM, hesitant), guiding you to the optimal 120-155 executive zone."
  },
  {
    num: 4,
    title: "Filler-Word Exterminator ('Um', 'Uh', 'Like' Detector)",
    icon: AlertTriangleIcon,
    category: "Fluency Guard",
    description: "Automatically detects and counts filler words in your speech, training you to replace verbal crutches with gravitational 2-second sovereign pauses."
  },
  {
    num: 5,
    title: "Aristotelian Persuasion Triad Analyzer (Ethos, Pathos, Logos)",
    icon: Compass,
    category: "Classical Rhetoric",
    description: "Mathematically scores any answer for Authority (Ethos), Rational Syllogism (Logos), and Visionary Emotion (Pathos)."
  },
  {
    num: 6,
    title: "Passive-to-Sovereign Frame Re-Writer",
    icon: Sparkles,
    category: "Frame Control",
    description: "Converts timid, apologetic wording into 3 levels: Executive Diplomatic, Sovereign Authority, and Machiavellian Tactical."
  },
  {
    num: 7,
    title: "Interactive Live Psychological Sparring Arena",
    icon: BrainCircuit,
    category: "Combat Psychology",
    description: "Real-time verbal battle against 4 aggressive adversaries (Aggressive Recruiter, Skeptical Board Member, Micro-manager, Hostile Colleague)."
  },
  {
    num: 8,
    title: "STAR Method Interactive 4-Step Answer Wizard",
    icon: Layers,
    category: "Interview Mastery",
    description: "Step-by-step guided framework to construct unshakeable Situation, Task, Action, and Result answers for any corporate interview."
  },
  {
    num: 9,
    title: "PREP Method Rapid-Fire Impromptu Speech Builder",
    icon: Target,
    category: "Impromptu Speech",
    description: "Structure any unexpected question in under 5 seconds (Point, Reason, Example, Point) with high-status finality."
  },
  {
    num: 10,
    title: "Rich Mindset vs Poor Mindset Cognitive Reframer",
    icon: Key,
    category: "Wealth Architecture",
    description: "Type any scarcity thought ('I can't afford that') and instantly convert it into an investor leverage query ('What structured terms allow this to fund itself?')."
  },
  {
    num: 11,
    title: "Leitner Spaced Repetition (SRS) Flashcard Engine",
    icon: BookMarked,
    category: "Memory Retention",
    description: "Smart 4-tier flashcard review system (Again, Hard, Good, Mastered) with automated active recall intervals."
  },
  {
    num: 12,
    title: "Dark Psychology & Gaslighting Counter-Defense Shield",
    icon: Shield,
    category: "Manipulation Defense",
    description: "Verbal counter-measures to neutralize gaslighting, guilt-tripping, double-bind traps, and artificial urgency."
  },
  {
    num: 13,
    title: "30-Second High-Stakes Elevator Pitch Arena",
    icon: Radio,
    category: "Pitch & Closing",
    description: "Timed pitch drill with countdown timer, hook strength scoring, and clarity evaluation for investors and executives."
  },
  {
    num: 14,
    title: "Gamified XP, Streak & Sovereign Rank Progression",
    icon: Flame,
    category: "Habit Stacking",
    description: "Level up from 'Verbal Novice' to 'Sovereign Orator' with animated streaks, rank badges, and celebration confetti."
  },
  {
    num: 15,
    title: "Automated Midnight GitHub Action Self-Updater",
    icon: RefreshCw,
    category: "Automation",
    description: "Built-in cron workflow that fetches and commits fresh vocabulary and daily challenges every midnight UTC without any manual intervention."
  },
  {
    num: 16,
    title: "6 Distinct AI Interviewer Archetypes",
    icon: Award,
    category: "Simulation",
    description: "Switch between the Wall Street Shark, the Skeptical VP, the Strategic HR Director, and the Visionary Founder."
  },
  {
    num: 17,
    title: "OSINT Non-Verbal & Micro-Expression Playbook",
    icon: Eye,
    category: "Body Language",
    description: "Tactical guides for downward tonal inflection, diaphragmatic resonance, and OSINT triangle gaze calibration."
  },
  {
    num: 18,
    title: "Curated Classical Rhetoric Treasury (4 Open Books)",
    icon: FileText,
    category: "Literature",
    description: "Interactive rules and audio from Dale Carnegie, Strunk & White, Joseph Devlin, and Aristotle."
  },
  {
    num: 19,
    title: "100% Offline PWA & Zero-Server Local Storage Mode",
    icon: Cpu,
    category: "Architecture",
    description: "Installable on iOS, Android, and macOS/Windows. Fully functional offline with zero third-party cloud dependency."
  },
  {
    num: 20,
    title: "One-Click Multi-Cloud 100% Free Deployment Suite",
    icon: Rocket,
    category: "Deployment",
    description: "Zero-cost 2-minute deployment guides and pre-built configuration files for Vercel, Netlify, and GitHub Pages."
  }
];

function AlertTriangleIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function FeaturesCatalog({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl max-w-4xl w-full p-6 lg:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-gold-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Comprehensive Capability Index
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-100">
              The 20 Extra Built-in Features
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-obsidian-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono font-bold"
          >
            Close Esc
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXTRA_FEATURES_LIST.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.num}
                className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 hover:border-gold-500/40 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gold-500/10 text-gold-400 font-mono text-xs font-bold flex items-center justify-center border border-gold-500/30">
                      {feat.num}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{feat.category}</span>
                  </div>
                  <Icon className="w-4 h-4 text-gold-400" />
                </div>
                <h4 className="text-sm font-serif font-bold text-slate-100">{feat.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{feat.description}</p>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs shadow-md shadow-gold-500/20 transition"
          >
            Start Training Now
          </button>
        </div>
      </div>
    </div>
  );
}
