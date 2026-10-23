import React, { useState, useEffect } from 'react';
import { getTodayChallenge } from '../data/dailyChallenges';
import { analyzeSpokenText } from '../utils/textAnalysis';
import { Mic, MicOff, Volume2, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Award, Shield, Zap } from 'lucide-react';

export default function DailyChallengeCard({ speechRecognition, speechSynthesis, gamification }) {
  const challenge = getTodayChallenge();
  const { isListening, fullText, startListening, stopListening, resetTranscript, setTranscript } = speechRecognition;
  const { speak, isSpeaking } = speechSynthesis;
  const { completeChallenge, completedChallenges } = gamification;

  const [customText, setCustomText] = useState('');
  const [activeTab, setActiveTab] = useState('mic'); // 'mic' | 'text'
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const isCompleted = completedChallenges.includes(challenge.id);

  // Timer for speech recording
  useEffect(() => {
    let interval = null;
    if (isListening) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const activeContent = activeTab === 'mic' ? fullText : customText;
  const analysis = analyzeSpokenText(activeContent, Math.max(recordingSeconds, 10));

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setRecordingSeconds(0);
      startListening();
    }
  };

  const handleComplete = () => {
    if (activeContent.trim().length > 15) {
      completeChallenge(challenge.id, challenge.xpReward);
    }
  };

  return (
    <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Date */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Today's Sovereign Protocol
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-obsidian-800 border border-slate-700 text-xs">
            <span className="text-slate-400">Reward:</span>
            <span className="text-gold-400 font-bold">+{challenge.xpReward} XP</span>
          </div>
          {isCompleted && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Challenge Title & Objective */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100 mb-2">
          {challenge.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
          {challenge.objective}
        </p>
      </div>

      {/* Recommended Framework & Benchmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-obsidian-950/80 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Sovereign Benchmark (Listen & Model)
            </span>
            <button
              onClick={() => speak(challenge.exampleTarget)}
              className="p-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 transition"
              title="Hear native executive pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-200 italic leading-relaxed">
            "{challenge.exampleTarget}"
          </p>
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Framework: {challenge.frameworkTip}</span>
            <span className="text-gold-500/80 font-mono">{challenge.powerLawRef}</span>
          </div>
        </div>

        <div className="bg-obsidian-950/80 border border-red-950/40 rounded-xl p-4">
          <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5 mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            Weak Subordinate Pattern (Avoid)
          </span>
          <p className="text-xs text-red-300/80 italic leading-relaxed">
            "{challenge.badExample}"
          </p>
          <div className="mt-3 pt-2 border-t border-red-950/40 text-[11px] text-red-400/70">
            Fatal Flaws: Apologetic framing, zero quantifiable leverage, nervous over-justification.
          </div>
        </div>
      </div>

      {/* Interactive Speech Input Arena */}
      <div className="bg-obsidian-950 border border-gold-500/20 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('mic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'mic' ? 'bg-gold-500 text-obsidian-950' : 'text-slate-400 hover:text-slate-200 bg-obsidian-800'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              Microphone Voice Practice
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'text' ? 'bg-gold-500 text-obsidian-950' : 'text-slate-400 hover:text-slate-200 bg-obsidian-800'
              }`}
            >
              Written Input Mode
            </button>
          </div>

          {activeTab === 'mic' && (
            <div className="flex items-center gap-3">
              {isListening && (
                <span className="flex items-center gap-2 text-xs font-mono text-amber-400 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Recording: {recordingSeconds}s
                </span>
              )}
              <button
                onClick={resetTranscript}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>
          )}
        </div>

        {activeTab === 'mic' ? (
          <div>
            <div className="min-h-[90px] p-4 bg-obsidian-900/60 rounded-xl border border-slate-800 text-sm text-slate-100 mb-4 font-sans leading-relaxed">
              {fullText ? (
                <span>{fullText}</span>
              ) : (
                <span className="text-slate-500 italic">
                  Press the gold microphone below, speak your answer aloud clearly and deliberately. The AI will transcribe your speech in real-time, detect filler words, and measure your executive cadence...
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleToggleMic}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-red-500/30'
                    : 'bg-gradient-to-r from-gold-400 to-amber-600 hover:from-gold-300 hover:to-amber-500 text-obsidian-950 shadow-gold-500/20'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Stop Voice Analysis
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Speak Your Response
                  </>
                )}
              </button>

              <button
                onClick={handleComplete}
                disabled={activeContent.trim().length < 15}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition ${
                  activeContent.trim().length >= 15
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                Evaluate & Claim {challenge.xpReward} XP
              </button>
            </div>
          </div>
        ) : (
          <div>
            <textarea
              rows={4}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your response here to analyze its frame control, Aristotelian triad, and power vocabulary..."
              className="w-full p-4 bg-obsidian-900/60 rounded-xl border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500/60 transition mb-4 resize-none"
            />
            <div className="flex justify-end">
              <button
                onClick={handleComplete}
                disabled={activeContent.trim().length < 15}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeContent.trim().length >= 15
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20 shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                Analyze & Claim {challenge.xpReward} XP
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-Time Verbal Diagnostics Panel */}
      {activeContent.trim().length > 0 && (
        <div className="border border-gold-500/20 bg-obsidian-950/70 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Live Executive Speech Diagnostic
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sovereign Power Score:</span>
              <span className={`text-base font-extrabold font-mono ${
                analysis.powerScore > 80 ? 'text-emerald-400' : analysis.powerScore > 60 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {analysis.powerScore}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-obsidian-900 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Words Count</span>
              <span className="text-base font-bold text-slate-100 font-mono">{analysis.wordCount}</span>
            </div>

            <div className="p-3 bg-obsidian-900 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Pacing (WPM)</span>
              <span className="text-base font-bold text-slate-100 font-mono">{analysis.wpm}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{analysis.pacingEvaluation}</span>
            </div>

            <div className="p-3 bg-obsidian-900 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Filler Words</span>
              <span className={`text-base font-bold font-mono ${analysis.fillerCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {analysis.fillerCount}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {analysis.fillerCount === 0 ? 'Flawless pause discipline' : 'Convert to silent pauses'}
              </span>
            </div>

            <div className="p-3 bg-obsidian-900 rounded-lg border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Apologies/Qualifiers</span>
              <span className={`text-base font-bold font-mono ${analysis.apologeticCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {analysis.apologeticCount}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {analysis.apologeticCount === 0 ? 'Uncompromising authority' : 'Remove weak qualifiers'}
              </span>
            </div>
          </div>

          {/* Aristotelian Triad Breakdown */}
          <div className="pt-3 border-t border-slate-800/80">
            <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-2">
              Aristotelian Persuasion Triad Breakdown:
            </span>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Ethos (Authority)</span>
                  <span className="font-mono text-gold-400">{analysis.ethosScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500 rounded-full" style={{ width: `${analysis.ethosScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Logos (Logic & Metrics)</span>
                  <span className="font-mono text-blue-400">{analysis.logosScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${analysis.logosScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Pathos (Emotional Vision)</span>
                  <span className="font-mono text-purple-400">{analysis.pathosScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${analysis.pathosScore}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
