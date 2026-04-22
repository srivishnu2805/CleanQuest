import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider, ClerkLoaded } from "@clerk/nextjs";
import { syncUser } from "@/lib/actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLEANQUEST",
  description: "Social media app for Campus Sustainaibility",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-4 md:px-8 border-b border-gray-100 sticky top-0 z-[100]">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
