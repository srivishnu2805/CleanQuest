"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-16 flex items-center justify-between gap-8">
      {/* LEFT */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-xs font-black text-white shadow-md shadow-emerald-500/20">
            CQ
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--green-primary)" }}>
            CleanQuest
          </span>
        </Link>
      </div>

      {/* CENTER - SEARCH */}
      <div className="hidden md:flex flex-1 justify-center max-w-md">
        <Search />
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-3 md:gap-4 justify-end flex-shrink-0">
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="p-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--bg-tertiary)] group" title="Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors" style={{ color: "var(--text-secondary)" }}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </Link>
          <div 
            onClick={() => setIsModalOpen(true)}
            className="p-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--bg-tertiary)] cursor-pointer group"
            title="Create Post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors" style={{ color: "var(--text-secondary)" }}>
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
              <line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <Link href="/dashboard" className="p-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--bg-tertiary)] group" title="Dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors" style={{ color: "var(--text-secondary)" }}>
              <rect x="3" y="3" width="7" height="9" rx="1"/>
              <rect x="14" y="3" width="7" height="5" rx="1"/>
              <rect x="14" y="12" width="7" height="9" rx="1"/>
              <rect x="3" y="16" width="7" height="5" rx="1"/>
            </svg>
          </Link>
          <Link href="/notifications" className="p-2.5 rounded-xl transition-all duration-200 hover:bg-[var(--bg-tertiary)] group" title="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-colors" style={{ color: "var(--text-secondary)" }}>
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </Link>
        </div>
        
        <ThemeToggle />
        
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-semibold" style={{ color: "var(--green-primary)" }}>Log In</Link>
          </SignedOut>
        </ClerkLoaded>
        
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
      
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Navbar;
