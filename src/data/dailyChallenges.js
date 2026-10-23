// Daily Challenges Engine with Dynamic Date Seeding and Auto-Update hooks
export const dailyChallengesData = [
  {
    id: 1,
    dayIndex: 1,
    title: "The Sovereign 15-Second Executive Intro",
    category: "Interview & Status",
    xpReward: 150,
    difficulty: "Medium",
    objective: "Deliver a 15-second introduction that hooks an interviewer or executive without saying 'I have X years of experience' or 'I graduated from Y'.",
    frameworkTip: "Formula: I engineer [High-Value Outcome] for [Target Tier] by leveraging [Unique Asymmetric Mechanism].",
    exampleTarget: "I architect high-velocity revenue engines for enterprise B2B firms by converting fragmented sales pipelines into predictable automated pipelines that yield 40% higher close rates.",
    badExample: "Hi, my name is Alex, I am a hard worker, I went to state university and I have 5 years of experience in sales and marketing.",
    keyCriteria: ["Zero filler words ('um', 'like')", "Finished within 12-18 seconds", "Projects clear authority with downward tonal inflection"],
    powerLawRef: "Law 34: Be Royal in Your Own Fashion"
  },
  {
    id: 2,
    dayIndex: 2,
    title: "Disarm an Aggressive Counter-Offer",
    category: "48 Laws & Persuasion",
    xpReward: 200,
    difficulty: "Hard",
    objective: "An interviewer says: 'Someone with your exact background is asking for 30% less than you. Why wouldn't we hire them?' Disarm them without insulting the rival.",
    frameworkTip: "The FBI Tactical Pivot: Validate their fiscal prudence, then differentiate between 'cost of labor' and 'cost of failure'.",
    exampleTarget: "If your primary objective is minimizing immediate payroll outlay, that candidate may indeed be your most logical choice. However, if your strategic mandate is de-risking a mission-critical infrastructure migration where a single day of downtime costs \$200,000, investing in verified execution certainty is the most conservative financial decision you can make.",
    badExample: "Because they probably suck and I am way smarter than them and you get what you pay for!",
    keyCriteria: ["Zero defensiveness", "Frames yourself as the conservative, high-safety choice", "Reflects calm composure"],
    powerLawRef: "Law 9: Win Through Your Actions, Never Through Argument"
  },
  {
    id: 3,
    dayIndex: 3,
    title: "Rich Mindset: Reframe 'We Can't Afford It'",
    category: "Wealth & Rich Mindset",
    xpReward: 175,
    difficulty: "Medium",
    objective: "Transform the middle-class scarcity reflex into an investor's capital-allocation query.",
    frameworkTip: "Invert the equation from 'expense outflow' to 'internal rate of return and payback period'.",
    exampleTarget: "Rather than viewing this \$50,000 deployment as an overhead expense, let's look at the amortization schedule. If it unlocks \$18,000 per month in operational savings, the asset achieves full cash payback in 83 days and generates pure compounding profit thereafter.",
    badExample: "We have to spend money to make money, everyone knows that!",
    keyCriteria: ["Uses financial vocabulary (amortization, payback period, compounding)", "Focuses on velocity of capital"],
    powerLawRef: "Rich Dad Poor Dad Asset Philosophy"
  },
  {
    id: 4,
    dayIndex: 4,
    title: "The Strategic Silence Mastery Drill",
    category: "Vocal Power & Cadence",
    xpReward: 125,
    difficulty: "Easy",
    objective: "Speak for 15 seconds answering 'Why are you leaving your current role?', conclude with a definitive punchline, and hold silence for 4 seconds without fidgeting or smiling nervously.",
    frameworkTip: "Law 4: Always Say Less Than Necessary. Never over-explain why you left.",
    exampleTarget: "I have achieved every structural milestone my executive mandate called for at my current firm. I am now seeking an environment with a higher velocity of capital deployment and ambitious scale.",
    badExample: "Well, you see, my manager didn't really appreciate me, and the commute was tough, and the culture was getting toxic, so yeah, that's kind of why I'm looking around...",
    keyCriteria: ["Total brevity", "No blaming past colleagues", "Clean 4-second absolute silence"],
    powerLawRef: "Law 4: Always Say Less Than Necessary"
  },
  {
    id: 5,
    dayIndex: 5,
    title: "The PREP Method Rapid Fire Drill",
    category: "Classical Rhetoric",
    xpReward: 220,
    difficulty: "Hard",
    objective: "Answer any impromptu question using the Aristotelian PREP structure: Point -> Reason -> Example -> Point in under 45 seconds.",
    frameworkTip: "State the Point firmly in 1 sentence. Give the analytical Reason. Cite a concrete Example. Restate the Point with finality.",
    exampleTarget: "Remote work models significantly outpace traditional co-located offices in sustained enterprise output (Point). When knowledge workers operate asynchronously, deep cognitive work is insulated from superficial office theater (Reason). In our last deployment, transitioning our engineering squad to core asynchronous sprints reduced ticket turnaround time by 37% (Example). Therefore, intentional asynchronous autonomy remains the supreme architecture for high-velocity teams (Point).",
    badExample: "I think working from home is cool because you can wear sweatpants and you don't have to sit in traffic and my dog likes it.",
    keyCriteria: ["Clear adherence to all 4 PREP stages", "Zero hesitation marks", "Strong concluding cadence"],
    powerLawRef: "The Art of Public Speaking (Dale Carnegie)"
  }
];

// Helper to get today's active challenge based on local day of year
export function getTodayChallenge() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % dailyChallengesData.length;
  return dailyChallengesData[index];
}
