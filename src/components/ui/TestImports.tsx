"use client";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { Icon } from "lucide-react";
// react-bits import omitted (requires react-native-web)

export const TestImports = () => {
  // simple usage to verify imports work
  console.log("gsap version:", gsap.version);
  console.log("motion keys:", Object.keys(motion));
  console.log("lucide Icon component:", Icon);
  // console.log("react-bits Animated component:", Animated);
  return null;
};
