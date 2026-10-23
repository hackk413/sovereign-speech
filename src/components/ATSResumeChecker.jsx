import React, { useState, useRef } from 'react';
import { 
  analyzeResumeATS, 
  SAMPLE_RESUMES, 
  SOVEREIGN_ACTION_VERBS 
} from '../utils/atsAnalyzer';
import { extractTextFromPDF } from '../utils/pdfParser';
import { 
  FileText, Upload, CheckCircle2, AlertTriangle, XCircle, 
  Sparkles, ArrowRight, TrendingUp, ShieldCheck, Copy, 
  Download, RefreshCw, Zap, Layers, HelpCircle, Briefcase, 
  Check, FileCheck
} from 'lucide-react';

export default function ATSResumeChecker({ gamification }) {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.weakSubordinate);
  const [jobDescription, setJobDescription] = useState('');
  const [activeMode, setActiveMode] = useState('withJD'); // 'withJD' | 'withoutJD'
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Google XYZ Re-writer state
  const [weakBulletInput, setWeakBulletInput] = useState('Responsible for managing customer tickets and fixing bugs.');
  const [metricInput, setMetricInput] = useState('reduced resolution time by 30%');
  const [generatedXYZBullets, setGeneratedXYZBullets] = useState(null);

  const fileInputRef = useRef(null);
  const { addXP } = gamification;

  // Run ATS analysis
  const currentJD = activeMode === 'withJD' ? jobDescription : '';
  const report = analyzeResumeATS(resumeText, currentJD);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingPDF(true);
    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const extracted = await extractTextFromPDF(file);
        setResumeText(extracted);
      } else {
        const text = await file.text();
        setResumeText(text);
      }
      addXP(50, false);
    } catch (err) {
      console.error('File parsing failed:', err);
      alert('Failed to parse file. Please copy and paste your resume text directly.');
    } finally {
      setIsParsingPDF(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateXYZ = () => {
    if (!weakBulletInput.trim()) return;

    const baseAction = weakBulletInput.replace(/^(responsible for|helped with|assisted in|worked on|tasked with)\s*/i, '');
    const metric = metricInput.trim() || 'yielding a 28% efficiency delta';

    const bullets = [
      `Spearheaded overhaul of ${baseAction}, ${metric} and streamlining operational handoffs across cross-functional sprints.`,
      `Architected automated workflow for ${baseAction}, ${metric} while eliminating 8 hours of weekly manual latency.`,
      `Orchestrated strategic execution of ${baseAction}, ${metric} to deliver verifiable enterprise impact.`
    ];

    setGeneratedXYZBullets(bullets);
    addXP(40, false);
  };

  const loadSample = (type) => {
    if (type === 'weak') {
      setResumeText(SAMPLE_RESUMES.weakSubordinate);
    } else if (type === 'strong') {
      setResumeText(SAMPLE_RESUMES.sovereignExecutive);
    }
  };

  const loadSampleJD = () => {
    setJobDescription(SAMPLE_RESUMES.sampleJobDescription);
    setActiveMode('withJD');
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <FileCheck className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400 font-bold">
                Enterprise Applicant Tracking System (ATS) Engine
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-extrabold text-slate-100">
              ATS-Friendly Resume Checker & Genuine Scoring Engine
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              Analyzed from Fortune 500 ATS algorithms (Greenhouse, Workday, Taleo, Jobscan). Uncover your genuine pass score, see exactly why points were deducted, and follow forensic playbooks to boost your ranking with or without a target job description.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="bg-obsidian-950 p-1.5 rounded-xl border border-slate-800 flex gap-1">
            <button
              onClick={() => setActiveMode('withJD')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeMode === 'withJD'
                  ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>With Job Description</span>
            </button>
            <button
              onClick={() => setActiveMode('withoutJD')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeMode === 'withoutJD'
                  ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Without JD (General ATS Audit)</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Loaders */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Test With Sample Data:</span>
          <button
            onClick={() => loadSample('weak')}
            className="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-950 text-red-300 border border-red-800/40 text-xs font-medium transition"
          >
            Load Weak Subordinate Resume (Score ~ 44)
          </button>
          <button
            onClick={() => loadSample('strong')}
            className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-xs font-medium transition"
          >
            Load Sovereign Executive Resume (Score ~ 95)
          </button>
          {activeMode === 'withJD' && (
            <button
              onClick={loadSampleJD}
              className="px-2.5 py-1 rounded-lg bg-obsidian-950 hover:bg-slate-800 text-gold-400 border border-gold-500/30 text-xs font-medium transition"
            >
              Load Sample Cloud Architect JD
            </button>
          )}
        </div>
      </div>

      {/* Input Section: Resume Text & Target JD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Resume Input Area */}
        <div className={`${activeMode === 'withJD' ? 'lg:col-span-7' : 'lg:col-span-12'} bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-400" />
              <h3 className="font-serif font-bold text-base text-slate-100">Your Resume Content</h3>
              <span className="text-[11px] font-mono text-slate-400">
                ({resumeText.trim().split(/\s+/).filter(Boolean).length} words)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.txt"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsingPDF}
                className="px-3 py-1.5 rounded-lg bg-obsidian-950 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Upload className="w-3.5 h-3.5 text-gold-400" />
                <span>{isParsingPDF ? 'Parsing PDF...' : 'Upload PDF / TXT'}</span>
              </button>
              <button
                onClick={() => setResumeText('')}
                className="text-xs text-slate-500 hover:text-slate-300 transition"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here or upload a PDF above..."
            className="w-full p-4 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 font-mono leading-relaxed resize-y"
          />
        </div>

        {/* Right Column: Target Job Description (If active) */}
        {activeMode === 'withJD' && (
          <div className="lg:col-span-5 bg-obsidian-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gold-400" />
                <h3 className="font-serif font-bold text-base text-slate-100">Target Job Description</h3>
              </div>
              <button
                onClick={() => setJobDescription('')}
                className="text-xs text-slate-500 hover:text-slate-300 transition"
              >
                Clear
              </button>
            </div>

            <textarea
              rows={10}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here to analyze matching keywords, hard skill density, and title alignment..."
              className="w-full p-4 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-500 font-mono leading-relaxed resize-y"
            />
          </div>
        )}
      </div>

      {/* ATS DIAGNOSTIC DASHBOARD */}
      {report && (
        <div className="space-y-6">
          {/* Main Score Banner */}
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Radial Score Gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-obsidian-950 rounded-xl border border-slate-800 text-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Genuine ATS Compatibility Score
                </span>
                <div className={`text-6xl font-serif font-extrabold my-2 ${
                  report.totalScore >= 80 ? 'text-emerald-400' : report.totalScore >= 60 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {report.totalScore}
                  <span className="text-2xl text-slate-500 font-normal">/100</span>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  report.totalScore >= 80
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : report.totalScore >= 60
                    ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    : 'bg-red-950 text-red-300 border border-red-500/40'
                }`}>
                  {report.totalScore >= 80 ? 'Top 5% Executive Pass Tier' : report.totalScore >= 60 ? 'Moderate ATS Risk (Action Needed)' : 'High Risk of Automatic Rejection'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-3">
                  Mode: {report.isWithJD ? 'Targeted Job Description Match' : 'General Fortune 500 ATS Benchmark'}
                </span>
              </div>

              {/* Pillar Score Cards */}
              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-obsidian-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Quantified Bullets</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-bold font-mono ${report.quantificationRatio >= 40 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {report.quantificationRatio}%
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">({report.quantifiedBulletsCount}/{report.totalBullets})</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">Target: &gt;= 40%</span>
                </div>

                <div className="p-3.5 bg-obsidian-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Sovereign Verbs</span>
                  <span className={`text-xl font-bold font-mono ${report.languageHealth.foundSovereignVerbs.length >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {report.languageHealth.foundSovereignVerbs.length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Target: &gt;= 5 power verbs</span>
                </div>

                <div className="p-3.5 bg-obsidian-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Passive Phrases</span>
                  <span className={`text-xl font-bold font-mono ${report.languageHealth.foundWeakPhrases.length === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {report.languageHealth.foundWeakPhrases.length}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">Target: 0 passive phrases</span>
                </div>

                <div className="p-3.5 bg-obsidian-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">Contact & Sections</span>
                  <span className={`text-xl font-bold font-mono ${report.contactInfo.score + report.sectionHealth.score >= 26 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {report.contactInfo.score + report.sectionHealth.score}/30
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">ATS Header Hygiene</span>
                </div>
              </div>
            </div>
          </div>

          {/* KEYWORD HEALTH (IF WITH JOB DESCRIPTION) */}
          {report.isWithJD && (
            <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-serif font-bold text-base text-slate-100 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gold-400" />
                    Target Job Description Keyword Audit
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ATS scanners calculate an exact keyword overlap score to rank applicants in recruiter dashboards.
                  </p>
                </div>
                <div className="text-xs font-mono">
                  Match Rate: <strong className="text-gold-400">{report.keywordHealth.matchedKeywords.length} / {report.keywordHealth.matchedKeywords.length + report.keywordHealth.missingKeywords.length}</strong>
                </div>
              </div>

              {/* Matched Keywords */}
              <div>
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Matched Keywords in Your Resume ({report.keywordHealth.matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {report.keywordHealth.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                      ✓ {kw}
                    </span>
                  ))}
                  {report.keywordHealth.matchedKeywords.length === 0 && (
                    <span className="text-xs text-slate-500 italic">No direct keyword overlap found yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  Missing Critical Keywords from Target JD ({report.keywordHealth.missingKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {report.keywordHealth.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
                      + {kw}
                    </span>
                  ))}
                  {report.keywordHealth.missingKeywords.length === 0 && (
                    <span className="text-xs text-emerald-400 font-mono">Flawless 100% keyword coverage!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DEDUCTIONS FORENSIC BREAKDOWN: WHY DID THE SCORE DECREASE? */}
          <div className="bg-obsidian-900 border border-red-950/50 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Forensic Breakdown: Why Your Score Decreased
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Itemized ATS parser penalties and deductions applied to your resume.
                </p>
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">
                {report.deductions.length} Penalties Flagged
              </span>
            </div>

            {report.deductions.length === 0 ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero critical penalties detected! Your resume follows elite executive ATS formatting standards.
              </div>
            ) : (
              <div className="space-y-3">
                {report.deductions.map((ded, idx) => (
                  <div key={idx} className="p-4 bg-obsidian-950 rounded-xl border border-red-950/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 font-mono text-xs font-bold border border-red-800/40">
                          {ded.points} pts
                        </span>
                        <span className="text-xs font-mono text-slate-300 font-bold">{ded.category}</span>
                      </div>
                    </div>
                    <p className="text-xs text-red-200/90 leading-relaxed font-sans">
                      {ded.reason}
                    </p>
                    <div className="p-2.5 bg-obsidian-900 rounded-lg text-xs text-gold-300 border border-gold-500/20">
                      <strong className="text-gold-400 font-mono text-[10px] uppercase block mb-0.5">How To Fix:</strong>
                      {ded.fix}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIONABLE SCORE BOOSTER PLAYBOOK */}
          <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-100 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold-400" />
                  Score Booster Playbook: What To Do To Increase Your Score
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Follow these prioritized steps to elevate your resume into the top 5% of candidate pools.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.scoreBoosters.map((booster, idx) => (
                <div key={idx} className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2 hover:border-gold-500/40 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">{booster.gainPoints}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      booster.priority === 'CRITICAL' ? 'bg-red-950 text-red-400' : 'bg-gold-500/10 text-gold-400'
                    }`}>
                      {booster.priority}
                    </span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-slate-100">{booster.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{booster.instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* INTERACTIVE GOOGLE XYZ BULLET RE-WRITER */}
          <div className="bg-obsidian-900 border border-gold-500/30 rounded-2xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  Google XYZ Formula Bullet Point Re-Writer
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Convert any passive, weak resume bullet into a high-status ATS-winning achievement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Weak Bullet / Responsibility:</label>
                <input
                  type="text"
                  value={weakBulletInput}
                  onChange={(e) => setWeakBulletInput(e.target.value)}
                  placeholder="e.g. Responsible for customer support tickets"
                  className="w-full p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Quantifiable Metric / Outcome (Y):</label>
                <input
                  type="text"
                  value={metricInput}
                  onChange={(e) => setMetricInput(e.target.value)}
                  placeholder="e.g. reduced response time by 42% or saved $120K"
                  className="w-full p-3 bg-obsidian-950 rounded-xl border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateXYZ}
              className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs shadow-md shadow-gold-500/20 transition flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Re-Engineer Bullet (+40 XP)
            </button>

            {generatedXYZBullets && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <span className="text-[11px] font-mono uppercase text-gold-400 font-bold block">
                  Optimized Google XYZ Sovereign Bullets (Click to Copy):
                </span>
                {generatedXYZBullets.map((b, i) => (
                  <div
                    key={i}
                    onClick={() => handleCopy(b, `xyz-${i}`)}
                    className="p-3 bg-obsidian-950 hover:bg-obsidian-850 rounded-xl border border-gold-500/20 hover:border-gold-500/50 cursor-pointer transition flex items-center justify-between text-xs text-slate-200"
                  >
                    <span>• {b}</span>
                    <button className="text-gold-400 shrink-0 ml-2">
                      {copiedKey === `xyz-${i}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
