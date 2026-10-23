import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Shield, Zap, Sparkles, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { analyzeSpokenText } from '../utils/textAnalysis';

const ADVERSARIES = [
  {
    id: 'recruiter',
    name: "The Aggressive Corporate Recruiter",
    avatar: "💼",
    difficulty: "High",
    pressureLine: "We have 40 other candidates who hold more years of experience than you and are asking for 30% less salary. Give me one compelling reason why I shouldn't just reject your application right now.",
    trapType: "False Scarcity & Commoditization Trap",
    winningStrategy: "Law 9 & Law 34: Never debate the other 40 candidates. Frame yourself as the sole risk-mitigation insurance policy for their division."
  },
  {
    id: 'board',
    name: "The Skeptical Board Member",
    avatar: "🏦",
    difficulty: "Extreme",
    pressureLine: "Your presentation sounds full of shiny AI buzzwords. Explain to me within 20 seconds why this isn't an irresponsible waste of our shareholders' retained earnings.",
    trapType: "Aggressive Sarcasm & Hostile Disqualification",
    winningStrategy: "Law 4 & Law 13: Ground the response strictly in EBITDA preservation and quantifiable payback periods."
  },
  {
    id: 'colleague',
    name: "The Passive-Aggressive Peer",
    avatar: "🐍",
    difficulty: "Medium",
    pressureLine: "Oh, wow... congratulations on presenting that deck to leadership. Must be nice to take all the credit for work the rest of us spent the weekend grinding on.",
    trapType: "Guilt-Tripping & Public Discrediting Bait",
    winningStrategy: "Law 44 (Mirror Effect) & Law 1: Disarm with serene grace, publicly attribute credit to their specific sub-domain, neutralizing their hostility."
  },
  {
    id: 'boss',
    name: "The Insecure Micro-Manager",
    avatar: "👔",
    difficulty: "High",
    pressureLine: "Why wasn't I cc'd on that email to the external client? Are you trying to hide things from me and undermine my department?",
    trapType: "Paranoia & Status Threat Projection",
    winningStrategy: "Law 1: Never Outshine the Master. Reassure their supreme authority while explaining the operational filter."
  }
];

export default function PowerFrameSparring({ speechRecognition, speechSynthesis, gamification }) {
  const [selectedAdversary, setSelectedAdversary] = useState(ADVERSARIES[0]);
  const [userResponse, setUserResponse] = useState('');
  const [sparringEvaluation, setSparringEvaluation] = useState(null);

  const { isListening, fullText, startListening, stopListening, resetTranscript } = speechRecognition;
  const { speak } = speechSynthesis;
  const { addXP } = gamification;

  const activeText = fullText || userResponse;

  const handleEvaluate = () => {
    if (!activeText.trim()) return;

    const metrics = analyzeSpokenText(activeText);
    const hasApologies = metrics.apologeticCount > 0;
    const hasHighEthos = metrics.ethosScore > 30;
    const isLongEnough = metrics.wordCount >= 15;

    let verdict = "";
    let status = "WIN"; // 'WIN' | 'DRAW' | 'DEFEAT'
    let feedback = "";

    if (hasApologies) {
      status = "DEFEAT";
      verdict = "Frame Fractured: Subordinate Apology Detected";
      feedback = "You apologized or qualified your stance ('sorry', 'maybe', 'just thinking'). In psychological power dynamics, an apology in the face of aggression is blood in the water. Adversary seizes full dominance.";
    } else if (metrics.fillerCount >= 3) {
      status = "DRAW";
      verdict = "Frame Unstable: Verbal Hesitation";
      feedback = "You maintained posture, but multiple filler words ('um', 'like', 'you know') diluted your authority. Replace filler words with 2-second silent pauses.";
      addXP(50, false);
    } else if (isLongEnough) {
      status = "WIN";
      verdict = "Frame Absolute: Sovereign Command Established";
      feedback = "Flawless psychological discipline! Zero apologetic reflexes, firm metrics/value anchor, and supreme emotional detachment. Adversary forced into compliance.";
      addXP(175, true);
    } else {
      status = "DRAW";
      verdict = "Too Brief / Incomplete Argument";
      feedback = "Answer was too curt to assert executive control. Expand with a concrete empirical proof anchor.";
      addXP(30, false);
    }

    setSparringEvaluation({
      metrics,
      status,
      verdict,
      feedback
    });
  };

  const handleReset = () => {
    resetTranscript();
    setUserResponse('');
    setSparringEvaluation(null);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Zap className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Psychological Verbal Sparring Partner
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              Live Power Sparring Arena
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Step into the psychological ring. Face aggressive recruiters, hostile board members, and manipulative colleagues. Test your ability to maintain unshakeable frame control in real-time.
            </p>
          </div>
        </div>

        {/* Adversary Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-800">
          {ADVERSARIES.map((adv) => (
            <button
              key={adv.id}
              onClick={() => { setSelectedAdversary(adv); handleReset(); }}
              className={`p-3 rounded-xl border text-left transition ${
                selectedAdversary.id === adv.id
                  ? 'bg-gold-500/15 border-gold-500/60 shadow-md shadow-gold-500/10'
                  : 'bg-obsidian-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl">{adv.avatar}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  adv.difficulty === 'Extreme' ? 'bg-red-950 text-red-400' : 'bg-amber-950 text-amber-400'
                }`}>
                  {adv.difficulty}
                </span>
              </div>
              <div className="font-serif font-bold text-xs text-slate-100 truncate">{adv.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sparring Ring Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Adversary Attack Box */}
        <div className="lg:col-span-5 bg-obsidian-900 border border-red-950/40 rounded-2xl p-6 lg:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedAdversary.avatar}</span>
              <div>
                <h3 className="font-serif font-bold text-base text-slate-100">{selectedAdversary.name}</h3>
                <span className="text-[10px] font-mono text-red-400">{selectedAdversary.trapType}</span>
              </div>
            </div>
            <button
              onClick={() => speak(selectedAdversary.pressureLine)}
              className="p-1.5 rounded-lg bg-red-950 text-red-300 hover:bg-red-900 border border-red-800/40"
              title="Hear adversary attack"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-obsidian-950 rounded-xl border border-red-950/60">
            <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-2">
              Adversary Attack Line:
            </span>
            <p className="text-sm text-red-200 italic leading-relaxed">
              "{selectedAdversary.pressureLine}"
            </p>
          </div>

          <div className="p-3 bg-obsidian-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <strong className="text-gold-400 block font-mono text-[11px] uppercase">Recommended 48 Laws Counter:</strong>
            <p>{selectedAdversary.winningStrategy}</p>
          </div>
        </div>

        {/* User Counter-Strike Box */}
        <div className="lg:col-span-7 bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-serif font-bold text-base text-slate-100 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold-400" />
              Your Sovereign Counter-Strike
            </h3>
            <button onClick={handleReset} className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              Reset Ring
            </button>
          </div>

          <div>
            <textarea
              rows={4}
              value={activeText}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Speak via microphone below or type your counter-attack to neutralize their hostility..."
              className="w-full p-4 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 transition resize-none mb-4"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-md ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-obsidian-950 text-gold-400 border border-gold-500/40 hover:bg-gold-500/10'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                {isListening ? 'Stop Recording' : 'Speak Counter with Mic'}
              </button>

              <button
                onClick={handleEvaluate}
                disabled={!activeText.trim()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeText.trim()
                    ? 'bg-gold-500 hover:bg-gold-400 text-obsidian-950 shadow-gold-500/20 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Score Frame Control & Win (+175 XP)
              </button>
            </div>
          </div>

          {/* Sparring Verdict Diagnostic */}
          {sparringEvaluation && (
            <div className={`p-5 rounded-xl border space-y-3 transition-all ${
              sparringEvaluation.status === 'WIN'
                ? 'bg-emerald-950/40 border-emerald-500/50'
                : sparringEvaluation.status === 'DRAW'
                ? 'bg-amber-950/40 border-amber-500/50'
                : 'bg-red-950/40 border-red-500/50'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  sparringEvaluation.status === 'WIN' ? 'text-emerald-400' : sparringEvaluation.status === 'DRAW' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {sparringEvaluation.status === 'WIN' && <CheckCircle2 className="w-4 h-4" />}
                  {sparringEvaluation.status === 'DEFEAT' && <AlertTriangle className="w-4 h-4" />}
                  {sparringEvaluation.verdict}
                </span>

                <span className="text-xs font-mono font-bold text-slate-300">
                  Power Score: {sparringEvaluation.metrics.powerScore}/100
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {sparringEvaluation.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
