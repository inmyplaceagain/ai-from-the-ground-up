import Link from "next/link";

type NavChapter = {
  slug: string;
  title: string;
  partSlug: string;
  partTitle: string;
} | null;

export function ChapterNav({
  prev,
  next,
}: {
  prev: NavChapter;
  next: NavChapter;
}) {
  return (
    <nav className="mt-20 border-t border-border pt-10 font-[family-name:var(--font-geist-sans)]">
      <div className="flex items-stretch gap-4">
        {prev ? (
          <Link
            href={`/${prev.partSlug}/${prev.slug}`}
            className="group flex flex-1 flex-col rounded-lg border border-border p-5 hover:border-fg-subtle hover:bg-bg-raised transition-all"
          >
            <span className="text-[0.7rem] uppercase tracking-wider text-fg-subtle font-semibold">
              ← Previous
            </span>
            <span className="mt-2 text-sm font-semibold text-fg group-hover:text-link transition-colors">
              {prev.title}
            </span>
            <span className="mt-1 text-[0.72rem] text-fg-subtle">
              {prev.partTitle}
            </span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/${next.partSlug}/${next.slug}`}
            className="group flex flex-1 flex-col items-end rounded-lg border border-border p-5 hover:border-fg-subtle hover:bg-bg-raised transition-all text-right"
          >
            <span className="text-[0.7rem] uppercase tracking-wider text-fg-subtle font-semibold">
              Next →
            </span>
            <span className="mt-2 text-sm font-semibold text-fg group-hover:text-link transition-colors">
              {next.title}
            </span>
            <span className="mt-1 text-[0.72rem] text-fg-subtle">
              {next.partTitle}
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="group flex flex-1 flex-col items-end rounded-lg border border-border p-5 hover:border-fg-subtle hover:bg-bg-raised transition-all text-right"
          >
            <span className="text-[0.7rem] uppercase tracking-wider text-fg-subtle font-semibold">
              Finished
            </span>
            <span className="mt-2 text-sm font-semibold text-fg group-hover:text-link transition-colors">
              Back to contents
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
