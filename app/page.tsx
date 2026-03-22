"use client";

import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import RepoGrid from "@/components/RepoGrid";
import ResultCount from "@/components/ResultCount";
import SearchInput from "@/components/SearchInput";
import StatusMessage from "@/components/StatusMessage";
import { ALL_LANGUAGES, DEFAULT_FILTERS, FilterState, Repo } from "@/types/github";
import { useEffect, useMemo, useState } from "react";

const API_BASE_URL = "https://api.github.com/users/HDRUK/repos?per_page=100&sort=updated";
const PAGE_TITLE = "HDRUK Repositories";
const REPOS_PER_PAGE = 12;

// Parses GitHub's Link header to find the next page URL
function getNextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;

  const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return match ? match[1] : null;
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [fetchKey, setFetchKey] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    // AbortController cancels the in-flight request if the component unmounts or fetchKey changes
    const controller = new AbortController();

    async function fetchRepos() {
      setLoading(true);
      setError(null);

      try {
        const allRepos: Repo[] = [];
        let url: string | null = API_BASE_URL;

        // Fetch all pages — GitHub caps at 100 repos per response
        while (url) {
          const response = await fetch(url, { signal: controller.signal });

          if (!response.ok) {
            const isRateLimited =
              response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0";

            if (isRateLimited) {
              const resetEpoch = response.headers.get("X-RateLimit-Reset");
              const retryMessage = resetEpoch
                ? `Rate limit exceeded. Try again at ${new Date(Number(resetEpoch) * 1000).toLocaleTimeString()}.`
                : "GitHub API rate limit exceeded. Please wait a few minutes.";
              throw new Error(retryMessage);
            }

            throw new Error(`Failed to fetch repositories (${response.status})`);
          }

          const data: unknown = await response.json();

          if (!Array.isArray(data)) {
            throw new Error("Unexpected response format from GitHub API");
          }

          allRepos.push(...(data as Repo[]));
          url = getNextPageUrl(response.headers.get("Link"));
        }

        setRepos(allRepos);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
    return () => controller.abort();
  }, [fetchKey]);

  // Derive unique sorted languages from fetched repos
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    for (const repo of repos) {
      if (repo.language) {
        languages.add(repo.language);
      }
    }
    return Array.from(languages).sort();
  }, [repos]);

  const handleRetry = () => {
    setCurrentPage(1);
    setFetchKey((previous) => previous + 1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (nextFilters: FilterState) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const filteredRepos = useMemo(() => {
    const searchTerm = search.toLowerCase();

    const filtered = repos.filter((repo) => {
      if (!repo.name.toLowerCase().includes(searchTerm)) return false;
      if (filters.language !== ALL_LANGUAGES && repo.language !== filters.language) return false;
      if (filters.hasDescription && !repo.description) return false;
      return true;
    });

    filtered.sort((repoA, repoB) => {
      const direction = filters.sortDirection === "asc" ? 1 : -1;

      if (filters.sortField === "stars") {
        return (repoA.stargazers_count - repoB.stargazers_count) * direction;
      }

      return repoA.name.localeCompare(repoB.name) * direction;
    });

    return filtered;
  }, [repos, search, filters]);

  const totalPages = Math.ceil(filteredRepos.length / REPOS_PER_PAGE);
  const startIndex = (currentPage - 1) * REPOS_PER_PAGE;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + REPOS_PER_PAGE);

  const showContent = !loading && !error;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{PAGE_TITLE}</h1>
        <p className="mt-1 text-sm text-slate-500">Browse and explore public repositories</p>
      </header>

      <StatusMessage isLoading={loading} error={error} onRetry={handleRetry} />

      {showContent && (
        <>
          <div className="mb-8 space-y-4">
            <SearchInput value={search} onChange={handleSearchChange} />
            <FilterBar
              filters={filters}
              languages={availableLanguages}
              onChange={handleFilterChange}
            />
          </div>
          <ResultCount filtered={filteredRepos.length} total={repos.length} />
          <RepoGrid repos={paginatedRepos} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </main>
  );
}
