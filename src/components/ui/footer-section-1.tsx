"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SocialCloud } from "@/components/ui/footer-section-1-utils/social-cloud";
import { motion, type Variants } from "motion/react";

const FOOTER_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Process", href: "/#process" },
  { label: "ROI Estimator", href: "/#roi-estimator" },
  { label: "Teams", href: "/#teams" },
  { label: "Start Project", href: "/start" },
];

export default function Footer1() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <footer className="w-full pt-16 pb-12 bg-white text-neutral-900 border-t border-neutral-200/80 overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center gap-10 mb-14"
      >
        {/* Brand Logo */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Link href="/" aria-label="Ark Venture Home" className="group">
            <Image
              src="/arkventure-logo.png"
              alt="Ark Venture"
              width={180}
              height={45}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </motion.div>

        {/* Agency Positioning Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm font-medium text-neutral-500 max-w-md -mt-4"
        >
          Brand Building, 4K Commercial Production, SaaS Architecture &amp; Omnichannel Scaling.
        </motion.p>

        {/* Navigation Links */}
        <motion.nav
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-semibold relative z-10"
        >
          {FOOTER_LINKS.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className="relative px-3 py-1.5 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors duration-200"
              >
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Social Media Icons */}
        <motion.div variants={itemVariants}>
          <SocialCloud />
        </motion.div>
      </motion.div>

      {/* Decorative Moving Hatched Divider Strip */}
      <motion.div
        className="w-full h-10 border-y border-neutral-200/80 opacity-60 bg-[repeating-linear-gradient(315deg,#e5e5e5_0,#e5e5e5_1px,transparent_0,transparent_50%)]"
        style={{ backgroundSize: "12px 12px" }}
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "100%" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      />

      {/* Copyright & Legal Bar */}
      <motion.div
        className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>&copy; {new Date().getFullYear()} Ark Venture Limited. All rights reserved.</p>
        <div className="flex items-center gap-6 text-neutral-400">
          <Link href="/#services" className="hover:text-neutral-900 transition-colors">
            Terms
          </Link>
          <span>·</span>
          <Link href="/#services" className="hover:text-neutral-900 transition-colors">
            Privacy Policy
          </Link>
          <span>·</span>
          <Link href="/#roi-estimator" className="hover:text-neutral-900 transition-colors">
            Growth Model
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
