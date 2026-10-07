import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "@/components/mdx/callout";
import { WebDevAnalogy } from "@/components/mdx/web-dev-analogy";
import { CodeBlock } from "@/components/mdx/code-block";
import { InteractiveContainer } from "@/components/mdx/interactive-container";

type HP<T extends keyof React.JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: HP<"h1">) => (
      <h1
        className="mt-14 mb-5 font-[family-name:var(--font-playfair)] text-3xl font-bold tracking-tight text-fg"
        style={{ textWrap: "balance" }}
        {...props}
      />
    ),
    h2: (props: HP<"h2">) => (
      <h2
        className="mt-12 mb-4 font-[family-name:var(--font-playfair)] text-[1.45rem] font-bold tracking-tight text-fg"
        style={{ textWrap: "balance" }}
        {...props}
      />
    ),
    h3: (props: HP<"h3">) => (
      <h3
        className="mt-10 mb-3 font-[family-name:var(--font-playfair)] text-[1.15rem] font-semibold text-fg"
        style={{ textWrap: "balance" }}
        {...props}
      />
    ),
    h4: (props: HP<"h4">) => (
      <h4 className="mt-8 mb-2 text-base font-semibold text-fg font-[family-name:var(--font-geist-sans)]" {...props} />
    ),
    p: (props: HP<"p">) => (
      <p className="mb-5 text-[0.98rem] leading-[1.85] text-fg-muted" {...props} />
    ),
    a: (props: HP<"a">) => (
      <a
        className="text-link underline decoration-link/30 underline-offset-3 hover:decoration-link transition-colors"
        {...props}
      />
    ),
    ul: (props: HP<"ul">) => (
      <ul
        className="mb-5 ml-5 list-disc space-y-1.5 text-fg-muted marker:text-fg-subtle"
        {...props}
      />
    ),
    ol: (props: HP<"ol">) => (
      <ol
        className="mb-5 ml-5 list-decimal space-y-1.5 text-fg-muted marker:text-fg-subtle"
        {...props}
      />
    ),
    li: (props: HP<"li">) => <li className="text-[0.98rem] leading-[1.8]" {...props} />,
    code: (props: HP<"code">) => (
      <code
        className="rounded bg-code-bg px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[0.82em] text-fg"
        {...props}
      />
    ),
    pre: (props: HP<"pre">) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-border bg-code-bg p-5 text-[0.85rem] leading-[1.7] font-[family-name:var(--font-geist-mono)]"
        {...props}
      />
    ),
    blockquote: (props: HP<"blockquote">) => (
      <blockquote
        className="my-6 border-l-[3px] border-accent pl-5 text-fg-muted italic text-[1.05rem] leading-[1.75]"
        {...props}
      />
    ),
    hr: () => (
      <hr className="my-10 mx-auto w-16 border-t border-fg-subtle/40" />
    ),
    table: (props: HP<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table
          className="w-full border-collapse text-[0.9rem] font-[family-name:var(--font-geist-sans)] [&_th]:border [&_th]:border-border [&_th]:bg-bg-raised [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-[0.82rem] [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-fg-muted"
          {...props}
        />
      </div>
    ),
    strong: (props: HP<"strong">) => <strong className="font-bold text-fg" {...props} />,
    em: (props: HP<"em">) => <em className="italic" {...props} />,
    Callout,
    WebDevAnalogy,
    CodeBlock,
    InteractiveContainer,
    ...components,
  };
}
