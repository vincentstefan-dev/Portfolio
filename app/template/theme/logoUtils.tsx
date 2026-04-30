import { LOGO_BANK } from "@/app/template/theme/LOGO_BANK";

export function pickWeightedLogo() {
  const total = LOGO_BANK.reduce((sum, logo) => sum + (logo.weight ?? 1), 0);
  let random = Math.random() * total;

  for (const logo of LOGO_BANK) {
    random -= logo.weight ?? 1;
    if (random <= 0) return logo;
  }

  return LOGO_BANK[0];
}