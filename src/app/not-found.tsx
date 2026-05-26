import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-display uppercase text-[120px] md:text-[200px] leading-none font-normal bg-linear-to-r from-[#D4AF37] to-[#FFDA63] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] select-none">
        404
      </p>

      <p className="mt-4 mb-10 font-sans text-[15px] md:text-[17px] text-[#D9D9D9] leading-[160%] max-w-sm">
        Сторінку не знайдено. Можливо, вона була переміщена або не існує.
      </p>

      <Link
        href="/"
        className="cta-btn"
      >
        <span>На головну</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </main>
  );
}
