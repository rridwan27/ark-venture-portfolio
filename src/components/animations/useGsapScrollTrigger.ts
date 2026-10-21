"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapScrollTrigger() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Register plugin only once
    gsap.registerPlugin(ScrollTrigger);
    // Example: pin the element when scrolling
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=500",
          pin: true,
          scrub: true,
        },
        opacity: 1,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return ref;
}
