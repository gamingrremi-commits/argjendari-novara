const MARQUEE_ITEMS = {
  sq: [
    'UNAZA FEJESE',
    'DIZAJN PERSONAL',
    'ARI 18K',
    'DIAMANTE TË CERTIFIKUAR',
    'RIPARIME EKSPERTE',
    'PORTOFOL UNIK',
  ],
  en: [
    'ENGAGEMENT RINGS',
    'CUSTOM DESIGN',
    '18K GOLD',
    'CERTIFIED DIAMONDS',
    'EXPERT REPAIRS',
    'UNIQUE PIECES',
  ],
};

export function Marquee({ locale = 'sq' }: { locale?: 'sq' | 'en' }) {
  const items = MARQUEE_ITEMS[locale];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink-black text-pearl-warm py-7 overflow-hidden border-y border-gold/20">
      <div className="flex gap-20 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl tracking-widest flex items-center gap-20 shrink-0"
          >
            {item}
            <span className="text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
