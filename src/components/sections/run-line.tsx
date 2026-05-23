type Props = { text: string };

export function RunLine({ text }: Props) {
  const items = Array(12).fill(text);

  return (
    <div className="w-full overflow-hidden py-3.5 lg:py-5 backdrop-blur-[10px] [background:var(--gradient-run-line)]">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={i}
                className="px-4 md:px-6 text-white text-[12px] font-medium leading-none uppercase whitespace-nowrap font-['Helvetica_Neue',Helvetica,Arial,sans-serif]"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
