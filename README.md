# ⚜️ SOVEREIGN SPEECH
### *The Autonomous Executive Spoken English, 48 Laws Persuasion & Wealth Mindset Operating System*

> **"Speak with gravitas, negotiate with psychological dominance, and think with investor clarity."**

---

## 🌟 Overview

**Sovereign Speech** is a full-stack, browser-native operating system designed to elevate everyday English learners, job candidates, and ambitious entrepreneurs into commanding, high-status communicators.

Unlike standard language apps that teach basic grammar and textbook dialogues, **Sovereign Speech** combines:
1. **Daily Spoken & Idiomatic English**: Natural cadence, executive small talk, phrasal verbs, and effortless banter.
2. **Interview-Level Executive English**: The STAR method (Situation, Task, Action, Result) and PREP framework (Point, Reason, Example, Point) to answer *any* question under extreme pressure.
3. **48 Laws of Power & OSINT Persuasion**: Frame control, strategic silence, psychological mirroring (FBI/Voss method), and Machiavellian verbal tactics adapted directly from Robert Greene's *The 48 Laws of Power*.
4. **Rich Mindset & Wealth Vernacular**: Financial communication derived from *Rich Dad Poor Dad* (Robert Kiyosaki), *Think and Grow Rich* (Napoleon Hill), and *The Psychology of Money*—transforming scarcity speech into capital allocation logic.
5. **Classical Rhetoric Treasury**: Curated rules and audio from open-source masterpieces: Dale Carnegie's *The Art of Public Speaking*, Strunk & White's *The Elements of Style*, Joseph Devlin's *How to Speak and Write Correctly*, and *Aristotle's Rhetoric*.
6. **Self-Updating Daily Content Engine**: Built-in automated GitHub Action cron (`0 0 * * *`) that generates fresh daily challenges, terms of the day, and synced vocabulary updates every midnight UTC.

---

## 🚀 20 Additional Advanced Features Included

This application includes 20 production-grade features built into the code:

1. **Real-Time Microphone Voice-to-Text (`Web Speech API`)**: Speak naturally into your microphone; the AI transcribes your spoken words in real-time.
2. **Native Text-to-Speech (TTS) Voice Engine**: Hear any sovereign answer, 48 Laws script, or wealth term spoken in authentic executive British, American, or Global accents.
3. **Words-Per-Minute (WPM) & Hesitation Pacing Meter**: Flags speech that is too rushed (>170 WPM) or hesitant (<110 WPM), calibrating you to the executive sweet spot (120–155 WPM).
4. **Filler-Word Exterminator**: Real-time counter and highlighter for verbal crutches (`um`, `uh`, `like`, `you know`, `basically`) that trains you to execute sovereign pauses.
5. **Aristotelian Persuasion Triad Analyzer**: Real-time mathematical scoring for **Ethos** (Authority & Stature), **Logos** (Logic & Data), and **Pathos** (Emotional Vision).
6. **Passive-to-Sovereign Frame Re-Writer**: Transforms weak, apologetic statements (*"Sorry to bother you..."*) into three distinct tiers: Executive Diplomatic, Sovereign Authority, and Machiavellian Tactical.
7. **Interactive Live Power Sparring Ring**: Real-time psychological combat against 4 simulated adversaries (Aggressive Recruiter, Hostile Board Member, Insecure Micro-Manager, Passive-Aggressive Peer) with instant frame-control scoring.
8. **Guided 4-Step STAR Framework Builder**: Interactive visual builder for structuring behavioral interview answers on the fly.
9. **PREP Framework Impromptu Speech Builder**: Structure impromptu answers to surprise questions in under 5 seconds (Point, Reason, Example, Point).
10. **Rich Mindset Cognitive Reframer**: Input any scarcity belief (*"I can't afford that"*) and watch it convert into an ROI and leverage query.
11. **Leitner Spaced Repetition (SRS) Flashcards**: Active recall flashcards with four review intervals (Again, Hard, Good, Mastered) and XP tracking.
12. **Dark Psychology & Manipulation Counter-Defense**: Turnkey verbal shields to deflect gaslighting, double-bind traps, guilt-tripping, and artificial urgency.
13. **30-Second High-Stakes Elevator Pitch Arena**: Timed countdown pitch drills with audio recording and hook strength evaluation.
14. **Gamified XP, Streak & Sovereign Rank Progression**: Level up from *Verbal Novice* to *Sovereign Orator* with animated daily streaks, confetti celebrations, and badge unlocks.
15. **Automated Midnight GitHub Action Self-Updater**: Automated cron workflow (`.github/workflows/daily_update.yml`) that auto-refreshes vocabulary and challenges every 24 hours without human intervention.
16. **6 Distinct AI Interviewer Archetypes**: Switch between the Wall Street Shark, the Skeptical VP, the Strategic HR Director, and the Visionary Founder.
17. **OSINT Non-Verbal & Micro-Expression Playbook**: Tactical guide for downward vocal inflection, diaphragmatic acoustic resonance, and triangle eye-contact calibration.
18. **Curated Classical Literature Treasury**: Interactive rules, before/after comparisons, and audio quotes from Dale Carnegie, Strunk & White, Joseph Devlin, and Aristotle.
19. **100% Offline PWA & Zero-Server Local Storage Mode**: PWA-ready with standalone mobile display, offline caching, and persistent local storage with zero cloud dependencies.
20. **One-Click Multi-Cloud 100% Free Fast Deployment Suite**: Pre-configured `vercel.json`, `netlify.toml`, and GitHub Actions workflows for free hosting on Vercel, Netlify, or GitHub Pages.

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or pnpm or yarn

### 2. Run Locally
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/sovereign-speech.git
cd sovereign-speech

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Content Auto-Updater Manually
```bash
npm run update-content
```

---

## 🌐 How to Deploy for Free and Fast

### Option A: Vercel (Fastest — 60 Seconds)
The codebase includes a pre-configured `vercel.json`.

**Via CLI:**
```bash
npm install -g vercel
vercel
```
*Hit `Enter` to accept defaults. Your app is live instantly with free SSL.*

**Via Web UI:**
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **"Deploy"**.

---

### Option B: GitHub Pages (Free + Automated Daily Updates)
The repository includes `.github/workflows/deploy.yml` and `.github/workflows/daily_update.yml`.

1. Push your code to a GitHub repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/sovereign-speech.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **"GitHub Actions"**.
3. GitHub Actions will automatically build and publish the site.
4. The daily cron job will run every midnight at `00:00 UTC` to commit new terms and challenges automatically!

---

### Option C: Netlify (Drag & Drop or Git)
The repository includes `netlify.toml`.

1. Run `npm run build` locally.
2. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder. Your app is live in 10 seconds.

---

## 🛠️ Technology Stack

- **UI Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS with custom Obsidian & Gold design system
- **Icons**: Lucide React
- **Audio Processing**: Browser-native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Animations & Effects**: Canvas Confetti & CSS3 Keyframes
- **State & Persistence**: Reactive LocalStorage Hooks + Custom SRS Engine
- **CI/CD & Automation**: GitHub Actions (Daily Midnight Cron + Static Pages Deploy)

---

## 📜 Intellectual Sources & Classical Attributions
- *The 48 Laws of Power* by Robert Greene (Vocal & Tactical Frame Dynamics)
- *Rich Dad Poor Dad* by Robert T. Kiyosaki (Capital Allocation & Asset Framing)
- *Think and Grow Rich* by Napoleon Hill (Definiteness of Purpose & Mastermind Vernacular)
- *The Art of Public Speaking* (1915) by Dale Carnegie & J. Berg Esenwein
- *The Elements of Style* (1918) by William Strunk Jr.
- *How to Speak and Write Correctly* (1910) by Joseph Devlin
- *Rhetoric* by Aristotle (Ethos, Pathos, Logos Triad)

---

## ⚖️ License
MIT License. Free for personal, educational, and commercial usage.
