// app/coolstuff/thesis-paper-dataset/components/PaperSidebar.tsx

"use client";

import { useMemo, useState } from "react";
import type { Theme } from "../config/theme";
import type { Paper } from "../types/paper";

type PaperSidebarProps = {
  papers: Paper[];
  scoredPapers: Paper[];
  selectedPaperId: string;
  theme: Theme;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSelectPaper: (paperId: string) => void;
};

type SortMode =
  | "paperNumber"
  | "highestScore"
  | "lowestScore"
  | "categoryRank"
  | "manualReview"
  | "titleAZ";

type ScreeningFilter =
  | "activeOnly"
  | "all"
  | "checkedOnly"
  | "coreOnly"
  | "semiOnly"
  | "notRelevantOnly";

function getPaperNumber(paperId: string) {
  const number = Number(paperId.replace(/\D/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function getCategoryRank(category: string | null) {
  if (category === "core") return 1;
  if (category === "keep") return 2;
  if (category === "maybe") return 3;
  if (category === "background only / possible exclusion") return 4;
  return 5;
}

function getManualReviewRank(paper: Paper) {
  if (paper.manual_relevance_label === "core") return 1;
  if (paper.manual_relevance_label === "semi") return 2;
  if (paper.manual_relevance_label === "not_relevant") return 3;
  if (paper.manual_review_status === "checked") return 4;
  return 5;
}

function matchesScreeningFilter(paper: Paper, screeningFilter: ScreeningFilter) {
  if (screeningFilter === "all") return true;

  if (screeningFilter === "activeOnly") {
    return paper.active_screening !== false;
  }

  if (screeningFilter === "checkedOnly") {
    return paper.manual_review_status === "checked";
  }

  if (screeningFilter === "coreOnly") {
    return paper.manual_relevance_label === "core";
  }

  if (screeningFilter === "semiOnly") {
    return paper.manual_relevance_label === "semi";
  }

  if (screeningFilter === "notRelevantOnly") {
    return paper.manual_relevance_label === "not_relevant";
  }

  return true;
}

function sortPapers(papers: Paper[], sortMode: SortMode) {
  return [...papers].sort((a, b) => {
    if (sortMode === "paperNumber") {
      return getPaperNumber(a.paper_id) - getPaperNumber(b.paper_id);
    }

    if (sortMode === "highestScore") {
      return (b.weighted_score_0_5 ?? 0) - (a.weighted_score_0_5 ?? 0);
    }

    if (sortMode === "lowestScore") {
      return (a.weighted_score_0_5 ?? 0) - (b.weighted_score_0_5 ?? 0);
    }

    if (sortMode === "categoryRank") {
      const categoryDifference =
        getCategoryRank(a.selection_category) -
        getCategoryRank(b.selection_category);

      if (categoryDifference !== 0) {
        return categoryDifference;
      }

      return (b.weighted_score_0_5 ?? 0) - (a.weighted_score_0_5 ?? 0);
    }

    if (sortMode === "manualReview") {
      const manualDifference =
        getManualReviewRank(a) - getManualReviewRank(b);

      if (manualDifference !== 0) {
        return manualDifference;
      }

      return getPaperNumber(a.paper_id) - getPaperNumber(b.paper_id);
    }

    if (sortMode === "titleAZ") {
      return (a.title || "").localeCompare(b.title || "");
    }

    return 0;
  });
}

function getManualBadgeLabel(paper: Paper) {
  if (paper.manual_relevance_label === "core") return "core";
  if (paper.manual_relevance_label === "semi") return "semi";
  if (paper.manual_relevance_label === "not_relevant") return "excluded";
  if (paper.manual_review_status === "checked") return "checked";
  return "new";
}

export default function PaperSidebar({
  papers,
  scoredPapers,
  selectedPaperId,
  theme,
  isCollapsed,
  onToggleCollapse,
  onSelectPaper,
}: PaperSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("paperNumber");
  const [screeningFilter, setScreeningFilter] =
    useState<ScreeningFilter>("activeOnly");

  const activePaperCount = useMemo(
    () => scoredPapers.filter((paper) => paper.active_screening !== false).length,
    [scoredPapers]
  );

  const checkedPaperCount = useMemo(
    () =>
      scoredPapers.filter((paper) => paper.manual_review_status === "checked")
        .length,
    [scoredPapers]
  );

  const filteredPapers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const matchingPapers = scoredPapers.filter((paper) => {
      if (!matchesScreeningFilter(paper, screeningFilter)) return false;

      if (!query) return true;

      const searchableText = [
        paper.paper_id,
        paper.title,
        paper.journal,
        paper.main_topic,
        paper.selection_category,
        paper.paper_role,
        paper.paper_type,
        paper.manual_review_status,
        paper.manual_relevance_label,
        paper.review_notes,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    return sortPapers(matchingPapers, sortMode);
  }, [scoredPapers, searchQuery, screeningFilter, sortMode]);

  return (
    <aside
      className={`sticky top-6 rounded-2xl border transition-all duration-300 ${theme.card} ${
        isCollapsed ? "lg:w-[72px] p-3" : "lg:w-full p-4"
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        {!isCollapsed && (
          <div>
            <h2
              className={`text-sm font-semibold uppercase tracking-[0.2em] ${theme.smallText}`}
            >
              Papers
            </h2>

            <span className={`mt-1 block text-xs ${theme.mutedText}`}>
              {filteredPapers.length} shown / {papers.length} total
            </span>

            <span className={`mt-1 block text-[11px] ${theme.mutedText}`}>
              {activePaperCount} active · {checkedPaperCount} checked
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={onToggleCollapse}
          className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${theme.secondaryButton}`}
          aria-label={
            isCollapsed ? "Expand papers sidebar" : "Collapse papers sidebar"
          }
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {isCollapsed ? (
        <div className="max-h-[calc(100vh-9rem)] space-y-2 overflow-y-auto pr-1">
          {filteredPapers.map((paper) => (
            <button
              key={paper.paper_id}
              onClick={() => onSelectPaper(paper.paper_id)}
              title={`${paper.paper_id} — ${paper.title || "Untitled paper"}`}
              className={`w-full rounded-xl border px-2 py-3 text-center text-xs font-semibold transition ${
                selectedPaperId === paper.paper_id
                  ? theme.selectedPaper
                  : theme.unselectedPaper
              }`}
            >
              {paper.paper_id.replace("P", "")}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-3 grid gap-2">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by ID, title, journal, topic..."
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition ${
                theme.card.includes("bg-neutral-900")
                  ? "border-neutral-800 bg-neutral-950 text-neutral-100 placeholder:text-neutral-600 focus:border-white"
                  : "border-neutral-300 bg-white text-neutral-950 placeholder:text-neutral-400 focus:border-black"
              }`}
            />

            <select
              value={screeningFilter}
              onChange={(event) =>
                setScreeningFilter(event.target.value as ScreeningFilter)
              }
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition ${
                theme.card.includes("bg-neutral-900")
                  ? "border-neutral-800 bg-neutral-950 text-neutral-100 focus:border-white"
                  : "border-neutral-300 bg-white text-neutral-950 focus:border-black"
              }`}
            >
              <option value="activeOnly">Active screening only</option>
              <option value="all">All papers</option>
              <option value="checkedOnly">Checked only</option>
              <option value="coreOnly">Manual core only</option>
              <option value="semiOnly">Manual semi only</option>
              <option value="notRelevantOnly">Manual not relevant only</option>
            </select>

            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition ${
                theme.card.includes("bg-neutral-900")
                  ? "border-neutral-800 bg-neutral-950 text-neutral-100 focus:border-white"
                  : "border-neutral-300 bg-white text-neutral-950 focus:border-black"
              }`}
            >
              <option value="paperNumber">Sort by paper number</option>
              <option value="highestScore">Sort by highest score</option>
              <option value="lowestScore">Sort by lowest score</option>
              <option value="categoryRank">Sort by category / rank</option>
              <option value="manualReview">Sort by manual review</option>
              <option value="titleAZ">Sort by title A-Z</option>
            </select>
          </div>

          <div className="max-h-[calc(100vh-18rem)] space-y-1 overflow-y-auto pr-1">
            {filteredPapers.map((paper) => (
              <button
                key={paper.paper_id}
                onClick={() => onSelectPaper(paper.paper_id)}
                className={`grid w-full grid-cols-[52px_58px_minmax(0,1fr)_64px] items-center gap-3 rounded-xl border px-3 py-2 text-left transition ${
                  selectedPaperId === paper.paper_id
                    ? theme.selectedPaper
                    : theme.unselectedPaper
                }`}
              >
                <span className="text-xs font-semibold">{paper.paper_id}</span>

                <span className="text-[11px] opacity-75">
                  {paper.weighted_score_0_5} / 5
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-xs font-medium">
                    {paper.title || "Untitled paper"}
                  </span>

                  <span className="mt-0.5 block truncate text-[11px] opacity-60">
                    {paper.selection_category || "uncategorized"}
                  </span>
                </span>

                <span className="rounded-full border px-2 py-1 text-center text-[10px] uppercase tracking-wide opacity-75">
                  {getManualBadgeLabel(paper)}
                </span>
              </button>
            ))}

            {filteredPapers.length === 0 && (
              <div
                className={`rounded-xl border px-3 py-4 text-sm ${theme.mutedText}`}
              >
                No papers match your search.
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}