# GitHub Repository Card

A client-side GitHub repository explorer built with Next.js, TypeScript, and Tailwind CSS. Fetches and displays public repositories with search, filtering, sorting, and pagination.

## Features

- Fetches all public repositories from the GitHub API (multi-page support)
- Real-time search filtering by repository name
- Filter by programming language
- Sort by stars or name (ascending/descending)
- Filter repos that have a description
- Paginated grid layout (12 repos per page)
- Hover-to-expand cards showing full descriptions
- Language colour badges for 20+ languages
- Loading spinner, error handling, and rate-limit detection with retry
- Fully responsive design (mobile, tablet, desktop)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Data:** GitHub REST API v3
- **No external UI or data-fetching libraries** — native `fetch` only

## Project Structure

```
app/
  page.tsx              ← Main page: state, fetch, search/filter/sort logic
  layout.tsx            ← Root layout with metadata and fonts
  globals.css           ← Tailwind config and custom styles

components/
  RepoCard.tsx          ← Single repo card with hover expand
  RepoGrid.tsx          ← Responsive grid of cards + empty state
  SearchInput.tsx       ← Controlled search input
  FilterBar.tsx         ← Language filter, sort controls, description toggle
  Pagination.tsx        ← Page navigation controls
  ResultCount.tsx       ← Shows total and filtered repo counts
  StatusMessage.tsx     ← Loading spinner and error/retry display

types/
  github.ts             ← Repo interface, FilterState, sort types, constants
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Usage

I used Claude (Anthropic) to assist with parts of this project — specifically the initial fetch logic, TypeScript types, and basic page structure. AI was used mainly for boilerplate and repetitive tasks, while I made the decisions around structure, organisation, and performance.

**What prompts worked well:**
- Specific prompts describing exact fields to display, how to handle missing data, and how search should behave
- Constraint-based prompts ("no Axios, no UI libraries, native fetch only")
- Structured code review requests with specific categories (architecture, performance, edge cases)

**What I corrected:**
- Refactored from a single file into smaller components (RepoCard, RepoGrid, SearchInput)
- Simplified unnecessary TypeScript types the AI generated
- Moved a `toLowerCase()` call outside the filter loop to avoid repeated computation

For the full breakdown, see [AI_USAGE.txt](./AI_USAGE.txt).
