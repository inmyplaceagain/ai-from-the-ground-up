import type { ReactNode } from "react";

export function WebDevAnalogy({
  webDev,
  ai,
  children,
}: {
  webDev: string;
  ai: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-lg border border-border bg-bg-raised/50 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/60 bg-bg-raised/40">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.08em] text-fg-subtle font-[family-name:var(--font-geist-sans)]">
          Web Dev ↔ AI
        </span>
      </div>
      <div className="p-5">
        <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <p className="text-[0.88rem] font-semibold text-fg font-[family-name:var(--font-geist-sans)]">
            {webDev}
          </p>
          <span className="text-fg-subtle text-lg">≈</span>
          <p className="text-[0.88rem] font-semibold font-[family-name:var(--font-geist-sans)]" style={{ color: "var(--accent)" }}>
            {ai}
          </p>
        </div>
        <div className="text-[0.92rem] leading-relaxed text-fg-muted [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
