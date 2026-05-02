import type { ReactNode } from "react";

export type CalloutVariant = "info" | "tip" | "warning" | "note";

const VARIANT_LABEL: Record<CalloutVariant, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  info: "Info",
};

const VARIANT_ACCENT: Record<CalloutVariant, string> = {
  note: "border-l-neutral-500 dark:border-l-neutral-400",
  tip: "border-l-emerald-600 dark:border-l-emerald-500",
  warning: "border-l-amber-600 dark:border-l-amber-500",
  info: "border-l-sky-600 dark:border-l-sky-400",
};

type CalloutProps = {
  variant?: CalloutVariant;
  /** Optional headline; omit to use the default label for `variant`. */
  title?: string;
  children: ReactNode;
};

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function Callout({
  variant = "note",
  title,
  children,
}: CalloutProps) {
  const label = title?.trim().length ? title.trim() : VARIANT_LABEL[variant];

  return (
    <aside
      className={cx(
        "my-8 rounded-2xl border border-border bg-surface px-5 py-4 text-[1.02rem] leading-[1.7] dark:bg-white/[0.03]",
        "border-l-4",
        VARIANT_ACCENT[variant],
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <div className="mt-3 text-pretty [&>p:first-of-type]:mt-0 [&>p:last-of-type]:mb-0 [&>p]:my-3 [&_code]:rounded-md [&_code]:border [&_code]:border-border [&_code]:bg-[var(--background)] [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[0.92em]">
        {children}
      </div>
    </aside>
  );
}
