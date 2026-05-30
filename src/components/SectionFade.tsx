"use client";

import { useRef, useState, useEffect } from "react";

type SectionFadeProps = { children: React.ReactNode; className?: string };

export function SectionFade({ children, className = "" }: SectionFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`section-fade-in ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
