"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 400;

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY >= SCROLL_THRESHOLD);
    onScroll(); // in case we're already scrolled (e.g. refresh)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-charcoal-card/50 bg-charcoal-dark py-3 px-4 transition-opacity duration-200 md:hidden"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <Link
        href="#calendar"
        className="flex min-h-[44px] items-center justify-center rounded-lg bg-gold font-medium text-charcoal-dark"
      >
        See If This Is a Fit
      </Link>
    </div>
  );
}
