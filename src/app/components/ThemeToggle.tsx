"use client";

import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cleanquest-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute("data-theme", shouldBeDark ? "dark" : "light");
  }, []);

  const toggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("cleanquest-theme", newTheme ? "dark" : "light");
  };

  if (!mounted) return <div className="w-[48px] h-[24px]" />;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`theme-toggle ${isDark ? "bg-slate-600" : "bg-slate-200"}`}
    >
      <div
        className={`theme-toggle-thumb ${isDark ? "left-[26px] bg-slate-300" : "left-[2px] bg-white"} shadow-sm flex items-center justify-center`}
      >
        <span className="text-[10px]">{isDark ? "🌙" : "☀️"}</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
