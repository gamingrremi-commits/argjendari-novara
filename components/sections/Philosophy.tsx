import { Container } from '@/components/ui/Container';
import { getSiteContentMap, t } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Philosophy({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);

  return (
    <section className="py-40 px-12 bg-ink-black text-pearl relative overflow-hidden">
      <div
        className="absolute -top-1/2 -right-[20%] w-4/5 h-[200%] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(201,169,97,0.08) 0%, transparent 60%)',
        }}
      />
      <Container className="relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[120px] items-center">
          <div className="reveal">
            <div className="eyebrow mb-6" style={{ color: '#E5C989' }}>
              {t(c, 'philosophy.eyebrow')}
            </div>
            <h2 className="font-display text-display-lg mb-10 text-pearl">
              {t(c, 'philosophy.title_line1')}{' '}
              <em className="font-serif italic font-light text-gold-light not-italic">
                <span className="italic">{t(c, 'philosophy.title_accent')}</span>
              </em>
              <br />
              {t(c, 'philosophy.title_line2')}
            </h2>
            <p className="font-serif text-[22px] leading-[1.6] text-pearl-warm mb-6 font-light">
              {t(c, 'philosophy.paragraph1')}
            </p>
            <p className="font-serif text-[22px] leading-[1.6] text-pearl-warm mb-6 font-light">
              {t(c, 'philosophy.paragraph2')}
            </p>

            <div className="grid grid-cols-2 gap-12 mt-16 pt-12 border-t border-gold/20">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <div className="font-display text-[64px] text-gold-light leading-none mb-3 font-light">
                    {t(c, `philosophy.stat${n}_num`)}
                  </div>
                  <div className="text-[11px] tracking-widest uppercase text-pearl-warm opacity-70">
                    {t(c, `philosophy.stat${n}_label`)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] reveal">
            <div className="absolute top-0 right-0 w-4/5 h-4/5 border border-gold z-0" />
            <div
              className="absolute bottom-0 left-0 w-4/5 h-4/5 z-[1] overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, #161412 0%, #9B7F3F 70%, #C9A961 100%)',
              }}
            >
              <svg
                viewBox="0 0 200 200"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%]"
                style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
              >
                <defs>
                  <radialGradient id="pearlGrad" cx="40%" cy="40%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="60%" stopColor="#F8F6F0" />
                    <stop offset="100%" stopColor="#9B7F3F" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="100" rx="40" ry="40" fill="url(#pearlGrad)" />
                <ellipse cx="100" cy="100" rx="40" ry="40" fill="none" stroke="#E5C989" strokeWidth="2" />
                <path d="M 30 100 Q 100 60, 170 100 Q 100 140, 30 100" fill="none" stroke="#E5C989" strokeWidth="2" opacity="0.6" />
                <circle cx="50" cy="100" r="3" fill="#E5C989" />
                <circle cx="150" cy="100" r="3" fill="#E5C989" />
                <circle cx="85" cy="92" r="4" fill="#FFF" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
