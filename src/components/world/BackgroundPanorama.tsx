"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const PANORAMA_SRC = "/world/panorama.webp";
const PANORAMA_ASPECT = 13440 / 1920;

export default function BackgroundPanorama() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || viewportWidth === 0 || viewportHeight === 0) return;
    const panoramaWidth = viewportHeight * PANORAMA_ASPECT;
    const maxOffset = Math.max(panoramaWidth - viewportWidth, 0);

    const apply = (value: number) => {
      const clamped = Math.min(Math.max(value, 0), 1);
      el.style.transform = `translate3d(${-(clamped * maxOffset)}px, 0, 0)`;
    };
    apply(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", apply);
    return unsubscribe;
  }, [scrollYProgress, viewportWidth, viewportHeight]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-cream-100"
    >
      <div
        ref={wrapperRef}
        className="absolute inset-y-0 left-0 will-change-transform"
        style={{ width: `${PANORAMA_ASPECT * 100}vh` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PANORAMA_SRC}
          alt=""
          className="block h-full w-full object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}
