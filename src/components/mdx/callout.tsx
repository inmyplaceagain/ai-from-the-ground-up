import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "tip" | "math";

const STYLES: Record<CalloutType, { accent: string; icon: string }> = {
  info: { accent: "var(--link)", icon: "ℹ" },
  warning: { accent: "var(--accent)", icon: "⚠" },
  tip: { accent: "var(--color-part-3)", icon: "→" },
  math: { accent: "var(--color-part-6)", icon: "∑" },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[type];
  return (
    <aside
      className="my-8 rounded-r-lg border-l-[3px] bg-bg-raised/60 py-4 px-5"
      style={{ borderLeftColor: s.accent }}
    >
      {title && (
        <p
          className="mb-2 text-[0.85rem] font-semibold font-[family-name:var(--font-geist-sans)]"
          style={{ color: s.accent }}
        >
          {s.icon}&ensp;{title}
        </p>
      )}
      <div className="text-[0.92rem] leading-relaxed text-fg-muted [&>p]:mb-2 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
