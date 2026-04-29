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
        Marquee track must size to its intrinsic content width (w-max), not
        stretch to the viewport — otherwise translateX(-50%) is 50% of the
        VIEWPORT instead of 50% of the duplicated content, producing a
        visible reset jump on mobile every few seconds.

        Each item carries its own right-padding instead of using parent gap,
        so both halves have pixel-identical width and the loop is seamless.
      */}
      <div className="flex w-max animate-marquee marquee-mobile-fast">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl tracking-widest flex items-center shrink-0 pr-20 whitespace-nowrap"
          >
            {item}
            <span className="ml-20 text-gold text-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
