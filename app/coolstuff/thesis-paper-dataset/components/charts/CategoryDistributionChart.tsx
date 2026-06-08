// app/coolstuff/thesis-paper-dataset/components/charts/CategoryDistributionChart.tsx

"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { Theme } from "../../config/theme";
import type { Paper } from "../../types/paper";

type CategoryDistributionChartProps = {
  papers: Paper[];
  theme: Theme;
  isDark: boolean;
};

type CategoryDatum = {
  name: string;
  value: number;
};

const CATEGORY_ORDER = [
  "core",
  "keep",
  "maybe",
  "drop / background only",
];

const CATEGORY_COLORS: Record<string, string> = {
  core: "#facc15",
  keep: "#38bdf8",
  maybe: "#a78bfa",
  "drop / background only": "#64748b",
};

export default function CategoryDistributionChart({
  papers,
  theme,
  isDark,
}: CategoryDistributionChartProps) {
  void theme;

  const ui = {
    card: isDark
      ? "border-white/10 bg-white/[0.03] shadow-black/20"
      : "border-black/10 bg-white shadow-black/10",
    emptyCard: isDark
      ? "border-white/10 bg-white/[0.03]"
      : "border-black/10 bg-white",
    metricCard: isDark
      ? "border-white/10 bg-black/20"
      : "border-black/10 bg-black/[0.03]",
    title: isDark ? "text-white" : "text-black",
    muted: isDark ? "text-white/45" : "text-black/50",
    legend: isDark ? "text-white/55" : "text-black/55",
    metricTitle: isDark ? "text-white/80" : "text-black/80",
    metricValue: isDark ? "text-white/45" : "text-black/50",
    tooltipBg: isDark ? "rgba(15,23,42,0.96)" : "rgba(255,255,255,0.98)",
    tooltipBorder: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
    tooltipText: isDark ? "white" : "black",
  };

  const counts = papers.reduce<Record<string, number>>((acc, paper) => {
    const category = paper.selection_category ?? "drop / background only";
    acc[category] = (acc[category] ?? 0) + 1;
    return acc;
  }, {});

  const data: CategoryDatum[] = CATEGORY_ORDER.map((category) => ({
    name: category,
    value: counts[category] ?? 0,
  })).filter((item) => item.value > 0);

  if (!data.length) {
    return (
      <div className={`rounded-3xl border p-6 ${ui.emptyCard}`}>
        <h3 className={`text-lg font-semibold ${ui.title}`}>
          Selection categories
        </h3>

        <p className={`mt-2 text-sm ${ui.muted}`}>
          No category data available yet.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl border p-5 shadow-2xl ${ui.card}`}>
      <div className="mb-2">
        <h3 className={`text-lg font-semibold ${ui.title}`}>
          Selection categories
        </h3>

        <p className={`text-sm ${ui.muted}`}>
          Distribution of papers by final scoring category.
        </p>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name] ?? "#64748b"}
                />
              ))}
            </Pie>

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
              formatter={(value) => [`${value} papers`, "Count"]}
            />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (
                <span className={`text-xs ${ui.legend}`}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={`mt-3 grid grid-cols-2 gap-2 text-xs ${ui.legend}`}>
        {data.map((item) => (
          <div
            key={item.name}
            className={`rounded-2xl border px-3 py-2 ${ui.metricCard}`}
          >
            <p className={`capitalize ${ui.metricTitle}`}>{item.name}</p>
            <p className={`mt-1 ${ui.metricValue}`}>{item.value} papers</p>
          </div>
        ))}
      </div>
    </div>
  );
}