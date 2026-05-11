import { GiftIcon } from "@/components/icons/gift-icon";

type Props = {
  href?: string;
  onClick?: () => void;
};

export function GiftButton({ href, onClick }: Props) {
  if (href) {
    return (
      <a href={href} className="gift-btn">
        <GiftIcon size={53} />
      </a>
    );
  }

  return (
    <button onClick={onClick} className="gift-btn">
      <GiftIcon size={53} />
    </button>
  );
}