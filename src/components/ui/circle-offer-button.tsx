type Props = {
  href: string;
  label: string;
};

export function CircleOfferButton({ href, label }: Props) {
  return (
    <a
      href={href}
      className="group inline-flex p-2.5 rounded-full border border-[rgba(212,175,55,0.50)]"
    >
      <div className="flex w-30 h-30 p-5 flex-col justify-center items-center gap-1.25 rounded-full border border-[#D4AF37] bg-transparent group-hover:bg-[rgba(212,175,55,0.20)] transition-colors duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M14.1654 14.1668V5.8335H5.83203M14.1654 5.8335L5.83203 14.1668"
            stroke="#D9D9D9"
            strokeWidth="1.25"
          />
        </svg>
        <span className="text-[#D9D9D9] text-center font-sans text-[10px] font-medium leading-[130%] uppercase">
          {label}
        </span>
      </div>
    </a>
  );
}
