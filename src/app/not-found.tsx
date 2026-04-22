import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div
        className="max-w-md w-full p-8 rounded-2xl text-center"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
          404
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          This page doesn&apos;t exist. Maybe the sustainability initiative moved!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-md shadow-emerald-500/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
