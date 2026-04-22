"use client";

import { useEffect, useState } from "react";

interface WeeklyChartProps {
  data: Array<{
    day: string;
    posts: number;
    comments: number;
    likes: number;
    total: number;
  }>;
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const [animated, setAnimated] = useState(false);
  const maxValue = Math.max(...data.map((d) => d.total), 1);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="themed-card rounded-2xl p-6">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
        <span className="text-2xl">📈</span>
        Weekly Activity
      </h3>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-3 h-40 mb-4">
        {data.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <span className="text-xs font-bold" style={{ color: "var(--green-primary)" }}>
              {day.total > 0 ? day.total : ""}
            </span>
            <div className="w-full flex flex-col gap-0.5 justify-end" style={{ height: "calc(100% - 20px)" }}>
              {/* Posts bar */}
              <div
                className="chart-bar w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-400"
                style={{
                  height: animated ? `${(day.posts / maxValue) * 100}%` : "0%",
                  minHeight: day.posts > 0 ? "4px" : "0px",
                  transitionDelay: `${i * 100}ms`,
                }}
              />
              {/* Comments bar */}
              <div
                className="chart-bar w-full bg-gradient-to-t from-cyan-500 to-cyan-400"
                style={{
                  height: animated ? `${(day.comments / maxValue) * 100}%` : "0%",
                  minHeight: day.comments > 0 ? "4px" : "0px",
                  transitionDelay: `${i * 100 + 50}ms`,
                }}
              />
              {/* Likes bar */}
              <div
                className="chart-bar w-full rounded-b-md bg-gradient-to-t from-violet-500 to-violet-400"
                style={{
                  height: animated ? `${(day.likes / maxValue) * 100}%` : "0%",
                  minHeight: day.likes > 0 ? "4px" : "0px",
                  transitionDelay: `${i * 100 + 100}ms`,
                }}
              />
            </div>
            <span className="text-[10px] font-bold" style={{ color: "var(--text-tertiary)" }}>
              {day.day}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 justify-center mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <span className="text-[10px] font-bold" style={{ color: "var(--text-tertiary)" }}>Posts</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-cyan-500" />
          <span className="text-[10px] font-bold" style={{ color: "var(--text-tertiary)" }}>Comments</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-violet-500" />
          <span className="text-[10px] font-bold" style={{ color: "var(--text-tertiary)" }}>Likes</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;
