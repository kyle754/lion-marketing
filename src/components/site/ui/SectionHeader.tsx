import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignCls = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl";

  return (
    <div className={`${alignCls} ${className}`}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        {align === "left" && (
          <span className="hidden h-px w-8 bg-gold/60 sm:block" aria-hidden />
        )}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </p>
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-forecast-text md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-forecast-muted">{description}</p>
      )}
    </div>
  );
}
