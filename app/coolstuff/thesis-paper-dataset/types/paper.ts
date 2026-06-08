export type FitScores = {
  entrepreneurship_relevance: number;
  freelance_or_independent_work_relevance: number;
  digital_platform_or_market_relevance: number;
  theory_development_value: number;
  construct_variable_value: number;
  method_measurement_value: number;
  success_outcome_value: number;
  self_presentation_or_signaling_value: number;
  source_quality: number;
};

export type ManualReviewStatus = "unchecked" | "checked";

export type ManualRelevanceLabel = "core" | "semi" | "not_relevant" | null;

export type Paper = {
  paper_id: string;
  title: string;
  authors: string[];
  year: number | "";
  journal: string;
  doi: string;
  url: string;

  paper_role: string;
  paper_type: string;
  context: string;
  main_topic: string;
  research_question_or_purpose: string;

  abstract: string;
  introduction: string;
  introduction_key_points: string[];

  theories_or_concepts: string[];

  method: string;
  sample_or_data: string;

  independent_variables: string[];
  dependent_variables: string[];
  moderators_mediators: string[];

  key_findings: string;

  fit_scores: FitScores;

  weighted_score_0_5: number | null;
  selection_category: string | null;
  selection_decision: string;

  best_use_in_thesis: string;
  notes: string;

  manual_review_status?: ManualReviewStatus;
  manual_relevance_label?: ManualRelevanceLabel;
  active_screening?: boolean;
  review_notes?: string;

  original_fit_scores_before_manual_input?: FitScores;
  fit_score_calibration_method?: string;
};

export type LegacyPaper = Partial<Paper> & {
  abstract_summary?: string;
  abstract_text?: string;
  introduction_summary?: string;
  introduction_text?: string;
};

export type CollapsedSections = {
  paperInfo: boolean;
  paperData: boolean;
  fitScoring: boolean;
  jsonPreview: boolean;
};