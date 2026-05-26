"use client";

import { useState } from "react";

const PINS = [
  { id: "usa",      label: "USA",         x: 24.1, y: 36.9 },
  { id: "canada",   label: "Canada",      x: 18.4, y: 22.7 },
  { id: "brazil",   label: "Brazil",      x: 31.2, y: 71.0 },
  { id: "uk",       label: "UK",          x: 46.8, y: 32.7 },
  { id: "poland",   label: "Poland",      x: 51.1, y: 34.1 },
  { id: "germany",  label: "Germany",     x: 49.6, y: 35.5 },
  { id: "france",   label: "France",      x: 46.8, y: 38.4 },
  { id: "spain",    label: "Spain",       x: 45.4, y: 41.2 },
  { id: "nz",       label: "New Zealand", x: 93.6, y: 90.9 },
  { id: "aus",      label: "Australia",   x: 83.7, y: 79.5 },
  { id: "china",    label: "China",       x: 78.0, y: 45.5 },
  { id: "japan",    label: "Japan",       x: 85.1, y: 42.6 },
  { id: "uae",      label: "UAE",         x: 61.0, y: 51.1 },
  { id: "ukraine",  label: "Ukraine",     x: 52.5, y: 38.4 },
  { id: "italy",    label: "Italy",       x: 49.6, y: 41.2 },
];

function Pin({ label, x, y }: { label: string; x: number; y: number }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 whitespace-nowrap text-white text-[12px] z-20 pointer-events-none bg-white/10 backdrop-blur-[5px] border border-white/20 font-sans font-medium rounded-[5px]">
          {label}
        </div>
      )}
      <div
        className="w-3 h-3 rounded-full border-2 border-[#D4AF37] bg-[#0f0f21]"
        style={{ boxShadow: "0 0 12px 0 #D4AF37" }}
      />
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
