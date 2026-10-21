"use client";

import {
  getAllPeople,
  getAvatarUrl,
  type Person,
} from "@/components/ui/team-2-utils/smoothui-data";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  Briefcase,
  Layers,
} from "lucide-react";
import FoldText from "./FoldText";

const CARDS_PER_VIEW = 3;
const CARD_WIDTH = 288;
const CARD_GAP = 16;
const AUTOPLAY_INTERVAL = 5000;
const TRANSITION_TIMEOUT = 1500;
const AVATAR_SIZE = 160;
const STAGGER_DELAY = 0.1;

interface TeamCarouselProps {
  id?: string;
  description?: string;
  members?: Person[];
  subtitle?: string;
  title?: string;
}

export function TeamCarousel({
  id = "teams",
  title = "The Minds Behind Ark Venture",
  subtitle = "Executive & Technical Leadership",
  description = "Combining high-converting brand growth, commercial video direction, and enterprise full-stack engineering.",
  members = getAllPeople(),
}: TeamCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isDuo = members.length <= 2;
  const maxIndex = Math.max(0, members.length - CARDS_PER_VIEW);

  useEffect(() => {
    if (isDuo || !isAutoPlaying || isTransitioning) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [members.length, isAutoPlaying, isTransitioning, isDuo, maxIndex]);

  const nextSlide = () => {
    if (isTransitioning || currentIndex >= maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setIsAutoPlaying(false);

    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, TRANSITION_TIMEOUT);
  };

  const prevSlide = () => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setIsAutoPlaying(false);

    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, TRANSITION_TIMEOUT);
  };

  return (
    <section
      id={id}
      aria-label="Ark Venture Leadership Team"
      className="relative w-full bg-white py-24 sm:py-32 scroll-mt-20 border-b border-neutral-200/80 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Centered Header with FoldText */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pb-16 sm:pb-24 border-b border-neutral-200/80">
          <span className="text-xs font-semibold tracking-[0.25em] text-neutral-500 uppercase block mb-4">
            {subtitle}
          </span>

          <h2 className="text-center w-full flex justify-center">
            <FoldText
              text="THE MINDS BEHIND ARK VENTURE"
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

        {/* When 2 members (Duo founders: Arkan Bhuiyan & Ridwan Arnob) */}
        {isDuo ? (
          <div className="pt-12 sm:pt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {members.map((member, index) => {
              const isCEO = index === 0;

              return (
                <motion.article
                  key={member.name}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 30, scale: 0.98 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    group relative flex flex-col justify-between
                    bg-[#fafafa] hover:bg-white
                    border border-neutral-200/90 hover:border-neutral-950/40
                    rounded-3xl p-8 sm:p-10
                    transition-all duration-300
                    hover:shadow-2xl hover:shadow-neutral-900/5 hover:-translate-y-1.5
                  "
                >
                  <div>
                    {/* Header: Discipline pill & Role icon */}
                    <div className="flex items-center justify-between pb-6 border-b border-neutral-200/70">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.7rem] font-mono uppercase tracking-wider bg-white border border-neutral-200/80 text-neutral-600 font-semibold shadow-xs">
                        {isCEO ? (
                          <Briefcase size={12} className="text-neutral-500" />
                        ) : (
                          <Code2 size={12} className="text-neutral-500" />
                        )}
                        <span>{member.discipline || "Leadership"}</span>
                      </span>

                      <span className="font-mono text-xs text-neutral-400">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Portrait & Monogram Badge Presentation */}
                    <div className="pt-8 pb-4 flex items-center gap-5">
                      <div className="relative size-20 sm:size-24 rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-sm shrink-0">
                        <img
                          src={getAvatarUrl(member.avatar, AVATAR_SIZE)}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      <div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950">
                          {member.name}
                        </h3>
                        <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Bio Narrative */}
                    <p className="mt-5 text-neutral-600 text-sm leading-relaxed font-normal">
                      {member.experience}
                    </p>

                    {/* Core Skills & Focus Chips */}
                    {member.skills && member.skills.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {member.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="
                              inline-flex items-center gap-1.5
                              bg-white border border-neutral-200/80
                              text-neutral-700 text-xs font-medium px-3 py-1 rounded-full
                              transition-colors duration-200 group-hover:border-neutral-300
                            "
                          >
                            <Sparkles size={11} className="text-neutral-400" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Ark Monogram & Verified Badge */}
                  <div className="mt-8 pt-5 border-t border-neutral-200/70 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/arkventure-logo.png"
                        alt="Ark Venture"
                        width={36}
                        height={36}
                        className="h-4 w-auto opacity-70"
                      />
                      <span className="font-semibold text-neutral-800">
                        Ark Venture Partner
                      </span>
                    </div>

                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-neutral-400">
                      Co-Founder
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* Carousel mode for 3+ team members */
          <div className="relative pt-12 sm:pt-16">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-end gap-3 mb-8">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentIndex === 0 || isTransitioning}
                aria-label="Previous slide"
                className="
                  size-11 rounded-full border border-neutral-200/90 bg-white
                  flex items-center justify-center text-neutral-800
                  transition-all duration-200 hover:bg-neutral-100 hover:border-neutral-400
                  disabled:opacity-40 disabled:pointer-events-none shadow-xs
                "
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex || isTransitioning}
                aria-label="Next slide"
                className="
                  size-11 rounded-full border border-neutral-200/90 bg-white
                  flex items-center justify-center text-neutral-800
                  transition-all duration-200 hover:bg-neutral-100 hover:border-neutral-400
                  disabled:opacity-40 disabled:pointer-events-none shadow-xs
                "
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Carousel Viewport */}
            <div className="overflow-hidden">
              <motion.div
                animate={{
                  x: `-${currentIndex * (CARD_WIDTH + CARD_GAP)}px`,
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { damping: 30, stiffness: 300, type: "spring" }
                }
                className="flex gap-4 select-none"
              >
                {members.map((member, index) => (
                  <div
                    key={member.name}
                    className="w-72 shrink-0"
                  >
                    <div className="rounded-3xl border border-neutral-200/90 bg-[#fafafa] p-7 text-center hover:bg-white transition-all duration-300 hover:shadow-xl">
                      <img
                        alt={member.name}
                        className="mx-auto size-20 rounded-full border border-neutral-200 object-cover shadow-xs"
                        draggable={false}
                        height={80}
                        src={getAvatarUrl(member.avatar, AVATAR_SIZE)}
                        width={80}
                      />
                      <div className="mt-6 flex flex-col justify-center">
                        <p className="font-extrabold text-neutral-950 text-lg uppercase tracking-tight">
                          {member.name}
                        </p>
                        <p className="text-neutral-500 text-xs font-semibold mt-1">
                          {member.role}
                        </p>
                      </div>
                      <div className="my-6 h-px w-full bg-neutral-200/80" />
                      <p className="text-neutral-600 text-xs leading-relaxed">
                        {member.experience}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TeamCarousel;
