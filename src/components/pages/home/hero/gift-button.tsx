import Image from "next/image";
import { GiftIcon } from "@/components/icons/gift-icon";

type Props = {
  href?: string;
  onClick?: () => void;
};

function MouseCursor() {
  return (
    <div
      className="absolute hidden lg:block -bottom-10 -right-4 pointer-events-none"
      style={{
        animation: "mouseMove 3s ease-in-out infinite",
        transformOrigin: "center",
      }}
    >
      <Image src="/mouse.svg" alt="" width={28} height={28} unoptimized aria-hidden />
    </div>
  );
}

const blinkStyle = { animation: "GiftBlink 3s linear infinite" };

export function GiftButton({ href, onClick }: Props) {
  if (href) {
    return (
      <a href={href} className="gift-btn relative" style={blinkStyle}>
        <GiftIcon size={53} />
        <MouseCursor />
      </a>
    );
  }

  return (
    <button onClick={onClick} className="gift-btn relative" style={blinkStyle}>
      <GiftIcon size={53} />
      <MouseCursor />
    </button>
  );
}
