import React, { useState } from 'react';
import { Rocket, Copy, Check, Globe, GitBranch, Terminal, Zap, ShieldCheck } from 'lucide-react';

export default function DeploymentGuideModal({ onClose }) {
  const [activePlatform, setActivePlatform] = useState('vercel'); // 'vercel' | 'github' | 'netlify'
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-obsidian-900 border border-gold-500/40 rounded-2xl max-w-3xl w-full p-6 lg:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-gold-400 font-bold flex items-center gap-1.5">
              <Rocket className="w-4 h-4" />
              Free & Fast Instant Deployment
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-100">
              How to Deploy for Free in Under 2 Minutes
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-obsidian-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono font-bold"
          >
            Close Esc
          </button>
        </div>

        {/* Platform Selector */}
        <div className="grid grid-cols-3 gap-2 bg-obsidian-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'vercel', label: "Vercel (Fastest)", icon: Zap },
            { id: 'github', label: "GitHub Pages (Auto-Sync)", icon: GitBranch },
            { id: 'netlify', label: "Netlify (Drag & Drop)", icon: Globe }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePlatform(item.id)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                  activePlatform === item.id
                    ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* VERCEL GUIDE */}
        {activePlatform === 'vercel' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-gold-400 font-mono text-[11px] uppercase block">
                Option A: Instant Terminal CLI (60 Seconds)
              </span>
              <p className="text-slate-300">
                You already have <code className="text-gold-300 font-mono">vercel.json</code> configured in this codebase. Open your terminal and run:
              </p>
              <div className="flex items-center justify-between p-3 bg-obsidian-900 rounded-lg border border-slate-800 font-mono text-slate-200">
                <span>npx vercel</span>
                <button
                  onClick={() => copyToClipboard('npx vercel', 'vcli')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedKey === 'vcli' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-slate-400">
                Hit enter on all defaults. You will receive an instant, free global HTTPS URL (e.g., <code className="text-gold-300">https://sovereign-speech.vercel.app</code>).
              </p>
            </div>

            <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-gold-400 font-mono text-[11px] uppercase block">
                Option B: Web UI (1-Click GitHub Import)
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>Push this repository to your GitHub account (<code className="text-gold-300 font-mono">git push origin main</code>).</li>
                <li>Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-gold-400 underline">vercel.com</a> and sign in with GitHub for free.</li>
                <li>Click <strong>"Add New Project"</strong> and select this repo.</li>
                <li>Click <strong>"Deploy"</strong>. It auto-detects Vite and builds in under 20 seconds!</li>
              </ol>
            </div>
          </div>
        )}

        {/* GITHUB PAGES GUIDE */}
        {activePlatform === 'github' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-gold-400 font-mono text-[11px] uppercase block">
                GitHub Pages with Midnight Auto-Updates
              </span>
              <p className="text-slate-300">
                This repository includes <code className="text-gold-300 font-mono">.github/workflows/deploy.yml</code> and <code className="text-gold-300 font-mono">.github/workflows/daily_update.yml</code> already!
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>Create a repository on GitHub (e.g., <code className="text-gold-300 font-mono">sovereign-speech</code>).</li>
                <li>Push this codebase:
                  <div className="my-2 p-2.5 bg-obsidian-900 rounded font-mono text-slate-200 flex justify-between items-center">
                    <span>git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git && git push -u origin main</span>
                    <button onClick={() => copyToClipboard('git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git && git push -u origin main', 'ghpush')}>
                      {copiedKey === 'ghpush' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </li>
                <li>In your GitHub repo, go to <strong>Settings → Pages → Source</strong> and select <strong>"GitHub Actions"</strong>.</li>
                <li>The site will deploy automatically! The included cron job will run every midnight to update new terms and push challenges automatically!</li>
              </ol>
            </div>
          </div>
        )}

        {/* NETLIFY GUIDE */}
        {activePlatform === 'netlify' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-obsidian-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-gold-400 font-mono text-[11px] uppercase block">
                Netlify Instant Deploy
              </span>
              <p className="text-slate-300">
                You already have <code className="text-gold-300 font-mono">netlify.toml</code> pre-configured in the repository.
              </p>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                <li>Run <code className="text-gold-300 font-mono">npm run build</code> locally to create the <code className="text-gold-300 font-mono">dist/</code> folder.</li>
                <li>Go to <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-gold-400 underline">app.netlify.com/drop</a>.</li>
                <li>Drag and drop the <code className="text-gold-300 font-mono">dist</code> folder into the browser window.</li>
                <li>Your app is live in 10 seconds with free SSL and CDN!</li>
              </ol>
            </div>
          </div>
        )}

        <div className="p-4 bg-obsidian-950 rounded-xl border border-emerald-950/60 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs text-slate-300">
            <strong>100% Free Forever:</strong> All recommended providers (Vercel, GitHub Pages, Netlify) offer generous free tiers with unlimited bandwidth for personal and educational use. Zero credit card required.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs shadow-md shadow-gold-500/20 transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
