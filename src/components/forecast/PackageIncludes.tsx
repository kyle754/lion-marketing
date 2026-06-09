const INCLUDES = [
  "Exclusive lead delivery",
  "OTP phone verification",
  "Real-time delivery",
  "Life insurance / IUL intent",
  "Delivered over selected pacing window",
  "No shared lead competition",
] as const;

export function PackageIncludes() {
  return (
    <aside className="rounded-xl border border-forecast-border bg-forecast-surface p-5 shadow-forecast">
      <h3 className="text-sm font-semibold text-forecast-text">
        What the Package Includes
      </h3>
      <ul className="mt-4 space-y-2.5">
        {INCLUDES.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm text-forecast-muted before:mt-2 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-gold before:content-['']"
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
