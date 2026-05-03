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

    // Backgrounded tabs and unfocused windows cause the browser to throttle rAF
    // and suspend the video decoder. After return, the on-screen frame can stay
    // stale even when currentTime writes succeed.
    // - visibilitychange: covers tab switch / window minimise / occlusion
    // - window focus: covers OS-level app switch where the window stays visible
    //   on screen but loses focus (visibilitychange does NOT fire on macOS in
    //   that case)
    // On resume: re-sync target from scroll, nudge currentTime so the decoder
    // produces a fresh frame, and play/pause to kick the media pipeline.
    const handleResume = () => {
      const v = videoRef.current;
      if (!v) return;

      targetTimeRef.current = Math.min(Math.max(scrollYProgress.get(), 0), 1);

      if (Number.isFinite(v.duration) && v.duration > 0) {
        const target = targetTimeRef.current * v.duration;
        const nudged = Math.min(v.duration, Math.max(0, target + 0.001));
        const final = Math.min(v.duration, Math.max(0, target));
        try {
          v.currentTime = nudged;
          v.currentTime = final;
        } catch {
          /* ignore seek errors */
        }
      }

      // Kick the decoder: muted videos can play() without user gesture.
      // Pausing immediately keeps it in scrub mode.
      const playResult = v.play();
      if (playResult && typeof playResult.then === "function") {
        playResult.then(() => v.pause()).catch(() => {});
      } else {
        try {
          v.pause();
        } catch {
          /* ignore */
        }
      }

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      handleResume();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleResume);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      unsubscribe();
      video.removeEventListener("loadedmetadata", handleLoaded);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleResume);
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
