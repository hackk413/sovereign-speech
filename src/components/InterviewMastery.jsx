import React, { useState } from 'react';
import { interviewQuestions } from '../data/interviewQuestions';
import { Award, Volume2, ShieldCheck, ChevronRight, Mic, Sparkles, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

const INTERVIEWER_ARCHETYPES = [
  { id: 'shark', name: "The Wall Street Shark", tone: "Aggressive, metric-obsessed, low patience", icon: "🦈" },
  { id: 'skeptic', name: "The Skeptical VP", tone: "Doubts your credentials, tests your poise", icon: "🧐" },
  { id: 'hr', name: "The Strategic HR Director", tone: "Probes for culture, conflict, and behavioral integrity", icon: "📋" },
  { id: 'founder', name: "The Visionary Founder", tone: "Wants passion, extreme ownership, non-linear grit", icon: "🚀" }
];

export const STAR_STEPS = ['Situation', 'Task', 'Action', 'Result'];

export default function InterviewMastery({ speechSynthesis, onSelectPractice }) {
  const [selectedQuestionId, setSelectedQuestionId] = useState(interviewQuestions[0].id);
  const [selectedArchetype, setSelectedArchetype] = useState(INTERVIEWER_ARCHETYPES[0].id);
  const [starBuilder, setStarBuilder] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [activeStarStep, setActiveStarStep] = useState(0);

  const { speak } = speechSynthesis;
  const activeQuestion = interviewQuestions.find(q => q.id === selectedQuestionId) || interviewQuestions[0];
  const activeArchetype = INTERVIEWER_ARCHETYPES.find(a => a.id === selectedArchetype) || INTERVIEWER_ARCHETYPES[0];

  const handleStarChange = (field, value) => {
    setStarBuilder(prev => ({ ...prev, [field]: value }));
  };

  const synthesizedStarAnswer = `${starBuilder.situation} ${starBuilder.task} ${starBuilder.action} ${starBuilder.result}`.trim();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <Award className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Executive STAR & PREP Framework Accelerator
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              Interview Command: Answer Any Difficult Question
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Never get tongue-tied or blindsided again. Learn how elite executives use STAR and PREP structures to turn trap questions, lowball salary offers, and hostile interviewers into enthusiastic hiring advocates.
            </p>
          </div>

          {/* Archetype Selector */}
          <div className="bg-obsidian-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
              Current Interviewer Archetype:
            </span>
            <div className="flex gap-2">
              {INTERVIEWER_ARCHETYPES.map((arch) => (
                <button
                  key={arch.id}
                  onClick={() => setSelectedArchetype(arch.id)}
                  className={`p-2 rounded-lg text-sm transition flex items-center gap-1.5 ${
                    selectedArchetype === arch.id
                      ? 'bg-gold-500/20 text-gold-300 border border-gold-500/50'
                      : 'bg-obsidian-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                  title={`${arch.name}: ${arch.tone}`}
                >
                  <span>{arch.icon}</span>
                  <span className="text-xs hidden md:inline font-medium">{arch.name.split(' ')[1]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto mt-6 pt-4 border-t border-slate-800 scrollbar-none">
          {interviewQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedQuestionId === q.id
                  ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                  : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Analysis & Benchmark Power Answer */}
        <div className="lg:col-span-7 bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                {activeQuestion.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeQuestion.framework}
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-serif font-extrabold text-slate-100">
              "{activeQuestion.question}"
            </h2>
          </div>

          {/* Psychological Context & Hidden Test */}
          <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-gold-400 uppercase font-semibold block mb-1">
              What The Interviewer Is Secretly Testing:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeQuestion.context}
            </p>
          </div>

          {/* Benchmark Sovereign Answer */}
          <div className="p-5 bg-obsidian-950/80 rounded-xl border border-gold-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-gold-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Benchmark Executive Answer (Listen & Internalize)
              </span>
              <button
                onClick={() => speak(activeQuestion.samplePowerAnswer)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 text-xs font-semibold transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Audio
              </button>
            </div>
            <p className="text-xs text-slate-200 italic leading-relaxed">
              "{activeQuestion.samplePowerAnswer}"
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-gold-400 font-mono">{activeQuestion.powerLawApplied}</span>
              <span>Pacing: {activeQuestion.archetypeResponseTips}</span>
            </div>
          </div>

          {/* Traps to Avoid */}
          <div className="p-4 bg-obsidian-950 rounded-xl border border-red-950/50">
            <div className="flex items-center gap-2 mb-1.5 text-red-400 text-xs font-bold font-mono uppercase">
              <AlertTriangle className="w-3.5 h-3.5" />
              Critical Verbal Landmines to Avoid
            </div>
            <p className="text-xs text-red-200/80 leading-relaxed">
              {activeQuestion.trapsToAvoid}
            </p>
          </div>
        </div>

        {/* Right Column: Guided STAR Interactive Builder */}
        <div className="lg:col-span-5 bg-obsidian-900 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-400" />
                STAR Guided Answer Builder
              </h3>
              <p className="text-xs text-slate-400">
                Structure your personal answer in 4 bulletproof steps.
              </p>
            </div>
          </div>

          {/* Step Selector Tabs */}
          <div className="grid grid-cols-4 gap-1.5 bg-obsidian-950 p-1.5 rounded-xl border border-slate-800">
            {STAR_STEPS.map((step, idx) => (
              <button
                key={step}
                onClick={() => setActiveStarStep(idx)}
                className={`py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  activeStarStep === idx
                    ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {step[0]} - {step}
              </button>
            ))}
          </div>

          {/* Step Guidance & Textarea */}
          <div className="space-y-3">
            <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-mono text-gold-400 font-semibold block mb-1">
                Step {activeStarStep + 1}: {STAR_STEPS[activeStarStep]} Blueprint
              </span>
              <p className="text-xs text-slate-300">
                {activeStarStep === 0 && (activeQuestion.suggestedStructure.situation || "Set the high-stakes scene, timeframe, and baseline conflict.")}
                {activeStarStep === 1 && (activeQuestion.suggestedStructure.task || "Define the critical mission and what failure would have cost.")}
                {activeStarStep === 2 && (activeQuestion.suggestedStructure.action || "Detail your asymmetric personal execution and leadership moves.")}
                {activeStarStep === 3 && (activeQuestion.suggestedStructure.result || "Deliver the quantifiable metrics, ROI, and long-term triumph.")}
              </p>
            </div>

            <textarea
              rows={4}
              value={starBuilder[STAR_STEPS[activeStarStep].toLowerCase()]}
              onChange={(e) => handleStarChange(STAR_STEPS[activeStarStep].toLowerCase(), e.target.value)}
              placeholder={`Draft your personal ${STAR_STEPS[activeStarStep]} here...`}
              className="w-full p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 transition resize-none"
            />
          </div>

          {/* Navigation between STAR Steps */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setActiveStarStep(prev => Math.max(0, prev - 1))}
              disabled={activeStarStep === 0}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed bg-obsidian-950 border border-slate-800"
            >
              Previous Step
            </button>
            <button
              onClick={() => setActiveStarStep(prev => Math.min(3, prev + 1))}
              disabled={activeStarStep === 3}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gold-400 hover:text-gold-300 disabled:opacity-30 disabled:cursor-not-allowed bg-obsidian-950 border border-slate-800"
            >
              Next Step
            </button>
          </div>

          {/* Synthesized Output & Action */}
          {synthesizedStarAnswer.length > 20 && (
            <div className="p-4 bg-obsidian-950 rounded-xl border border-gold-500/30 space-y-3">
              <span className="text-[11px] font-mono text-gold-400 font-bold uppercase block">
                Synthesized Full Response:
              </span>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{synthesizedStarAnswer}"
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => speak(synthesizedStarAnswer)}
                  className="px-3 py-1.5 rounded-lg bg-gold-500/20 text-gold-300 text-xs font-semibold hover:bg-gold-500/30 transition flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Listen to Your Draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
