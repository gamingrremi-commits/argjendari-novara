import { Button } from '@/components/ui/Button';

const HERO_CONTENT = {
  sq: {
    eyebrow: 'Argjendari Novara · Durrës · Që nga 2014',
    title: { line1: 'Bukuri që', accent: 'flet', line2: 'pa fjalë.' },
    sub: 'Bizhuteri të zgjedhura me dorë, krijuar për momente që mbahen mend një jetë të tërë — dhe pak më gjatë.',
    primaryCta: 'Eksploro Koleksionet',
    secondaryCta: 'Porosi me dizajn personal',
    yearsLabel: 'VITE TRADITË',
    scrollHint: 'Zbulo',
  },
  en: {
    eyebrow: 'Argjendari Novara · Durrës · Since 2014',
    title: { line1: 'Beauty that', accent: 'speaks', line2: 'without words.' },
    sub: 'Handpicked jewelry crafted for moments that last a lifetime — and a little longer.',
    primaryCta: 'Explore Collections',
    secondaryCta: 'Custom design orders',
    yearsLabel: 'YEARS OF CRAFT',
    scrollHint: 'Discover',
  },
};

export function Hero({ locale = 'sq' }: { locale?: 'sq' | 'en' }) {
  const t = HERO_CONTENT[locale];

  return (
    <section
      className="min-h-screen relative flex items-center px-12 pt-[120px] pb-20 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 70% 30%, rgba(201,169,97,0.12) 0%, transparent 50%), linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-20 w-full max-w-[1440px] mx-auto items-center">
        <div className="relative z-[2]">
          <div className="inline-flex items-center gap-3.5 text-[11px] tracking-widest uppercase text-gold-dark mb-8 font-medium opacity-0 animate-[fadeUp_1s_0.3s_forwards]">
            <span className="w-[42px] h-px bg-gold" />
            {t.eyebrow}
          </div>

          <h1 className="font-display text-display-xl text-ink-black mb-8 opacity-0 animate-[fadeUp_1.2s_0.5s_forwards]">
            {t.title.line1}{' '}
            <em className="font-serif italic font-light text-gold-dark not-italic">
              <span className="italic">{t.title.accent}</span>
            </em>
            <br />
            {t.title.line2}
          </h1>

          <p className="font-serif italic text-[22px] font-light text-ink max-w-[480px] leading-snug mb-12 opacity-0 animate-[fadeUp_1.2s_0.7s_forwards]">
            {t.sub}
          </p>

          <div className="flex gap-5 items-center flex-wrap opacity-0 animate-[fadeUp_1.2s_0.9s_forwards]">
            <Button href="#collections" variant="primary">
              {t.primaryCta}
            </Button>
            <Button href="#atelier" variant="secondary">
              {t.secondaryCta}
            </Button>
          </div>
        </div>

        <div className="relative h-[600px] opacity-0 animate-[fadeIn_1.5s_0.8s_forwards]">
          <div className="absolute inset-0 border border-gold translate-x-5 translate-y-5" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(10,10,10,0.4) 0%, transparent 50%, rgba(201,169,97,0.3) 100%), radial-gradient(circle at 30% 40%, #E5C989 0%, #9B7F3F 40%, #161412 100%)',
            }}
          >
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10,10,10,0.4) 100%)' }} />

            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 w-[280px] h-[280px] animate-float"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))' }}
            >
              <defs>
                <radialGradient id="diamondGrad" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#E5C989" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9B7F3F" stopOpacity="0.6" />
                </radialGradient>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C989" />
                  <stop offset="50%" stopColor="#C9A961" />
                  <stop offset="100%" stopColor="#9B7F3F" />
                </linearGradient>
              </defs>
              <ellipse cx="100" cy="130" rx="55" ry="55" fill="none" stroke="url(#ringGrad)" strokeWidth="6" />
              <ellipse cx="100" cy="130" rx="55" ry="55" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.4" />
              <polygon points="100,40 130,75 115,95 85,95 70,75" fill="url(#diamondGrad)" stroke="#FFF" strokeWidth="0.5" />
              <polygon points="85,95 115,95 100,120" fill="url(#diamondGrad)" stroke="#FFF" strokeWidth="0.5" opacity="0.7" />
              <line x1="100" y1="40" x2="100" y2="120" stroke="#FFF" strokeWidth="0.3" opacity="0.6" />
              <line x1="70" y1="75" x2="115" y2="95" stroke="#FFF" strokeWidth="0.3" opacity="0.4" />
              <line x1="130" y1="75" x2="85" y2="95" stroke="#FFF" strokeWidth="0.3" opacity="0.4" />
              <circle cx="92" cy="65" r="2" fill="#FFF" opacity="0.9" />
            </svg>
          </div>

          <div className="absolute bottom-8 left-8 text-pearl font-display text-sm tracking-widest">
            <span className="font-serif text-5xl block text-gold-light font-light leading-none mb-2">
              10+
            </span>
            {t.yearsLabel}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-gold-dark flex flex-col items-center gap-3.5 opacity-0 animate-[fadeIn_1s_1.5s_forwards]">
        {t.scrollHint}
        <span
          className="w-px h-10 animate-scroll-pulse"
          style={{ background: 'linear-gradient(180deg, #C9A961 0%, transparent 100%)' }}
        />
      </div>
    </section>
  );
}
