// app/coolstuff/thesis-paper-dataset/components/charts/PaperRankingCharts.tsx

"use client";

import { useState } from "react";

import type { Theme } from "../../config/theme";
import type { Paper } from "../../types/paper";

import RankingBarChart from "./RankingBarChart";
import CategoryDistributionChart from "./CategoryDistributionChart";
import CriteriaRadarChart from "./CriteriaRadarChart";

type PaperRankingChartsProps = {
  papers: Paper[];
  selectedPaper?: Paper | null;
  theme: Theme;
  isDark: boolean;
};

export default function PaperRankingCharts({
  papers,
  selectedPaper,
  theme,
  isDark,
}: PaperRankingChartsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!papers.length) {
    return null;
  }

  const chartTheme = {
    sectionBorder: isDark ? "border-white/10" : "border-black/10",
    eyebrow: isDark ? "text-white/40" : "text-black/40",
    title: isDark ? "text-white" : "text-black",
    body: isDark ? "text-white/55" : "text-black/55",
    button: isDark
      ? "border-white/10 bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
      : "border-black/10 bg-black/[0.03] text-black/65 hover:bg-black/[0.06] hover:text-black",
    emptyCard: isDark
      ? "border-white/10 bg-white/[0.03]"
      : "border-black/10 bg-white",
    emptyText: isDark ? "text-white/50" : "text-black/50",
  };

  return (
    <section
      className={`mt-10 border-t px-4 py-8 sm:px-6 lg:px-8 ${chartTheme.sectionBorder}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs uppercase tracking-[0.35em] ${chartTheme.eyebrow}`}
          >
            Ranking analytics
          </p>

          <h2 className={`mt-2 text-2xl font-semibold ${chartTheme.title}`}>
            Paper scoring structure
          </h2>

          <p className={`mt-2 max-w-3xl text-sm leading-6 ${chartTheme.body}`}>
            These charts show how the papers are ranked, how many papers fall
            into each selection category, and why the currently selected paper
            receives its score.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed((current) => !current)}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${chartTheme.button}`}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? "Show charts" : "Hide charts"}
        </button>
      </div>

      {!isCollapsed && (
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <RankingBarChart papers={papers} theme={theme} isDark={isDark} />

          <div className="grid gap-6">
            {selectedPaper ? (
              <CriteriaRadarChart
                paper={selectedPaper}
                theme={theme}
                isDark={isDark}
              />
            ) : (
              <div className={`rounded-3xl border p-6 ${chartTheme.emptyCard}`}>
                <p className={`text-sm ${chartTheme.emptyText}`}>
                  Select a paper to see its criteria breakdown.
                </p>
              </div>
            )}

            <CategoryDistributionChart
              papers={papers}
              theme={theme}
              isDark={isDark}
            />
          </div>
        </div>
      )}
    </section>
  );
}