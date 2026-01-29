interface CodeBlockProps {
    code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
    return (
        <div className="bg-stone-900 rounded-xl p-4 overflow-x-auto shadow-lg">
            <pre className="text-sm font-mono text-stone-100">
                {code}
            </pre>
        </div>
    );
}
