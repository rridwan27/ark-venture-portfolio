"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, Fragment } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#process", label: "Process" },
  { href: "/#roi-estimator", label: "ROI Estimator" },
  { href: "/#teams", label: "Teams" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  // GSAP entrance — wrapped in gsap.context for Strict Mode cleanup,
  // using fromTo so start/end values are always explicit.
  useEffect(() => {
    if (!navRef.current) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        // Ensure fully visible even when motion is off
        gsap.set(navRef.current!, { y: 0, autoAlpha: 1 });
        if (linksRef.current) {
          gsap.set(linksRef.current.children, { y: 0, autoAlpha: 1 });
        }
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete() {
          // Remove inline transform so it never breaks position:fixed children
          gsap.set(navRef.current!, { clearProps: "transform,opacity,visibility" });
        },
      });

      tl.fromTo(
        navRef.current!,
        { y: -24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 }
      );

      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { y: -12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06 },
          "-=0.3"
        );
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation — also context-scoped
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        document.body.style.overflow = "hidden";

        gsap.fromTo(
          mobileMenuRef.current!,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: prefersReduced ? 0 : 0.5,
            ease: "power3.inOut",
          }
        );

        if (!prefersReduced) {
          const items = mobileMenuRef.current!.querySelectorAll("li");
          gsap.fromTo(
            items,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.35,
              stagger: 0.07,
              delay: 0.15,
              ease: "power2.out",
            }
          );
        }
      } else {
        document.body.style.overflow = "";
      }
    }, mobileMenuRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <Fragment>
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white"
      >
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
          {/* Brand — logo already contains the AV monogram + ArkVenture text */}
          <Link
            href="/"
            className="relative z-10 group"
            aria-label="Ark Venture Home"
          >
            <Image
              src="/arkventure-logo.png"
              alt="Ark Venture"
              width={160}
              height={40}
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul
            ref={linksRef}
            className="hidden lg:flex items-center gap-10"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      relative text-[0.9rem] transition-colors duration-200
                      ${isActive
                        ? "text-black"
                        : "text-neutral-500 hover:text-black"
                      }
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/start"
              className="
                group inline-flex items-center gap-2
                bg-black text-white
                px-5 py-2.5 rounded-full
                text-[0.875rem] font-medium
                transition-all duration-300
                hover:gap-3
              "
            >
              Start a project
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="relative z-[60] lg:hidden p-2 text-black"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
            {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu — rendered as sibling to <header>, not inside it,
          so position:fixed works even if GSAP leaves a transform on <header>. */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="
            fixed inset-0 z-50
            bg-white
            flex flex-col justify-between
            px-6 pt-24 pb-10
            lg:hidden
          "
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`
                      block py-3
                      text-[2rem] font-light tracking-[-0.02em]
                      transition-colors duration-200
                      ${isActive ? "text-black" : "text-neutral-400 hover:text-black"}
                    `}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/start"
            className="
              inline-flex items-center justify-center gap-2
              bg-black text-white
              w-full py-4 rounded-full
              text-[1rem] font-medium
              transition-colors duration-200
            "
            onClick={handleLinkClick}
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </Fragment>
  );
}
