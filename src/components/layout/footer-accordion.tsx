"use client";

import { useState } from "react";
import Link from "next/link";

type Column = {
  title: string;
  items: { label: string; href: string }[];
};

const linkStyle = {
  color: "rgba(255,255,255,0.55)",
  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "normal",
};

const titleStyle = {
  color: "#FFF",
  fontFamily: "var(--font-russo-one), 'Russo One', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
};

export function FooterAccordion({ columns }: { columns: Column[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {columns.map((col, i) => (
        <div key={i} className="border-t border-white/10">
          <button
            className="w-full flex items-center justify-between py-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span style={titleStyle}>{col.title}</span>
            <span className="text-white/60 text-xl leading-none select-none">
              {open === i ? "−" : "+"}
            </span>
          </button>

          {open === i && (
            <div className="flex flex-col gap-3 pb-4 pl-1">
              {col.items.map((item) => (
                <Link key={item.href + item.label} href={item.href} style={linkStyle}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}