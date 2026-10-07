"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PARTS, PART_COLORS } from "@/lib/chapters";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedParts, setExpandedParts] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    for (const part of PARTS) {
      for (const ch of part.chapters) {
        if (pathname === `/${part.slug}/${ch.slug}`) {
          initial.add(part.number);
        }
      }
    }
    if (initial.size === 0) initial.add(0);
    return initial;
  });

  function togglePart(num: number) {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  const nav = (
    <nav className="flex flex-col gap-1 py-4">
      <Link
        href="/"
        className="mb-4 px-4 text-sm font-semibold tracking-tight text-fg hover:text-accent transition-colors"
        onClick={() => setOpen(false)}
      >
        AI from the Ground Up
      </Link>

      {PARTS.map((part) => {
        const isExpanded = expandedParts.has(part.number);
        const color = PART_COLORS[part.number];

        return (
          <div key={part.number}>
            <button
              onClick={() => togglePart(part.number)}
              className="flex w-full items-center gap-2 px-4 py-1.5 text-left text-xs font-semibold uppercase tracking-wider text-fg-muted hover:text-fg transition-colors"
            >
              <span
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="flex-1">
                {part.number}. {part.title}
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 2l4 4-4 4" />
              </svg>
            </button>

            {isExpanded && (
              <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3 mt-1 mb-2">
                {part.chapters.map((ch) => {
                  const href = `/${part.slug}/${ch.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={ch.slug}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-md px-2 py-1 text-sm transition-colors ${
                        isActive
                          ? "bg-bg-raised text-fg font-medium"
                          : "text-fg-muted hover:text-fg hover:bg-bg-raised"
                      }`}
                      style={isActive ? { borderLeftColor: color } : undefined}
                    >
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
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 left-3 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-bg-raised text-fg-muted lg:hidden"
        aria-label="Open navigation"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-bg border-r border-border overflow-y-auto transition-transform lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-fg-muted hover:bg-bg-raised"
            aria-label="Close navigation"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>
        {nav}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-72 border-r border-border bg-bg overflow-y-auto">
        {nav}
      </aside>
    </>
  );
}
