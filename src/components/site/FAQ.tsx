"use client";

import { useState } from "react";
import { FAQ_ITEMS, FAQ_SECTION } from "@/config/site";
import { Reveal } from "./motion/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const midpoint = Math.ceil(FAQ_ITEMS.length / 2);
  const columns = [FAQ_ITEMS.slice(0, midpoint), FAQ_ITEMS.slice(midpoint)];

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-forecast-border bg-forecast-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4 md:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {FAQ_SECTION.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-forecast-text md:text-4xl">
              {FAQ_SECTION.headline}
            </h2>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              className="divide-y divide-forecast-border rounded-2xl border border-forecast-border bg-forecast-bg shadow-forecast"
            >
              {col.map((item, i) => {
                const index = colIndex === 0 ? i : i + midpoint;
                const isOpen = open === index;

                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-forecast-surface/60"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-medium text-forecast-text">{item.q}</span>
                      <span
                        className={`mt-0.5 shrink-0 text-gold transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-4 text-sm leading-relaxed text-forecast-muted">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
