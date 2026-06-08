// app/coolstuff/thesis-paper-dataset/components/Input.tsx

type InputProps = {
  label: string;
  value: string | number;
  type?: string;
  wide?: boolean;
  isDark: boolean;
  onChange: (value: string) => void;
};

export default function Input({
  label,
  value,
  type = "text",
  wide,
  isDark,
  onChange,
}: InputProps) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span
        className={`mb-2 block text-sm ${
          isDark ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          isDark
            ? "border-neutral-800 bg-neutral-950 text-neutral-100 focus:border-white"
            : "border-neutral-300 bg-white text-neutral-950 focus:border-black"
        }`}
      />
    </label>
  );
}