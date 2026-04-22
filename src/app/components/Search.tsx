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
      <div className="flex p-2 bg-slate-100 items-center rounded-xl w-full">
        <input
          type="text"
          placeholder="Search students or initiatives..."
          className="bg-transparent outline-none w-full text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowResults(true)}
        />
        <Image src="/search.png" alt="" width={14} height={14} />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-2xl border border-gray-100 rounded-2xl p-2 z-[100] flex flex-col gap-2">
          {results.map((user) => (
            <Link 
              key={user.clerkId} 
              href={`/profile/${user.clerkId}`}
              onClick={() => {
                setShowResults(false);
                setQuery("");
              }}
              className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition"
            >
              <Image src={user.avatar || "/noAvatar.png"} width={32} height={32} className="rounded-full object-cover h-8 w-8" alt=""/>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{user.displayName || user.username}</span>
                <span className="text-[10px] text-gray-400">@{user.username}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {showResults && results.length === 0 && query.length > 1 && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-2xl border border-gray-100 rounded-2xl p-4 z-[100] text-center text-sm text-gray-400">
          No users found.
        </div>
      )}
    </div>
  );
};

export default Search;
