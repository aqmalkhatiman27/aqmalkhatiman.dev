import type { ComponentPropsWithoutRef, ReactElement } from "react";
import type { MDXComponents } from "mdx/types";

import Callout from "./Callout";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function MdxCode({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">): ReactElement {
  const dataLang = (props as { "data-language"?: string | undefined })["data-language"];

  const isHighlightedBlock =
    dataLang !== undefined ||
    /\blanguage-[\w#.+-]+/.test(className ?? "");

  if (isHighlightedBlock) {
    return (
      <code
        {...props}
        className={cx("font-mono text-[0.875rem]", className)}
      >
        {children}
      </code>
    );
  }

  return (
    <code
      {...props}
      className={cx(
        "rounded-md border border-border bg-[var(--background)] px-1.5 py-px font-mono text-[0.9em] tracking-tight text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}

export function getArticleMdxComponents(): MDXComponents {
  return {
    Callout,
    hr: ({ className, ...props }) => (
      <hr {...props} className={cx("my-12 border-border", className)} />
    ),
    blockquote: ({ className, children, ...props }) => (
      <blockquote
        {...props}
        className={cx(
          "border-l-[3px] border-border pl-6 text-muted [&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0 [&>p]:my-3 [&>p]:text-[inherit]",
          className,
        )}
      >
        {children}
      </blockquote>
    ),
    table: ({ className, children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-xl border border-border overscroll-x-contain scroll-smooth">
        <table
          {...props}
          className={cx(
            "w-full min-w-[32rem] border-collapse text-left text-[0.95rem]",
            className,
          )}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead {...props} className={cx("bg-[var(--background)]", className)} />
    ),
    tbody: ({ className, ...props }) => (
      <tbody {...props} className={className} />
    ),
    tr: ({ className, ...props }) => (
      <tr {...props} className={className} />
    ),
    th: ({ className, ...props }) => (
      <th
        {...props}
        className={cx(
          "border-b border-border px-4 py-3 font-semibold text-foreground",
          className,
        )}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        {...props}
        className={cx("border-b border-border px-4 py-3 align-top text-foreground", className)}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        {...props}
        className={cx(
          "max-w-none overflow-x-auto px-5 py-4 font-mono text-[0.8125rem] leading-[1.72]",
          className,
        )}
      />
    ),
    code: MdxCode,
    figure: ({ className, ...props }) => (
      <figure {...props} className={className} />
    ),
    img: ({ className, alt, ...props }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={alt ?? ""}
        className={cx(
          "my-8 block h-auto max-w-full rounded-xl border border-border",
          className,
        )}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol {...props} className={cx("my-5 list-decimal space-y-1 pl-8", className)} />
    ),
    ul: ({ className, ...props }) => (
      <ul {...props} className={cx("my-5 list-disc space-y-1 pl-7", className)} />
    ),
    li: ({ className, children, ...props }) => (
      <li {...props} className={cx("leading-relaxed", className)}>
        {children}
      </li>
    ),
    a: ({ className, ...props }) => (
      <a
        {...props}
        className={cx("underline underline-offset-4 hover:text-muted", className)}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong {...props} className={cx("font-semibold", className)} />
    ),
    del: ({ className, ...props }) => (
      <del {...props} className={cx("opacity-75", className)} />
    ),
    input: (props: ComponentPropsWithoutRef<"input">) => {
      const { type, className, ...rest } = props;
      if (type === "checkbox") {
        return (
          <input
            type="checkbox"
            {...rest}
            disabled
            className={cx(
              "-mt-px mr-2 translate-y-[1px] align-middle accent-foreground opacity-95",
              className,
            )}
          />
        );
      }
      return <input {...props} />;
    },
  };
}
