"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatsCounter({ value, suffix = "", label }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;

        const duration = 1800;
        const startTime = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased =
            progress < 0.5
              ? 2 * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          if (numberRef.current) {
            numberRef.current.textContent = `${Math.round(eased * value)}${suffix}`;
          }

          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, suffix]);

  return (
    <div ref={wrapperRef} className="stats-counter">
      <p className="stats-counter__label">{label}</p>
      <p
        ref={numberRef}
        className="stats-counter__value"
        style={{ minWidth: `${String(value).length}ch` }}
      >
        0{suffix}
      </p>
    </div>
  );
}
