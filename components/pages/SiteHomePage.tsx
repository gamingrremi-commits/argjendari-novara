import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { Atelier } from '@/components/sections/Atelier';
import { Collections } from '@/components/sections/Collections';
import { Contact } from '@/components/sections/Contact';
import { Featured } from '@/components/sections/Featured';
import { Hero } from '@/components/sections/Hero';
import { Location } from '@/components/sections/Location';
import { Marquee } from '@/components/sections/Marquee';
import { Philosophy } from '@/components/sections/Philosophy';
import { Services } from '@/components/sections/Services';
import { Story } from '@/components/sections/Story';
import { SITE_CONFIG } from '@/lib/config';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

const HOME_META = {
  sq: {
    title: 'NOVARA — Argjendari & Bizhuteri | Durrës',
    description:
      'Argjendari Novara — bizhuteri të zgjedhura me dorë në zemër të Durrësit. Unaza fejese, gjerdanë, vathë dhe porosi me dizajn personal.',
    keywords: [
      'argjendari',
      'bizhuteri',
      'unaza fejese',
      'durres',
      'shqiperia',
      'argjendari novara',
      'jewelry',
      'engagement rings',
    ],
    eyebrow: 'Argjendari ne Durres',
  },
  en: {
    title: 'NOVARA — Jewelry Boutique & Atelier | Durrës',
    description:
      'Discover Novara in Durrës: handcrafted jewelry, engagement rings, premium services, and bespoke atelier pieces made around your story.',
    keywords: [
      'jewelry store durres',
      'novara jewelry',
      'engagement rings albania',
      'custom jewelry durres',
      'atelier jewelry albania',
      'handcrafted jewelry',
    ],
    eyebrow: 'Jewelry Store in Durres',
  },
} as const;

export function getHomeMetadata(locale: Locale): Metadata {
  const meta = HOME_META[locale];

  return buildPageMetadata({
    locale,
    route: 'home',
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    imageEyebrow: meta.eyebrow,
    imageDescription: SITE_CONFIG.tagline[locale],
  });
}

export async function SiteHomePage({ locale }: { locale: Locale }) {
  return (
    <SiteShell locale={locale}>
      <Hero locale={locale} />
      <Marquee locale={locale} />
      <Collections locale={locale} />
      <Philosophy locale={locale} />
      <Services locale={locale} />
      <Featured locale={locale} />
      <Atelier locale={locale} />
      <Story locale={locale} />
      <Location locale={locale} />
      <Contact locale={locale} />
    </SiteShell>
  );
}
