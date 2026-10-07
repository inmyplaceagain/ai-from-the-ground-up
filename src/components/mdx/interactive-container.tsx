import type { ReactNode } from "react";

export function InteractiveContainer({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 rounded-lg border border-accent/25 overflow-hidden">
      <div className="flex items-center justify-between border-b border-accent/15 px-5 py-2.5 bg-accent-soft/30">
        <span className="text-[0.88rem] font-semibold text-fg font-[family-name:var(--font-geist-sans)]">
          {title}
        </span>
        <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] font-[family-name:var(--font-geist-sans)]" style={{ color: "var(--accent)" }}>
          Interactive
        </span>
      </div>
      <div className="p-4 sm:p-5 bg-bg-raised/30">
        {children}
      </div>
      {caption && (
        <figcaption className="border-t border-border/60 px-5 py-2.5 text-[0.78rem] text-fg-subtle font-[family-name:var(--font-geist-sans)] leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
