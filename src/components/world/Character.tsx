"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CHARACTER_CONFIG,
  POSE_BY_SECTION,
  WALK_FRAMES,
} from "./character.config";
import { useWorldScroll } from "@/lib/useWorldScroll";

export default function Character() {
  const { sectionIndex, inTransition } = useWorldScroll();
  const reduceMotion = useReducedMotion();
  const [walkFrame, setWalkFrame] = useState(0);

  useEffect(() => {
    if (!inTransition || reduceMotion) return;
    const id = window.setInterval(() => {
      setWalkFrame((prev) => (prev + 1) % WALK_FRAMES.length);
    }, CHARACTER_CONFIG.walkSwapMs);
    return () => window.clearInterval(id);
  }, [inTransition, reduceMotion]);

  const safeIndex = Math.min(
    Math.max(sectionIndex, 0),
    POSE_BY_SECTION.length - 1,
  );
  const src =
    inTransition && !reduceMotion
      ? WALK_FRAMES[walkFrame]
      : POSE_BY_SECTION[safeIndex];

  const breatheAnimation = reduceMotion
    ? undefined
    : {
        y: [0, -CHARACTER_CONFIG.bounceAmplitudePx, 0],
      };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed bottom-[2vh] left-1/2 z-30 -translate-x-1/2 will-change-transform"
      style={{ height: `${CHARACTER_CONFIG.displayHeightVh}vh` }}
      animate={breatheAnimation}
      transition={
        reduceMotion
          ? undefined
          : {
              duration: CHARACTER_CONFIG.bouncePeriodMs / 1000,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <div
        className="relative h-full"
        style={{
          aspectRatio: `${CHARACTER_CONFIG.width} / ${CHARACTER_CONFIG.height}`,
          filter: "drop-shadow(0 24px 30px rgba(58, 42, 31, 0.35))",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: CHARACTER_CONFIG.poseFadeMs / 1000 }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 60vh, 56vh"
              className="object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
