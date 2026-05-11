type Props = { size?: number; className?: string };

const R = 1.5; // border-radius for flag

export function FlagEN({ size = 20, className }: Props) {
  // US flag: 13 stripes, blue canton with stars
  const stripeH = 13 / 13;
  const cantonW = 9.31;
  const cantonH = 7;
  // 9 rows × 5+4 stars in canton
  const stars: [number, number][] = [];
  for (let row = 0; row < 9; row++) {
    const cols = row % 2 === 0 ? 5 : 4;
    const offsetX = row % 2 === 0 ? 0.7 : 1.5;
    for (let col = 0; col < cols; col++) {
      stars.push([offsetX + col * 1.75, 0.6 + row * 0.7]);
    }
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="13" rx={R} fill="#F5F5F5"/>
      {/* Red stripes */}
      {[0,2,4,6,8,10,12].map(y => (
        <rect key={y} x="0" y={y * stripeH} width="20" height={stripeH} fill="#FF4B55"/>
      ))}
      {/* Blue canton */}
      <rect x="0" y="0" width={cantonW} height={cantonH} rx={R} fill="#41479B"/>
      {/* Stars */}
      {stars.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.28" fill="#F5F5F5"/>
      ))}
      {/* Clip to flag shape */}
      <rect width="20" height="13" rx={R} fill="none"/>
    </svg>
  );
}

export function FlagUA({ size = 20, className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="6.5" rx={R} fill="#005BBB"/>
      <rect width="20" height="6.5" y="6.5" fill="#FFD500"/>
      <rect width="20" height="13" rx={R} fill="none" stroke="transparent"/>
    </svg>
  );
}

export function FlagPL({ size = 20, className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="6.5" rx={R} fill="white"/>
      <rect width="20" height="6.5" y="6.5" fill="#DC143C"/>
    </svg>
  );
}

export function FlagDE({ size = 20, className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="4.33" rx={R} fill="#000"/>
      <rect width="20" height="4.33" y="4.33" fill="#DD0000"/>
      <rect width="20" height="4.34" y="8.66" fill="#FFCE00"/>
    </svg>
  );
}

export function FlagES({ size = 20, className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="13" rx={R} fill="#AA151B"/>
      <rect width="20" height="6.5" y="3.25" fill="#F1BF00"/>
    </svg>
  );
}

export function FlagRU({ size = 20, className }: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size * 0.65} viewBox="0 0 20 13" className={className} style={{ flexShrink: 0 }}>
      <rect width="20" height="4.33" rx={R} fill="white"/>
      <rect width="20" height="4.33" y="4.33" fill="#0039A6"/>
      <rect width="20" height="4.34" y="8.66" fill="#D52B1E"/>
    </svg>
  );
}

const FLAGS = { en: FlagEN, ua: FlagUA, pl: FlagPL, de: FlagDE, es: FlagES, ru: FlagRU } as const;

export type FlagCode = keyof typeof FLAGS;

export function Flag({ code, size = 20, className }: { code: FlagCode; size?: number; className?: string }) {
  const Component = FLAGS[code];
  return <Component size={size} className={className} />;
}