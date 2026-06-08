// app/coolstuff/thesis-paper-dataset/components/PaperDataSection.tsx

import type { Theme } from "../config/theme";
import type {
  CollapsedSections,
  ManualRelevanceLabel,
  ManualReviewStatus,
  Paper,
} from "../types/paper";
import CollapsibleSection from "./CollapsibleSection";
import Input from "./Input";
import Textarea from "./Textarea";
import { arrayToText, textToArray } from "../utils/arrayText";

type PaperDataSectionProps = {
  selectedPaper: Paper;
  collapsedSections: CollapsedSections;
  isDark: boolean;
  theme: Theme;
  onToggle: () => void;
  onUpdatePaper: <K extends keyof Paper>(key: K, value: Paper[K]) => void;
  onUpdatePaperId: (nextId: string) => void;
  onDeleteSelectedPaper: () => void;
};

export default function PaperDataSection({
  selectedPaper,
  collapsedSections,
  isDark,
  theme,
  onToggle,
  onUpdatePaper,
  onUpdatePaperId,
  onDeleteSelectedPaper,
}: PaperDataSectionProps) {
  const selectClassName = `w-full rounded-xl border px-3 py-2 text-sm outline-none transition ${
    isDark
      ? "border-white/10 bg-white/5 text-white focus:border-white/30"
      : "border-slate-200 bg-white text-slate-950 focus:border-slate-400"
  }`;

  return (
    <CollapsibleSection
      title="Paper data"
      isCollapsed={collapsedSections.paperData}
      isDark={isDark}
      cardClassName={theme.card}
      onToggle={onToggle}
      action={
        <button
          onClick={onDeleteSelectedPaper}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${theme.dangerButton}`}
        >
          Delete selected paper
        </button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className={`rounded-2xl border p-4 md:col-span-2 ${
            isDark
              ? "border-white/10 bg-white/[0.03]"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-slate-950"
                }`}
              >
                Manual screening status
              </h3>
              <p
                className={`mt-1 text-xs ${
                  isDark ? "text-white/55" : "text-slate-500"
                }`}
              >
                Use this to hide papers you have already reviewed without
                deleting them from the database.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextActive = selectedPaper.active_screening === false;

                onUpdatePaper("active_screening", nextActive);

                if (nextActive) {
                  onUpdatePaper("manual_review_status", "unchecked");
                  onUpdatePaper("manual_relevance_label", null);
                } else {
                  onUpdatePaper("manual_review_status", "checked");
                }
              }}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                selectedPaper.active_screening === false
                  ? theme.secondaryButton
                  : theme.primaryButton
              }`}
            >
              {selectedPaper.active_screening === false
                ? "Return to screening"
                : "Mark as checked"}
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span
                className={isDark ? "text-white/70" : "text-slate-600"}
              >
                Review status
              </span>
              <select
                className={selectClassName}
                value={selectedPaper.manual_review_status ?? "unchecked"}
                onChange={(event) =>
                  onUpdatePaper(
                    "manual_review_status",
                    event.target.value as ManualReviewStatus
                  )
                }
              >
                <option value="unchecked">Unchecked</option>
                <option value="checked">Checked</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span
                className={isDark ? "text-white/70" : "text-slate-600"}
              >
                Manual relevance
              </span>
              <select
                className={selectClassName}
                value={selectedPaper.manual_relevance_label ?? ""}
                onChange={(event) => {
                  const value = event.target.value;

                  onUpdatePaper(
                    "manual_relevance_label",
                    value === "" ? null : (value as ManualRelevanceLabel)
                  );
                }}
              >
                <option value="">No label</option>
                <option value="core">Core</option>
                <option value="semi">Semi</option>
                <option value="not_relevant">Not relevant</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm">
              <span
                className={isDark ? "text-white/70" : "text-slate-600"}
              >
                Active screening
              </span>
              <select
                className={selectClassName}
                value={
                  selectedPaper.active_screening === false ? "false" : "true"
                }
                onChange={(event) =>
                  onUpdatePaper(
                    "active_screening",
                    event.target.value === "true"
                  )
                }
              >
                <option value="true">Show in active screening</option>
                <option value="false">Hide from active screening</option>
              </select>
            </label>

            <div className="md:col-span-3">
              <Textarea
                label="Review notes"
                value={selectedPaper.review_notes ?? ""}
                isDark={isDark}
                onChange={(value) => onUpdatePaper("review_notes", value)}
              />
            </div>
          </div>
        </div>

        <Input
          label="Paper ID"
          value={selectedPaper.paper_id}
          isDark={isDark}
          onChange={onUpdatePaperId}
        />

        <Input
          label="Year"
          type="number"
          value={selectedPaper.year}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("year", value === "" ? "" : Number(value))
          }
        />

        <Input
          label="Title"
          value={selectedPaper.title}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("title", value)}
          wide
        />

        <Input
          label="Authors, separated by commas"
          value={arrayToText(selectedPaper.authors)}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("authors", textToArray(value))}
          wide
        />

        <Input
          label="Journal"
          value={selectedPaper.journal}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("journal", value)}
        />

        <Input
          label="DOI"
          value={selectedPaper.doi}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("doi", value)}
        />

        <Input
          label="URL"
          value={selectedPaper.url}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("url", value)}
          wide
        />

        <Input
          label="Paper role"
          value={selectedPaper.paper_role}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("paper_role", value)}
        />

        <Input
          label="Paper type"
          value={selectedPaper.paper_type}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("paper_type", value)}
        />

        <Input
          label="Method"
          value={selectedPaper.method}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("method", value)}
        />

        <Input
          label="Sample or data"
          value={selectedPaper.sample_or_data}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("sample_or_data", value)}
        />

        <Textarea
          label="Context"
          value={selectedPaper.context}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("context", value)}
        />

        <Textarea
          label="Main topic"
          value={selectedPaper.main_topic}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("main_topic", value)}
        />

        <Textarea
          label="Research question or purpose"
          value={selectedPaper.research_question_or_purpose}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("research_question_or_purpose", value)
          }
        />

        <Textarea
          label="Key findings"
          value={selectedPaper.key_findings}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("key_findings", value)}
        />

        <Input
          label="Theories or concepts, separated by commas"
          value={arrayToText(selectedPaper.theories_or_concepts)}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("theories_or_concepts", textToArray(value))
          }
          wide
        />

        <Input
          label="Independent variables, separated by commas"
          value={arrayToText(selectedPaper.independent_variables)}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("independent_variables", textToArray(value))
          }
          wide
        />

        <Input
          label="Dependent variables, separated by commas"
          value={arrayToText(selectedPaper.dependent_variables)}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("dependent_variables", textToArray(value))
          }
          wide
        />

        <Input
          label="Moderators / mediators, separated by commas"
          value={arrayToText(selectedPaper.moderators_mediators)}
          isDark={isDark}
          onChange={(value) =>
            onUpdatePaper("moderators_mediators", textToArray(value))
          }
          wide
        />

        <Textarea
          label="Best use in thesis"
          value={selectedPaper.best_use_in_thesis}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("best_use_in_thesis", value)}
        />

        <Textarea
          label="Notes"
          value={selectedPaper.notes}
          isDark={isDark}
          onChange={(value) => onUpdatePaper("notes", value)}
        />
      </div>
    </CollapsibleSection>
  );
}