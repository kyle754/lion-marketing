"use client";

import { useState } from "react";
import { FAQ_ITEMS, FAQ_SECTION } from "@/config/site";
import { Reveal } from "./motion/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

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
          <SectionHeader
            eyebrow={FAQ_SECTION.eyebrow}
            title={FAQ_SECTION.headline}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        {/* Mobile: single column for linear reading */}
        <div className="mx-auto mt-12 max-w-2xl divide-y divide-forecast-border rounded-2xl border border-forecast-border bg-forecast-bg shadow-forecast lg:hidden">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;

            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full min-h-[52px] items-start justify-between gap-4 px-5 py-4 text-left transition-colors active:bg-forecast-surface/60"
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

        {/* Desktop: two columns */}
        <div className="mx-auto mt-12 hidden max-w-5xl gap-6 lg:grid lg:grid-cols-2">
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
