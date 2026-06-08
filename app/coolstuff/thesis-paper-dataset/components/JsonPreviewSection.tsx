// app/coolstuff/thesis-paper-dataset/components/JsonPreviewSection.tsx

import type { Theme } from "../config/theme";
import type { CollapsedSections, Paper } from "../types/paper";
import { getDecision, weights } from "../utils/scoring";
import CollapsibleSection from "./CollapsibleSection";

type JsonPreviewSectionProps = {
  selectedPaper: Paper;
  collapsedSections: CollapsedSections;
  isDark: boolean;
  theme: Theme;
  liveScore: number;
  liveCategory: string;
  onToggle: () => void;
};

export default function JsonPreviewSection({
  selectedPaper,
  collapsedSections,
  isDark,
  theme,
  liveScore,
  liveCategory,
  onToggle,
}: JsonPreviewSectionProps) {
  return (
    <CollapsibleSection
      title="Live JSON preview"
      isCollapsed={collapsedSections.jsonPreview}
      isDark={isDark}
      cardClassName={theme.card}
      onToggle={onToggle}
    >
      <pre
        className={`max-h-[500px] overflow-auto rounded-xl p-4 text-xs ${theme.jsonPreview}`}
      >
        {JSON.stringify(
          {
            ...selectedPaper,
            weighted_score_0_5: liveScore,
            selection_category: liveCategory,
            selection_decision: getDecision(liveCategory),
            weights,
          },
          null,
          2
        )}
      </pre>
    </CollapsibleSection>
  );
}