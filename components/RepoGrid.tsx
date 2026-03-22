import { Repo } from "@/types/github";
import RepoCard from "@/components/RepoCard";

const EMPTY_STATE_MESSAGE = "No repositories match your search";

interface RepoGridProps {
  repos: Repo[];
}

export default function RepoGrid({ repos }: RepoGridProps) {
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20">
        <svg
          className="mb-3 h-10 w-10 text-slate-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <p className="text-sm font-medium text-slate-400">{EMPTY_STATE_MESSAGE}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
