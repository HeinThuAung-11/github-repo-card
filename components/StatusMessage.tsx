interface StatusMessageProps {
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function StatusMessage({ isLoading, error, onRetry }: StatusMessageProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-slate-900" />
        <p className="mt-4 text-sm text-slate-500">Loading repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="rounded-full bg-red-50 p-3">
          <svg
            className="h-6 w-6 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-900">Something went wrong</p>
        <p className="mt-1 max-w-sm text-center text-sm text-slate-500">{error}</p>
        <button
          onClick={onRetry}
          className="mt-5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return null;
}
