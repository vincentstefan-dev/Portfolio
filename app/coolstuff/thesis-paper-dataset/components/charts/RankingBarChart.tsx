// app/coolstuff/thesis-paper-dataset/components/charts/RankingBarChart.tsx

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Theme } from "../../config/theme";
import type { Paper } from "../../types/paper";

type RankingBarChartProps = {
  papers: Paper[];
  theme: Theme;
  isDark: boolean;
};

type CriterionKey =
  | "entrepreneurship_relevance"
  | "freelance_or_independent_work_relevance"
  | "digital_platform_or_market_relevance"
  | "theory_development_value"
  | "construct_variable_value"
  | "method_measurement_value"
  | "success_outcome_value"
  | "self_presentation_or_signaling_value"
  | "source_quality";

type CorrelationDatum = {
  criterion: string;
  fullName: string;
  correlation: number;
  absoluteCorrelation: number;
};

const CRITERIA: { key: CriterionKey; label: string; fullName: string }[] = [
  {
    key: "digital_platform_or_market_relevance",
    label: "Platform",
    fullName: "Digital Platform or Market Relevance",
  },
  {
    key: "freelance_or_independent_work_relevance",
    label: "Freelance",
    fullName: "Freelance or Independent Work Relevance",
  },
  {
    key: "self_presentation_or_signaling_value",
    label: "Signaling",
    fullName: "Self-Presentation or Signaling Value",
  },
  {
    key: "construct_variable_value",
    label: "Constructs",
    fullName: "Construct / Variable Value",
  },
  {
    key: "method_measurement_value",
    label: "Method",
    fullName: "Method / Measurement Value",
  },
  {
    key: "theory_development_value",
    label: "Theory",
    fullName: "Theory Development Value",
  },
  {
    key: "success_outcome_value",
    label: "Success",
    fullName: "Success Outcome Value",
  },
  {
    key: "entrepreneurship_relevance",
    label: "Entrepreneurship",
    fullName: "Entrepreneurship Relevance",
  },
  {
    key: "source_quality",
    label: "Quality",
    fullName: "Source Quality",
  },
];

function getScore(paper: Paper) {
  return Number(paper.weighted_score_0_5 ?? 0);
}

function getFitScore(paper: Paper, key: CriterionKey) {
  return Number(paper.fit_scores?.[key] ?? 0);
}

function calculatePearsonCorrelation(xValues: number[], yValues: number[]) {
  if (xValues.length !== yValues.length || xValues.length < 2) {
    return 0;
  }

  const xMean =
    xValues.reduce((total, value) => total + value, 0) / xValues.length;

  const yMean =
    yValues.reduce((total, value) => total + value, 0) / yValues.length;

  let numerator = 0;
  let xVariance = 0;
  let yVariance = 0;

  for (let index = 0; index < xValues.length; index += 1) {
    const xDiff = xValues[index] - xMean;
    const yDiff = yValues[index] - yMean;

    numerator += xDiff * yDiff;
    xVariance += xDiff * xDiff;
    yVariance += yDiff * yDiff;
  }

  const denominator = Math.sqrt(xVariance * yVariance);

  if (denominator === 0) {
    return 0;
  }

  return numerator / denominator;
}

function getCorrelationStrength(value: number) {
  const absoluteValue = Math.abs(value);

  if (absoluteValue >= 0.7) return "very strong";
  if (absoluteValue >= 0.5) return "strong";
  if (absoluteValue >= 0.3) return "moderate";
  if (absoluteValue >= 0.1) return "weak";

  return "very weak";
}

export default function RankingBarChart({
  papers,
  theme,
  isDark,
}: RankingBarChartProps) {
  void theme;

  const ui = {
    card: isDark
      ? "border-white/10 bg-white/[0.03] shadow-black/20"
      : "border-black/10 bg-white shadow-black/10",
    emptyCard: isDark
      ? "border-white/10 bg-white/[0.03]"
      : "border-black/10 bg-white",
    infoCard: isDark
      ? "border-white/10 bg-black/20"
      : "border-black/10 bg-black/[0.03]",
    title: isDark ? "text-white" : "text-black",
    muted: isDark ? "text-white/45" : "text-black/50",
    body: isDark ? "text-white/60" : "text-black/60",
    strong: isDark ? "text-white" : "text-black",
    subtle: isDark ? "text-white/35" : "text-black/40",
    grid: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    axis: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
    tick: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)",
    cursor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
    tooltipBg: isDark ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.98)",
    tooltipBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    tooltipText: isDark ? "white" : "black",
    positiveBar: isDark ? "#facc15" : "#ca8a04",
    negativeBar: isDark ? "#fb7185" : "#be123c",
    positiveText: isDark ? "text-yellow-300" : "text-yellow-700",
    negativeText: isDark ? "text-rose-300" : "text-rose-700",
  };

  const usablePapers = papers.filter((paper) => getScore(paper) > 0);

  const weightedScores = usablePapers.map((paper) => getScore(paper));

  const data: CorrelationDatum[] = CRITERIA.map((criterion) => {
    const criterionScores = usablePapers.map((paper) =>
      getFitScore(paper, criterion.key)
    );

    const correlation = calculatePearsonCorrelation(
      criterionScores,
      weightedScores
    );

    return {
      criterion: criterion.label,
      fullName: criterion.fullName,
      correlation: Number(correlation.toFixed(3)),
      absoluteCorrelation: Math.abs(correlation),
    };
  }).sort((a, b) => b.absoluteCorrelation - a.absoluteCorrelation);

  const strongestPositiveDrivers = data
    .filter((item) => item.correlation > 0)
    .sort((a, b) => b.correlation - a.correlation)
    .slice(0, 3);

  const weakestDriver = [...data].sort(
    (a, b) => a.correlation - b.correlation
  )[0];

  const strongestDriver = strongestPositiveDrivers[0];

  if (!usablePapers.length) {
    return (
      <div className={`rounded-3xl border p-6 ${ui.emptyCard}`}>
        <h3 className={`text-lg font-semibold ${ui.title}`}>
          Selection drivers
        </h3>

        <p className={`mt-2 text-sm ${ui.muted}`}>
          No scored papers available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border p-5 shadow-2xl ${ui.card}`}>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className={`text-lg font-semibold ${ui.title}`}>
            Selection drivers
          </h3>

          <p className={`text-sm ${ui.muted}`}>
            Criteria ranked by correlation with the final weighted score.
          </p>
        </div>

        <p className={`text-xs uppercase tracking-[0.25em] ${ui.subtle}`}>
          Pearson r
        </p>
      </div>

      <div className="h-[460px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 42,
              bottom: 20,
              left: 72,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={ui.grid} />

            <XAxis
              type="number"
              domain={[-1, 1]}
              tick={{ fill: ui.tick, fontSize: 12 }}
              axisLine={{ stroke: ui.axis }}
              tickLine={{ stroke: ui.axis }}
            />

            <YAxis
              type="category"
              dataKey="criterion"
              width={110}
              tick={{ fill: ui.tick, fontSize: 12 }}
              axisLine={{ stroke: ui.axis }}
              tickLine={{ stroke: ui.axis }}
            />

            <Tooltip
              cursor={{ fill: ui.cursor }}
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
              formatter={(value) => [String(value), "Correlation"]}
              labelFormatter={(label) => {
                const item = data.find((entry) => entry.criterion === label);
                return item?.fullName ?? label;
              }}
            />

            <Bar
              dataKey="correlation"
              radius={[0, 10, 10, 0]}
              barSize={24}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.criterion}
                  fill={
                    entry.correlation >= 0 ? ui.positiveBar : ui.negativeBar
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className={`rounded-2xl border p-4 ${ui.infoCard}`}>
          <h4 className={`text-sm font-semibold ${ui.strong}`}>
            Pearson r interpretation
          </h4>

          <div className={`mt-3 space-y-1.5 text-xs leading-5 ${ui.body}`}>
            <p>
              <span className={`font-semibold ${ui.strong}`}>0.70 to 1.00</span>{" "}
              = very strong positive association
            </p>
            <p>
              <span className={`font-semibold ${ui.strong}`}>0.50 to 0.69</span>{" "}
              = strong positive association
            </p>
            <p>
              <span className={`font-semibold ${ui.strong}`}>0.30 to 0.49</span>{" "}
              = moderate positive association
            </p>
            <p>
              <span className={`font-semibold ${ui.strong}`}>0.10 to 0.29</span>{" "}
              = weak positive association
            </p>
            <p>
              <span className={`font-semibold ${ui.strong}`}>Below 0</span> =
              negative association
            </p>
          </div>
        </div>

        <div className={`rounded-2xl border p-4 ${ui.infoCard}`}>
          <h4 className={`text-sm font-semibold ${ui.strong}`}>
            Current reading
          </h4>

          <div className={`mt-3 space-y-3 text-xs leading-5 ${ui.body}`}>
            <p>
              The strongest positive driver is{" "}
              <span className={`font-semibold ${ui.positiveText}`}>
                {strongestDriver?.criterion ?? "not available"}
              </span>{" "}
              with r ={" "}
              <span className={`font-semibold ${ui.strong}`}>
                {strongestDriver?.correlation ?? 0}
              </span>
              . This means papers strong on this criterion tend to receive
              higher final rankings.
            </p>

            <p>
              The weakest or most negative driver is{" "}
              <span
                className={`font-semibold ${
                  (weakestDriver?.correlation ?? 0) < 0
                    ? ui.negativeText
                    : ui.strong
                }`}
              >
                {weakestDriver?.criterion ?? "not available"}
              </span>{" "}
              with r ={" "}
              <span className={`font-semibold ${ui.strong}`}>
                {weakestDriver?.correlation ?? 0}
              </span>
              . A weak or negative value does not mean the criterion is
              unimportant; it means it does not explain much variation in the
              final ranking.
            </p>
          </div>
        </div>
      </div>

      <div className={`mt-4 rounded-2xl border p-4 ${ui.infoCard}`}>
        <h4 className={`text-sm font-semibold ${ui.strong}`}>
          Strongest positive drivers
        </h4>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {strongestPositiveDrivers.map((item, index) => (
            <div
              key={item.criterion}
              className={`rounded-xl border px-3 py-2 ${ui.infoCard}`}
            >
              <p className={`text-[11px] uppercase tracking-[0.18em] ${ui.subtle}`}>
                #{index + 1}
              </p>
              <p className={`mt-1 text-sm font-semibold ${ui.strong}`}>
                {item.criterion}
              </p>
              <p className={`mt-1 text-xs ${ui.muted}`}>
                r = {item.correlation} · {getCorrelationStrength(item.correlation)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`mt-4 text-xs leading-5 ${ui.muted}`}>
        <p>
          A higher positive value means that papers scoring high on that
          criterion also tend to receive higher final weighted scores.
        </p>
        <p className="mt-1">
          Because your final score is calculated from these criteria, this chart
          should be read as a ranking-structure diagnostic, not as causal
          evidence.
        </p>
      </div>
    </div>
  );
}