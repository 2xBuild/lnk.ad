import Link from "next/link";

export function Footer() {
    return (
        <div className="mt-8 text-center text-sm text-stone-400 dark:text-stone-600 font-serif italic">
            Simple. Fast. Secure.
            <div className="mt-4 not-italic font-sans">
                <Link href="/docs" className="text-xs text-stone-300 dark:text-stone-700 hover:text-stone-500 dark:hover:text-stone-500 transition-colors">
                    API & Docs
                </Link>
            </div>
        </div>
    );
}
