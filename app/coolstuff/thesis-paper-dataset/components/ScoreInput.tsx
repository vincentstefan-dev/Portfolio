// app/coolstuff/thesis-paper-dataset/components/ScoreInput.tsx

type ScoreInputProps = {
  label: string;
  value: number;
  weight: number;
  isDark: boolean;
  onChange: (value: number) => void;
};

export default function ScoreInput({
  label,
  value,
  weight,
  isDark,
  onChange,
}: ScoreInputProps) {
  return (
    <label
      className={`rounded-xl border p-4 ${
        isDark
          ? "border-neutral-800 bg-neutral-950"
          : "border-neutral-300 bg-white"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <span className="text-sm font-medium">{label.replaceAll("_", " ")}</span>

        <span className="text-xs text-neutral-500">weight: {weight}</span>
      </div>

      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full"
      />

      <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
        <span>0</span>

        <span
          className={`text-sm font-semibold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {value} / 5
        </span>

        <span>5</span>
      </div>
    </label>
  );
}