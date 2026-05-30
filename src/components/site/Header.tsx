"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/config/site";
import { Button } from "./Button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forecast-border/80 bg-forecast-surface/90 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-forecast-surface/75">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/logo-horizontal-dark.png"
            alt={SITE.name}
            width={132}
            height={36}
            className="h-8 w-auto md:h-9"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.slice(0, -1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-forecast-muted transition-colors hover:text-forecast-text"
            >
              {link.label}
            </a>
          ))}
          <Button href="#book" variant="primary" className="min-h-[40px] px-5 py-2">
            Book a Call
          </Button>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-forecast-text hover:bg-forecast-bg md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-forecast-border bg-forecast-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-forecast-muted hover:bg-forecast-bg hover:text-forecast-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
