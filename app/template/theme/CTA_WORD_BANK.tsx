// app/data/ctaWords.ts

// CTA_WORD_BANK.ts
export const CTA_BANKS = {
  clean: [
    "Explore", "Begin", "Enter", "Continue", "Start here",
    "Discover", "Open", "Proceed", "View", "Access",
    "Take a look", "Step inside", "Nice to meet you!",
  ],

  system: [
    "Select a path", "Enter system", "Initialize", "Choose a node",
    "Boot sequence", "Execute", "Run protocol", "Load interface",
    "Access module", "Engage system", "Deploy", "Start process",
  ],

  experiential: [
    "Step in", "Move forward", "Explore",
    "Follow the Node", "Go deeper", "Portfolio",
    "Lets go", "Wander",
  ],

  playful: [
    "As seen on TikTok", "Limited edition!", "Best in class!",
    "Made in Germany!" ,"Mobile compatible!", "v1nc3n7",
    "90% bug free!", "Legal in Guatemala!", "Wolfram cellular automata!",
    "Web 2.0 was better.", "Frutiger Aereo", "Cats love it!", "My mom loves it!",
    "MISHI FOREVER🐈",
    

  ],
  emojis: [
    "❤️", "✨", "🚀", "🔥", "💻", "🎉", "👾", "🛸", "🌌",
  ]
};

export type CtaBankKey = keyof typeof CTA_BANKS;

const WEIGHTS: Record<CtaBankKey, number> = {
  clean: 0.0,
  experiential: 0.0,
  system: 0.0,
  playful: 0.99,
  emojis: 0.0,
};

function pickWeightedBank(): CtaBankKey {
  const rand = Math.random();
  let cumulative = 0;

  for (const key of Object.keys(WEIGHTS) as CtaBankKey[]) {
    cumulative += WEIGHTS[key];
    if (rand <= cumulative) {
      return key;
    }
  }

  return "clean";
}

function pickRandomWord(words: readonly string[]) {
  return words[Math.floor(Math.random() * words.length)];
}

export function getCTA(): string {
  const bank = pickWeightedBank();
  return pickRandomWord(CTA_BANKS[bank]);
}

// default export (what homepage uses)
export const CTA_WORD_BANK = CTA_BANKS.system;