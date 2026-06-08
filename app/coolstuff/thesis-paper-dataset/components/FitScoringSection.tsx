// app/coolstuff/thesis-paper-dataset/components/FitScoringSection.tsx

import type { Theme } from "../config/theme";
import type { CollapsedSections, FitScores, Paper } from "../types/paper";
import { weights } from "../utils/scoring";
import CollapsibleSection from "./CollapsibleSection";
import ScoreInput from "./ScoreInput";

type FitScoringSectionProps = {
  selectedPaper: Paper;
  collapsedSections: CollapsedSections;
  isDark: boolean;
  theme: Theme;
  onToggle: () => void;
  onUpdateScore: (key: keyof FitScores, value: number) => void;
};

export default function FitScoringSection({
  selectedPaper,
  collapsedSections,
  isDark,
  theme,
  onToggle,
  onUpdateScore,
}: FitScoringSectionProps) {
  return (
    <CollapsibleSection
      title="Fit scoring"
      isCollapsed={collapsedSections.fitScoring}
      isDark={isDark}
      cardClassName={theme.card}
      onToggle={onToggle}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(selectedPaper.fit_scores).map(([key, value]) => (
          <ScoreInput
            key={key}
            label={key}
            value={value}
            weight={weights[key as keyof FitScores]}
            isDark={isDark}
            onChange={(nextValue) =>
              onUpdateScore(key as keyof FitScores, nextValue)
            }
          />
        ))}
      </div>
    </CollapsibleSection>
  );
}