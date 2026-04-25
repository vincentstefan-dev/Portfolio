// app/data/ctaWords.ts

// Not_FOUND_WORD_BANK.ts
export const NOT_FOUND_BANKS = {
clean: [
    "We are working on this page",
    "This page is under construction",
    "Content coming soon",
    "Still in progress",
    "This section is not ready yet",
    "Work in progress",
    "Building this right now",
    "Page not available yet",
    "Currently being developed",
    "Check back shortly",
  ],

  system: [
    "Compiling page...",
    "Initializing content module...",
    "Boot sequence incomplete",
    "Rendering in progress...",
    "Module under construction",
    "Endpoint not deployed",
    "System update in progress",
    "Page instance not found",
    "Loading assets...",
    "Pipeline still running",
  ],

  experiential: [
    "We’re building something here",
    "This space is evolving",
    "Still shaping this experience",
    "Not ready yet, but worth the wait",
    "This page is taking form",
    "We’re crafting something interesting",
    "This part of the journey isn’t ready",
    "Work is happening behind the scenes",
    "Something is being built here",
    "This node is still growing",
  ],

  playful: [
    "As seen on TikTok", "Limited edition!", "Best in class!",
    "Made in Germany!" ,"Mobile compatible!", "v1nc3n7",
    "90% bug free!", "Legal in Guatemala!", "Wolfram cellular automata!",
    "Web 2.0 was better.", "Frutiger Aereo", "Cats love it!", "My mom loves it!",
    "MISHI FOREVER🐈", "Buttermilch", "(≽^•˕•^≼)", "I am a potato 🥔", "Former Nigerian Prince",
    "Thyplosion", "Vegan", "Gluten-free", "Keto-friendly", "Paleo-approved", "Low-carb", "High-protein",
    "Do you want to join my server?", "Very influential in its circle!", "	/give @a hugs 64", "Look mum, I made a company!", 
    "A.I scaffolding", "My family owns a farm!", "TUCANS!!!", "Home-made", "Technoblade never dies!", "Piplup", "Protec but also attack",
     "I dont have a degree in this!", "PHD in weirdness", "	Cat tested, Human approved!", "Microsoft Encarta", "Ask your doctor if this is right for you!",
    "Oops, not ready yet 👀", "This page is cooking 🍳", "Still building this one 🛠️",
    "Under construction, hard hat required 🦺", "Nothing here… yet", "Come back later, seriously",
    "We forgot to finish this 😅", "This page is shy", "Loading… forever?", "Trust the process",
    "404: effort still loading", "This page exists only in theory", "Under construction since the beginning of time",
  ],
    

  emojis: [
    "🚧", "🛠️", "⏳", "👷", "⚙️", "📡", "🔄", "🧪", "🧱",
  ],

  superrare:
  [
  "§1C§2o§3l§4o§5r§6m§7a§8t§9i§ac",
  ]
};

export type CtaBankKey = keyof typeof NOT_FOUND_BANKS;

const WEIGHTS: Record<CtaBankKey, number> = {
  clean: 0.50,
  experiential: 0.50,
  system: 0.50,
  playful: 0.60,
  emojis: 0.30,
  superrare: 0.10,
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
  return pickRandomWord(NOT_FOUND_BANKS[bank]);
}

// default export (what homepage uses)
export const NOT_FOUND_BANK = NOT_FOUND_BANKS.system;