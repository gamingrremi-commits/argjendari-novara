import { getSiteContentMap, t } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Story({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);
  const quote = t(c, 'story.quote');
  const accent = t(c, 'story.quote_accent');

  // Try to highlight the accent phrase inside the quote with golden italic
  let quoteRendered: React.ReactNode = quote;
  if (accent && quote.includes(accent)) {
    const parts = quote.split(accent);
    quoteRendered = (
      <>
        {parts[0]}
        <em className="font-serif italic text-gold-light">{accent}</em>
        {parts.slice(1).join(accent)}
      </>
    );
  }

  return (
    <section className="py-40 px-12 bg-ink-black text-pearl text-center relative overflow-hidden">
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display tracking-wide whitespace-nowrap pointer-events-none z-0"
        style={{
          fontSize: 'clamp(160px, 22vw, 360px)',
          color: 'rgba(201,169,97,0.04)',
        }}
        aria-hidden="true"
      >
        NOVARA
      </span>

      <div className="relative z-[1] max-w-[800px] mx-auto">
        <p
          className="reveal font-serif italic text-pearl mb-12 font-light leading-[1.4]"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          {quoteRendered}
        </p>
        <div className="reveal text-[11px] tracking-[0.4em] uppercase text-gold flex items-center justify-center gap-3.5">
          <span className="w-8 h-px bg-gold" />
          {t(c, 'story.attribution')}
          <span className="w-8 h-px bg-gold" />
        </div>
      </div>
    </section>
  );
}
