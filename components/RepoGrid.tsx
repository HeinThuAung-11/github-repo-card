import { SearchIcon } from "@/components/icons";
import RepoCard from "@/components/RepoCard";
import { Repo } from "@/types/github";

const EMPTY_STATE_MESSAGE = "No repositories match your search";

interface RepoGridProps {
  repos: Repo[];
}

export default function RepoGrid({ repos }: RepoGridProps) {
  if (repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20">
        <SearchIcon className="mb-3 h-10 w-10 text-slate-300" />
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
