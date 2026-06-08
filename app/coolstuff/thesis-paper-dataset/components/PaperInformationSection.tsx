// app/coolstuff/thesis-paper-dataset/components/PaperInformationSection.tsx

import type { Theme } from "../config/theme";
import type { CollapsedSections, Paper } from "../types/paper";
import CollapsibleSection from "./CollapsibleSection";
import Textarea from "./Textarea";
import { arrayToText, textToArray } from "../utils/arrayText";

type PaperInformationSectionProps = {
  selectedPaper: Paper;
  collapsedSections: CollapsedSections;
  isDark: boolean;
  theme: Theme;
  onToggle: () => void;
  onUpdatePaper: <K extends keyof Paper>(key: K, value: Paper[K]) => void;
};

export default function PaperInformationSection({
  selectedPaper,
  collapsedSections,
  isDark,
  theme,
  onToggle,
  onUpdatePaper,
}: PaperInformationSectionProps) {
  return (
    <CollapsibleSection
      title="PAPER INFORMATION"
      isCollapsed={collapsedSections.paperInfo}
      isDark={isDark}
      cardClassName={theme.card}
      onToggle={onToggle}
    >
      <div className="grid gap-4">
        <Textarea
          label="Abstract"
          value={selectedPaper.abstract}
          isDark={isDark}
          rows={8}
          wide
          onChange={(value) => onUpdatePaper("abstract", value)}
        />

        <Textarea
          label="Introduction"
          value={selectedPaper.introduction}
          isDark={isDark}
          rows={12}
          wide
          onChange={(value) => onUpdatePaper("introduction", value)}
        />

        <Textarea
          label="Introduction key points, separated by commas"
          value={arrayToText(selectedPaper.introduction_key_points)}
          isDark={isDark}
          rows={4}
          wide
          onChange={(value) =>
            onUpdatePaper("introduction_key_points", textToArray(value))
          }
        />
      </div>
    </CollapsibleSection>
  );
}