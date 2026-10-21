"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Code2,
  Compass,
  TrendingUp,
  Zap,
  Palette,
  ShieldCheck,
} from "lucide-react";
import "./Ticker.css";

export interface TickerItem {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  color: string;
}

const DEFAULT_ITEMS: TickerItem[] = [
  {
    label: "VENTURE CREATION",
    icon: Sparkles,
    color: "text-amber-500",
  },
  {
    label: "BRAND ARCHITECTURE",
    icon: Layers,
    color: "text-indigo-600",
  },
  {
    label: "DIGITAL PRODUCTS",
    icon: Code2,
    color: "text-cyan-600",
  },
  {
    label: "STRATEGIC ADVISORY",
    icon: Compass,
    color: "text-emerald-600",
  },
  {
    label: "MARKET EXPANSION",
    icon: TrendingUp,
    color: "text-rose-600",
  },
  {
    label: "AI INNOVATION",
    icon: Zap,
    color: "text-amber-600",
  },
  {
    label: "EXPERIENCE DESIGN",
    icon: Palette,
    color: "text-fuchsia-600",
  },
  {
    label: "CAPITAL & GROWTH",
    icon: ShieldCheck,
    color: "text-teal-600",
  },
];

export interface TickerProps {
  items?: TickerItem[];
  className?: string;
  speedSeconds?: number;
}

export default function Ticker({
  items = DEFAULT_ITEMS,
  className = "",
  speedSeconds = 30,
}: TickerProps) {
  return (
    <section
      aria-label="Capabilities and Services Ticker"
      className={`w-full ${className}`.trim()}
    >
      <div className="w-full py-4 bg-gray-100/70 border-y border-black/10 overflow-hidden ticker-mask relative select-none">
        <div
          className="ticker-track flex items-center"
          style={{ animationDuration: `${speedSeconds}s` }}
        >
          {/* Render duplicated list twice inside the flex track for seamless loop */}
          {Array.from({ length: 2 }).map((_, listIndex) => (
            <div
              key={listIndex}
              className="flex items-center gap-12 shrink-0 pr-12"
              aria-hidden={listIndex > 0 ? "true" : undefined}
            >
              {items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${listIndex}-${itemIndex}`}
                    className="flex items-center gap-3 shrink-0 group transition-opacity hover:opacity-100"
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${item.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                      strokeWidth={2.2}
                    />
                    <span className="text-xs font-semibold tracking-[0.2em] text-neutral-700 uppercase whitespace-nowrap transition-colors duration-200 group-hover:text-neutral-950">
                      {item.label}
                    </span>
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
