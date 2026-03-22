import { ALL_LANGUAGES, FilterState, SortDirection, SortField } from "@/types/github";

const SORT_FIELD_OPTIONS: { value: SortField; label: string }[] = [
  { value: "stars", label: "Stars" },
  { value: "name", label: "Name" },
];

const SORT_DIRECTION_LABELS: Record<SortDirection, Record<SortField, string>> = {
  desc: { stars: "Most first", name: "Z \u2192 A" },
  asc: { stars: "Fewest first", name: "A \u2192 Z" },
};

interface FilterBarProps {
  filters: FilterState;
  languages: string[];
  onChange: (filters: FilterState) => void;
}

const selectClasses =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition-shadow focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10";

export default function FilterBar({ filters, languages, onChange }: FilterBarProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleDirection = () => {
    updateFilter("sortDirection", filters.sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <select
        value={filters.language}
        onChange={(event) => updateFilter("language", event.target.value)}
        className={selectClasses}
      >
        <option value={ALL_LANGUAGES}>{ALL_LANGUAGES} Languages</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <select
        value={filters.sortField}
        onChange={(event) => updateFilter("sortField", event.target.value as SortField)}
        className={selectClasses}
      >
        {SORT_FIELD_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            Sort by {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={toggleDirection}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
      >
        <svg
          className={`h-3.5 w-3.5 text-slate-500 transition-transform ${filters.sortDirection === "asc" ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {SORT_DIRECTION_LABELS[filters.sortDirection][filters.sortField]}
      </button>

      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition-all hover:bg-slate-50">
        <input
          type="checkbox"
          checked={filters.hasDescription}
          onChange={(event) => updateFilter("hasDescription", event.target.checked)}
          className="h-3.5 w-3.5 rounded border-slate-300 accent-slate-900"
        />
        Has description
      </label>
    </div>
  );
}
