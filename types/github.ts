export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
}

export type SortField = "stars" | "name";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  language: string;
  sortField: SortField;
  sortDirection: SortDirection;
  hasDescription: boolean;
}

export const ALL_LANGUAGES = "All";

export const DEFAULT_FILTERS: FilterState = {
  language: ALL_LANGUAGES,
  sortField: "stars",
  sortDirection: "desc",
  hasDescription: false,
};
