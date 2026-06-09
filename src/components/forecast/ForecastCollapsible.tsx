"use client";

import { useState, type ReactNode } from "react";

interface ForecastCollapsibleProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function ForecastCollapsible({
  title,
  subtitle,
  children,
  defaultOpen = false,
  className = "",
}: ForecastCollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`rounded-xl border border-forecast-border bg-forecast-surface shadow-forecast ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <p className="text-sm font-semibold text-forecast-text">{title}</p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-forecast-muted">{subtitle}</p>
          )}
        </div>
        <span
          className="shrink-0 text-forecast-muted transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="border-t border-forecast-border px-5 pb-5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
}
