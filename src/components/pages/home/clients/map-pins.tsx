"use client";

import { useState } from "react";

const PINS = [
  { id: "usa-w",   label: "USA",           x: 13, y: 38 },
  { id: "usa-c",   label: "USA",           x: 21, y: 44 },
  { id: "canada",  label: "Canada",        x: 27, y: 34 },
  { id: "usa-e",   label: "USA",           x: 31, y: 42 },
  { id: "france",  label: "France",        x: 46, y: 32 },
  { id: "ger",     label: "Germany",       x: 49, y: 37 },
  { id: "poland",  label: "Poland",        x: 52, y: 28 },
  { id: "uae",     label: "UAE",           x: 57, y: 43 },
  { id: "kenya",   label: "Kenya",         x: 59, y: 50 },
];

function Pin({ label, x, y }: { label: string; x: number; y: number }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 left-(--px) top-(--py)"
      style={{ '--px': `${x}%`, '--py': `${y}%` } as React.CSSProperties}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 whitespace-nowrap text-white text-[12px] z-10 pointer-events-none bg-[rgba(20,20,20,0.95)] border border-[rgba(212,175,55,0.3)] font-sans font-medium"
        >
          {label}
        </div>
      )}

      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className="overflow-visible cursor-pointer"
        aria-hidden
      >
        <circle
          cx="11" cy="11" r="11"
          fill="#D4AF37"
          className="transform-fill origin-center animate-[sonar-ping_2.4s_ease-out_infinite]"
        />
        <circle
          cx="11" cy="11" r="7"
          fill="#D4AF37"
          className="transform-fill origin-center animate-[sonar-ping_2.4s_ease-out_0.6s_infinite]"
        />
        <circle cx="11" cy="11" r="3.5" fill="#D4AF37" />
      </svg>
    </div>
  );
}

export function MapPins() {
  return (
    <>
      {PINS.map((pin) => (
        <Pin key={pin.id} {...pin} />
      ))}
    </>
  );
}