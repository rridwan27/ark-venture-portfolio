"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  DollarSign,
  Calculator,
} from "lucide-react";
import FoldText from "./FoldText";

interface Preset {
  label: string;
  tag: string;
  investment: number;
  roas: number;
}

const PRESETS: Preset[] = [
  { label: "Seed Stage", tag: "Early Momentum", investment: 5000, roas: 3.8 },
  { label: "Growth Scale", tag: "Most Common", investment: 10000, roas: 4.8 },
  { label: "Market Challenger", tag: "Aggressive", investment: 35000, roas: 5.4 },
  { label: "Enterprise Leader", tag: "Maximum Scale", investment: 80000, roas: 6.2 },
];

export default function RoiEstimator() {
  const [investment, setInvestment] = useState<number>(10000);
  const [roas, setRoas] = useState<number>(4.8);
  const [funnelModel, setFunnelModel] = useState<"omnichannel" | "b2b_saas">("omnichannel");

  const investmentSliderId = useId();
  const roasSliderId = useId();

  // Calculations
  const adjustedRoas = funnelModel === "b2b_saas" ? Number((roas * 1.15).toFixed(1)) : roas;
  const projectedMonthlyRevenue = Math.round(investment * adjustedRoas);
  const netMonthlyGain = Math.round(projectedMonthlyRevenue - investment);
  const projectedAnnualRevenue = Math.round(projectedMonthlyRevenue * 12);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const investmentPercent = Math.min(
    100,
    Math.max(0, ((investment - 2500) / (150000 - 2500)) * 100)
  );

  const roasPercent = Math.min(
    100,
    Math.max(0, ((roas - 2.0) / (8.0 - 2.0)) * 100)
  );

  return (
    <section
      id="roi-estimator"
      aria-label="Interactive Growth & ROI Simulator"
      className="relative w-full bg-[#fbfbfb] py-24 sm:py-32 scroll-mt-20 border-b border-neutral-200/80 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Section Header with FoldText */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pb-16 sm:pb-24 border-b border-neutral-200/80">
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase block mb-4">
            Interactive Growth Simulator
          </span>

          <h2 className="text-center w-full flex justify-center">
            <FoldText
              text="ESTIMATE YOUR BRAND & COMPANY ROI"
              foldStyle="paper"
              splitBy="char"
              hinge="top"
              trigger="scroll"
              foldAngle={92}
              duration={0.65}
              stagger={0.035}
              staggerFrom="start"
              ease="power3.out"
              hoverRefold={true}
              refoldRadius={140}
              refoldAngle={45}
              perspective={700}
              creaseShading={0.55}
              fontSize="clamp(2rem, 4.8vw, 3.8rem)"
              fontWeight={800}
              className="uppercase tracking-tight text-neutral-950 font-extrabold text-center"
            />
          </h2>
        </div>

        {/* Quick-Select Investment Presets */}
        <div className="pt-10 pb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mr-1 hidden sm:inline-block">
            Quick Scenarios:
          </span>
          {PRESETS.map((preset) => {
            const isSelected = investment === preset.investment && roas === preset.roas;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setInvestment(preset.investment);
                  setRoas(preset.roas);
                }}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                  transition-all duration-200 border
                  ${
                    isSelected
                      ? "bg-neutral-950 text-white border-neutral-950 shadow-sm scale-[1.02]"
                      : "bg-white text-neutral-700 border-neutral-200/80 hover:border-neutral-400 hover:bg-neutral-50"
                  }
                `}
              >
                <span>{preset.label}</span>
                <span
                  className={`text-[0.7rem] px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-neutral-200" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {formatCurrency(preset.investment)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-6 bg-white border border-neutral-200/90 rounded-3xl p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div className="space-y-8">
              {/* Funnel Model Switcher */}
              <div>
                <label className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                  Select Funnel Model &amp; Architecture
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-neutral-100/80 rounded-2xl border border-neutral-200/60">
                  <button
                    type="button"
                    onClick={() => setFunnelModel("omnichannel")}
                    className={`
                      py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200
                      ${
                        funnelModel === "omnichannel"
                          ? "bg-white text-neutral-950 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-900"
                      }
                    `}
                  >
                    Omnichannel Growth &amp; E-Com
                  </button>
                  <button
                    type="button"
                    onClick={() => setFunnelModel("b2b_saas")}
                    className={`
                      py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200
                      ${
                        funnelModel === "b2b_saas"
                          ? "bg-white text-neutral-950 shadow-sm"
                          : "text-neutral-500 hover:text-neutral-900"
                      }
                    `}
                  >
                    B2B SaaS &amp; High-Ticket Pipeline
                  </button>
                </div>
              </div>

              {/* Control 1: Monthly Investment Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={investmentSliderId}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5"
                  >
                    <DollarSign size={14} className="text-neutral-400" />
                    <span>Monthly Ad &amp; Growth Investment</span>
                  </label>
                  <span className="font-mono text-lg sm:text-xl font-extrabold text-neutral-950">
                    {formatCurrency(investment)}
                    <span className="text-xs font-normal text-neutral-500 ml-1">/ mo</span>
                  </span>
                </div>

                {/* Range Slider Track */}
                <div className="relative pt-1">
                  <div className="h-2 w-full bg-neutral-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-950 transition-all duration-75"
                      style={{ width: `${investmentPercent}%` }}
                    />
                  </div>
                  <input
                    id={investmentSliderId}
                    type="range"
                    min={2500}
                    max={150000}
                    step={investment < 25000 ? 500 : 2500}
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="
                      absolute inset-0 w-full h-4 opacity-0 cursor-pointer
                      focus:outline-hidden
                    "
                    aria-label="Monthly Ad and Growth Investment"
                  />
                </div>

                <div className="flex justify-between text-[0.7rem] text-neutral-400 font-mono">
                  <span>$2,500/mo</span>
                  <span>$50,000</span>
                  <span>$150,000/mo</span>
                </div>
              </div>

              {/* Control 2: Target Blended ROAS Multiplier */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={roasSliderId}
                    className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5"
                  >
                    <TrendingUp size={14} className="text-neutral-400" />
                    <span>Target Blended ROAS Multiplier</span>
                  </label>
                  <span className="font-mono text-lg sm:text-xl font-extrabold text-neutral-950">
                    {adjustedRoas.toFixed(1)}x
                    <span className="text-xs font-normal text-neutral-500 ml-1">ROAS</span>
                  </span>
                </div>

                {/* Range Slider Track */}
                <div className="relative pt-1">
                  <div className="h-2 w-full bg-neutral-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-75"
                      style={{ width: `${roasPercent}%` }}
                    />
                  </div>
                  <input
                    id={roasSliderId}
                    type="range"
                    min={2.0}
                    max={8.0}
                    step={0.1}
                    value={roas}
                    onChange={(e) => setRoas(Number(e.target.value))}
                    className="
                      absolute inset-0 w-full h-4 opacity-0 cursor-pointer
                      focus:outline-hidden
                    "
                    aria-label="Target Blended ROAS Multiplier"
                  />
                </div>

                <div className="flex justify-between text-[0.7rem] text-neutral-400 font-mono">
                  <span>2.0x (Direct Baseline)</span>
                  <span className="text-indigo-600 font-semibold">4.8x (Ark Average)</span>
                  <span>8.0x (Unicorn Run)</span>
                </div>
              </div>
            </div>

            {/* Methodology Note */}
            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>Calibrated against historical client sprint data</span>
              </div>
              <span className="font-mono text-[0.7rem] uppercase text-neutral-400">
                Algorithm v2.4
              </span>
            </div>
          </div>

          {/* Right Column: Projected Returns Showcase Panel */}
          <div className="lg:col-span-6 bg-neutral-950 text-white border border-neutral-900 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Gradient for modern depth */}
            <div
              className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Badge */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Projected Monthly Revenue Return</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[0.7rem] font-mono uppercase tracking-wider bg-neutral-900 text-neutral-300 border border-neutral-800">
                  {adjustedRoas.toFixed(1)}x ROAS Output
                </span>
              </div>

              {/* Big Headline Projected Return */}
              <div className="pt-8">
                <div className="text-[clamp(3.5rem,7.5vw,5.5rem)] font-extrabold tracking-tight leading-none font-mono text-white tabular-nums">
                  {formatCurrency(projectedMonthlyRevenue)}
                </div>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-md">
                  Powered by custom 4K ad creative suites, high-speed Next.js conversion architecture, and predictive attribution funnels.
                </p>
              </div>

              {/* Multi-Dimensional Impact Metrics */}
              <div className="mt-10 grid grid-cols-2 gap-4 pt-6 border-t border-neutral-800/80">
                <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Net Monthly Gain
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                    +{formatCurrency(netMonthlyGain)}
                  </div>
                  <span className="text-[0.68rem] text-neutral-500 mt-0.5 block">
                    After ad investment
                  </span>
                </div>

                <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Annual Run-Rate
                  </span>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {formatCurrency(projectedAnnualRevenue)}
                  </div>
                  <span className="text-[0.68rem] text-neutral-500 mt-0.5 block">
                    Annualized gross revenue
                  </span>
                </div>
              </div>
            </div>

            {/* Conversion CTA Strip */}
            <div className="relative z-10 mt-10 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                Ready to validate this growth model with our strategists?
              </div>

              <Link
                href="/start"
                className="
                  group inline-flex items-center justify-center gap-2.5
                  bg-white text-neutral-950
                  px-6 py-3.5 rounded-full
                  text-sm font-semibold tracking-tight
                  transition-all duration-300
                  hover:bg-neutral-100 hover:gap-3.5 shrink-0
                "
              >
                <span>Book Strategy Call</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
