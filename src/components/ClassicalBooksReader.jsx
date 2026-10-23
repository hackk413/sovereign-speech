import React, { useState } from 'react';
import { classicalBooksData } from '../data/classicalBooksData';
import { BookOpen, Volume2, Sparkles, Quote, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ClassicalBooksReader({ speechSynthesis, gamification }) {
  const [selectedBookId, setSelectedBookId] = useState(classicalBooksData[0].id);
  const { speak } = speechSynthesis;
  const { addXP } = gamification;

  const activeBook = classicalBooksData.find(b => b.id === selectedBookId) || classicalBooksData[0];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Classical Open-Source Rhetoric & Oratory Treasury
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              The Great Books of Spoken English
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Curated from timeless open-source classics: Dale Carnegie's <em>The Art of Public Speaking</em>, Strunk's <em>The Elements of Style</em>, Joseph Devlin's <em>How to Speak Correctly</em>, and <em>Aristotle's Rhetoric</em>. Master the foundational principles that shaped world leaders and sovereign orators.
            </p>
          </div>
        </div>

        {/* Book Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto mt-6 pt-4 border-t border-slate-800 scrollbar-none">
          {classicalBooksData.map((book) => (
            <button
              key={book.id}
              onClick={() => setSelectedBookId(book.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedBookId === book.id
                  ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/20'
                  : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {book.title} ({book.author.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Active Book Detail Card */}
      <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-gold-400 font-bold">
              {activeBook.year} • {activeBook.author}
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-100">
              {activeBook.title}
            </h2>
            <span className="text-xs text-slate-400 font-mono mt-1 block">
              Core Focus: {activeBook.coreFocus}
            </span>
          </div>

          <button
            onClick={() => { speak(activeBook.classicQuote); addXP(25, false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500/10 text-gold-400 text-xs font-semibold border border-gold-500/30 hover:bg-gold-500/20 transition"
          >
            <Volume2 className="w-4 h-4" />
            Hear Classic Quote
          </button>
        </div>

        {/* Summary & Quote */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-gold-400 uppercase font-bold block mb-1">
              Historical Overview:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeBook.summary}
            </p>
          </div>

          <div className="p-4 bg-obsidian-950 rounded-xl border border-gold-500/20 flex gap-3">
            <Quote className="w-6 h-6 text-gold-500/60 shrink-0 mt-1" />
            <p className="text-xs text-gold-200 italic leading-relaxed">
              "{activeBook.classicQuote}"
            </p>
          </div>
        </div>

        {/* Laws of Oratory Interactive Grid */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-mono uppercase font-bold tracking-wider text-slate-200">
            Timeless Rules of Oratory & Practical Spoken Conversions:
          </h3>

          <div className="space-y-4">
            {activeBook.lawsOfOratory.map((rule, idx) => (
              <div
                key={idx}
                className="bg-obsidian-950 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-gold-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                    {rule.rule}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {rule.powerGain}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {rule.explanation}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 bg-obsidian-900 rounded-lg border border-red-950/40 text-xs text-red-300/80 italic">
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold block mb-0.5">
                      Flawed / Cluttered Speech:
                    </span>
                    "{rule.spokenBefore}"
                  </div>

                  <div className="p-2.5 bg-obsidian-900 rounded-lg border border-gold-500/30 text-xs text-gold-200 italic">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-mono uppercase text-gold-400 font-bold">
                        Vigorous Executive Speech:
                      </span>
                      <button
                        onClick={() => speak(rule.spokenAfter)}
                        className="p-1 rounded text-gold-400 hover:text-gold-300"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                    "{rule.spokenAfter}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
