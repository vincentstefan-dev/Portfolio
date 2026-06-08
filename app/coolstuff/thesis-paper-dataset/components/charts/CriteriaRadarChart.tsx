// app/coolstuff/thesis-paper-dataset/components/charts/CriteriaRadarChart.tsx

"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Theme } from "../../config/theme";
import type { Paper } from "../../types/paper";

type CriteriaRadarChartProps = {
  paper: Paper;
  theme: Theme;
  isDark: boolean;
};

type RadarDatum = {
  criterion: string;
  score: number;
  fullName: string;
};

const CRITERIA_LABELS: Record<string, string> = {
  entrepreneurship_relevance: "Entrepreneurship",
  freelance_or_independent_work_relevance: "Freelance",
  digital_platform_or_market_relevance: "Platform",
  theory_development_value: "Theory",
  construct_variable_value: "Constructs",
  method_measurement_value: "Method",
  success_outcome_value: "Success",
  self_presentation_or_signaling_value: "Signaling",
  source_quality: "Quality",
};

function formatCriterionName(key: string) {
  return key
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function CriteriaRadarChart({
  paper,
  theme,
  isDark,
}: CriteriaRadarChartProps) {
  void theme;

  const ui = {
    card: isDark
      ? "border-white/10 bg-white/[0.03] shadow-black/20"
      : "border-black/10 bg-white shadow-black/10",
    metricCard: isDark
      ? "border-white/10 bg-black/20"
      : "border-black/10 bg-black/[0.03]",
    title: isDark ? "text-white" : "text-black",
    muted: isDark ? "text-white/45" : "text-black/50",
    body: isDark ? "text-white/65" : "text-black/65",
    metricLabel: isDark ? "text-white/45" : "text-black/45",
    metricValue: isDark ? "text-white" : "text-black",
    grid: isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)",
    tick: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)",
    radiusTick: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)",
    tooltipBg: isDark ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.98)",
    tooltipBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    tooltipText: isDark ? "white" : "black",
    radarStroke: isDark ? "#facc15" : "#ca8a04",
    radarFill: isDark ? "#facc15" : "#ca8a04",
  };

  const fitScores = paper.fit_scores ?? {};

  const data: RadarDatum[] = Object.keys(CRITERIA_LABELS).map((key) => ({
    criterion: CRITERIA_LABELS[key],
    score: Number(fitScores[key as keyof typeof fitScores] ?? 0),
    fullName: formatCriterionName(key),
  }));

  const weightedScore = Number(paper.weighted_score_0_5 ?? 0).toFixed(2);

  return (
    <div className={`rounded-3xl border p-5 shadow-2xl ${ui.card}`}>
      <div className="mb-2">
        <h3 className={`text-lg font-semibold ${ui.title}`}>
          Selected paper breakdown
        </h3>

        <p className={`mt-1 text-sm ${ui.muted}`}>
          {paper.paper_id} · {weightedScore} / 5 ·{" "}
          {paper.selection_category ?? "unscored"}
        </p>

        <p className={`mt-2 line-clamp-2 text-sm leading-5 ${ui.body}`}>
          {paper.title}
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke={ui.grid} />

            <PolarAngleAxis
              dataKey="criterion"
              tick={{ fill: ui.tick, fontSize: 11 }}
            />

            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tick={{ fill: ui.radiusTick, fontSize: 10 }}
              axisLine={false}
            />

            <Radar
              name="Score"
              dataKey="score"
              stroke={ui.radarStroke}
              fill={ui.radarFill}
              fillOpacity={0.22}
              strokeWidth={2}
            />

            <Tooltip
              contentStyle={{
                background: ui.tooltipBg,
                border: `1px solid ${ui.tooltipBorder}`,
                borderRadius: "14px",
                color: ui.tooltipText,
              }}
              itemStyle={{
                color: ui.tooltipText,
              }}
              labelStyle={{
                color: ui.tooltipText,
              }}
              formatter={(value) => [`${value} / 5`, "Score"]}
              labelFormatter={(label) => {
                const item = data.find((entry) => entry.criterion === label);
                return item?.fullName ?? label;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.criterion}
            className={`rounded-2xl border px-3 py-2 ${ui.metricCard}`}
          >
            <p className={ui.metricLabel}>{item.criterion}</p>
            <p className={`mt-1 font-semibold ${ui.metricValue}`}>
              {item.score} / 5
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}