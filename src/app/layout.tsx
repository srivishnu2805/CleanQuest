import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CleanQuest — Gamified Campus Sustainability Platform",
  description:
    "CleanQuest is a full-stack gamified social media platform that transforms individual sustainability actions into a collective campus movement. Built with Next.js 15, Supabase, and Clerk.",
  keywords: ["sustainability", "campus", "gamification", "social media", "Next.js", "green"],
  openGraph: {
    title: "CleanQuest — Make Your Campus Cleaner Together",
    description:
      "Track sustainability actions, earn points, climb leaderboards, and build community for a greener campus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider>
            <div
              className="w-full px-4 md:px-8 sticky top-0 z-[100] backdrop-blur-md"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <div className="max-w-screen-xl mx-auto">
                <Navbar />
              </div>
            </div>
            <main className="max-w-screen-xl mx-auto px-4 md:px-8 pb-8">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
