import Link from "next/link";
import { PARTS, PART_COLORS } from "@/lib/chapters";

const ROLE_ICONS: Record<string, string> = {
  designer: "🎨",
  "frontend-developer": "🖥",
  "backend-developer": "⚙",
  "mobile-developer": "📱",
  "qa-engineer": "✓",
  "devops-sre": "🔧",
  "data-analyst": "📊",
  "product-manager": "📋",
};

export default function HomePage() {
  const theoryParts = PARTS.filter((p) => p.number < 7);
  const rolePart = PARTS.find((p) => p.number === 7);

  return (
    <div className="px-6 lg:px-12">
      <div className="mx-auto max-w-3xl pb-24 pt-20 lg:pt-16">

        {/* Hero */}
        <header className="mb-20">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-fg text-balance">
            AI from the<br />Ground Up
          </h1>
          <p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-fg-muted">
            A course for people who use AI every day but want to understand
            what&rsquo;s actually happening. From perceptrons to agents,
            explained through intuition and code&thinsp;&mdash;&thinsp;not papers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/bridge/ai-through-webdev-lens"
              className="inline-flex h-11 items-center rounded-lg bg-fg px-6 text-sm font-semibold text-bg font-[family-name:var(--font-geist-sans)] transition-opacity hover:opacity-85"
            >
              Start reading
            </Link>
            <Link
              href="#roles"
              className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-fg-muted font-[family-name:var(--font-geist-sans)] transition-colors hover:bg-bg-raised hover:text-fg"
            >
              Find your role
            </Link>
          </div>
        </header>

        {/* Table of Contents */}
        <section className="mb-20">
          <h2 className="font-[family-name:var(--font-geist-sans)] text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-fg-subtle mb-8">
            Contents
          </h2>

          <div className="flex flex-col gap-10">
            {theoryParts.map((part) => {
              const color = PART_COLORS[part.number];
              return (
                <div key={part.number}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-[family-name:var(--font-geist-sans)] text-[0.7rem] font-bold tabular-nums"
                      style={{ color }}
                    >
                      Part {part.number}
                    </span>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-fg">
                      {part.title}
                    </h3>
                  </div>
                  <p className="text-sm text-fg-subtle mb-4 italic">
                    {part.subtitle}
                  </p>
                  <div className="grid gap-0">
                    {part.chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={`/${part.slug}/${ch.slug}`}
                        className="group flex items-baseline gap-4 border-b border-border/60 py-2.5 transition-colors hover:bg-bg-raised -mx-3 px-3 rounded-sm"
                      >
                        <span className="font-[family-name:var(--font-geist-mono)] text-[0.72rem] text-fg-subtle tabular-nums w-6 shrink-0">
                          {part.number}.{ch.order}
                        </span>
                        <span className="text-[0.95rem] text-fg-muted group-hover:text-fg transition-colors">
                          {ch.title}
                        </span>
                        <span className="flex-1 border-b border-dotted border-fg-subtle/30 min-w-[2rem] translate-y-[-4px]" />
                        <span className="text-[0.78rem] text-fg-subtle hidden sm:block max-w-[20ch] text-right font-[family-name:var(--font-geist-sans)]">
                          {ch.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Your Role + AI */}
        {rolePart && (
          <section id="roles" className="mb-16 scroll-mt-20">
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="font-[family-name:var(--font-geist-sans)] text-[0.7rem] font-bold tabular-nums"
                  style={{ color: PART_COLORS[7] }}
                >
                  Part 7
                </span>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-fg">
                  {rolePart.title}
                </h2>
              </div>
              <p className="text-fg-muted max-w-[50ch]">
                How AI changes your actual work. Pick your role and see what&rsquo;s
                different now&thinsp;&mdash;&thinsp;with real tools, real workflows,
                and what stays uniquely human.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {rolePart.chapters.map((ch) => (
                <Link
                  key={ch.slug}
                  href={`/${rolePart.slug}/${ch.slug}`}
                  className="group rounded-lg border border-border p-4 transition-all hover:border-fg-subtle hover:bg-bg-raised"
                >
                  <span className="text-xl mb-2 block">
                    {ROLE_ICONS[ch.slug] || "→"}
                  </span>
                  <span className="text-sm font-semibold text-fg group-hover:text-fg transition-colors block font-[family-name:var(--font-geist-sans)]">
                    {ch.title}
                  </span>
                  <span className="text-[0.75rem] text-fg-subtle mt-1 block font-[family-name:var(--font-geist-sans)] leading-snug">
                    {ch.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border pt-8 pb-8 text-[0.78rem] text-fg-subtle font-[family-name:var(--font-geist-sans)]">
          <p>
            An open source course by{" "}
            <a href="https://www.linkedin.com/in/dhavranek/" className="text-fg-muted hover:text-fg transition-colors">
              Denis Havranek
            </a>
            . Made to bring peace to the AI transition.
          </p>
        </footer>
      </div>
    </div>
  );
}
