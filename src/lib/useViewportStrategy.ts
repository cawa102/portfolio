"use client";

import { useEffect, useState } from "react";

export type ViewportStrategy = "desktop" | "mobile";

const NARROW_QUERY = "(max-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function isIosSafari(userAgent: string): boolean {
  return (
    /iPad|iPhone|iPod/.test(userAgent) &&
    /Safari/.test(userAgent) &&
    !/CriOS|FxiOS|EdgiOS/.test(userAgent)
  );
}

function detectStrategy(): ViewportStrategy {
  if (typeof window === "undefined") return "desktop";

  const narrow = window.matchMedia(NARROW_QUERY).matches;
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const iosSafari =
    typeof navigator !== "undefined" && isIosSafari(navigator.userAgent);

  return narrow || reducedMotion || iosSafari ? "mobile" : "desktop";
}

export function useViewportStrategy(): ViewportStrategy {
  const [strategy, setStrategy] = useState<ViewportStrategy>("desktop");

  useEffect(() => {
    setStrategy(detectStrategy());

    const narrow = window.matchMedia(NARROW_QUERY);
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    const handle = () => setStrategy(detectStrategy());

    narrow.addEventListener("change", handle);
    reducedMotion.addEventListener("change", handle);

    return () => {
      narrow.removeEventListener("change", handle);
      reducedMotion.removeEventListener("change", handle);
    };
  }, []);

  return strategy;
}
