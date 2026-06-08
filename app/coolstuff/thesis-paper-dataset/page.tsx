// app/coolstuff/thesis-paper-dataset/page.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

import { importedPapers, STORAGE_KEY } from "./data/papers";
import type { CollapsedSections, FitScores, Paper } from "./types/paper";
import {
  emptyFitScores,
  emptyPaper,
  normalizePaper,
} from "./utils/normalizePaper";
import {
  calculateWeightedScore,
  getCategory,
  getDecision,
} from "./utils/scoring";
import { getTheme } from "./config/theme";

import HeaderActions from "./components/HeaderActions";
import PaperSidebar from "./components/PaperSidebar";
import ScoreCards from "./components/ScoreCards";
import PaperInformationSection from "./components/PaperInformationSection";
import PaperDataSection from "./components/PaperDataSection";
import FitScoringSection from "./components/FitScoringSection";
import JsonPreviewSection from "./components/JsonPreviewSection";
import PaperRankingCharts from "./components/charts/PaperRankingCharts";

function isValidPaperArray(value: unknown): value is Partial<Paper>[] {
  return Array.isArray(value);
}

function getPaperNumber(paperId: string) {
  const number = Number(paperId.replace(/\D/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function getInitialPapers() {
  if (Array.isArray(importedPapers) && importedPapers.length > 0) {
    return importedPapers.map((paper, index) => normalizePaper(paper, index));
  }

  return [emptyPaper];
}

export default function PaperDatasetPage() {
  const initialPapers = getInitialPapers();

  const [papers, setPapers] = useState<Paper[]>(initialPapers);
  const [selectedPaperId, setSelectedPaperId] = useState(
    initialPapers[0]?.paper_id ?? "P001"
  );
  const [isDark, setIsDark] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isPaperSidebarCollapsed, setIsPaperSidebarCollapsed] =
    useState(false);

  const [collapsedSections, setCollapsedSections] =
    useState<CollapsedSections>({
      paperInfo: false,
      paperData: false,
      fitScoring: false,
      jsonPreview: false,
    });

  const theme = getTheme(isDark);

  useEffect(() => {
    try {
      const savedData = window.localStorage.getItem(STORAGE_KEY);

      if (savedData) {
        const parsedData: unknown = JSON.parse(savedData);

        if (isValidPaperArray(parsedData) && parsedData.length > 0) {
          const normalizedPapers = parsedData.map((paper, index) =>
            normalizePaper(paper, index)
          );

          setPapers(normalizedPapers);
          setSelectedPaperId(normalizedPapers[0].paper_id);
        }
      }
    } catch (error) {
      console.error("Could not load saved thesis paper dataset:", error);
    } finally {
      setHasMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
    } catch (error) {
      console.error("Could not autosave thesis paper dataset:", error);
    }
  }, [papers, hasMounted]);

  const selectedPaper = papers.find(
    (paper) => paper.paper_id === selectedPaperId
  );

  const scoredPapers = useMemo(() => {
    return papers
      .map((paper) => {
        const weightedScore = calculateWeightedScore(paper.fit_scores);
        const category = getCategory(weightedScore);

        return {
          ...paper,
          weighted_score_0_5: weightedScore,
          selection_category: category,
          selection_decision: getDecision(category),
        };
      })
      .sort((a, b) => {
        return getPaperNumber(a.paper_id) - getPaperNumber(b.paper_id);
      });
  }, [papers]);

  const selectedScoredPaper = scoredPapers.find(
    (paper) => paper.paper_id === selectedPaperId
  );

  if (!selectedPaper) {
    return null;
  }

  const liveScore = calculateWeightedScore(selectedPaper.fit_scores);
  const liveCategory = getCategory(liveScore);

  function toggleSection(section: keyof CollapsedSections) {
    setCollapsedSections((current) => ({
      ...current,
      [section]: !current[section],
    }));
  }

  function updatePaper<K extends keyof Paper>(key: K, value: Paper[K]) {
    setPapers((current) =>
      current.map((paper) =>
        paper.paper_id === selectedPaperId ? { ...paper, [key]: value } : paper
      )
    );
  }

  function updatePaperId(nextId: string) {
    const cleanNextId = nextId.trim();

    if (!cleanNextId) return;

    setPapers((current) =>
      current.map((paper) =>
        paper.paper_id === selectedPaperId
          ? { ...paper, paper_id: cleanNextId }
          : paper
      )
    );

    setSelectedPaperId(cleanNextId);
  }

  function updateScore(key: keyof FitScores, value: number) {
    const safeValue = Math.max(0, Math.min(5, value));

    setPapers((current) =>
      current.map((paper) =>
        paper.paper_id === selectedPaperId
          ? {
              ...paper,
              fit_scores: {
                ...paper.fit_scores,
                [key]: safeValue,
              },
            }
          : paper
      )
    );
  }

  function addNewPaper() {
    const nextNumber = papers.length + 1;
    const nextId = `P${String(nextNumber).padStart(3, "0")}`;

    const newPaper: Paper = {
      ...emptyPaper,
      paper_id: nextId,
      fit_scores: { ...emptyFitScores },
      authors: [],
      introduction_key_points: [],
      theories_or_concepts: [],
      independent_variables: [],
      dependent_variables: [],
      moderators_mediators: [],
    };

    setPapers((current) => [...current, newPaper]);
    setSelectedPaperId(nextId);
    setCollapsedSections((current) => ({
      ...current,
      paperInfo: false,
      paperData: false,
    }));
  }

  function deleteSelectedPaper() {
    if (papers.length <= 1) {
      window.alert("You need at least one paper in the dataset.");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedPaperId} from the local dataset?`
    );

    if (!confirmed) return;

    setPapers((current) => {
      const nextPapers = current.filter(
        (paper) => paper.paper_id !== selectedPaperId
      );

      setSelectedPaperId(nextPapers[0]?.paper_id ?? "P001");

      return nextPapers;
    });
  }

  function reloadPapersJson() {
    const confirmed = window.confirm(
      "This will delete the browser-saved dataset and reload the original papers.json dataset. Continue?"
    );

    if (!confirmed) return;

    const freshPapers = getInitialPapers();

    window.localStorage.removeItem(STORAGE_KEY);
    setPapers(freshPapers);
    setSelectedPaperId(freshPapers[0]?.paper_id ?? "P001");
    setCollapsedSections({
      paperInfo: false,
      paperData: false,
      fitScoring: false,
      jsonPreview: false,
    });
  }

  function storeDatasetNow() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
      window.alert("Dataset stored in browser localStorage.");
    } catch (error) {
      console.error("Could not manually store thesis paper dataset:", error);
      window.alert("Could not store dataset. Check the console for details.");
    }
  }

  function exportJson() {
    const data = JSON.stringify(scoredPapers, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "papers_scored.json";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main
      className={`min-h-screen px-3 py-8 transition-colors sm:px-4 lg:px-6 xl:px-8 ${theme.page}`}
    >
      <div className="mx-auto w-full max-w-[1500px]">
        <HeaderActions
          isDark={isDark}
          hasMounted={hasMounted}
          theme={theme}
          onToggleTheme={() => setIsDark((current) => !current)}
          onAddPaper={addNewPaper}
          onStoreNow={storeDatasetNow}
          onExportJson={exportJson}
          onReload={reloadPapersJson}
        />

        <section
          className={`grid items-start gap-6 transition-all duration-300 ${
            isPaperSidebarCollapsed
              ? "lg:grid-cols-[96px_minmax(0,1fr)]"
              : "lg:grid-cols-[560px_minmax(0,1fr)]"
          }`}
        >
          <PaperSidebar
            papers={papers}
            scoredPapers={scoredPapers}
            selectedPaperId={selectedPaperId}
            theme={theme}
            isCollapsed={isPaperSidebarCollapsed}
            onToggleCollapse={() =>
              setIsPaperSidebarCollapsed((current) => !current)
            }
            onSelectPaper={setSelectedPaperId}
          />

          <section className="space-y-6">
            <ScoreCards
              liveScore={liveScore}
              liveCategory={liveCategory}
              theme={theme}
            />

            <PaperInformationSection
              selectedPaper={selectedPaper}
              collapsedSections={collapsedSections}
              isDark={isDark}
              theme={theme}
              onToggle={() => toggleSection("paperInfo")}
              onUpdatePaper={updatePaper}
            />

            <PaperDataSection
              selectedPaper={selectedPaper}
              collapsedSections={collapsedSections}
              isDark={isDark}
              theme={theme}
              onToggle={() => toggleSection("paperData")}
              onUpdatePaper={updatePaper}
              onUpdatePaperId={updatePaperId}
              onDeleteSelectedPaper={deleteSelectedPaper}
            />

            <FitScoringSection
              selectedPaper={selectedPaper}
              collapsedSections={collapsedSections}
              isDark={isDark}
              theme={theme}
              onToggle={() => toggleSection("fitScoring")}
              onUpdateScore={updateScore}
            />

            <JsonPreviewSection
              selectedPaper={selectedPaper}
              collapsedSections={collapsedSections}
              isDark={isDark}
              theme={theme}
              liveScore={liveScore}
              liveCategory={liveCategory}
              onToggle={() => toggleSection("jsonPreview")}
            />

            <PaperRankingCharts
              papers={scoredPapers}
              selectedPaper={selectedScoredPaper ?? selectedPaper}
              theme={theme}
              isDark={isDark}
            />
          </section>
        </section>
      </div>
    </main>
  );
}