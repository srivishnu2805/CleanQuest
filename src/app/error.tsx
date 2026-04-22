"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("CleanQuest Error:", error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div
        className="max-w-md w-full p-8 rounded-2xl text-center"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div className="text-5xl mb-4">🍃</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          An unexpected error occurred. Our sustainability mission hit a temporary snag.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition shadow-md shadow-emerald-500/20"
        >
          Try Again
        </button>
        {error.digest && (
          <p className="mt-4 text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
