import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

type Option = { value: string; label: string };

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label?: string;
  placeholder: string;
  options: readonly Option[];
  error?: string;
};

export default function Select({
  label,
  placeholder,
  options,
  error,
  className = "",
  id,
  value,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const vazio = !value;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-2 block text-[1.0625rem] font-semibold lowercase text-ink"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`h-13 w-full appearance-none truncate rounded-full border bg-transparent pl-5 pr-11 text-base outline-none transition-colors focus:ring-2 focus:ring-amber/40 ${
            error ? "border-red-400" : "border-amber"
          } ${vazio ? "text-ink-soft/85" : "text-ink"} ${className}`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-ink">
              {o.label}
            </option>
          ))}
        </select>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 px-5 text-[0.8125rem] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
