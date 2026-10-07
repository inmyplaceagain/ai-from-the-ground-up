"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTS, PART_COLORS } from "@/lib/chapters";
import { ThemeToggle } from "./theme-toggle";

export function BookNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedParts, setExpandedParts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const current = PARTS.find((p) =>
      p.chapters.some((c) => pathname === `/${p.slug}/${c.slug}`)
    );
    if (current) {
      setExpandedParts((prev) => new Set(prev).add(current.number));
    }
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function togglePart(n: number) {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  const isActive = (partSlug: string, chapterSlug: string) =>
    pathname === `/${partSlug}/${chapterSlug}`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex h-12 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:bg-bg-raised hover:text-fg transition-colors"
          aria-label="Toggle navigation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
        <Link
          href="/"
          className="font-[family-name:var(--font-playfair)] text-sm font-semibold text-fg-muted hover:text-fg transition-colors"
        >
          AI from the Ground Up
        </Link>
        <ThemeToggle />
      </div>

      {/* Overlay */}
      <div
        className="sidebar-overlay"
        data-open={open}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className="book-sidebar" data-open={open}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link
            href="/"
            className="font-[family-name:var(--font-playfair)] text-[0.95rem] font-bold text-fg hover:text-accent transition-colors"
          >
            AI from the<br />Ground Up
          </Link>
          <ThemeToggle />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {PARTS.map((part) => {
            const color = PART_COLORS[part.number];
            const isExpanded = expandedParts.has(part.number);
            const hasActiveCh = part.chapters.some((c) =>
              isActive(part.slug, c.slug)
            );

            return (
              <div key={part.number} className="mb-1">
                <button
                  onClick={() => togglePart(part.number)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-bg-raised group"
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold font-[family-name:var(--font-geist-sans)]"
                    style={{
                      backgroundColor: hasActiveCh
                        ? color
                        : "transparent",
                      color: hasActiveCh
                        ? "white"
                        : color,
                      border: hasActiveCh ? "none" : `1.5px solid ${color}`,
                    }}
                  >
                    {part.number}
                  </span>
                  <span className="flex-1 text-[0.8rem] font-semibold text-fg font-[family-name:var(--font-geist-sans)] tracking-tight">
                    {part.title}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`text-fg-subtle transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  >
                    <path d="M4.5 2.5L7.5 6L4.5 9.5" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-4 border-l border-border pl-2 mt-0.5 mb-2">
                    {part.chapters.map((ch) => {
                      const active = isActive(part.slug, ch.slug);
                      return (
                        <Link
                          key={ch.slug}
                          href={`/${part.slug}/${ch.slug}`}
                          className={`block rounded-md px-2.5 py-1.5 text-[0.8rem] transition-colors font-[family-name:var(--font-geist-sans)] ${
                            active
                              ? "font-medium bg-bg-raised"
                              : "text-fg-muted hover:text-fg hover:bg-bg-raised"
                          }`}
                          style={active ? { color } : undefined}
                        >
                          <span className="text-fg-subtle text-[0.72rem] font-mono mr-1.5">
                            {part.number}.{ch.order}
                          </span>
                          {ch.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-border px-5 py-3">
          <p className="text-[0.68rem] text-fg-subtle font-[family-name:var(--font-geist-sans)]">
            By{" "}
            <a href="https://www.linkedin.com/in/dhavranek/" className="text-fg-muted hover:text-fg transition-colors">
              Denis Havranek
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
