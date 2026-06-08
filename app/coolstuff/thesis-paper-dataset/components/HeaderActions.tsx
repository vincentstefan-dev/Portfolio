// app/coolstuff/thesis-paper-dataset/components/HeaderActions.tsx

import type { Theme } from "../config/theme";

type HeaderActionsProps = {
  isDark: boolean;
  hasMounted: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  onAddPaper: () => void;
  onStoreNow: () => void;
  onExportJson: () => void;
  onReload: () => void;
};

export default function HeaderActions({
  isDark,
  hasMounted,
  theme,
  onToggleTheme,
  onAddPaper,
  onStoreNow,
  onExportJson,
  onReload,
}: HeaderActionsProps) {
  return (
    <header
      className={`mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-end md:justify-between ${theme.border}`}
    >
      <div>
        <p className={`text-sm uppercase tracking-[0.25em] ${theme.smallText}`}>
          Thesis Paper Dataset
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          Entrepreneurship Paper Fit Calculator
        </h1>

        <p className={`mt-2 max-w-2xl text-sm ${theme.mutedText}`}>
          Loads the starter dataset from papers.json, autosaves working edits in
          browser storage, and exports the modified dataset as JSON.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-xl border px-3 py-2 text-xs ${theme.autosaveBadge}`}
        >
          Autosave: {hasMounted ? "on" : "loading"}
        </span>

        <button
          onClick={onToggleTheme}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${theme.secondaryButton}`}
        >
          {isDark ? "Switch to white" : "Switch to black"}
        </button>

        <button
          onClick={onAddPaper}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${theme.primaryButton}`}
        >
          Add paper
        </button>

        <button
          onClick={onStoreNow}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${theme.secondaryButton}`}
        >
          Store now
        </button>

        <button
          onClick={onExportJson}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${theme.secondaryButton}`}
        >
          Export JSON
        </button>

        <button
          onClick={onReload}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${theme.dangerButton}`}
        >
          Reload papers.json
        </button>
      </div>
    </header>
  );
}