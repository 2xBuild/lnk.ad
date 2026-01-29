import { Metadata } from 'next';
import { Terminal, Code2, Globe, Shield, Clock, Zap } from 'lucide-react';
import { DocsNav } from '@/components/docs/docs-nav';

import { CodeBlock } from '@/components/ui/code-block';

export const metadata: Metadata = {
    title: 'API Documentation & Guides - Lnk.ad',
    description: 'Developer usage guides, API documentation, and platform controls for Lnk.ad.',
};

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans transition-colors duration-300">

            <DocsNav />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">

                {/* Header */}
                <div className="max-w-2xl mb-16">
                    <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-900 dark:text-stone-100 mb-6 tracking-tight">
                        Developer Resources
                    </h1>
                    <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                        Integrate Lnk.ad directly into your applications with our simple REST API,
                        or learn more about the platform's features for power users.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

    

                    {/* Content */}
                    <div className="lg:col-span-9 space-y-16">

                        {/* API Section */}
                        <section id="introduction" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
                                    <Globe size={20} />
                                </div>
                                <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
                                    Introduction
                                </h2>
                            </div>
                            <div className="prose prose-stone dark:prose-invert max-w-none">
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                                    The Lnk.ad API is designed to be minimal and fast. It allows you to programmatically
                                    shorten URLs from your own applications, scripts, or command line tools.
                                    Currently, the API is public and does not require authentication for basic usage.
                                </p>
                            </div>
                        </section>

                        <div className="w-full h-px bg-stone-200 dark:bg-stone-800" />

                        <section id="endpoints" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
                                    <Terminal size={20} />
                                </div>
                                <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
                                    Create Short Link
                                </h2>
                            </div>

                            <div className="flex items-center gap-3 font-mono text-sm mb-6 bg-stone-100 dark:bg-stone-900/50 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
                                <span className="px-2 py-0.5 rounded-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs uppercase">
                                    POST
                                </span>
                                <span className="text-stone-600 dark:text-stone-400">
                                    /api/shorten
                                </span>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
                                        Request Body
                                    </h3>
                                    <CodeBlock code={`{
  "url": "https://example.com/long-url"
}`} />
                                    <p className="mt-3 text-sm text-stone-500 dark:text-stone-500">
                                        <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200 font-mono text-xs">url</code>
                                        (string, required): The destination URL you want to shorten.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
                                        Additional Parameters
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-lg border border-stone-200 dark:border-stone-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <code className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200 font-mono text-xs">expiry</code>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Optional</span>
                                            </div>
                                            <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                                                Set an expiration time for the link. Defaults to "1 week".
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {["1 day", "1 week", "2 months", "6 months", "1 year", "never"].map((opt) => (
                                                    <span key={opt} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs rounded-md font-mono border border-stone-200 dark:border-stone-700">
                                                        "{opt}"
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-4 bg-stone-50 dark:bg-stone-900/50 rounded-lg border border-stone-200 dark:border-stone-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <code className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-800 dark:text-stone-200 font-mono text-xs">length</code>
                                                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Optional</span>
                                            </div>
                                            <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                                                Define the type/length of the short code. Defaults to "short".
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs rounded-md font-mono border border-stone-200 dark:border-stone-700">
                                                    "short" (5 chars)
                                                </span>
                                                <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs rounded-md font-mono border border-stone-200 dark:border-stone-700">
                                                    "safest" (7 chars)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
                                        Example Response
                                    </h3>
                                    <CodeBlock code={`{
  "originalUrl": "https://example.com/long-url",
  "shortCode": "abc123",
  "clicks": 0
}`} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
                                        Usage Example (cURL)
                                    </h3>
                                    <CodeBlock code={`curl -X POST https://lnk.ad/api/shorten \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://github.com/microsoft"}'`} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-3">
                                        Advanced Usage (Custom Settings)
                                    </h3>
                                    <CodeBlock code={`curl -X POST https://lnk.ad/api/shorten \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://github.com/microsoft",
    "expiry": "never",
    "length": "safest"
  }'`} />
                                </div>
                            </div>
                        </section>

                        <div className="w-full h-px bg-stone-200 dark:bg-stone-800" />

                        {/* Guides Section */}
                        <section id="link-types" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
                                    <Code2 size={20} />
                                </div>
                                <h2 className="text-2xl font-serif text-stone-900 dark:text-stone-100">
                                    Guides & Control
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/20">
                                    <div className="flex items-center gap-2 mb-4">

                                        <h3 className="font-bold text-stone-900 dark:text-stone-100">Short Links</h3>
                                    </div>
                                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                                        Our standard short links use a 6-character alphanumeric code.
                                        They are concise and perfect for social media sharing.
                                    </p>
                                    <div className="text-xs font-mono bg-stone-100 dark:bg-stone-900 p-2 rounded text-stone-600 dark:text-stone-400">
                                        lnk.ad/x7z9q2
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/20">
                                    <div className="flex items-center gap-2 mb-4">

                                        <h3 className="font-bold text-stone-900 dark:text-stone-100">Safe Links</h3>
                                    </div>
                                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                                        "Safe" links generate a 12-character code. This increased entropy makes
                                        them significantly harder to guess or brute-force, providing "security through obscurity".
                                    </p>
                                    <div className="text-xs font-mono bg-stone-100 dark:bg-stone-900 p-2 rounded text-stone-600 dark:text-stone-400">
                                        lnk.ad/a1b2c3d4e5f6
                                    </div>
                                </div>

                            </div>
                        </section>

                        <section id="expiry-rules" className="scroll-mt-24">
                            <h3 className="text-xl font-serif text-stone-900 dark:text-stone-100 mb-4">
                                Link Expiry Controls
                            </h3>
                            <p className="text-stone-600 dark:text-stone-400 mb-6">
                                When using the web interface, you can set an automatic expiration time for your links.
                                Expired links are deleted from our database and can no longer be accessed.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { label: "1 Hour", desc: "Good for temporary file sharing or quick checks." },
                                    { label: "1 Day", desc: "Standard for daily updates or 24h stories." },
                                    { label: "1 Week", desc: "Useful for event registration or limited-time offers." },
                                    { label: "Never", desc: "Permanent links that stay active indefinitely." },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-4 p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900/50 transition-colors">
                                        <div className="flex-shrink-0 mt-1">
                                            <Clock size={16} className="text-stone-400" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-stone-900 dark:text-stone-100 block">
                                                {item.label}
                                            </span>
                                            <span className="text-sm text-stone-500 dark:text-stone-500">
                                                {item.desc}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
