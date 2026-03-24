import { StarIcon } from "@/components/icons";
import { Repo } from "@/types/github";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Vue: "#41b883",
  SCSS: "#c6538c",
  MDX: "#fcb32c",
};

const DEFAULT_LANGUAGE_COLOR = "#94a3b8";
const NO_DESCRIPTION_TEXT = "No description provided";
const UNKNOWN_LANGUAGE_TEXT = "Unknown";

interface RepoCardProps {
  repo: Repo;
}

export default function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? DEFAULT_LANGUAGE_COLOR)
    : DEFAULT_LANGUAGE_COLOR;

  const languageName = repo.language ?? UNKNOWN_LANGUAGE_TEXT;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 ease-out hover:z-10 hover:scale-105 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate text-base font-semibold text-slate-900 group-hover:text-blue-600">
          {repo.name}
        </h3>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          <StarIcon className="h-3.5 w-3.5 text-amber-500" />
          {repo.stargazers_count.toLocaleString()}
        </span>
      </div>

      <p className={`mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed transition-all duration-300 group-hover:line-clamp-none ${repo.description ? "text-slate-600" : "italic text-slate-400"}`}>
        {repo.description ?? NO_DESCRIPTION_TEXT}
      </p>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-black/5"
          style={{ backgroundColor: languageColor }}
        />
        <span className="font-medium">{languageName}</span>
      </div>
    </a>
  );
}
