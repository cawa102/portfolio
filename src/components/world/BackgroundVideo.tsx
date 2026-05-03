"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";

const VIDEO_SRC = "/world/master.mp4";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { scrollYProgress } = useScroll();
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      readyRef.current = true;
    };
    video.addEventListener("loadedmetadata", handleLoaded);
    if (video.readyState >= 1) handleLoaded();

    const tick = () => {
      const v = videoRef.current;
      if (v && readyRef.current && Number.isFinite(v.duration)) {
        const next = targetTimeRef.current * v.duration;
        if (Math.abs(v.currentTime - next) > 0.01) {
          try {
            v.currentTime = next;
          } catch {
            /* ignore seek errors during teardown */
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const unsubscribe = scrollYProgress.on("change", (value) => {
      targetTimeRef.current = Math.min(Math.max(value, 0), 1);
    });
    targetTimeRef.current = scrollYProgress.get();

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      unsubscribe();
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [scrollYProgress]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="metadata"
        disableRemotePlayback
        className="h-full w-full object-cover"
      />
    </div>
  );
}
