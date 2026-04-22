export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2" style={{ borderColor: "var(--green-primary)" }}></div>
        <span className="text-sm font-medium" style={{ color: "var(--text-tertiary)" }}>Loading...</span>
      </div>
    </div>
  );
}
