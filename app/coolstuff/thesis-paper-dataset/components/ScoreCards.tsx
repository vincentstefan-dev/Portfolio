// app/coolstuff/thesis-paper-dataset/components/ScoreCards.tsx

import type { Theme } from "../config/theme";
import { getDecision } from "../utils/scoring";

type ScoreCardsProps = {
  liveScore: number;
  liveCategory: string;
  theme: Theme;
};

export default function ScoreCards({
  liveScore,
  liveCategory,
  theme,
}: ScoreCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className={`rounded-2xl border p-5 ${theme.card}`}>
        <p className={`text-sm ${theme.mutedText}`}>Weighted score</p>
        <p className="mt-2 text-4xl font-semibold">{liveScore} / 5</p>
      </div>

      <div className={`rounded-2xl border p-5 ${theme.card}`}>
        <p className={`text-sm ${theme.mutedText}`}>Category</p>
        <p className="mt-2 text-2xl font-semibold">{liveCategory}</p>
      </div>

      <div className={`rounded-2xl border p-5 ${theme.card}`}>
        <p className={`text-sm ${theme.mutedText}`}>Decision</p>
        <p className="mt-2 text-sm">{getDecision(liveCategory)}</p>
      </div>
    </div>
  );
}