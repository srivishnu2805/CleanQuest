"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { searchUsers } from "@/lib/actions";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setUsers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 1) {
        const data = await searchUsers(query);
        setUsers(data);
        setShowResults(true);
      } else {
        setUsers([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative flex-1 max-w-md">
      <div
        className="flex p-2.5 items-center rounded-xl w-full gap-2"
        style={{ backgroundColor: "var(--bg-tertiary)" }}
      >
        <Image src="/search.png" alt="" width={14} height={14} className="opacity-50" />
        <input
          type="text"
          placeholder="Search students or initiatives..."
          className="bg-transparent outline-none w-full text-sm"
          style={{ color: "var(--text-primary)" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowResults(true)}
        />
      </div>

      {showResults && results.length > 0 && (
        <div
          className="absolute top-12 left-0 w-full shadow-2xl rounded-2xl p-2 z-[100] flex flex-col gap-1"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
          }}
        >
          {results.map((user) => (
            <Link 
              key={user.clerkId} 
              href={`/profile/${user.clerkId}`}
              onClick={() => {
                setShowResults(false);
                setQuery("");
              }}
              className="flex items-center gap-3 p-2.5 rounded-xl transition hover:bg-[var(--bg-tertiary)]"
            >
              <Image src={user.avatar || "/noAvatar.png"} width={32} height={32} className="rounded-full object-cover h-8 w-8" alt=""/>
              <div className="flex flex-col">
                <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  {user.displayName || user.username}
                </span>
                <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                  @{user.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && query.length > 1 && (
        <div
          className="absolute top-12 left-0 w-full shadow-2xl rounded-2xl p-4 z-[100] text-center text-sm"
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            color: "var(--text-tertiary)",
          }}
        >
          No users found.
        </div>
      )}
    </div>
  );
};

export default Search;
