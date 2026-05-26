type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
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
      className="shrink-0"
    >
      <path
        d="M18 8L22 12M22 12L18 16M22 12H2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function CTAButton({ children, href, onClick, className, type = "button", disabled }: Props) {
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
    <button type={type} onClick={onClick} disabled={disabled} className={`${cls} disabled:opacity-40 disabled:cursor-not-allowed`}>
      {children}
      <ArrowRight />
    </button>
  );
}