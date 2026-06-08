// app/coolstuff/thesis-paper-dataset/utils/scoring.ts

import type { FitScores } from "../types/paper";

export const weights: FitScores = {
  entrepreneurship_relevance: 0.15,
  freelance_or_independent_work_relevance: 0.13,
  digital_platform_or_market_relevance: 0.12,
  theory_development_value: 0.15,
  construct_variable_value: 0.13,
  method_measurement_value: 0.12,
  success_outcome_value: 0.08,
  self_presentation_or_signaling_value: 0.07,
  source_quality: 0.05,
};

export function calculateWeightedScore(scores: FitScores) {
  const total =
    scores.entrepreneurship_relevance * weights.entrepreneurship_relevance +
    scores.freelance_or_independent_work_relevance *
      weights.freelance_or_independent_work_relevance +
    scores.digital_platform_or_market_relevance *
      weights.digital_platform_or_market_relevance +
    scores.theory_development_value * weights.theory_development_value +
    scores.construct_variable_value * weights.construct_variable_value +
    scores.method_measurement_value * weights.method_measurement_value +
    scores.success_outcome_value * weights.success_outcome_value +
    scores.self_presentation_or_signaling_value *
      weights.self_presentation_or_signaling_value +
    scores.source_quality * weights.source_quality;

  return Number(total.toFixed(2));
}

export function getCategory(score: number) {
  if (score >= 4.25) return "core";
  if (score >= 3.5) return "keep";
  if (score >= 2.75) return "maybe";
  return "background only / possible exclusion";
}

export function getDecision(category: string) {
  if (category === "core") return "Use as a central paper for the thesis.";
  if (category === "keep") return "Keep as a strong supporting paper.";
  if (category === "maybe") {
    return "Use selectively for theory, context, variables, or method.";
  }

  return "Do not use as a core paper. Keep only if it supports a specific background or theory need.";
}