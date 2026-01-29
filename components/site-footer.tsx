import Link from "next/link";
import { Twitter, Github, Heart } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="w-full py-6 mt-auto">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:justify-between">
                <p className="text-sm text-stone-500 font-serif italic">
                    lnk.ad &copy; {new Date().getFullYear()}
                </p>
                <div className="flex items-center gap-6">
                    <Link
                        href="https://x.com/iBuild"
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">X (Twitter)</span>
                    </Link>
                    <Link
                        href="https://github.com/2xBuild/lnk.ad"
                        target="_blank"
                        rel="noreferrer"
                        className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://github.com/sponsors/2xBuild"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-full bg-stone-100 px-4 py-1.5 text-sm font-medium text-stone-900 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700 transition-colors"
                    >
                        <Heart className="h-4 w-4 fill-white text-black" />
                        <span>Sponsor this</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
