// app/coolstuff/thesis-paper-dataset/components/CollapsibleSection.tsx

import type { ReactNode } from "react";

type CollapsibleSectionProps = {
  title: string;
  isCollapsed: boolean;
  isDark: boolean;
  cardClassName: string;
  onToggle: () => void;
  children: ReactNode;
  action?: ReactNode;
};

export default function CollapsibleSection({
  title,
  isCollapsed,
  isDark,
  cardClassName,
  onToggle,
  children,
  action,
}: CollapsibleSectionProps) {
  return (
    <div className={`rounded-2xl border p-5 ${cardClassName}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center gap-3 text-left"
        >
          <span className="text-lg font-semibold">{title}</span>

          <span
            className={`rounded-full border px-3 py-1 text-xs ${
              isDark
                ? "border-neutral-700 text-neutral-400"
                : "border-neutral-300 text-neutral-600"
            }`}
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </span>
        </button>

        {action}
      </div>

      {!isCollapsed && <div className="mt-4">{children}</div>}
    </div>
  );
}