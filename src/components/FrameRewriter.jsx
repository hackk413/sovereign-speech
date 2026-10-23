import React, { useState } from 'react';
import { Sparkles, Copy, Check, Volume2, Shield, ArrowRight } from 'lucide-react';

const COMMON_PRESETS = [
  "Sorry to bother you, I was just wondering if you had time to check my email?",
  "I kind of feel like maybe my salary is a little bit below market rate if you don't mind?",
  "I'm really sorry for being late, traffic was crazy and my car broke down!",
  "Do you think I'm doing a good job? Please tell me if you're unhappy with anything.",
  "I know I don't have all the qualifications you asked for, but I'm a fast learner!"
];

export default function FrameRewriter({ speechSynthesis, gamification }) {
  const [inputText, setInputText] = useState(COMMON_PRESETS[0]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const { speak } = speechSynthesis;
  const { addXP } = gamification;

  const generateRewrites = (text) => {
    const lower = text.toLowerCase();

    // Intelligent transformation matrix
    let executive = "Following up on my previous correspondence to ensure strategic alignment before the Thursday milestone.";
    let sovereign = "Let us align on the critical decisions outlined in my brief today.";
    let machiavellian = "Our timeline requires sign-off on the core deliverables today to preserve your division's delivery velocity.";

    if (lower.includes("salary") || lower.includes("rate") || lower.includes("money") || lower.includes("pay")) {
      executive = "Looking at the \$450K in retained ARR my intervention generated in Q3, aligning my compensation structure at market baseline ensures continued incentive parity.";
      sovereign = "My compensation benchmark is \$145K base, structured with performance upside tied to exceeding Q4 enterprise targets.";
      machiavellian = "To preserve the proprietary pipeline I have engineered without distraction, let us adjust compensation to reflect the verified delta in our EBIT margins.";
    } else if (lower.includes("late") || lower.includes("traffic") || lower.includes("car")) {
      executive = "Thank you for your patience; let us dive directly into agenda item one.";
      sovereign = "I appreciate your promptness. We will accelerate the pacing to cover every priority within the remaining window.";
      machiavellian = "Now that we are assembled, let us execute the strategic review with maximum velocity.";
    } else if (lower.includes("qualification") || lower.includes("experience") || lower.includes("learner")) {
      executive = "Rather than standard theoretical credentials, I bring verified execution architectures that solved this exact operational friction in my prior deployment.";
      sovereign = "Credentials are common; verified execution certainty is rare. Let us evaluate if my technical track record matches your 18-month expansion mandate.";
      machiavellian = "Standard qualifications replicate standard outcomes. My asymmetric methodology is designed specifically to break the bottleneck your team is facing.";
    } else if (lower.includes("happy") || lower.includes("good job") || lower.includes("validation")) {
      executive = "Let us conduct a quarterly performance calibration against our core OKR metrics.";
      sovereign = "Our deliverables tracked 18% ahead of target this sprint. Here is our roadmap for compounding next cycle's output.";
      machiavellian = "The metrics validate our current trajectory. Let us discuss unlocking additional operational resources to scale our advantage.";
    }

    return [
      {
        tier: "Executive Diplomatic",
        tag: "High Corporate Polish",
        tone: "Polite, decisive, zero apologies",
        content: executive
      },
      {
        tier: "Unapologetic Sovereign",
        tag: "Total Gravitas & Command",
        tone: "Peer-to-peer authority, unshakeable frame",
        content: sovereign
      },
      {
        tier: "Machiavellian Tactical",
        tag: "48 Laws Frame Dominance",
        tone: "Leverage-driven, appeals directly to their self-interest",
        content: machiavellian
      }
    ];
  };

  const rewrites = generateRewrites(inputText);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    addXP(25, false);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
            <Sparkles className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
            Executive Tone Dial & Frame Transformation Engine
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
          Passive to Sovereign Rewriter
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Timid, apologetic language invites exploitation, low offers, and micro-management. Input any weak or subordinate phrase, and instantly re-write it into 3 tiers of uncompromising authority.
        </p>

        {/* Quick Presets */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-2 uppercase">
            Test Real-World Subordinate Phrases:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs truncate max-w-xs transition ${
                  inputText === preset
                    ? 'bg-gold-500 text-obsidian-950 font-bold'
                    : 'bg-obsidian-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input & Output Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Subordinate Input */}
        <div className="lg:col-span-5 bg-obsidian-900 border border-red-950/40 rounded-2xl p-6 lg:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold">
              Subordinate / Apologetic Input
            </span>
          </div>

          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your draft here to purge weak qualifiers, apologies, and passive framing..."
            className="w-full p-4 bg-obsidian-950 rounded-xl border border-red-950/60 text-xs text-red-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition resize-none"
          />

          <div className="p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            Rule of thumb: Never apologize for taking up space, asking for standard comp, or doing your job. Replace apologies with gratitude or definitive execution commands.
          </div>
        </div>

        {/* Right: Sovereign Rewrites */}
        <div className="lg:col-span-7 space-y-4">
          {rewrites.map((rw, idx) => (
            <div
              key={idx}
              className="bg-obsidian-900 border border-gold-500/30 rounded-xl p-5 space-y-3 hover:border-gold-500/60 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gold-400">{rw.tier}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-obsidian-950 text-slate-400">
                    {rw.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speak(rw.content)}
                    className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 hover:bg-gold-500/20 transition"
                    title="Listen to cadence"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleCopy(rw.content, idx)}
                    className="p-1.5 rounded-lg bg-obsidian-950 text-slate-300 hover:text-white border border-slate-800 transition flex items-center gap-1 text-xs"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-100 font-medium italic leading-relaxed">
                "{rw.content}"
              </p>

              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                <Shield className="w-3 h-3 text-gold-400" />
                <span>Cadence: {rw.tone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
