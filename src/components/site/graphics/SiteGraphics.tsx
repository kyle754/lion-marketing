/** Inline SVG graphics + mobile HTML layouts for landing page sections */

import type { ReactNode } from "react";

const PIPELINE_STEPS = [
  { label: "Intent", sub: "Opt-in demand" },
  { label: "Screen", sub: "Product fit" },
  { label: "Verify", sub: "Phone confirmed" },
  { label: "Deliver", sub: "Exclusive to you" },
] as const;

export function PipelineFlowGraphic({ className = "" }: { className?: string }) {
  return (
    <>
      <PipelineFlowHorizontal className={`hidden min-[540px]:block ${className}`} />
      <PipelineFlowVertical className={`min-[540px]:hidden ${className}`} />
    </>
  );
}

function PipelineFlowHorizontal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full ${className}`}
      aria-hidden
    >
      <rect x="8" y="8" width="404" height="264" rx="20" fill="#FDFCFA" stroke="#E8E4DC" />
      <path
        d="M48 140 H372"
        stroke="#E8E4DC"
        strokeWidth="2"
        strokeDasharray="6 6"
        className="animate-dash-flow"
      />
      {PIPELINE_STEPS.map((node, i) => {
        const x = 48 + i * 100;
        return (
          <g key={node.label}>
            <circle
              cx={x}
              cy={140}
              r={28}
              fill="#FFFFFF"
              stroke={i === 3 ? "#C9A227" : "#E8E4DC"}
              strokeWidth={i === 3 ? 2 : 1.5}
              className={i === 3 ? "animate-soft-pulse" : undefined}
            />
            <circle
              cx={x}
              cy={140}
              r={8}
              fill={i === 3 ? "#C9A227" : "#5C6370"}
              opacity={i === 3 ? 1 : 0.35}
            />
            <text x={x} y={196} textAnchor="middle" fill="#0B0D10" fontSize="12" fontWeight="600">
              {node.label}
            </text>
            <text x={x} y={214} textAnchor="middle" fill="#5C6370" fontSize="10">
              {node.sub}
            </text>
          </g>
        );
      })}
      <rect x="292" y="36" width="108" height="52" rx="10" fill="#0B0D10" />
      <text x="346" y="58" textAnchor="middle" fill="#C9A227" fontSize="10" fontWeight="600">
        YOUR PIPELINE
      </text>
      <text x="346" y="74" textAnchor="middle" fill="#FAFAFA" fontSize="11">
        Real-time flow
      </text>
      <path d="M348 88 V108" stroke="#C9A227" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#C9A227" />
        </marker>
      </defs>
    </svg>
  );
}

function PipelineFlowVertical({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="inline-flex rounded-xl bg-forecast-text px-4 py-2.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">
            Your pipeline
          </p>
          <p className="text-sm font-medium text-forecast-bg">Real-time flow</p>
        </div>
      </div>

      <ol className="relative mt-5">
        {PIPELINE_STEPS.map((step, index) => {
          const isLast = index === PIPELINE_STEPS.length - 1;
          const isActive = isLast;

          return (
            <li key={step.label} className="relative flex gap-4">
              <div className="flex w-14 shrink-0 flex-col items-center">
                <div
                  className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-forecast-surface ${
                    isActive ? "border-gold border-2" : "border-forecast-border"
                  }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isActive ? "bg-gold" : "bg-forecast-muted/35"
                    }`}
                  />
                </div>
                {!isLast && (
                  <div
                    className="my-1 w-0 flex-1 border-l-2 border-dashed border-forecast-border"
                    style={{ minHeight: "2.25rem" }}
                    aria-hidden
                  />
                )}
              </div>

              <div className={`min-w-0 flex-1 ${isLast ? "pt-3.5" : "pb-7 pt-3.5"}`}>
                <p className="text-base font-semibold text-forecast-text">{step.label}</p>
                <p className="mt-0.5 text-sm leading-snug text-forecast-muted">{step.sub}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function InconsistentFlowPanel({ className = "" }: { className?: string }) {
  const leftBars = [14, 11, 16, 10, 13, 12, 15, 11];

  return (
    <svg viewBox="0 0 360 240" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
      <rect width="360" height="240" rx="16" fill="#FFFFFF" stroke="#E8E4DC" />
      <text x="180" y="36" textAnchor="middle" fill="#5C6370" fontSize="14" fontWeight="600">
        Inconsistent flow
      </text>
      {[130, 155, 180].map((y) => (
        <line key={`l-${y}`} x1="32" y1={y} x2="328" y2={y} stroke="#E8E4DC" strokeWidth="1" />
      ))}
      <rect x="32" y="168" width="296" height="32" rx="4" fill="#5C6370" fillOpacity="0.06" />
      <line x1="32" y1="182" x2="328" y2="182" stroke="#5C6370" strokeWidth="1" strokeDasharray="4 5" opacity="0.25" />
      {leftBars.map((h, i) => (
        <rect
          key={`lb-${i}`}
          x={40 + i * 36}
          y={182 - h}
          width="14"
          height={h}
          rx="2"
          fill="#5C6370"
          opacity={0.12 + (i % 3) * 0.04}
        />
      ))}
      <path
        d="M36 184 L72 180 L108 184 L144 182 L180 178 L216 184 L252 181 L288 179 L324 182"
        stroke="#5C6370"
        strokeWidth="2.25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <text x="180" y="218" textAnchor="middle" fill="#5C6370" fontSize="11" opacity="0.55">
        Plateaued · sporadic
      </text>
    </svg>
  );
}

function SteadyAcquisitionPanel({ className = "" }: { className?: string }) {
  const rightBars = [18, 24, 30, 36, 44, 52, 62, 74];

  return (
    <svg viewBox="0 0 360 240" fill="none" className={`h-auto w-full ${className}`} aria-hidden>
      <defs>
        <linearGradient id="growth-steady-fill-panel" x1="180" y1="80" x2="180" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C9A227" stopOpacity="0.28" />
          <stop offset="1" stopColor="#C9A227" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="360" height="240" rx="16" fill="#0B0D10" />
      <text x="180" y="36" textAnchor="middle" fill="#C9A227" fontSize="14" fontWeight="600">
        Steady acquisition
      </text>
      {[110, 135, 160, 185].map((y) => (
        <line key={`r-${y}`} x1="32" y1={y} x2="328" y2={y} stroke="#FFFFFF" strokeWidth="1" opacity="0.07" />
      ))}
      {rightBars.map((h, i) => (
        <rect
          key={`rb-${i}`}
          x={40 + i * 36}
          y={186 - h}
          width="14"
          height={h}
          rx="2"
          fill="#C9A227"
          opacity={0.18 + i * 0.07}
        />
      ))}
      <path
        d="M36 186 C 76 182, 100 166, 136 148 C 172 130, 208 112, 324 78"
        stroke="#C9A227"
        strokeWidth="2.75"
        fill="none"
        strokeLinecap="round"
        className="animate-draw-line"
      />
      <path
        d="M36 186 C 76 182, 100 166, 136 148 C 172 130, 208 112, 324 78 L324 200 L36 200 Z"
        fill="url(#growth-steady-fill-panel)"
      />
      <circle cx="324" cy="78" r="5" fill="#C9A227" />
      <circle cx="324" cy="78" r="8" stroke="#C9A227" strokeWidth="1" opacity="0.35" />
      <text x="180" y="218" textAnchor="middle" fill="#C9A227" fontSize="11" opacity="0.65">
        Consistent · upward
      </text>
    </svg>
  );
}

export function GrowthWaveGraphic({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 ${className}`}>
      <InconsistentFlowPanel />
      <SteadyAcquisitionPanel />
    </div>
  );
}

export function GrowthChannelMobileStack({ className = "" }: { className?: string }) {
  const channels = [
    { label: "Referrals", sub: "Trusted relationships", featured: false },
    { label: "Lion Marketing", sub: "Qualified acquisition", featured: true },
    { label: "Your Marketing", sub: "Current growth channels", featured: false },
  ] as const;

  return (
    <div className={`mx-auto w-full max-w-sm space-y-3 ${className}`}>
      {channels.map((channel, index) => (
        <div key={channel.label}>
          <div
            className={`rounded-2xl border bg-forecast-surface px-5 py-5 text-center shadow-forecast ${
              channel.featured
                ? "border-2 border-gold shadow-forecast-lg"
                : "border-forecast-border"
            }`}
          >
            <p className={`font-semibold text-forecast-text ${channel.featured ? "text-lg" : "text-base"}`}>
              {channel.label}
            </p>
            <p className="mt-1 text-sm text-forecast-muted">{channel.sub}</p>
          </div>
          {index < channels.length - 1 && (
            <p className="py-1 text-center text-sm font-medium text-gold">+</p>
          )}
        </div>
      ))}
      <div className="flex items-center justify-center gap-2 rounded-full bg-forecast-text px-5 py-3.5 text-sm font-semibold text-gold shadow-forecast">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden>
          <path
            d="M4 16 L10 10 L14 13 L20 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 6 H20 V10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Predictable momentum
      </div>
    </div>
  );
}

export function GrowthChannelVennGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mx-auto w-full max-w-3xl ${className}`}
      aria-hidden
    >
      <circle cx="210" cy="138" r="98" fill="#FFFFFF" stroke="#E8E4DC" strokeWidth="1.5" />
      <g transform="translate(210, 92)" stroke="#5C6370" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="-8" cy="6" r="5" fill="none" />
        <path d="M-16 26c2-6 6-9 12-9s10 3 12 9" fill="none" />
        <circle cx="10" cy="6" r="5" fill="none" />
        <path d="M2 26c2-6 6-9 12-9s10 3 12 9" fill="none" />
      </g>
      <text x="210" y="148" textAnchor="middle" fill="#0B0D10" fontSize="15" fontWeight="600">
        Referrals
      </text>
      <text x="210" y="168" textAnchor="middle" fill="#5C6370" fontSize="12">
        Trusted relationships
      </text>
      <circle cx="510" cy="138" r="98" fill="#FFFFFF" stroke="#E8E4DC" strokeWidth="1.5" />
      <g transform="translate(510, 88)" stroke="#5C6370" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M-6 8 L-6 22 L10 28 L10 14 Z" fill="none" />
        <path d="M10 14 L18 12 L18 24 L10 28" fill="none" />
        <path d="M-2 8 C-2 2, 8 -2, 14 4" fill="none" strokeLinecap="round" />
      </g>
      <text x="510" y="148" textAnchor="middle" fill="#0B0D10" fontSize="15" fontWeight="600">
        Your Marketing
      </text>
      <text x="510" y="168" textAnchor="middle" fill="#5C6370" fontSize="12">
        Current growth channels
      </text>
      <circle cx="360" cy="138" r="98" fill="#FFFFFF" stroke="#C9A227" strokeWidth="2.5" />
      <g transform="translate(360, 82)">
        <path
          d="M0 4 L14 8 V22 C14 30 7 36 0 40 C-7 36 -14 30 -14 22 V8 Z"
          fill="#C9A227"
          fillOpacity="0.15"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M-5 18 C-5 14, -2 12, 0 12 C2 12, 5 14, 5 18 C5 22, 2 24, 0 24 C-2 24, -5 22, -5 18 Z"
          fill="#C9A227"
        />
        <path
          d="M-8 10 C-6 6, -2 4, 0 4 C2 4, 6 6, 8 10"
          stroke="#C9A227"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <text x="360" y="148" textAnchor="middle" fill="#0B0D10" fontSize="15" fontWeight="700">
        Lion Marketing
      </text>
      <text x="360" y="168" textAnchor="middle" fill="#5C6370" fontSize="12">
        Qualified acquisition
      </text>
      <rect x="248" y="248" width="224" height="44" rx="22" fill="#0B0D10" />
      <g transform="translate(302, 258)">
        <path
          d="M0 16 L8 8 L14 12 L22 2"
          stroke="#C9A227"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M18 2 H22 V6" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <text x="392" y="276" textAnchor="middle" fill="#C9A227" fontSize="13" fontWeight="600">
        Predictable momentum
      </text>
    </svg>
  );
}

export function ChannelStackGraphic({ className = "" }: { className?: string }) {
  return <GrowthChannelVennGraphic className={className} />;
}

export function ForecastSparkGraphic({ className = "" }: { className?: string }) {
  const bars = [38, 52, 46, 64, 58, 78, 72];
  return (
    <svg viewBox="0 0 280 160" fill="none" className={`w-full ${className}`} aria-hidden>
      <rect width="280" height="160" rx="12" fill="#F5F3EE" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={32 + i * 56} y1="24" x2={32 + i * 56} y2="136" stroke="#E8E4DC" strokeWidth="1" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 36}
          y={136 - h}
          width="24"
          height={h}
          rx="4"
          fill={i >= 4 ? "#C9A227" : "#0B0D10"}
          opacity={i >= 4 ? 0.85 : 0.18 + i * 0.06}
          className="animate-bar-rise"
          style={{ animationDelay: `${i * 90}ms` }}
        />
      ))}
      <path
        d="M32 108 L 68 92 L 104 98 L 140 72 L 176 78 L 212 54 L 248 60"
        stroke="#C9A227"
        strokeWidth="2"
        fill="none"
        className="animate-draw-line"
      />
    </svg>
  );
}

export function IconNetwork({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c1.5-3 3.5-4.5 7-4.5M13 18c1-2 2.5-3 5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBarChart({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 19V11M12 19V5M19 19V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconConversation({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 4h12a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 3v-3H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPipeline({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 18V6M4 18h16M20 18V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 14l3-3 3 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTime({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMomentum({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 16l4-4 3 3 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 7h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconShield({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconUser({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconDocument({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M8 4h8l4 4v12H8V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 4v4h4M10 12h6M10 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessIcons({ step }: { step: string }) {
  const icons: Record<string, ReactNode> = {
    "01": (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "02": (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "03": (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M7 4h10v14H7V4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    "04": (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[step] ?? null;
}
