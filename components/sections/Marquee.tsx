import { getSiteContentMap, tList } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Marquee({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);
  const items = tList(c, 'marquee.items', [
    'UNAZA FEJESE',
    'DIZAJN PERSONAL',
    'ARI 18K',
    'DIAMANTE TË CERTIFIKUAR',
    'RIPARIME EKSPERTE',
    'PORTOFOL UNIK',
  ]);
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink-black text-pearl-warm py-7 overflow-hidden border-y border-gold/20">
      <div className="flex gap-20 animate-marquee marquee-mobile-fast whitespace-nowrap">
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
