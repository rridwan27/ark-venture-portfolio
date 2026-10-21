"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import FoldText from "@/components/ui/FoldText";
import {
  Sparkles,
  Code2,
  Film,
  TrendingUp,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";

interface ServiceData {
  id: string;
  tag: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconColor: string;
  metric: {
    value: string;
    label: string;
  };
  deliverables: string[];
  subSection?: {
    title: string;
    items: string[];
  };
  ctaText?: string;
  ctaLink?: string;
}

const SERVICES: ServiceData[] = [
  {
    id: "brand-architecture",
    category: "Brand Strategy",
    tag: "Authority & Market Positioning",
    title: "Brand Strategy & Visual Identity",
    description:
      "Complete brand positioning, visual identity systems, messaging architecture, and go-to-market strategy that transform emerging ventures into trusted, category-defining market leaders.",
    icon: Sparkles,
    iconColor: "text-amber-500",
    metric: {
      value: "Category Authority",
      label: "Engineered for institutional credibility & pricing power",
    },
    deliverables: [
      "Brand Positioning & Narrative",
      "Visual Identity & Monograms",
      "Design Systems & Guidelines",
      "Messaging Architecture",
      "Go-To-Market Launch Strategy",
    ],
    ctaText: "Inquire Brand Architecture",
    ctaLink: "/start",
  },
  {
    id: "website-development",
    category: "Web & SaaS",
    tag: "Full-Stack, UI/UX & 3D WebGL",
    title: "Website Development, Design & SaaS",
    description:
      "Custom Next.js web apps, AI-powered platforms, conversion-focused landing systems, Shopify e-commerce, and bespoke portfolio flagships — engineered for 99/100 Core Web Vitals speed and fluid responsiveness.",
    icon: Code2,
    iconColor: "text-indigo-600",
    metric: {
      value: "99/100",
      label: "Lighthouse performance, instant TTFB & mobile-first precision",
    },
    deliverables: [
      "Custom Next.js Web Apps & SaaS",
      "AI-Powered Platform Architecture",
      "Conversion-Focused Landing Pages",
      "Shopify & E-Commerce Flagships",
      "Interactive 3D / WebGL Systems",
      "Speed & Core Web Vitals Optimization",
    ],
    subSection: {
      title: "Portfolio Architectures Included",
      items: [
        "Executive & Personal Portfolios",
        "Studio & Agency Showcases",
        "Enterprise Company Flagships",
        "Creative & Designer Portfolios",
      ],
    },
    ctaText: "Start Web Project",
    ctaLink: "/start",
  },
  {
    id: "commercial-studio",
    category: "Commercial Studio",
    tag: "Cinema-Grade Visuals",
    title: "Commercial Video & Product Ads",
    description:
      "High-impact 4K commercial spots, SaaS product walk-throughs, 3D CGI product renders, and thumb-stopping paid social creatives engineered to convert viewers into high-intent buyers.",
    icon: Film,
    iconColor: "text-rose-600",
    metric: {
      value: "74%+",
      label: "Average 3-second hook rate on paid social channels",
    },
    deliverables: [
      "4K Commercial Spots & Film",
      "SaaS Software Explainer Demos",
      "3D CGI Product Visualizations",
      "High-Retention Paid Ad Creatives",
      "Motion Graphics & Title Systems",
    ],
    ctaText: "Explore Commercial Studio",
    ctaLink: "/start",
  },
  {
    id: "growth-marketing",
    category: "Growth Marketing",
    tag: "Omnichannel Scaled Acquisition",
    title: "Performance Marketing & Growth",
    description:
      "Full-funnel paid acquisition across Meta, Google, LinkedIn & TikTok, paired with predictable B2B/B2C lead generation, technical SEO, and continuous Conversion Rate Optimization (CRO).",
    icon: TrendingUp,
    iconColor: "text-emerald-600",
    metric: {
      value: "4.9x",
      label: "Average blended ROAS / ROI across active partner portfolios",
    },
    deliverables: [
      "Multi-Channel Paid Acquisition",
      "Conversion Rate Optimization (CRO)",
      "B2B & B2C Lead Generation Engines",
      "Technical & Organic SEO Scaling",
      "Attribution & Analytics Infrastructure",
    ],
    ctaText: "Scale Acquisition",
    ctaLink: "/start",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      aria-label="Full-Service Capabilities"
      className="relative w-full bg-white py-24 sm:py-32 scroll-mt-20 border-b border-neutral-200/80"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Section Header with FoldText */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pb-16 sm:pb-24">
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase block mb-4">
            Full-Service Capabilities
          </span>

          <h2 className="text-center w-full flex justify-center">
            <FoldText
              text="HOW WE BUILD & SCALE BRANDS"
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

        {/* 2x2 Architectural Cards Grid Animated with Motion */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="
                  group relative flex flex-col justify-between
                  bg-neutral-50/70 border border-neutral-200/80
                  rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12
                  transition-colors duration-300
                  hover:border-neutral-950 hover:bg-white hover:shadow-xl hover:shadow-neutral-900/5
                "
              >
                {/* Card Top: Icon & Tag */}
                <div>
                  <div className="flex items-center justify-between gap-4 pb-6 border-b border-neutral-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200/80 flex items-center justify-center shadow-2xs transition-transform duration-300 group-hover:scale-105">
                        <IconComponent
                          className={`w-5 h-5 ${service.iconColor}`}
                          strokeWidth={2}
                        />
                      </div>
                      <span className="text-xs font-semibold tracking-[0.18em] text-neutral-600 uppercase">
                        {service.category}
                      </span>
                    </div>

                    <span className="text-[0.75rem] font-medium tracking-tight text-neutral-500 bg-white/90 border border-neutral-200/70 px-3 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="pt-6">
                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 leading-tight">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables Pills */}
                  <div className="mt-8">
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3">
                      Core Deliverables
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((item, idx) => (
                        <span
                          key={idx}
                          className="
                            inline-flex items-center gap-1.5
                            bg-white border border-neutral-200/80
                            text-neutral-800 text-xs font-medium px-3 py-1.5 rounded-full
                            transition-colors duration-200
                            group-hover:border-neutral-300
                          "
                        >
                          <CheckCircle2 size={12} className="text-neutral-400" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-section (e.g. Portfolio Website Types) */}
                  {service.subSection && (
                    <div className="mt-6 pt-6 border-t border-neutral-200/60">
                      <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-neutral-400 block mb-3 flex items-center gap-1.5">
                        <Layers size={13} className="text-neutral-500" />
                        {service.subSection.title}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.subSection.items.map((subItem, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-neutral-100/70 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
                            <span>{subItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom: Metric & CTA */}
                <div className="mt-10 pt-6 border-t border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                      {service.metric.value}
                    </span>
                    <span className="text-xs text-neutral-500 max-w-[200px] leading-tight font-normal">
                      {service.metric.label}
                    </span>
                  </div>

                  <Link
                    href={service.ctaLink || "/start"}
                    className="
                      inline-flex items-center gap-2
                      text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950
                      transition-all duration-200
                      hover:gap-3 hover:text-black
                    "
                  >
                    <span>{service.ctaText || "Explore"}</span>
                    <ArrowRight size={14} className="text-neutral-400 group-hover:text-black" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
