"use client";

type Props = { text?: string };

export function ScrollDown({ text: _ }: Props) {
  const radius = 37;
  const circumference = +(2 * Math.PI * radius).toFixed(2);

  const nbsp = " ";
  const segment = `SCROLL DOWN${nbsp.repeat(3)}•${nbsp.repeat(3)}`;
  const label = segment.repeat(2);

  function handleClick() {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll down"
      // size-14 = 56px (mobile), size-28 = 112px (desktop)
      className="group relative size-14 lg:size-28 flex items-center justify-center cursor-pointer"
    >
      {/* Rotating circular text.
          fontSize у SVG user units (без px) — автоматично масштабується
          разом з контейнером: 56px→4.72px, 112px→9.44px */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
        aria-hidden
      >
        <defs>
          <path
            id="sdp"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text>
          <textPath
            href="#sdp"
            textLength={circumference}
            lengthAdjust="spacingAndGlyphs"
            className="text-[8.43px] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-normal fill-white uppercase"
          >
            {label}
          </textPath>
        </text>
      </svg>

      {/* Mouse icon — масштабується через w/h класи */}
      <svg
        viewBox="0 0 24 34"
        fill="none"
        className="relative z-10 w-3.25 h-auto lg:w-6.5 transition-transform duration-300"
      >
        <rect x="1" y="1" width="22" height="32" rx="11" stroke="white" strokeWidth="1.5" />
        <rect
          x="10.5"
          y="6"
          width="3"
          height="7"
          rx="1.5"
          fill="white"
          className="group-hover:animate-scroll-indicator"
        />
      </svg>
    </button>
  );
}