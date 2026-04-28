const STORY_CONTENT = {
  sq: {
    quote: (
      <>
        &ldquo;Bizhuteritë janë <em className="font-serif italic text-gold-light">kujtimet që mbahen me vete</em>. Çdo pjesë që dorëzojmë nuk është thjesht ar dhe gur i çmuar — është një moment i ngrirë në kohë.&rdquo;
      </>
    ),
    attribution: 'Themeluesi · Argjendari Novara',
  },
  en: {
    quote: (
      <>
        &ldquo;Jewelry is the <em className="font-serif italic text-gold-light">memory you carry with you</em>. Every piece we deliver is not just gold and precious stone — it&apos;s a moment frozen in time.&rdquo;
      </>
    ),
    attribution: 'Founder · Argjendari Novara',
  },
};

export function Story({ locale = 'sq' }: { locale?: 'sq' | 'en' }) {
  const t = STORY_CONTENT[locale];

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
          {t.quote}
        </p>
        <div className="reveal text-[11px] tracking-[0.4em] uppercase text-gold flex items-center justify-center gap-3.5">
          <span className="w-8 h-px bg-gold" />
          {t.attribution}
          <span className="w-8 h-px bg-gold" />
        </div>
      </div>
    </section>
  );
}
