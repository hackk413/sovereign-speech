// Comprehensive ATS Parsing, Forensic Scoring & Optimization Engine
// Modeled after Greenhouse, Taleo, Workday, and Jobscan algorithms

// 1. HIGH-IMPACT SOVEREIGN ACTION VERBS
export const SOVEREIGN_ACTION_VERBS = [
  "orchestrated", "spearheaded", "architected", "engineered", "accelerated",
  "streamlined", "capitalized", "formulated", "championed", "expanded",
  "overhauled", "negotiated", "catalyzed", "decreased", "eliminated",
  "delivered", "pioneered", "restructured", "maximized", "optimized",
  "generated", "automated", "executed", "instituted", "scaled",
  "cultivated", "modernized", "captured", "transformed", "unified"
];

// 2. WEAK / PASSIVE SUBORDINATE PHRASES (ATS PENALTIES)
export const WEAK_PASSIVE_PHRASES = [
  "responsible for", "duties included", "helped with", "assisted with",
  "worked on", "handled", "participated in", "tried to", "involved in",
  "tasked with", "was required to", "assisted in", "supported the"
];

// 3. CLICHÉS & FLUFF BUZZWORDS (ATS PENALTIES)
export const CLICHE_BUZZWORDS = [
  "team player", "hard worker", "results-driven", "results-oriented",
  "think outside the box", "detail-oriented", "go-getter", "self-motivated",
  "fast learner", "people person", "synergy", "dynamic individual",
  "wear many hats", "proven track record", "good communication skills"
];

// 4. CORE ATS SECTION HEADERS
const SECTION_HEADERS = {
  contact: ["contact", "email", "phone", "linkedin", "address", "location"],
  summary: ["summary", "professional summary", "executive profile", "about me", "profile", "overview"],
  experience: ["experience", "work experience", "employment history", "professional experience", "work history", "career history"],
  education: ["education", "academic background", "degrees", "university", "college"],
  skills: ["skills", "technical skills", "core competencies", "competencies", "areas of expertise", "technologies"],
  projects: ["projects", "personal projects", "portfolio", "key initiatives", "certifications", "licenses"]
};

// 5. STOP WORDS FOR KEYWORD EXTRACTION
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing",
  "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't",
  "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself",
  "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is",
  "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours",
  "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should",
  "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them",
  "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've",
  "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we",
  "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where",
  "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
  "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves",
  "will", "shall", "may", "might", "must", "can", "could", "also", "well", "using", "work", "experience",
  "skills", "years", "role", "job", "candidate", "company", "team", "strong", "ability", "proficient"
]);

/**
 * Extracts high-value keywords and skills from a Job Description.
 */
export function extractKeywordsFromJD(jdText) {
  if (!jdText || jdText.trim().length === 0) return [];

  const cleanText = jdText.toLowerCase().replace(/[^a-z0-9#+.\s-]/g, ' ');
  const tokens = cleanText.split(/\s+/).filter(t => t.length > 2 && !STOP_WORDS.has(t));

  // Count frequency
  const freqMap = {};
  tokens.forEach(token => {
    freqMap[token] = (freqMap[token] || 0) + 1;
  });

  // Extract common multi-word technical/business terms
  const multiWordPatterns = [
    "react js", "node js", "vue js", "ci cd", "machine learning", "deep learning",
    "artificial intelligence", "data science", "cloud computing", "system architecture",
    "project management", "product management", "full stack", "front end", "back end",
    "microservices", "unit testing", "rest api", "graphql api", "sql server",
    "business development", "financial modeling", "cross functional", "risk management",
    "strategic planning", "stakeholder management", "devops engineering", "agile scrum"
  ];

  const multiMatches = [];
  multiWordPatterns.forEach(term => {
    if (cleanText.includes(term)) {
      multiMatches.push({ term, count: 3 }); // boost weight
    }
  });

  const sortedTokens = Object.keys(freqMap)
    .sort((a, b) => freqMap[b] - freqMap[a])
    .slice(0, 35)
    .map(term => ({ term, count: freqMap[term] }));

  // Deduplicate and combine
  const seen = new Set();
  const result = [];

  [...multiMatches, ...sortedTokens].forEach(item => {
    if (!seen.has(item.term)) {
      seen.add(item.term);
      result.push(item);
    }
  });

  return result.slice(0, 25);
}

/**
 * Master ATS Resume Analyzer
 * Evaluates the resume text, scores it (0-100), itemizes deductions, and provides score boosters.
 */
export function analyzeResumeATS(resumeText, jobDescription = "") {
  if (!resumeText || resumeText.trim().length === 0) {
    return null;
  }

  const rawLower = resumeText.toLowerCase();
  const words = resumeText.trim().split(/\s+/);
  const wordCount = words.length;

  const deductions = [];
  const scoreBoosters = [];

  // ==========================================
  // PILLAR 1: CONTACT & HEADER INFORMATION (Max 15 pts)
  // ==========================================
  let contactScore = 15;
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9-_]+|linkedin/i.test(resumeText);
  const hasGitHubOrPortfolio = /github\.com|gitlab\.com|portfolio|[a-z0-9]+\.(io|dev|me|com)/i.test(resumeText);
  const hasLocation = /[A-Z][a-zA-Z\s]+,\s*[A-Z]{2}|remote|united states|india|canada|uk|germany|singapore/i.test(resumeText);

  if (!hasEmail) {
    contactScore -= 6;
    deductions.push({
      category: "Contact Info",
      points: -6,
      reason: "Missing Contact Email: ATS parsers require an explicit, standard email address to create applicant profiles in HR systems.",
      fix: "Place a professional email address (e.g. name.surname@gmail.com) at the top of your resume."
    });
  }

  if (!hasPhone) {
    contactScore -= 4;
    deductions.push({
      category: "Contact Info",
      points: -4,
      reason: "Missing Phone Number: Automated SMS/Phone screeners cannot index your contact record.",
      fix: "Include a formatted telephone number with country code (e.g. +1 (555) 019-2834)."
    });
  }

  if (!hasLinkedIn && !hasGitHubOrPortfolio) {
    contactScore -= 5;
    deductions.push({
      category: "Contact Info",
      points: -5,
      reason: "Missing LinkedIn or Verified Professional URL: 94% of Fortune 500 ATS platforms prioritize candidates with verified external credentials.",
      fix: "Add your customized LinkedIn profile link (e.g. linkedin.com/in/yourname) in the header."
    });
  }

  contactScore = Math.max(0, contactScore);

  // ==========================================
  // PILLAR 2: ATS SECTION ARCHITECTURE (Max 15 pts)
  // ==========================================
  let sectionScore = 15;
  const missingSections = [];

  const hasSummary = SECTION_HEADERS.summary.some(h => rawLower.includes(h));
  const hasExperience = SECTION_HEADERS.experience.some(h => rawLower.includes(h));
  const hasEducation = SECTION_HEADERS.education.some(h => rawLower.includes(h));
  const hasSkills = SECTION_HEADERS.skills.some(h => rawLower.includes(h));

  if (!hasExperience) {
    sectionScore -= 6;
    missingSections.push("Experience / Work History");
    deductions.push({
      category: "Section Structure",
      points: -6,
      reason: "Non-Standard or Missing Experience Section Header: ATS engines look for 'Work Experience' or 'Professional Experience' to construct chronological timelines.",
      fix: "Use standard header: 'Work Experience' or 'Professional Experience'."
    });
  }

  if (!hasSkills) {
    sectionScore -= 4;
    missingSections.push("Skills / Technical Competencies");
    deductions.push({
      category: "Section Structure",
      points: -4,
      reason: "Missing Dedicated 'Skills' Section: ATS scrapers extract core competencies directly from a labeled 'Skills' or 'Technical Skills' section.",
      fix: "Add a categorized 'Skills' section (e.g. Core Languages, Frameworks, Tools, Leadership)."
    });
  }

  if (!hasEducation) {
    sectionScore -= 3;
    missingSections.push("Education");
    deductions.push({
      category: "Section Structure",
      points: -3,
      reason: "Missing Education Section: Automatic compliance filters check for degree credentials (B.S., M.S., B.Tech, etc.).",
      fix: "Add standard 'Education' header with Degree, Institution, and Graduation Year."
    });
  }

  if (!hasSummary) {
    sectionScore -= 2;
    deductions.push({
      category: "Section Structure",
      points: -2,
      reason: "Missing Executive Summary / Profile: Modern parsers extract your high-level title and years of domain expertise from the summary.",
      fix: "Include a 2-3 line 'Executive Summary' stating your role, primary domain, and quantifiable impact."
    });
  }

  sectionScore = Math.max(0, sectionScore);

  // ==========================================
  // PILLAR 3: QUANTIFICATION & GOOGLE XYZ METRICS (Max 25 pts)
  // ==========================================
  let quantificationScore = 25;

  // Extract bullet points (lines starting with -, •, *, or numbers)
  const lines = resumeText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const bulletLines = lines.filter(l => /^[-•*–—]|\d+\.\s/i.test(l) || (l.length > 35 && l.length < 220));
  const totalBullets = Math.max(bulletLines.length, 1);

  // Match numbers, %, $, multipliers (2x, 10x), currency, metric indicators
  const metricRegex = /\b\d+(\.\d+)?%|\$\d+([kmb])?|\b\d+x\b|\b\d{1,3}(,\d{3})+|\b(reduced|increased|scaled|improved|boosted|cut|generated|saved)\b.*?\b\d+/i;
  const quantifiedBullets = bulletLines.filter(bullet => metricRegex.test(bullet));
  const quantificationRatio = Math.round((quantifiedBullets.length / totalBullets) * 100);

  if (quantificationRatio < 15) {
    quantificationScore -= 18;
    deductions.push({
      category: "Impact & Metrics",
      points: -18,
      reason: `Severe Lack of Measurable Metrics (Only ${quantificationRatio}% of bullets contain numbers): Executive recruiters and ATS algorithms rank unquantified bullets as low-substance.`,
      fix: "Apply Google's XYZ Formula to at least 40% of bullets: 'Accomplished [X] as measured by [Y] by doing [Z]' (e.g. 'Accelerated build velocity by 42% by automating Docker deployment pipelines')."
    });
  } else if (quantificationRatio < 35) {
    quantificationScore -= 9;
    deductions.push({
      category: "Impact & Metrics",
      points: -9,
      reason: `Sub-Optimal Quantification (${quantificationRatio}% of bullets quantified): Top 5% resumes achieve over 40% metric density.`,
      fix: "Add concrete numbers ($, %, hours saved, latency reduced, revenue generated) to at least 3 more bullets."
    });
  }

  quantificationScore = Math.max(0, quantificationScore);

  // ==========================================
  // PILLAR 4: ACTION VERBS & CLICHÉ ELIMINATION (Max 20 pts)
  // ==========================================
  let actionScore = 20;

  // Check sovereign action verbs
  const foundSovereignVerbs = SOVEREIGN_ACTION_VERBS.filter(verb => {
    const reg = new RegExp(`\\b${verb}\\b`, 'i');
    return reg.test(rawLower);
  });

  // Check weak / passive phrases
  const foundWeakPhrases = WEAK_PASSIVE_PHRASES.filter(phrase => rawLower.includes(phrase));

  // Check clichés
  const foundCliches = CLICHE_BUZZWORDS.filter(cliche => rawLower.includes(cliche));

  if (foundSovereignVerbs.length < 3) {
    actionScore -= 7;
    deductions.push({
      category: "Action Verbs",
      points: -7,
      reason: `Low Executive Action Verb Density (Only ${foundSovereignVerbs.length} power verbs found): Resumes lacking strong leadership verbs read passively to ATS parsers.`,
      fix: "Begin every single experience bullet with a commanding past-tense verb: 'Spearheaded', 'Architected', 'Orchestrated', 'Optimized', 'Negotiated'."
    });
  }

  if (foundWeakPhrases.length > 0) {
    const penalty = Math.min(8, foundWeakPhrases.length * 3);
    actionScore -= penalty;
    deductions.push({
      category: "Passive Phrasing",
      points: -penalty,
      reason: `Found ${foundWeakPhrases.length} Passive/Subordinate Phrases: (${foundWeakPhrases.slice(0, 3).map(p => `"${p}"`).join(', ')}). ATS penalty applied for passive responsibility framing.`,
      fix: "Replace 'Responsible for [X]' with 'Delivered [X]' or 'Architected [X]'."
    });
  }

  if (foundCliches.length > 0) {
    const penalty = Math.min(5, foundCliches.length * 2);
    actionScore -= penalty;
    deductions.push({
      category: "Clichés & Fluff",
      points: -penalty,
      reason: `Found ${foundCliches.length} Empty Corporate Buzzwords: (${foundCliches.slice(0, 3).map(c => `"${c}"`).join(', ')}). Recruiters and ATS discount these as unsubstantiated fluff.`,
      fix: "Replace generic claims like 'hard worker' or 'team player' with empirical metrics showing teamwork impact."
    });
  }

  actionScore = Math.max(0, actionScore);

  // ==========================================
  // PILLAR 5: KEYWORD RELEVANCE & MATCH (Max 25 pts)
  // ==========================================
  let keywordScore = 25;
  const isWithJD = Boolean(jobDescription && jobDescription.trim().length > 25);
  let matchedKeywords = [];
  let missingKeywords = [];
  let jdKeywordsList = [];

  if (isWithJD) {
    jdKeywordsList = extractKeywordsFromJD(jobDescription);
    const targetCount = Math.min(jdKeywordsList.length, 15);

    jdKeywordsList.slice(0, targetCount).forEach(kw => {
      const reg = new RegExp(`\\b${kw.term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (reg.test(rawLower)) {
        matchedKeywords.push(kw.term);
      } else {
        missingKeywords.push(kw.term);
      }
    });

    const matchPercent = targetCount > 0 ? Math.round((matchedKeywords.length / targetCount) * 100) : 100;

    if (matchPercent < 40) {
      keywordScore = Math.round((matchPercent / 100) * 25);
      deductions.push({
        category: "Target Keyword Match (With JD)",
        points: -(25 - keywordScore),
        reason: `Low Match Rate Against Job Description (${matchPercent}% match): Missing ${missingKeywords.length} core keywords specified in the target JD.`,
        fix: `Strategically weave these missing keywords into your Skills or Experience bullets: ${missingKeywords.slice(0, 6).join(', ')}.`
      });
    } else if (matchPercent < 75) {
      keywordScore = Math.round((matchPercent / 100) * 25);
      deductions.push({
        category: "Target Keyword Match (With JD)",
        points: -(25 - keywordScore),
        reason: `Moderate Keyword Alignment (${matchPercent}% match): Missing ${missingKeywords.length} secondary qualifications from the job description.`,
        fix: `Integrate key remaining tools: ${missingKeywords.slice(0, 4).join(', ')}.`
      });
    }
  } else {
    // WITHOUT JOB DESCRIPTION: GENERAL ATS INDUSTRY HYGIENE
    // 1. Length & word count check (Optimal: 450 - 950 words)
    if (wordCount < 300) {
      keywordScore -= 10;
      deductions.push({
        category: "Content Depth (Without JD)",
        points: -10,
        reason: `Under-length Resume (${wordCount} words): ATS flags profiles under 350 words as thin or junior. Standard 1-page resume contains 450–700 words.`,
        fix: "Expand bullet points with technical scope, architectural tools used, and business outcomes."
      });
    } else if (wordCount > 1300) {
      keywordScore -= 6;
      deductions.push({
        category: "Content Length (Without JD)",
        points: -6,
        reason: `Excessive Length (${wordCount} words): Unless you have 15+ years executive experience, ATS and recruiters heavily penalize rambling 3+ page documents.`,
        fix: "Trim pre-2015 roles, consolidate redundant bullets, and keep total word count under 1,000 words."
      });
    }

    // 2. Executive vocabulary check
    const executiveTermsFound = SOVEREIGN_ACTION_VERBS.filter(v => rawLower.includes(v)).length;
    if (executiveTermsFound < 5) {
      keywordScore -= 5;
      deductions.push({
        category: "Executive Polish (Without JD)",
        points: -5,
        reason: "Low High-Status Diction Density: Fortune 500 ATS systems look for enterprise terminology (e.g. cross-functional, architecture, governance, ROI).",
        fix: "Incorporate high-yield strategic vocabulary from our Executive Lexicon."
      });
    }
  }

  keywordScore = Math.max(0, keywordScore);

  // ==========================================
  // FINAL SCORE AGGREGATION (0 - 100)
  // ==========================================
  const totalScore = Math.max(12, Math.min(99, Math.round(
    contactScore + sectionScore + quantificationScore + actionScore + keywordScore
  )));

  // GENERATE ACTIONABLE SCORE BOOSTER PLAYBOOK
  if (isWithJD) {
    if (missingKeywords.length > 0) {
      scoreBoosters.push({
        priority: "CRITICAL",
        gainPoints: `+${Math.min(18, missingKeywords.length * 3)} pts`,
        title: "Integrate Missing Core Job Description Keywords",
        instruction: `ATS scanners prioritize exact-match keywords from the job description. Weave the following into your 'Skills' or project accomplishments: ${missingKeywords.slice(0, 8).join(', ')}.`
      });
    }
    scoreBoosters.push({
      priority: "HIGH",
      gainPoints: "+12 pts",
      title: "Align Resume Headline with Exact Job Title",
      instruction: "Mirror the exact title in the JD (e.g. 'Senior Full Stack Engineer' or 'Director of Product') in your Executive Profile header."
    });
  } else {
    scoreBoosters.push({
      priority: "CRITICAL",
      gainPoints: "+15 pts",
      title: "Apply Google XYZ Formula across All Experience Bullets",
      instruction: "Rewrite bullets using the formula: 'Accomplished [X] as measured by [Y] by doing [Z]'. Ensure at least 40% of all bullets feature numbers, %, $, or timelines."
    });
    scoreBoosters.push({
      priority: "HIGH",
      gainPoints: "+10 pts",
      title: "Purge All Passive & Subordinate Phrasing",
      instruction: "Search your document for 'responsible for' or 'helped with' and replace with high-status verbs: 'Orchestrated', 'Architected', 'Spearheaded', 'Optimized'."
    });
  }

  scoreBoosters.push({
    priority: "MEDIUM",
    gainPoints: "+8 pts",
    title: "Ensure Clean Single-Column ATS Layout",
    instruction: "Avoid 2-column tables, textboxes, progress bars, or header icons that break older Taleo and Workday OCR parsing pipelines."
  });

  return {
    totalScore,
    isWithJD,
    wordCount,
    quantificationRatio,
    totalBullets,
    quantifiedBulletsCount: quantifiedBullets.length,
    contactInfo: {
      hasEmail,
      hasPhone,
      hasLinkedIn,
      hasGitHubOrPortfolio,
      hasLocation,
      score: contactScore
    },
    sectionHealth: {
      hasSummary,
      hasExperience,
      hasEducation,
      hasSkills,
      missingSections,
      score: sectionScore
    },
    languageHealth: {
      foundSovereignVerbs,
      foundWeakPhrases,
      foundCliches,
      score: actionScore
    },
    quantificationHealth: {
      quantificationRatio,
      score: quantificationScore
    },
    keywordHealth: {
      isWithJD,
      matchedKeywords,
      missingKeywords,
      score: keywordScore
    },
    deductions,
    scoreBoosters
  };
}

// SAMPLE RESUMES FOR INSTANT TESTING
export const SAMPLE_RESUMES = {
  weakSubordinate: `Alex Smith
Junior / Mid Developer
alexsmith_personal@gmail.com

SUMMARY
Hard worker and dedicated team player looking for a challenging role in a dynamic company where I can wear many hats and help out the team. Fast learner with good communication skills.

WORK EXPERIENCE
Developer - ABC Tech Solutions (2022 - Present)
- Responsible for fixing bugs in the web application using JavaScript.
- Helped with the database migration project.
- Duties included attending daily scrum meetings and assisting senior developers with testing.
- Worked on customer support tickets when asked.
- Tasked with updating documentation for the team.

Junior Web Developer - Small Business Media (2020 - 2022)
- Was responsible for building WordPress sites for local clients.
- Helped maintain CSS and HTML templates.
- Involved in various marketing tasks and social media graphics.
- Did whatever the manager asked me to do each week.

EDUCATION
State University - Bachelor of Science in Computer Science (2020)

SKILLS
HTML, CSS, JavaScript, Hard Worker, Team Player, Time Management, Detail-Oriented.`,

  sovereignExecutive: `JASWANTH V.
Senior Full Stack Engineer & Cloud Architect
San Francisco, CA • +1 (555) 019-2834 • jaswanth.eng@gmail.com
linkedin.com/in/jaswanth-tech • github.com/jaswanth-dev

EXECUTIVE PROFILE
High-velocity Full Stack & Cloud Architect with 6+ years orchestrating distributed microservices and enterprise SaaS platforms. Generated $2.4M in annual compute savings by re-architecting legacy infrastructure into serverless event-driven systems while sustaining 99.99% uptime for 450,000+ daily active users.

WORK EXPERIENCE
Lead Systems Engineer | Nexus Enterprise Cloud (2022 - Present)
- Architected and deployed multi-region Kubernetes cluster running on AWS EKS, accelerating deployment velocity by 48% and eliminating 12 hours of weekly manual release overhead.
- Engineered asynchronous GraphQL and Node.js microservices processing 18,000 requests/sec with P99 latency reduced from 420ms to 85ms.
- Spearheaded zero-downtime database migration of 4.2TB PostgreSQL dataset, preserving continuous customer uptime and recovering $380,000 in retained ARR.
- Mentored a squad of 8 software engineers, instituting rigorous CI/CD test automation coverage from 61% to 94%.

Senior Full Stack Software Engineer | Apex Digital Corp (2019 - 2022)
- Overhauled core React/TypeScript client-side state architecture, boosting Google Core Web Vitals score by 35 points and reducing bounce rate by 22%.
- Formulated automated fraud-detection pipeline utilizing Python and Redis caching, preventing an estimated $1.2M in annual payment slippage.
- Negotiated third-party SaaS vendor contracts, cutting cloud infrastructure burn by $145,000 annually.

TECHNICAL COMPETENCIES
- Core Languages: TypeScript, JavaScript, Python, Go, SQL
- Frontend & State: React 19, Next.js, Redux Toolkit, Tailwind CSS
- Backend & Cloud: Node.js, Express, GraphQL, PostgreSQL, Redis, AWS (EKS, Lambda, S3, RDS), Docker, Kubernetes
- DevOps & Tools: CI/CD (GitHub Actions), Terraform, Datadog, Jest, Vitest

EDUCATION & CERTIFICATIONS
- B.S. in Computer Science & Engineering | University of Technology (Honors)
- AWS Certified Solutions Architect - Professional (SAP-C02)`,

  sampleJobDescription: `We are looking for a Senior Full Stack Engineer & Cloud Architect with strong hands-on experience in React, TypeScript, Node.js, and Python. 
The ideal candidate has proven expertise in Kubernetes, AWS cloud computing (EKS, Lambda), microservices, Docker, and CI/CD pipelines. 
You will spearhead architectural improvements, optimize high-traffic PostgreSQL and Redis databases, and lead cross-functional engineering initiatives with measured performance metrics.`
};
