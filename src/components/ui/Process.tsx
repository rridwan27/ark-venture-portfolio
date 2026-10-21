"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Code2,
  Film,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import FoldText from "./FoldText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  timeline: string;
  outcome: string;
  deliverables: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    phase: "PHASE 01 · DIAGNOSTIC SPRINT",
    title: "Market & Funnel Audit",
    subtitle: "Discovery, Positioning & Bottleneck Analysis",
    description:
      "We dissect your existing brand positioning, product funnel architecture, competitor benchmarks, and conversion friction points to uncover high-conviction levers before writing a single line of code.",
    icon: Search,
    iconColor: "text-amber-500",
    badgeBg: "bg-amber-50 border-amber-200/70",
    badgeText: "text-amber-700",
    timeline: "Week 01 · Diagnostic Sprint",
    outcome: "Identify highest-conviction growth levers & unit economics targets",
    deliverables: [
      "Brand & Market Positioning Diagnostic",
      "Full-Funnel Bottleneck Mapping",
      "Competitor Benchmark Intelligence",
      "Unit Economics & Conversion Modeling",
      "Strategic 90-Day Execution Roadmap",
    ],
  },
  {
    step: "02",
    phase: "PHASE 02 · DESIGN & ENGINEERING",
    title: "Brand & Web Architecture",
    subtitle: "High-Performance Systems & Digital Flagships",
    description:
      "We engineer bespoke digital flagships, AI-powered platforms, and high-converting e-commerce storefronts built on Next.js, with 99/100 Core Web Vitals speed, fluid UI/UX, and scalable architecture.",
    icon: Code2,
    iconColor: "text-indigo-600",
    badgeBg: "bg-indigo-50 border-indigo-200/70",
    badgeText: "text-indigo-700",
    timeline: "Weeks 02–04 · Build & Deploy",
    outcome: "Sub-second TTFB, institutional authority & frictionless UX",
    deliverables: [
      "Visual Identity & Monogram Systems",
      "Custom Next.js & SaaS Architecture",
      "High-Converting Landing Frameworks",
      "Interactive 3D / WebGL Assets",
      "Lighthouse 99/100 Speed Optimization",
    ],
  },
  {
    step: "03",
    phase: "PHASE 03 · CINEMA-GRADE STUDIO",
    title: "Commercial & Ad Production",
    subtitle: "Cinema-Grade Visuals & Scroll-Stopping Creatives",
    description:
      "We script, direct, render, and produce high-impact 4K commercial spots, 3D CGI product visualizations, and high-retention software explainers engineered to capture buyer attention and drive conversion.",
    icon: Film,
    iconColor: "text-rose-600",
    badgeBg: "bg-rose-50 border-rose-200/70",
    badgeText: "text-rose-700",
    timeline: "Weeks 03–05 · Production Sprint",
    outcome: "74%+ 3-second hook retention & scroll-stopping brand prestige",
    deliverables: [
      "4K Commercial Spots & Film",
      "3D CGI Product Renders & Animations",
      "SaaS Product Explainer Videos",
      "Multi-Format Paid Social Ad Suites",
      "Motion Graphics & Title Packaging",
    ],
  },
  {
    step: "04",
    phase: "PHASE 04 · PERFORMANCE & CRO",
    title: "Omnichannel Scaling",
    subtitle: "Full-Funnel Acquisition & Revenue Compounding",
    description:
      "We deploy and scale high-intent paid acquisition across Meta, Google, LinkedIn, and TikTok, backed by continuous Conversion Rate Optimization (CRO), B2B pipeline automation, and multi-touch attribution.",
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 border-emerald-200/70",
    badgeText: "text-emerald-700",
    timeline: "Ongoing · Scaled Compounding",
    outcome: "4.9x average blended ROAS with compounding growth velocity",
    deliverables: [
      "Multi-Platform Paid Acquisition",
      "Continuous Conversion Rate Optimization (CRO)",
      "B2B & B2C Lead Generation Engines",
      "Technical & Programmatic SEO",
      "Attribution & Cohort Analytics Systems",
    ],
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // GSAP animation for track-wide progress bar and card entrance reveals
  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cards = cardRefs.current.filter((c): c is HTMLElement => c !== null);

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        cards.forEach((card) => {
          gsap.set(card, { autoAlpha: 1, y: 0, scale: 1 });
        });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleY: 1 });
        }
        return;
      }

      // Track-wide vertical progress bar animation
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.3,
            },
          }
        );
      }

      // One-time card entrance reveal animation
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0.5,
            y: 35,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Continuous viewport center-line collision detection for active step
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardRefs.current.filter((c): c is HTMLElement => c !== null);
    if (cards.length === 0) return;

    const updateActiveStep = () => {
      const section = containerRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only evaluate when section is visible in viewport
      if (sectionRect.bottom < 80 || sectionRect.top > vh - 80) {
        return;
      }

      // Reading focal line (approx 45% down from top, below 80px navbar)
      const centerY = 80 + (vh - 80) * 0.45;

      let bestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        // If center reading line is directly inside this card:
        if (rect.top <= centerY && rect.bottom >= centerY) {
          bestIdx = i;
          minDistance = 0;
          break;
        }

        const cardCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(cardCenter - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          bestIdx = i;
        }
      }

      setActiveStep((prev) => (prev !== bestIdx ? bestIdx : prev));
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveStep();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    updateActiveStep();
    const timer = setTimeout(updateActiveStep, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      aria-label="The Ark Venture Growth Engine"
      className="relative w-full bg-[#fbfbfb] py-24 sm:py-32 scroll-mt-20 border-b border-neutral-200/80"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Section Header with FoldText */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pb-16 sm:pb-24 border-b border-neutral-200/80">
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase block mb-4">
            Execution Methodology
          </span>

          <h2 className="text-center w-full flex justify-center">
            <FoldText
              text="THE 4-STEP GROWTH ENGINE"
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
              fontSize="clamp(2.1rem, 5vw, 3.85rem)"
              fontWeight={800}
              className="uppercase tracking-tight text-neutral-950 font-extrabold text-center"
            />
          </h2>
        </div>

        {/* Two-Column Layout: Sticky Left Progress Bar + Right Step Stream */}
        <div className="relative pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Sprint Navigator on Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-sm">
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-2">
                  Active Sprint Focus
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-neutral-950 tracking-tight">
                    {PROCESS_STEPS[activeStep].step}
                  </span>
                  <span className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                    / {PROCESS_STEPS[activeStep].title}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                  {PROCESS_STEPS[activeStep].subtitle}
                </p>

                <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-medium text-neutral-900">
                    {PROCESS_STEPS[activeStep].timeline}
                  </span>
                  <span className="font-semibold text-emerald-600">Active</span>
                </div>
              </div>

              {/* Step Navigation Pill Links */}
              <div className="space-y-2">
                {PROCESS_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.step}
                      type="button"
                      onClick={() => {
                        cardRefs.current[idx]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`
                        w-full text-left px-5 py-3 rounded-xl text-xs font-semibold tracking-tight
                        transition-all duration-200 flex items-center justify-between
                        ${
                          isActive
                            ? "bg-neutral-950 text-white shadow-sm"
                            : "bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-950"
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[0.8rem] ${
                            isActive ? "text-neutral-300" : "text-neutral-400"
                          }`}
                        >
                          {step.step}
                        </span>
                        <span className="uppercase tracking-[0.08em]">
                          {step.title}
                        </span>
                      </span>
                      <ArrowRight
                        size={13}
                        className={`transition-transform duration-200 ${
                          isActive
                            ? "text-white translate-x-1"
                            : "text-neutral-400 opacity-60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: The 4 Process Cards Stream with Continuous Timeline Line */}
          <div className="lg:col-span-8 relative">
            {/* Background Timeline Track */}
            <div
              className="absolute left-6 top-8 bottom-8 w-[2px] bg-neutral-200/80 hidden sm:block"
              aria-hidden="true"
            >
              {/* Dynamic ScrollTrigger Animated Progress Line */}
              <div
                ref={progressBarRef}
                className="w-full bg-neutral-950 origin-top h-full"
              />
            </div>

            {/* Cards Stack */}
            <div className="space-y-8 sm:space-y-12 sm:pl-16">
              {PROCESS_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                const isActive = activeStep === idx;

                return (
                  <article
                    key={step.step}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={`
                      group relative bg-white border rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12
                      transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-neutral-900/5
                      ${
                        isActive
                          ? "border-neutral-950 ring-1 ring-neutral-950/5"
                          : "border-neutral-200/90 hover:border-neutral-400"
                      }
                    `}
                  >
                    {/* Timeline Dot Indicator on Left */}
                    <div
                      className={`
                        absolute -left-[54px] top-10 hidden sm:flex w-7 h-7 rounded-full
                        items-center justify-center border-2 bg-white transition-all duration-300
                        ${
                          isActive
                            ? "border-neutral-950 scale-110 shadow-sm"
                            : "border-neutral-300"
                        }
                      `}
                      aria-hidden="true"
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-neutral-950" : "bg-neutral-300"
                        }`}
                      />
                    </div>

                    {/* Step Card Header: Phase badge & Timeline */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-mono tracking-tight">
                          {step.step}
                        </span>
                        <span
                          className={`
                            px-3 py-1 rounded-full text-[0.72rem] font-semibold tracking-wide uppercase border
                            ${step.badgeBg} ${step.badgeText}
                          `}
                        >
                          {step.timeline}
                        </span>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <IconComponent
                          className={`w-5 h-5 ${step.iconColor}`}
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Title & Narrative */}
                    <div className="pt-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 leading-tight">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold tracking-wide uppercase text-neutral-500">
                        {step.subtitle}
                      </p>
                      <p className="mt-4 text-neutral-600 text-base leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    {/* Deliverables / Sprints Chips */}
                    <div className="mt-8">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                        Sprint Deliverables &amp; Artifacts
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="
                              inline-flex items-center gap-1.5
                              bg-neutral-50 border border-neutral-200/80
                              text-neutral-800 text-xs font-medium px-3 py-1.5 rounded-full
                              transition-colors duration-200 group-hover:border-neutral-300
                            "
                          >
                            <CheckCircle2
                              size={12}
                              className="text-neutral-400 shrink-0"
                            />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Outcome / Target */}
                    <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3 text-xs text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-500 shrink-0" />
                        <span className="font-medium text-neutral-800">
                          {step.outcome}
                        </span>
                      </div>
                      <span className="font-mono text-[0.72rem] uppercase tracking-wider text-neutral-400">
                        Sprint {step.step}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
