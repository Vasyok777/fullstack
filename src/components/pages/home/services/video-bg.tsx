"use client";

import { useEffect, useRef } from "react";

export function ServiceVideoBg() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      poster="/video/services-home-video-preview.jpg"
      className="absolute inset-0 w-full h-full object-cover object-right grayscale brightness-[0.55] contrast-[1.2]"
    >
      <source src="/video/services-home-video.mp4" type="video/mp4" />
    </video>
  );
}