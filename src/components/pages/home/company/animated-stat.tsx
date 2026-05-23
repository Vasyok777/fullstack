"use client";

import { useEffect, useRef } from "react";

type Props = {
  value: number;
  suffix?: string;
  label: string;
};

export function AnimatedStat({ value, suffix = "", label }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
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
    <div ref={wrapperRef} className="flex flex-col items-center">
      <span
        ref={numberRef}
        className="font-display uppercase text-center bg-linear-to-r from-[#D4AF37] to-[#FFDA63] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] text-[46px] md:text-[60px] lg:text-[80px] leading-normal"
      >
        0{suffix}
      </span>
      <span className="font-sans font-medium text-[14px] lg:text-[15px] leading-[130%] text-[#D9D9D9] text-center">
        {label}
      </span>
    </div>
  );
}
