"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function GithubStars() {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/2xBuild/lnk.ad")
            .then((res) => res.json())
            .then((data) => {
                if (data.stargazers_count !== undefined) {
                    setStars(data.stargazers_count);
                }
            })
            .catch((err) => console.error("Failed to fetch stars", err));
    }, []);

    if (stars === null) return null;

    return (
        <Link
            href="https://github.com/2xBuild/lnk.ad"
            target="_blank"
            rel="noreferrer"
            className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white/50 px-3 py-1 text-xs font-medium text-stone-900 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-950/50 dark:text-stone-100 dark:hover:bg-stone-800",
                "animate-in fade-in zoom-in duration-500"
            )}
        >
            <Github className="h-3.5 w-3.5" />
            <span>{stars} stars</span>
        </Link>
    );
}
