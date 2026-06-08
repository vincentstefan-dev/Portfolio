// app/coolstuff/thesis-paper-dataset/utils/normalizePaper.ts

import type { FitScores, LegacyPaper, Paper } from "../types/paper";

export const emptyFitScores: FitScores = {
  entrepreneurship_relevance: 0,
  freelance_or_independent_work_relevance: 0,
  digital_platform_or_market_relevance: 0,
  theory_development_value: 0,
  construct_variable_value: 0,
  method_measurement_value: 0,
  success_outcome_value: 0,
  self_presentation_or_signaling_value: 0,
  source_quality: 0,
};

export const emptyPaper: Paper = {
  paper_id: "P001",
  title: "",
  authors: [],
  year: "",
  journal: "",
  doi: "",
  url: "",

  paper_role: "",
  paper_type: "",
  context: "",
  main_topic: "",
  research_question_or_purpose: "",

  abstract: "",
  introduction: "",
  introduction_key_points: [],

  theories_or_concepts: [],

  method: "",
  sample_or_data: "",

  independent_variables: [],
  dependent_variables: [],
  moderators_mediators: [],

  key_findings: "",

  fit_scores: { ...emptyFitScores },

  weighted_score_0_5: null,
  selection_category: null,
  selection_decision: "pending calculation",

  best_use_in_thesis: "",
  notes: "",
};

export function normalizePaper(paper: LegacyPaper, index: number): Paper {
  const mergedAbstract =
    paper.abstract ??
    paper.abstract_text ??
    paper.abstract_summary ??
    "";

  const mergedIntroduction =
    paper.introduction ??
    paper.introduction_text ??
    paper.introduction_summary ??
    "";

  return {
    ...emptyPaper,
    ...paper,

    paper_id: paper.paper_id ?? `P${String(index + 1).padStart(3, "0")}`,

    abstract: mergedAbstract,
    introduction: mergedIntroduction,

    authors: paper.authors ?? [],
    introduction_key_points: paper.introduction_key_points ?? [],
    theories_or_concepts: paper.theories_or_concepts ?? [],
    independent_variables: paper.independent_variables ?? [],
    dependent_variables: paper.dependent_variables ?? [],
    moderators_mediators: paper.moderators_mediators ?? [],

    fit_scores: {
      ...emptyFitScores,
      ...(paper.fit_scores ?? {}),
    },
  };
}