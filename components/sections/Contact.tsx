import { ContactForm } from '@/components/forms/ContactForm';
import type { Locale } from '@/lib/types';

const CONTACT_CONTENT = {
  sq: {
    eyebrow: 'Kontakt',
    title: (
      <>
        Le të{' '}
        <em className="font-serif italic font-light text-gold-dark">flasim</em>.
      </>
    ),
    intro:
      'Pyetje, rezervim, ose thjesht dëshirë për të zbuluar — jemi këtu.',
    services: [
      'Rezervo Provim Privat',
      'Konsultim për Unazë Fejese',
      'Porosi me Dizajn Personal',
      'Riparim & Restaurim',
      'Vlerësim & Certifikim',
    ],
  },
  en: {
    eyebrow: 'Contact',
    title: (
      <>
        Let&apos;s{' '}
        <em className="font-serif italic font-light text-gold-dark">talk</em>.
      </>
    ),
    intro: 'Questions, reservations, or just curious — we\'re here.',
    services: [
      'Book Private Try-On',
      'Engagement Ring Consultation',
      'Custom Design Order',
      'Repair & Restoration',
      'Appraisal & Certification',
    ],
  },
};

export function Contact({ locale = 'sq' }: { locale?: Locale }) {
  const t = CONTACT_CONTENT[locale];

  return (
    <section
      id="contact"
      className="py-40 px-12"
      style={{ background: 'linear-gradient(180deg, #EDE7D9 0%, #F8F6F0 100%)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-[1200px] mx-auto items-start">
        <div className="reveal">
          <div className="eyebrow mb-6">{t.eyebrow}</div>
          <h2 className="font-display text-display-sm text-ink-black mb-8">{t.title}</h2>
          <p className="font-serif italic text-xl text-ink leading-snug mb-12">{t.intro}</p>

          <ul className="list-none">
            {t.services.map((service) => (
              <li
                key={service}
                className="py-5 border-b border-line flex items-center justify-between font-serif text-lg text-ink-black cursor-pointer transition-all duration-300 hover:pl-2 group"
              >
                {service}
                <span className="text-gold-dark transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
