"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Lead Standards", href: "#lead-standards" },
  { label: "FAQ", href: "#faq" },
  { label: "Book a Call", href: "#calendar" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-charcoal-dark border-b border-charcoal-card/50">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex shrink-0" onClick={closeMenu}>
          <Image
            src="/images/logo-horizontal-dark.png"
            alt="Lion Marketing"
            width={140}
            height={38}
            className="h-8 w-auto md:h-[38px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-gray text-[15px] transition-colors duration-200 ease-out hover:text-off-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#calendar"
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-medium text-charcoal-dark transition-all duration-200 ease-out hover:bg-gold-hover hover:shadow-[0_0_20px_rgba(201,162,39,0.25)]"
          >
            See If This Is a Fit
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-off-white hover:bg-charcoal-card md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-charcoal-card/50 bg-charcoal-dark px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex min-h-[44px] items-center rounded-lg px-4 text-body-gray transition-colors hover:bg-charcoal-card hover:text-off-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#calendar"
              onClick={closeMenu}
              className="mt-2 flex min-h-[44px] items-center justify-center rounded-lg bg-gold px-4 font-medium text-charcoal-dark"
            >
              See If This Is a Fit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
