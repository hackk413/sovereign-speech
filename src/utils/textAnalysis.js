// Verbal Analysis Engine: Filler Word Detector, Aristotelian Triad & Tone Analyzer

const FILLER_WORDS = [
  "um", "uh", "like", "you know", "basically", "actually", "literally",
  "sort of", "kind of", "i mean", "right?", "you see", "stuff like that"
];

const APOLOGETIC_WORDS = [
  "sorry", "i apologize", "just wondering", "excuse me if i'm wrong",
  "maybe", "perhaps i could", "i kind of think", "if that's okay", "don't hate me but"
];

const ETHOS_MARKERS = [
  "empirical", "verified", "track record", "integrity", "stewardship",
  "governance", "fiduciary", "leadership", "credential", "framework", "proven", "accountability"
];

const LOGOS_MARKERS = [
  "therefore", "consequently", "data demonstrates", "metrics", "ratio",
  "margin", "basis points", "percentage", "because", "syllogism", "analysis", "empirical", "ebitda"
];

const PATHOS_MARKERS = [
  "vision", "transform", "catalyst", "mission", "inspire",
  "compelling", "exponential", "pride", "breakthrough", "urgent", "ambitious", "triumph"
];

export function analyzeSpokenText(text, durationSeconds = 15) {
  if (!text || text.trim().length === 0) {
    return {
      wordCount: 0,
      wpm: 0,
      fillerCount: 0,
      fillersFound: [],
      apologeticCount: 0,
      apologeticsFound: [],
      ethosScore: 0,
      logosScore: 0,
      pathosScore: 0,
      powerScore: 0,
      pacingEvaluation: "No speech detected"
    };
  }

  const cleanText = text.toLowerCase();
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;

  // Words per minute calculation
  const safeDuration = Math.max(durationSeconds, 5);
  const wpm = Math.round((wordCount / safeDuration) * 60);

  // Filler words check
  const fillersFound = [];
  FILLER_WORDS.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, 'gi');
    const matches = cleanText.match(regex);
    if (matches) {
      fillersFound.push({ word: filler, count: matches.length });
    }
  });
  const fillerCount = fillersFound.reduce((acc, curr) => acc + curr.count, 0);

  // Apologetic words check
  const apologeticsFound = [];
  APOLOGETIC_WORDS.forEach((apology) => {
    const regex = new RegExp(`\\b${apology}\\b`, 'gi');
    const matches = cleanText.match(regex);
    if (matches) {
      apologeticsFound.push({ word: apology, count: matches.length });
    }
  });
  const apologeticCount = apologeticsFound.reduce((acc, curr) => acc + curr.count, 0);

  // Aristotelian Persuasion Triad Scores (0-100)
  const ethosMatches = ETHOS_MARKERS.filter(m => cleanText.includes(m)).length;
  const logosMatches = LOGOS_MARKERS.filter(m => cleanText.includes(m)).length;
  const pathosMatches = PATHOS_MARKERS.filter(m => cleanText.includes(m)).length;

  const ethosScore = Math.min(100, Math.round((ethosMatches / 3) * 100));
  const logosScore = Math.min(100, Math.round((logosMatches / 3) * 100));
  const pathosScore = Math.min(100, Math.round((pathosMatches / 3) * 100));

  // Pacing status
  let pacingEvaluation = "Optimal Cadence (120 - 155 WPM)";
  if (wpm < 110) pacingEvaluation = "Too Slow / Hesitant (< 110 WPM)";
  else if (wpm > 170) pacingEvaluation = "Rushed / Anxious Cadence (> 170 WPM)";

  // Overall Sovereign Power Score
  let baseScore = 70;
  baseScore -= fillerCount * 8;
  baseScore -= apologeticCount * 12;
  baseScore += (ethosScore + logosScore + pathosScore) / 6;
  if (wpm >= 115 && wpm <= 160) baseScore += 10;
  const powerScore = Math.max(10, Math.min(99, Math.round(baseScore)));

  return {
    wordCount,
    wpm,
    fillerCount,
    fillersFound,
    apologeticCount,
    apologeticsFound,
    ethosScore,
    logosScore,
    pathosScore,
    powerScore,
    pacingEvaluation
  };
}
