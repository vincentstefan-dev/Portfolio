// app/coolstuff/thesis-paper-dataset/components/Textarea.tsx

type TextareaProps = {
  label: string;
  value: string;
  rows?: number;
  wide?: boolean;
  isDark: boolean;
  onChange: (value: string) => void;
};

export default function Textarea({
  label,
  value,
  rows = 5,
  wide,
  isDark,
  onChange,
}: TextareaProps) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span
        className={`mb-2 block text-sm ${
          isDark ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${
          isDark
            ? "border-neutral-800 bg-neutral-950 text-neutral-100 focus:border-white"
            : "border-neutral-300 bg-white text-neutral-950 focus:border-black"
        }`}
      />
    </label>
  );
}