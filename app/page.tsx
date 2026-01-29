"use client";

import { ModeToggle } from "@/components/theme-toggle";
import { GithubStars } from "@/components/github-stars";
import { HeroHeader } from "@/components/home/hero-header";
import { ShortenForm } from "@/components/home/shorten-form";
import { Footer } from "@/components/home/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 font-sans transition-colors duration-300 relative">
      <div className="absolute top-4 right-4 animate-in fade-in slide-in-from-top-4 duration-700 delay-200 flex items-center gap-2">
        <GithubStars />
        <ModeToggle />
      </div>

      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
        <HeroHeader />
        <ShortenForm />
        <Footer />
      </div>
    </main>
  );
}
