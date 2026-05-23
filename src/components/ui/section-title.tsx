import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "font-display uppercase text-[22px] md:text-[30px] lg:text-[46px] leading-tight text-[var(--color-gold)] mb-5 md:mb-7.5",
        className
      )}
    >
      {children}
    </h2>
  );
}