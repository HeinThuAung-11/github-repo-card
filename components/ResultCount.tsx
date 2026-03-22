interface ResultCountProps {
  filtered: number;
  total: number;
}

export default function ResultCount({ filtered, total }: ResultCountProps) {
  const isFiltered = filtered !== total;

  return (
    <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-3">
      <p className="text-sm font-medium text-slate-500">
        {isFiltered ? (
          <>
            <span className="text-slate-900">{filtered}</span> of {total} repositories
          </>
        ) : (
          <>
            <span className="text-slate-900">{total}</span> repositories
          </>
        )}
      </p>
    </div>
  );
}
