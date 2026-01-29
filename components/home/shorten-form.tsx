"use client";

import { useState, useTransition, useEffect } from "react";
import { shortenUrl } from "@/lib/actions";
import { ArrowRight, Check, Copy, Link as LinkIcon, Shield, Timer, Zap, ChevronDown } from "lucide-react";

export function ShortenForm() {
    const [longUrl, setLongUrl] = useState("");
    const [shortCode, setShortCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [copied, setCopied] = useState(false);

    // Options
    const [expiry, setExpiry] = useState("never"); // 1d, 1w, 2m, 6m, 1y, never
    const [length, setLength] = useState("short"); // short, safest

    const [activeDropdown, setActiveDropdown] = useState<'expiry' | 'length' | null>(null);

    useEffect(() => {
        function handleClickOutside() {
            setActiveDropdown(null);
        }

        if (activeDropdown) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeDropdown]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setShortCode(null);
        setCopied(false);

        const formData = new FormData();
        formData.append("url", longUrl);
        formData.append("expiry", expiry);
        formData.append("length", length);

        startTransition(async () => {
            const result = await shortenUrl(formData);
            if (result.error) {
                setError(result.error);
            } else if (result.shortCode) {
                setShortCode(result.shortCode);
            }
        });
    };

    const handleCopy = () => {
        if (shortCode) {
            const url = `${window.location.origin}/${shortCode}`;
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="bg-card border border-border rounded-2xl shadow-xl dark:shadow-none transition-colors text-card-foreground">
            <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 ml-1">
                           Long URL
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-600 dark:group-focus-within:text-stone-300 transition-colors">
                                <LinkIcon size={18} />
                            </div>
                            <input
                                type="url"
                                required
                                placeholder="https://example.com/very-long-link"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                disabled={isPending}
                                className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-500/20 focus:border-stone-500 transition-all text-stone-800 dark:text-stone-200 placeholder:text-stone-400 text-[16px]"
                            />
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Expiry Dropdown */}
                        <div className="relative">
                            <label className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 ml-1 flex items-center gap-1 mb-2">
                                <Timer size={12} /> Expiry
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(activeDropdown === 'expiry' ? null : 'expiry');
                                }}
                                className="w-full flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500/20 text-sm"
                            >
                                <span className="font-medium">{expiry === 'never' ? '∞ Never' : expiry}</span>
                                <ChevronDown size={16} className={`text-stone-400 transition-transform duration-200 ${activeDropdown === 'expiry' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeDropdown === 'expiry' && (
                                <div className="absolute top-full left-0 right-0 mt-2 p-1.5 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 max-h-60 overflow-y-auto">
                                    <div className="grid grid-cols-1 gap-0.5">
                                        {["1 day", "1 week", "2 months", "6 months", "1 year", "never"].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => {
                                                    setExpiry(opt);
                                                    setActiveDropdown(null);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${expiry === opt
                                                    ? "bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                                                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700/50 hover:text-stone-900 dark:hover:text-stone-200"
                                                    }`}
                                            >
                                                {opt === 'never' ? '∞ Never' : opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Length Dropdown */}
                        <div className="relative">
                            <label className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 ml-1 flex items-center gap-1 mb-2">
                                <Shield size={12} /> Type
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveDropdown(activeDropdown === 'length' ? null : 'length');
                                }}
                                className="w-full flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-800 dark:text-stone-200 hover:border-stone-300 dark:hover:border-stone-600 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500/20 text-sm"
                            >
                                <span className="flex items-center gap-2 font-medium">
                                    {length === 'short' ? <Zap size={14} /> : <Shield size={14} />}
                                    {length === 'short' ? 'Short' : 'Safe'}
                                </span>
                                <ChevronDown size={16} className={`text-stone-400 transition-transform duration-200 ${activeDropdown === 'length' ? 'rotate-180' : ''}`} />
                            </button>

                            {activeDropdown === 'length' && (
                                <div className="absolute top-full left-0 right-0 mt-2 p-1.5 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="grid grid-cols-1 gap-0.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLength("short");
                                                setActiveDropdown(null);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${length === "short"
                                                ? "bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700/50 hover:text-stone-900 dark:hover:text-stone-200"
                                                }`}
                                        >
                                            <Zap size={14} />
                                            <div>
                                                <span>Short</span>
                                                <span className="block text-xs font-normal text-stone-400 dark:text-stone-500 mt-0.5">6 chars. concise.</span>
                                            </div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLength("safest");
                                                setActiveDropdown(null);
                                            }}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${length === "safest"
                                                ? "bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-100"
                                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700/50 hover:text-stone-900 dark:hover:text-stone-200"
                                                }`}
                                        >
                                            <Shield size={14} />
                                            <div>
                                                <span>Safe</span>
                                                <span className="block text-xs font-normal text-stone-400 dark:text-stone-500 mt-0.5">12 chars. harder to guess.</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 sm:py-3.5 px-4 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className="animate-pulse">Creating...</span>
                        ) : (
                            <>
                                Shorten Link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                {/* Success State */}
                {shortCode && (
                    <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 animate-in fade-in slide-in-from-top-4 duration-500">
                        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mb-3">
                            Your link is ready!
                        </p>
                        <div className="flex items-center gap-2 p-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl">
                            <div className="flex-1 px-3 py-2 overflow-hidden">
                                <a
                                    href={`${typeof window !== 'undefined' ? window.location.origin : ''}/${shortCode}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-stone-800 dark:text-stone-200 font-medium truncate hover:underline block"
                                >
                                    {typeof window !== 'undefined' ? `${window.location.host}/${shortCode}` : shortCode}
                                </a>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-2.5 bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-600 transition-colors text-stone-600 dark:text-stone-300"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
