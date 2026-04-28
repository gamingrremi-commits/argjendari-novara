import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getSiteContentMap, t } from '@/lib/data/content';
import { getLocalizedHomeHash } from '@/lib/routing';
import type { Locale } from '@/lib/types';

const ICONS = ['◇', '✏', '⌖', '⊙', '⊕', '⌘'];

export async function Services({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);

  const title = (
    <>
      {t(c, 'services.title_main')}{' '}
      <em className="font-serif italic font-light text-gold-dark">
        {t(c, 'services.title_accent')}
      </em>
      .
    </>
  );

  const ctaLabel = locale === 'sq' ? 'Mëso Më Shumë' : 'Learn More';

  return (
    <section id="services" className="py-[140px] px-12 bg-pearl-warm">
      <Container>
        <SectionHeader
          eyebrow={t(c, 'services.eyebrow')}
          title={title}
          description={t(c, 'services.description')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {[1, 2, 3, 4, 5, 6].map((n) => {
            const num = `N° 0${n}`;
            return (
              <div
                key={n}
                className="reveal bg-pearl px-12 py-16 relative cursor-pointer transition-all duration-500 ease-luxe hover:bg-ink-black group"
              >
                <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-8 font-display text-2xl text-gold-dark transition-all duration-500 group-hover:text-gold-light group-hover:border-gold">
                  {ICONS[n - 1]}
                </div>
                <span className="absolute top-6 right-8 font-display text-sm tracking-widest text-gold-dark">
                  {num}
                </span>
                <h3 className="font-display text-[28px] text-ink-black mb-4 tracking-wide transition-colors duration-500 group-hover:text-pearl">
                  {t(c, `service${n}.title`)}
                </h3>
                <p className="font-serif text-lg italic leading-snug text-ink mb-8 transition-colors duration-500 group-hover:text-pearl-warm">
                  {t(c, `service${n}.description`)}
                </p>
                <a
                  href={getLocalizedHomeHash(locale, 'contact')}
                  className="text-[11px] tracking-widest uppercase text-gold-dark inline-flex items-center gap-3 font-medium transition-all duration-400 group-hover:text-gold-light"
                >
                  {ctaLabel}
                  <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
