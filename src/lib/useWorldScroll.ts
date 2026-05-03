"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

export const SECTION_COUNT = 7;

const TRANSITION_BAND = 0.2;

export type WorldScrollState = {
  progress: number;
  sectionIndex: number;
  sectionProgress: number;
  inTransition: boolean;
};

const INITIAL_STATE: WorldScrollState = {
  progress: 0,
  sectionIndex: 0,
  sectionProgress: 0,
  inTransition: false,
};

function deriveState(progress: number): WorldScrollState {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const scaled = clamped * SECTION_COUNT;
  const rawIndex = Math.floor(scaled);
  const sectionIndex = Math.min(rawIndex, SECTION_COUNT - 1);
  const sectionProgress = Math.min(Math.max(scaled - sectionIndex, 0), 1);
  const inTransition =
    sectionProgress < TRANSITION_BAND || sectionProgress > 1 - TRANSITION_BAND;
  return { progress: clamped, sectionIndex, sectionProgress, inTransition };
}

export function useWorldScroll(): WorldScrollState {
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState<WorldScrollState>(INITIAL_STATE);

  useEffect(() => {
    setState(deriveState(scrollYProgress.get()));
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setState((prev) => {
      const next = deriveState(value);
      if (
        next.progress === prev.progress &&
        next.sectionIndex === prev.sectionIndex &&
        next.sectionProgress === prev.sectionProgress &&
        next.inTransition === prev.inTransition
      ) {
        return prev;
      }
      return next;
    });
  });

  return state;
}
