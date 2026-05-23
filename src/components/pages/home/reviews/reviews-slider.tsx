"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import "swiper/css";

type Review = {
  id: number;
  src: string;
  name: string;
  role: string;
  rating: number;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    src: "/reviews/1.mp4",
    name: "Max Orlov",
    role: "Software Engineer",
    rating: 5.0,
  },
  {
    id: 2,
    src: "/reviews/2.mp4",
    name: "Max Orlov",
    role: "Software Engineer",
    rating: 5.0,
  },
  {
    id: 3,
    src: "/reviews/1.mp4",
    name: "Max Orlov",
    role: "Software Engineer",
    rating: 5.0,
  },
  {
    id: 4,
    src: "/reviews/2.mp4",
    name: "Max Orlov",
    role: "Software Engineer",
    rating: 5.0,
  },
];

function Star({ uid }: { uid: string }) {
  const gId = `sg-${uid}`;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
        fill={`url(#${gId})`}
      />
      <defs>
        <linearGradient
          id={gId}
          x1="0"
          y1="9"
          x2="18"
          y2="9"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#FFDA63" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Stars({ rating, reviewId }: { rating: number; reviewId: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} uid={`${reviewId}-${i}`} />
      ))}
      <span className="font-sans font-medium leading-[130%] text-[#D9D9D9] text-[15px] ml-1">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function PlayButton({ hovered }: { hovered: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        "w-10 h-10 rounded-xl",
        "md:w-13.75 md:h-13.75 md:rounded-[16.5px]",
        "bg-[linear-gradient(90deg,#D4AF37_0%,#FFDA63_100%)]",
        "transition-shadow duration-300",
        hovered && "shadow-[0_0_16.5px_0_#FFDA63]",
      )}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 17 17"
        fill="none"
        aria-hidden
        className="md:w-4.25 md:h-4.25"
      >
        <path
          d="M3.4375 3.43742C3.43743 3.19548 3.50119 2.95781 3.62236 2.7484C3.74352 2.53899 3.91779 2.36526 4.12758 2.24474C4.33736 2.12423 4.57523 2.0612 4.81717 2.06202C5.0591 2.06284 5.29654 2.12748 5.5055 2.24942L13.7534 7.06054C13.9616 7.18132 14.1344 7.35462 14.2546 7.56311C14.3748 7.7716 14.4381 8.00799 14.4383 8.24864C14.4386 8.48929 14.3756 8.72579 14.2558 8.93449C14.1359 9.14318 13.9634 9.31678 13.7555 9.43792L5.5055 14.2504C5.29654 14.3724 5.0591 14.437 4.81717 14.4378C4.57523 14.4386 4.33736 14.3756 4.12758 14.2551C3.91779 14.1346 3.74352 13.9608 3.62236 13.7514C3.50119 13.542 3.43743 13.3044 3.4375 13.0624V3.43742Z"
          stroke="#0C0C0C"
          strokeWidth="1.375"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function VideoModal({ src, open, onClose }: { src: string; open: boolean; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) {
      videoRef.current?.play().catch(() => {});
    } else {
      videoRef.current?.pause();
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-9999 bg-black/85 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-9999 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl focus:outline-none"
        >
          <Dialog.Title className="sr-only">Review video</Dialog.Title>
          <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <video
              ref={videoRef}
              src={src}
              className="w-full max-h-[80vh] object-contain"
              controls
              playsInline
            />
          </div>
          <Dialog.Close className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-[#1c1c1c] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors duration-200 focus:outline-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ReviewCard({ id, src, name, role, rating }: Review) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer h-52.75 md:h-77.5"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            src={src}
            className="w-full h-full object-cover"
            playsInline
            preload="metadata"
            muted
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-between p-4 md:p-6 transition-colors duration-300",
            hovered ? "bg-black/80" : "bg-black/60",
          )}
        >
          <Stars rating={rating} reviewId={id} />
          <div className="flex justify-center">
            <PlayButton hovered={hovered} />
          </div>
          <div>
            <p className="font-display uppercase leading-none md:leading-normal text-[#D4AF37] text-[16px] md:text-[22px] font-normal mb-1.5">
              {name}
            </p>
            <p className="font-sans font-medium leading-[130%] text-[#D9D9D9] text-[12px] md:text-[14px]">
              {role}
            </p>
          </div>
        </div>
      </div>

      <VideoModal src={src} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function ReviewsSlider() {
  return (
    <div className="reviews-swiper">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, el: ".reviews-dots" }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {REVIEWS.map((r) => (
          <SwiperSlide key={r.id}>
            <ReviewCard {...r} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="reviews-dots flex items-center justify-center gap-2 mt-6" />
    </div>
  );
}