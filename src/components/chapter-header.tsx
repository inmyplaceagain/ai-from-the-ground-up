import { PART_COLORS, type LearningPath } from "@/lib/chapters";

const PATH_LABELS: Record<LearningPath, string> = {
  developer: "Developer",
  designer: "Designer",
  product: "Product",
};

export function ChapterHeader({
  part,
  partTitle,
  title,
  description,
  readingTime,
  paths,
}: {
  part: number;
  partTitle: string;
  title: string;
  description: string;
  readingTime?: string;
  paths: LearningPath[];
}) {
  const color = PART_COLORS[part];

  return (
    <header className="mb-12">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color }}
        >
          Part {part}: {partTitle}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg text-wrap-balance leading-tight">
        {title}
      </h1>
      <p className="mt-3 text-lg text-fg-muted leading-relaxed">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {readingTime && (
          <span className="text-xs text-fg-subtle">{readingTime}</span>
        )}
        {paths.map((p) => (
          <span
            key={p}
            className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fg-subtle"
          >
            {PATH_LABELS[p]}
          </span>
        ))}
      </div>
    </header>
  );
}
