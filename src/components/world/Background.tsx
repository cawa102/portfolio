"use client";

import dynamic from "next/dynamic";
import { useViewportStrategy } from "@/lib/useViewportStrategy";

const BackgroundVideo = dynamic(() => import("./BackgroundVideo"), {
  ssr: false,
});

const BackgroundPanorama = dynamic(() => import("./BackgroundPanorama"), {
  ssr: false,
});

export default function Background() {
  const strategy = useViewportStrategy();
  return strategy === "mobile" ? <BackgroundPanorama /> : <BackgroundVideo />;
}
