import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function DocsNav() {
    return (
        <nav className="border-b border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Back to App
                </Link>
                <div className="font-serif text-xl tracking-tight text-stone-900 dark:text-stone-100">
                    lnk.ad <span className="text-stone-400 dark:text-stone-600 font-sans text-sm tracking-normal ml-1">/ docs</span>
                </div>
                <div className="w-20" /> {/* Spacer for balance */}
            </div>
        </nav>
    );
}
