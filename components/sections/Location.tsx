import { Container } from '@/components/ui/Container';
import { SITE_CONFIG } from '@/lib/config';
import { getSiteContentMap, t } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Location({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);
  const { coordinates } = SITE_CONFIG.address;
  const hours = SITE_CONFIG.hours[locale];

  const labels = {
    sq: { addr: 'Adresa', hours: 'Orari', contact: 'Kontakt', cta: 'Hap në Google Maps' },
    en: { addr: 'Address', hours: 'Hours', contact: 'Contact', cta: 'Open in Google Maps' },
  }[locale];

  return (
    <section id="location" className="py-[140px] px-12 bg-pearl">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 items-center">
          <div className="reveal">
            <div className="eyebrow mb-6">{t(c, 'location.eyebrow')}</div>
            <h2 className="font-display text-display-sm text-ink-black mb-10">
              {t(c, 'location.title_main')}{' '}
              <em className="font-serif italic font-light text-gold-dark">
                {t(c, 'location.title_accent')}
              </em>
              .
            </h2>

            <div className="mb-8 pb-8 border-b border-line">
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                {labels.addr}
              </div>
              <div className="font-serif text-[22px] text-ink-black leading-snug">
                {SITE_CONFIG.address.street}
                <br />
                {locale === 'sq'
                  ? SITE_CONFIG.address.landmark_sq
                  : SITE_CONFIG.address.landmark_en}
                <br />
                {SITE_CONFIG.address.city},{' '}
                {locale === 'sq'
                  ? SITE_CONFIG.address.country_sq
                  : SITE_CONFIG.address.country_en}
              </div>
            </div>

            <div className="mb-8 pb-8 border-b border-line">
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                {labels.hours}
              </div>
              <div className="font-serif text-[22px] text-ink-black leading-snug">
                {hours.weekdays}
                <br />
                {hours.sunday}
              </div>
            </div>

            <div className="mb-10">
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                {labels.contact}
              </div>
              <div className="font-serif text-[22px] text-ink-black leading-snug">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                  className="text-ink-black no-underline hover:text-gold-dark transition-colors block"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-ink-black no-underline hover:text-gold-dark transition-colors block"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 py-[18px] text-[11px] tracking-widest uppercase font-medium text-ink border-b border-ink hover:text-gold-dark hover:border-gold transition-colors"
            >
              {labels.cta} →
            </a>
          </div>

          <div className="reveal aspect-square bg-ink-black relative overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.5!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134fdbce9099c09b%3A0x5f54711d7111f97e!2zU2hlc2hpIERlbW9rcmFjaWEsIETDq3Jyw6tz!5e0!3m2!1sen!2s!4v1709000000000`}
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0"
              style={{ filter: 'grayscale(0.4) contrast(1.1)' }}
              title="Argjendari Novara location"
            />
            <div className="absolute inset-4 border border-gold pointer-events-none z-[2]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
