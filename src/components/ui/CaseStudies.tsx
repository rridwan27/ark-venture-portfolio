"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Cpu, Globe, ShoppingBag, ArrowUpRight } from "lucide-react";
import FoldText from "./FoldText";

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  title: string;
  description: string;
  metric: { value: string; label: string };
  deliverables: string;
  stack: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accentText: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "nexusflow-ai",
    client: "NexusFlow AI",
    category: "SaaS & AI website",
    title: "AI-Powered Website Development, UI/UX & Paid Acquisition",
    description:
      "Engineered the interactive 3D SaaS product tour, conversion-focused landing pages, and scaled LinkedIn & Meta video ad funnels with full-funnel attribution.",
    metric: { value: "+310%", label: "Trial signups in 90 days" },
    deliverables: "AI web & UI/UX, interactive 3D, full-funnel ads",
    stack: "Next.js 16, Three.js, Motion, Meta Ads",
    icon: Cpu,
    accentText: "text-gray-700",
  },
  {
    id: "cloudpulse-dev",
    client: "CloudPulse Dev",
    category: "Business & portfolio web",
    title: "Company Portfolio Website, 4K Commercials & B2B Lead Gen",
    description:
      "Built a mobile-responsive business & agency portfolio platform alongside high-retention 4K commercial spots across North America & Europe.",
    metric: { value: "4.8x", label: "B2B pipeline ROI generated" },
    deliverables: "Portfolio architecture, 4K commercials, B2B funnels",
    stack: "Next.js, Cinema 4D, Tailwind CSS, LinkedIn Ads",
    icon: Globe,
    accentText: "text-gray-700",
  },
  {
    id: "aura-luxe",
    client: "Aura Luxe",
    category: "Shopify & e-commerce",
    title: "Shopify Website Development, Speed Optimization & Viral Ads",
    description:
      "Redesigned the e-commerce storefront with 99/100 website speed optimization and launched CGI product commercials with a 76% hook rate.",
    metric: { value: "5.2x", label: "Blended ROAS at scale" },
    deliverables: "Shopify 2.0 engine, Lighthouse 99/100, viral CGI ads",
    stack: "Shopify Liquid, Hydrogen, Blender 3D, TikTok Ads",
    icon: ShoppingBag,
    accentText: "text-gray-700",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseStudies() {
  const [activeId, setActiveId] = useState(CASE_STUDIES[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const articleRefs = useRef<(HTMLElement | null)[]>([]);
  const reduce = useReducedMotion();
  const active = CASE_STUDIES.find((c) => c.id === activeId) ?? CASE_STUDIES[0];
  const ActiveIcon = active.icon;
  const shift = reduce ? 0 : 28;

  // Real-time viewport center-line collision detection for active case study
  useEffect(() => {
    if (!sectionRef.current) return;

    const articles = articleRefs.current.filter(
      (a): a is HTMLElement => a !== null
    );
    if (articles.length === 0) return;

    const updateActiveCase = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only track when CaseStudies section is near/in viewport
      if (sectionRect.bottom < 80 || sectionRect.top > vh - 80) {
        return;
      }

      // Reading focal line (approx 45% down from top, below 80px navbar)
      const centerY = 80 + (vh - 80) * 0.45;

      let bestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < articles.length; i++) {
        const rect = articles[i].getBoundingClientRect();
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

      const newId = CASE_STUDIES[bestIdx]?.id;
      if (newId) {
        setActiveId((prev) => (prev !== newId ? newId : prev));
      }
    };

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateActiveCase();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    updateActiveCase();
    const timer = setTimeout(updateActiveCase, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      aria-label="Selected Ventures & Case Studies"
      className="relative w-full bg-white py-24 sm:py-32 scroll-mt-20 border-b border-neutral-200/80"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pb-16 sm:pb-24">
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase block mb-4">
            Selected Ventures &amp; Case Studies
          </span>

          <h2 className="text-center w-full flex justify-center">
            <FoldText
              text="BRANDS & COMPANIES WE SCALED"
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

        {/* Split layout: story list on the left, sticky live metric on the right */}
        {/* Grid items stretch vertically so the sticky right column spans the entire height of the story list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16">
          {/* Project list (left) */}
          <div className="lg:col-span-7 border-b border-neutral-200">
            {CASE_STUDIES.map((study, idx) => {
              const Icon = study.icon;
              const isActive = study.id === activeId;

              return (
                <article
                  key={study.id}
                  ref={(el) => {
                    articleRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveId(study.id)}
                  className={`relative border-t border-neutral-200 py-14 lg:py-24 lg:pl-0 lg:pr-12 transition-all duration-300 cursor-pointer ${
                    isActive ? "opacity-100" : "opacity-60 lg:opacity-70 hover:opacity-95"
                  }`}
                >
                  {/* Moving rail marks the active story on the right */}
                  {isActive && (
                    <motion.span
                      layoutId="case-rail"
                      aria-hidden
                      className={`hidden lg:block absolute right-0 top-0 bottom-0 w-[3px] bg-current ${study.accentText}`}
                      transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                    />
                  )}

                  {/* Metric inline on mobile (sticky panel is hidden there) */}
                  <div className="lg:hidden mb-8">
                    <div
                      className={`text-6xl sm:text-7xl font-extrabold tracking-tighter leading-none tabular-nums ${study.accentText}`}
                    >
                      {study.metric.value}
                    </div>
                    <div className="mt-3 text-base font-medium text-neutral-700">
                      {study.metric.label}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-neutral-500">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                    <span className="font-semibold text-neutral-900">{study.client}</span>
                    <span aria-hidden className="text-neutral-300">/</span>
                    <span>{study.category}</span>
                  </div>

                  <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 leading-[1.1]">
                    {study.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-neutral-600 text-base leading-relaxed">
                    {study.description}
                  </p>

                  <dl className="mt-10 grid grid-cols-[6.5rem_1fr] gap-y-4 text-sm max-w-xl">
                    <dt className="text-neutral-400">Delivered</dt>
                    <dd className="text-neutral-800">{study.deliverables}</dd>
                    <dt className="text-neutral-400">Built with</dt>
                    <dd className="text-neutral-800">{study.stack}</dd>
                  </dl>

                  <div className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                    <span>Verified result</span>
                    <ArrowUpRight size={14} className="text-neutral-500" />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Sticky live metric on the right (desktop) */}
          <div className="hidden lg:block lg:col-span-5 lg:pl-8">
            <div className="sticky top-32 min-h-[22rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: shift }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -shift }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div
                    className={`font-extrabold tracking-tighter leading-[0.9] tabular-nums whitespace-nowrap text-[clamp(4.5rem,8.5vw,8.5rem)] ${active.accentText}`}
                  >
                    {active.metric.value}
                  </div>
                  <div className="mt-6 max-w-xs text-xl font-medium text-neutral-700 leading-snug">
                    {active.metric.label}
                  </div>
                  <div className="mt-10 flex items-center gap-2.5 text-sm text-neutral-500">
                    <ActiveIcon className="w-4 h-4" strokeWidth={1.75} />
                    <span>{active.client}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
