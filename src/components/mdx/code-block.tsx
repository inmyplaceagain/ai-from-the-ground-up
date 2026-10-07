"use client";

import { type ReactNode, useRef, useState } from "react";

export function CodeBlock({
  language,
  title,
  children,
}: {
  language?: string;
  title?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function copy() {
    const text = ref.current?.textContent ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="group relative my-6 rounded-lg border border-border bg-code-bg overflow-hidden">
      {(language || title) && (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 bg-bg-raised/30">
          <span className="text-[0.72rem] font-semibold text-fg-subtle font-[family-name:var(--font-geist-sans)] uppercase tracking-wider">
            {title || language}
          </span>
          <button
            onClick={copy}
            className="text-[0.72rem] text-fg-subtle hover:text-fg transition-colors opacity-0 group-hover:opacity-100 font-[family-name:var(--font-geist-sans)]"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      )}
      <pre
        ref={ref}
        className="overflow-x-auto p-4 text-[0.85rem] leading-[1.7] font-[family-name:var(--font-geist-mono)]"
      >
        {children}
      </pre>
    </div>
  );
}
