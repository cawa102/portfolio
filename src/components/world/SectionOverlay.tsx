"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export type SectionAlign = "left" | "center" | "right";

type SectionOverlayProps = {
  id: string;
  sectionIndex: number;
  align?: SectionAlign;
  children: ReactNode;
};

const ALIGN_CLASSES: Record<SectionAlign, string> = {
  left: "items-end justify-start sm:items-center sm:justify-start",
  center: "items-end justify-center sm:items-center sm:justify-center",
  right: "items-end justify-end sm:items-center sm:justify-end",
};

export default function SectionOverlay({
  id,
  sectionIndex,
  align = "left",
  children,
}: SectionOverlayProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  return (
    <section
      ref={ref}
      id={id}
      data-section-index={sectionIndex}
      className={`relative flex min-h-screen w-full px-6 py-20 sm:px-12 lg:px-24 ${ALIGN_CLASSES[align]}`}
    >
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-3xl rounded-3xl bg-cream-50/85 p-8 shadow-soft backdrop-blur-md sm:p-10 lg:p-12"
      >
        {children}
      </motion.div>
    </section>
  );
}
