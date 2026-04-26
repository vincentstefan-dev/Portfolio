// app/data/ctaWords.ts

// CTA_WORD_BANK.ts
export const CTA_BANKS = {
  clean: [
    "Explore", "Begin", "Enter", "Continue", "Start here",
    "Discover", "Open", "Proceed", "View", "Access",
    "Take a look", "Step inside", "Nice to meet you!","Awesome web design right here!",
  ],

  system: [
    "Select a path", "Enter system", "Initialize", "Choose a node",
    "Boot sequence", "Execute", "Run protocol", "Load interface",
    "Access module", "Engage system", "Deploy", "Start process",
  ],

  experiential: [
    "Step in", "Move forward", "Explore",
    "Follow the Node", "Go deeper", "Portfolio",
    "Lets go", "Wander", "Treatment for your company!", "I have a suggestion.",
     "I have a business idea!", "I have a startup idea!", "I have a web3 startup idea!",
     "In case it isn't obvious, we make cool stuff", "Support local businesses!",
     "This is a Call To Action!", "This is a CTA!", "HIRE ME", "Version 2.0", "Check out my work!", 
     "Check out my portfolio!", "Check out my projects!", "Check out my github!", "Check out my linkedin!",
     "We're working on it!", "We're building something cool!", "We're building something awesome!", "I have a masters in this!",
     "Get smarter!", "All paths lead to learning.",

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
    
    

  ],
  emojis: [
    "❤️", "✨", "🚀", "🔥", "💻", "🎉", "👾", "🛸", "🌌",
  ],

  superrare:
  [
  "§1C§2o§3l§4o§5r§6m§7a§8t§9i§ac",
  ],

  images: [
  "imag"
  ],

};

export type CtaBankKey = keyof typeof CTA_BANKS;

const WEIGHTS: Record<CtaBankKey, number> = {
  clean: 0.50,
  experiential: 0.50,
  system: 0.50,
  playful: 0.60,
  emojis: 0.30,
  superrare: 0.10,
  images: 0.10,
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

export function getCTA() {
  const bank = pickWeightedBank();
  const value = pickRandomWord(CTA_BANKS[bank]);

  return {
    value,
    type: bank === "images" ? "image" : "text",
  };
}

// default export (what homepage uses)
export const CTA_WORD_BANK = CTA_BANKS.system;