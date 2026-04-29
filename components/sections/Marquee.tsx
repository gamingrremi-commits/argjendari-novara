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
      {/*
        IMPORTANT: do NOT use `gap-*` on the marquee track. CSS gap is applied
        only between siblings, not after the last item. With `from: 0` →
        `to: -50%` keyframes that produces a misalignment of one gap when the
        loop hits the duplicate half — visible as a "reset" jump on mobile
        where the animation is fast. Instead, give every item a fixed right
        spacer so each half has identical total width.
      */}
      <div className="flex animate-marquee marquee-mobile-fast whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl tracking-widest flex items-center shrink-0 pr-20"
          >
            {item}
            <span className="ml-20 text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
