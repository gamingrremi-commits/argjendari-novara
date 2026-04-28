import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

const FOOTER_CONTENT = {
  sq: {
    explore: {
      title: 'Eksploro',
      links: [
        { label: 'Koleksionet', href: '/koleksione' },
        { label: 'Atelier', href: '/atelier' },
        { label: 'Shërbime', href: '/sherbime' },
        { label: 'Dyqani', href: '/#location' },
      ],
    },
    services: {
      title: 'Shërbime',
      links: [
        { label: 'Konsulencë Fejese', href: '/sherbime' },
        { label: 'Porosi Personale', href: '/atelier' },
        { label: 'Riparime', href: '/sherbime' },
        { label: 'Vlerësim', href: '/sherbime' },
      ],
    },
    contact: 'Kontakt',
    rights: 'Të gjitha të drejtat e rezervuara',
    by: 'Krijuar nga',
  },
  en: {
    explore: {
      title: 'Explore',
      links: [
        { label: 'Collections', href: '/koleksione' },
        { label: 'Atelier', href: '/atelier' },
        { label: 'Services', href: '/sherbime' },
        { label: 'Boutique', href: '/#location' },
      ],
    },
    services: {
      title: 'Services',
      links: [
        { label: 'Engagement Consultation', href: '/sherbime' },
        { label: 'Custom Orders', href: '/atelier' },
        { label: 'Repairs', href: '/sherbime' },
        { label: 'Appraisal', href: '/sherbime' },
      ],
    },
    contact: 'Contact',
    rights: 'All rights reserved',
    by: 'Created by',
  },
};

interface FooterProps {
  locale?: 'sq' | 'en';
}

export function Footer({ locale = 'sq' }: FooterProps) {
  const t = FOOTER_CONTENT[locale];

  return (
    <footer className="bg-ink-black text-pearl pt-[100px] pb-10 px-12 border-t border-gold/15">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-20 max-w-[1440px] mx-auto">
        <div>
          <Link
            href="/"
            className="font-display text-[32px] tracking-[0.4em] text-pearl no-underline"
          >
            NOVARA
          </Link>
          <p className="font-serif italic text-lg text-pearl-warm mt-6 max-w-[320px] leading-snug">
            {SITE_CONFIG.tagline[locale]}
          </p>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest uppercase text-gold-light mb-6 font-medium">
            {t.explore.title}
          </h4>
          <ul className="list-none">
            {t.explore.links.map((link) => (
              <li key={link.href} className="mb-3.5">
                <a
                  href={link.href}
                  className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest uppercase text-gold-light mb-6 font-medium">
            {t.services.title}
          </h4>
          <ul className="list-none">
            {t.services.links.map((link) => (
              <li key={link.href} className="mb-3.5">
                <a
                  href={link.href}
                  className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest uppercase text-gold-light mb-6 font-medium">
            {t.contact}
          </h4>
          <ul className="list-none">
            <li className="mb-3.5">
              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`}
                className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
              >
                {SITE_CONFIG.contact.phone}
              </a>
            </li>
            <li className="mb-3.5">
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </li>
            <li className="mb-3.5">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
              >
                Instagram
              </a>
            </li>
            <li className="mb-3.5">
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl-warm no-underline font-serif text-base transition-colors hover:text-gold-light"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-gold/15 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1440px] mx-auto text-[11px] tracking-[0.2em] uppercase text-pearl-warm">
        <span>
          © {new Date().getFullYear()} {SITE_CONFIG.fullName} · {t.rights}
        </span>
        <span>
          {t.by}{' '}
          <a
            href="https://develop24h.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light no-underline"
          >
            Develop24h
          </a>
        </span>
      </div>
    </footer>
  );
}
