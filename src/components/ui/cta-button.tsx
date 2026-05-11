type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
};

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M18 8L22 12M22 12L18 16M22 12H2"
        stroke="#0C0C0C"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CTAButton({ children, href, onClick, className }: Props) {
  const cls = `cta-btn${className ? ` ${className}` : ""}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
        <ArrowRight />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
      <ArrowRight />
    </button>
  );
}