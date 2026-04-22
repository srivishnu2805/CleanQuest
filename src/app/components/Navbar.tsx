"use client";

import Link from "next/link";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import Search from "./Search";
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
        <Link href="/" className="font-bold text-2xl tracking-tighter text-green-600">
          CleanQuest
        </Link>
      </div>

      {/* CENTER - SEARCH */}
      <div className="hidden md:flex flex-1 justify-center max-w-md">
        <Search />
      </div>

      {/* RIGHT - ICONS */}
      <div className="flex items-center gap-4 md:gap-6 justify-end flex-shrink-0">
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:scale-110 transition-transform">
             <Image src="/home.png" alt="" width={24} height={24} />
          </Link>
          <div 
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer hover:scale-110 transition-transform"
          >
            <div className="w-6 h-6 border-2 border-gray-800 rounded-md flex items-center justify-center font-bold text-lg">+</div>
          </div>
          <Link href="/activity" className="hover:scale-110 transition-transform">
             <Image src="/activity.png" alt="" width={24} height={24} />
          </Link>
          <Link href="/notifications" className="hover:scale-110 transition-transform">
             <Image src="/notifications.png" alt="" width={24} height={24} />
          </Link>
        </div>
        
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="text-sm font-semibold text-blue-500 hover:text-blue-600">Log In</Link>
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
