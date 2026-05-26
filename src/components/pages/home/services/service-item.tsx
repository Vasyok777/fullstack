"use client";

import { prefillContact } from "@/lib/prefill-contact";
import { ArrowDiagonalIcon } from "@/components/icons";

interface ServiceItemProps {
  title: string;
  desc: string;
  terms: string;
  price: string;
  prefillMsg: string;
}

export function ServiceItem({ title, desc, terms, price, prefillMsg }: ServiceItemProps) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    prefillContact(prefillMsg);
  }

  return (
    <a
      href="#contacts"
      onClick={handleClick}
      className="group relative flex items-start px-4 py-5 gap-2 md:px-6 md:py-7.5 md:gap-3 lg:gap-5 border-b border-[#3D3D3D] cursor-pointer"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none backdrop-blur-[12.5px] bg-[rgba(12,12,12,0.10)]" />

      <div className="relative z-10 flex-1 min-w-0 md:pr-17.5 max-w-150">
        <h3 className="text-white group-hover:text-[#D4AF37] transition-colors duration-300 mb-3 text-[22px] md:text-[30px] lg:text-[40px] uppercase leading-normal font-display font-normal">
          {title}
        </h3>
        <p className="mb-2 text-[13px] md:text-[14px] text-[#D9D9D9] font-sans font-medium leading-[130%]">
          {desc}
        </p>
        <span className="text-[13px] md:text-[14px] font-black text-[#D9D9D9] font-sans leading-[130%]">
          {terms}
        </span>
      </div>

      <span className="absolute bottom-5 md:bottom-7.5 right-6 md:right-3 z-10 font-sans text-[20px] font-black text-right text-[#D4AF37] group-hover:text-white transition-colors duration-300 leading-[130%]">
        {price}
      </span>

      <div className="absolute top-0 right-0 w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 p-2.9 flex items-center justify-center transition-all duration-300 group-hover:translate-y-2.5 group-hover:-translate-x-2.5 group-hover:[outline:1px_solid_rgba(212,175,55,0.70)] group-hover:outline-offset-[6px] md:group-hover:outline-offset-10 [background:var(--gradient-gold)]">
        <ArrowDiagonalIcon />
      </div>
    </a>
  );
}
