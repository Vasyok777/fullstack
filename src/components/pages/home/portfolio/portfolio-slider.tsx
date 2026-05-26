"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 18L9 12L15 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 18L15 12L9 6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        className="object-cover transition-transform duration-500 group-hover:scale-105 grayscale"
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
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 h-12.5 px-6 [background:var(--gradient-gold)] text-[#0c0c0c] font-sans font-semibold text-[14px] leading-normal whitespace-nowrap shrink-0 border border-transparent transition-all duration-300 hover:[background:none] hover:border-white hover:text-white pointer-events-auto">
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
        </a>
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
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  function handleSwiper(swiper: SwiperType) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }

  function handleSlideChange(swiper: SwiperType) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }

  return (
    <div>
      <div className="relative">
        <Swiper
          modules={[Pagination, Navigation]}
          loop={false}
          navigation={{ prevEl: ".portfolio-prev", nextEl: ".portfolio-next" }}
          pagination={{ clickable: true, el: ".portfolio-dots" }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          onSwiper={handleSwiper}
          onSlideChange={handleSlideChange}
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <PortfolioCard item={item} visitSiteLabel={visitSiteLabel} />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isBeginning && (
          <button
            className="portfolio-prev hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 p-2 rounded-[100px] bg-[rgba(65,65,65,0.20)] backdrop-blur-[20px] items-center justify-center cursor-pointer"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
        )}
        {!isEnd && (
          <button
            className="portfolio-next hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 p-2 rounded-[100px] bg-[rgba(65,65,65,0.20)] backdrop-blur-[20px] items-center justify-center cursor-pointer"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      <div className="portfolio-dots flex items-center justify-center gap-2 mt-6" />
    </div>
  );
}
