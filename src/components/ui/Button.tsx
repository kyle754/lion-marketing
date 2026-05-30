import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary";
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function Button({ variant = "primary", href, children, className = "" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 ease-out min-h-[44px] px-5 py-2.5";

  const styles =
    variant === "primary"
      ? "bg-gold text-charcoal-dark hover:bg-gold-hover hover:shadow-[0_0_20px_rgba(201,162,39,0.25)]"
      : "border-2 border-gold bg-transparent text-gold hover:bg-gold/10";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}
