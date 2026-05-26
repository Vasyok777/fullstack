"use client";

type Props = { text?: string };

export function ScrollDown({ text: _ }: Props) {
  const radius = 37;
  const circumference = +(2 * Math.PI * radius).toFixed(2);

  const nb = " ";
  const segment = `SCROLL DOWN${nb.repeat(2)}*${nb.repeat(2)}`;

  function handleClick() {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll down"
      className="relative size-14 lg:size-28 flex items-center justify-center cursor-pointer"
    >
      {/* Rotating circular text */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-spin-slow"
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
            lengthAdjust="spacing"
            className="text-[8.43px] font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-normal fill-white uppercase"
          >
            {segment.repeat(2)}
          </textPath>
        </text>
      </svg>

      {/* Mouse icon — always animating */}
      <svg
        viewBox="0 0 24 34"
        fill="none"
        className="relative z-10 w-3.25 h-auto lg:w-6.5"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="32"
          rx="11"
          stroke="white"
          strokeWidth="1.5"
        />
        <rect
          x="10.5"
          y="6"
          width="3"
          height="7"
          rx="1.5"
          fill="white"
          className="animate-scroll-indicator"
        />
      </svg>
    </button>
  );
}
