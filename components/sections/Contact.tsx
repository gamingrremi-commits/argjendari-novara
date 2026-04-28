import { ContactForm } from '@/components/forms/ContactForm';
import { getSiteContentMap, t, tList } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Contact({ locale = 'sq' }: { locale?: Locale }) {
  const c = await getSiteContentMap(locale);
  const services = tList(c, 'contact.services_list', []);

  return (
    <section
      id="contact"
      className="py-40 px-12"
      style={{ background: 'linear-gradient(180deg, #EDE7D9 0%, #F8F6F0 100%)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-[1200px] mx-auto items-start">
        <div className="reveal">
          <div className="eyebrow mb-6">{t(c, 'contact.eyebrow')}</div>
          <h2 className="font-display text-display-sm text-ink-black mb-8">
            {t(c, 'contact.title_main')}{' '}
            <em className="font-serif italic font-light text-gold-dark">
              {t(c, 'contact.title_accent')}
            </em>
            .
          </h2>
          <p className="font-serif italic text-xl text-ink leading-snug mb-12">
            {t(c, 'contact.intro')}
          </p>

          {services.length > 0 && (
            <ul className="list-none">
              {services.map((service) => (
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
          )}
        </div>

        <div className="reveal">
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
