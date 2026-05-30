import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal-dark shadow-forecast hover:bg-gold-hover hover:shadow-forecast-lg active:scale-[0.98]",
  secondary:
    "border border-forecast-border bg-forecast-surface text-forecast-text shadow-sm hover:border-gold/40 hover:shadow-forecast active:scale-[0.98]",
  ghost: "text-forecast-muted hover:text-forecast-text",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const cls = `inline-flex min-h-[48px] items-center justify-center rounded-lg px-6 text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`;

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
