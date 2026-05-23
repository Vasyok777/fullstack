"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";

type PortfolioItem = {
  id: number;
  image: string;
  name: string;
  category: string;
  href: string;
};

function ChevronLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function PortfolioCard({
  item,
  visitSiteLabel,
}: {
  item: PortfolioItem;
  visitSiteLabel: string;
}) {
  return (
    <div className="group relative w-full h-87.5 md:h-112.5 lg:h-142.5 overflow-hidden bg-black">
      <Image
        src={item.image}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* full-cover link */}
      <a href={item.href} className="absolute inset-0 z-0" aria-label={item.name} />

      {/* hover overlay — inset 10px from card edges */}
      <div className="absolute inset-2.5 z-10 flex flex-col justify-end items-start gap-16.75 p-6 [background:rgba(12,12,12,0)] group-hover:[background:rgba(12,12,12,0.10)] [backdrop-filter:none] group-hover:[backdrop-filter:blur(12.5px)] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        {/* title + category group */}
        <div className="flex flex-col items-start">
          <h3 className="font-display text-[#D4AF37] text-[30px] uppercase leading-none mb-2.5">
            {item.name}
          </h3>
          <span className="inline-flex items-center gap-2.5 px-1.25 py-1.25 border border-[#D4AF37] text-[#D9D9D9] font-sans text-[15px] font-medium leading-[130%]">
            {item.category}
          </span>
        </div>

        {/* visit site button */}
        <div className="inline-flex items-center gap-4 h-12.5 px-6 [background:var(--gradient-gold)] text-[#0c0c0c] font-sans font-semibold text-[14px] leading-normal whitespace-nowrap shrink-0">
          {visitSiteLabel}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M18 8L22 12M22 12L18 16M22 12H2"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSlider({
  items,
  visitSiteLabel,
}: {
  items: PortfolioItem[];
  visitSiteLabel: string;
}) {
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Navigation]}
        loop={true}
        navigation={{ prevEl: ".portfolio-prev", nextEl: ".portfolio-next" }}
        pagination={{ clickable: true, el: ".portfolio-dots" }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id} className="overflow-hidden">
            <PortfolioCard item={item} visitSiteLabel={visitSiteLabel} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* nav arrows — desktop only */}
      <button
        className="portfolio-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/30 items-center justify-center text-white transition-colors hover:bg-black/80 hidden md:flex"
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>
      <button
        className="portfolio-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/30 items-center justify-center text-white transition-colors hover:bg-black/80 hidden md:flex"
        aria-label="Next"
      >
        <ChevronRight />
      </button>

      <div className="portfolio-dots flex items-center justify-center gap-2 mt-6" />
    </div>
  );
}
