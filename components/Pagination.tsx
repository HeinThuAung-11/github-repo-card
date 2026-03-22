const PAGINATION_LABELS = {
  previous: "Previous",
  next: "Next",
} as const;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-1" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:text-slate-300">
        {PAGINATION_LABELS.previous}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            page === currentPage ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
          }`}>
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:text-slate-300">
        {PAGINATION_LABELS.next}
      </button>
    </nav>
  );
}
