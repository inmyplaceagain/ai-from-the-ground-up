import { notFound } from "next/navigation";
import { ChapterNav } from "@/components/chapter-nav";
import { getChapter, getAdjacentChapters, PARTS, PART_COLORS } from "@/lib/chapters";

export default async function ChapterLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ part: string; chapter: string }>;
}) {
  const { part, chapter: chapterSlug } = await params;
  const chapterData = getChapter(part, chapterSlug);
  if (!chapterData) notFound();

  const { prev, next } = getAdjacentChapters(part, chapterSlug);
  const color = PART_COLORS[chapterData.part];
  const partData = PARTS[chapterData.part];

  return (
    <div className="px-8 sm:px-12 lg:px-20 xl:px-28 pt-14 lg:pt-0">
      <article className="mx-auto max-w-[36rem] py-12 sm:py-20">
        {/* Chapter header */}
        <header className="mb-14">
          <p
            className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.1em] font-[family-name:var(--font-geist-sans)]"
            style={{ color }}
          >
            Part {chapterData.part} &middot; {chapterData.partTitle}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-[2.5rem] font-bold tracking-tight leading-[1.15] text-fg">
            {chapterData.title}
          </h1>
          <p className="mt-3 text-fg-muted text-[1.05rem] leading-relaxed">
            {chapterData.description}
          </p>
          {/* Chapter number ornament */}
          <div className="mt-6 flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold font-[family-name:var(--font-geist-sans)] text-white"
              style={{ backgroundColor: color }}
            >
              {chapterData.part}.{chapterData.order}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </header>

        {/* Chapter content */}
        <div className="chapter-content">
          {children}
        </div>

        {/* Chapter navigation */}
        <ChapterNav
          prev={prev ? { partSlug: prev.partSlug, slug: prev.slug, title: prev.title, partTitle: prev.partTitle } : null}
          next={next ? { partSlug: next.partSlug, slug: next.slug, title: next.title, partTitle: next.partTitle } : null}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return PARTS.flatMap((part) =>
    part.chapters.map((chapter) => ({
      part: part.slug,
      chapter: chapter.slug,
    }))
  );
}
