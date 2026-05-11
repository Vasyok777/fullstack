import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: Props) {
  return (
    <div className={cn("max-w-370 mx-auto w-full px-5", className)}>
      {children}
    </div>
  );
}
