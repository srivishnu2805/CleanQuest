const FeedSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
            <div className="flex flex-col gap-2">
              <div className="w-28 h-3 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }} />
              <div className="w-16 h-2 rounded" style={{ backgroundColor: "var(--bg-tertiary)" }} />
            </div>
          </div>
          <div className="h-48 rounded-xl mb-4" style={{ backgroundColor: "var(--bg-tertiary)" }} />
          <div className="flex gap-4">
            <div className="w-20 h-8 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
            <div className="w-20 h-8 rounded-full" style={{ backgroundColor: "var(--bg-tertiary)" }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedSkeleton;
