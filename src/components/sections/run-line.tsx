type Props = { text: string };

export function RunLine({ text }: Props) {
  return (
    <div className="w-full overflow-hidden py-3.5 lg:py-5 backdrop-blur-[10px] [background:var(--gradient-run-line)]">
      <div className="flex w-max animate-marquee">
        <span className="px-6 text-white text-[12px] font-medium leading-none uppercase whitespace-pre font-['Helvetica_Neue',Helvetica,Arial,sans-serif]">
          {text}
        </span>
        <span className="px-6 text-white text-[12px] font-medium leading-none uppercase whitespace-pre font-['Helvetica_Neue',Helvetica,Arial,sans-serif]" aria-hidden>
          {text}
        </span>
      </div>
    </div>
  );
}
