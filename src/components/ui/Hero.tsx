"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import GhostFibers from "@/components/ui/GhostFibers";
import StrokeText from "@/components/ui/StrokeText";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [
      badgeRef.current,
      headingRef.current,
      subtextRef.current,
      ctaRef.current,
    ].filter((el): el is NonNullable<typeof el> => el !== null);

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(targets, { y: 0, autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* GhostFibers interactive WebGL background */}
      <div className="absolute inset-0 z-0 opacity-75 sm:opacity-100 transition-opacity duration-700">
        <GhostFibers
          glowColor="#3f3f46"
          layers={1}
          twist={1.5}
          threads={54}
          fiberStyle="dots"
          depthOfField={0.6}
          hoverEffect="focus"
          intro={true}
          mouseInteraction={true}
          lineColor="#09090b"
          secondaryColor="#a1a1aa"
          volume={0.4}
          foldGlow={1.5}
          particles={0.15}
          sparkle={0.35}
          glow={0.6}
          lightMode={true}
        />
      </div>

      {/* Luminous central radial scrim: keeps WebGL fibers visible while ensuring 100% typography contrast on mobile */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.65)_55%,rgba(255,255,255,0.1)_100%)]"
        aria-hidden="true"
      />

      {/* Hero Content - Centered with balanced mobile spacing */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 pt-8 pb-14 sm:py-20 lg:py-0 pointer-events-none flex flex-col items-center justify-center text-center">
        <div className="max-w-[1140px] mx-auto flex flex-col items-center text-center">
          {/* Subtle Studio Status Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-[0.72rem] sm:text-xs font-semibold tracking-[0.16em] text-neutral-700 uppercase mb-5 sm:mb-6 pointer-events-auto shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ventures · Brands · Digital Products</span>
          </div>

          <h1
            ref={headingRef}
            className="
              text-[clamp(1.75rem,4.6vw,4.2rem)] font-extrabold uppercase
              leading-[1.12] sm:leading-[1.05] tracking-[-0.015em] text-neutral-950
              max-w-[1080px] text-center flex flex-col items-center justify-center
            "
          >
            <span className="block">
              WE TURN AMBITIOUS<br className="sm:hidden" /> IDEAS INTO
            </span>
            <span className="w-full max-w-[820px] my-1 sm:my-2 block pointer-events-auto">
              <StrokeText
                text="MARKET-LEADING"
                strokeColor="#52525b"
                strokeStyle="solid"
                strokeWidth={1.5}
                drawDuration={1.5}
                fillDelay={0.2}
                stagger={0.04}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                fontSize={96}
                fontWeight={800}
                letterSpacing={-2}
                hoverRedraw={true}
                fillColor="currentColor"
              />
            </span>
            <span className="block">
              VENTURES, BRANDS<br className="sm:hidden" /> &amp; COMPANIES.
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="
              mt-5 sm:mt-8
              text-neutral-700 sm:text-neutral-600
              text-[0.98rem] sm:text-[1.15rem] leading-relaxed
              max-w-[340px] sm:max-w-[580px] font-normal mx-auto text-center
            "
          >
            Strategy, design and technology — working together to build what&apos;s next.
          </p>

          <div
            ref={ctaRef}
            className="
              mt-7 sm:mt-10
              flex flex-col sm:flex-row items-stretch sm:items-center justify-center
              gap-3 sm:gap-4
              w-full max-w-[320px] sm:max-w-none mx-auto
              pointer-events-auto
            "
          >
            <Link
              href="/start"
              className="
                group inline-flex items-center justify-center gap-2.5
                bg-neutral-950 text-white
                w-full sm:w-auto px-7 py-3.5 rounded-full
                text-[0.92rem] sm:text-[0.95rem] font-medium tracking-tight
                transition-all duration-300
                hover:bg-neutral-800 hover:gap-3.5
                shadow-sm hover:shadow-md
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
              "
            >
              <span>Start a project</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              href="/work"
              className="
                group inline-flex items-center justify-center gap-2
                bg-neutral-100/90 text-neutral-900 border border-neutral-200/80
                w-full sm:w-auto px-6 py-3.5 rounded-full
                text-[0.92rem] sm:text-[0.95rem] font-medium tracking-tight
                transition-all duration-200
                hover:bg-neutral-200 hover:border-neutral-300
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
              "
            >
              <span>View our work</span>
              <ArrowUpRight
                size={15}
                className="text-neutral-500 transition-all duration-200 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
