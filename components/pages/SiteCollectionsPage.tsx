import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { CatalogClient } from '@/components/sections/CatalogClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { getAllCategories, getAllProducts } from '@/lib/data/queries';
import { getLocalizedPath } from '@/lib/routing';
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/lib/types';

const COLLECTIONS_COPY = {
  sq: {
    title: 'Koleksionet | NOVARA — Argjendari Novara',
    description:
      'Eksploro të gjitha koleksionet tona: unaza fejese, gjerdanë, vathë, byzylykë, ora dhe aksesorë burrash.',
    keywords: ['koleksione bizhuterish', 'unaza fejese', 'gjerdane', 'vathë', 'argjendari durrës'],
    eyebrow: 'Të Gjitha Koleksionet',
    headingMain: 'Çdo pjesë,',
    headingAccent: 'një histori',
    intro: (count: number) =>
      `Nga unaza fejese të punuara me kujdes deri tek aksesorë të rrallë — eksploro ${count} krijime të zgjedhura me dorë në Durrës.`,
    home: 'Kreu',
    current: 'Koleksionet',
  },
  en: {
    title: 'Collections | NOVARA — Argjendari Novara',
    description:
      'Browse all of our collections: engagement rings, necklaces, earrings, bracelets, watches, and refined accessories.',
    keywords: ['jewelry collections', 'engagement rings', 'necklaces', 'earrings', 'durres jewelry boutique'],
    eyebrow: 'All Collections',
    headingMain: 'Every piece,',
    headingAccent: 'a story',
    intro: (count: number) =>
      `From carefully crafted engagement rings to rare accessories — explore ${count} handpicked creations from our Durrës boutique.`,
    home: 'Home',
    current: 'Collections',
  },
} as const;

export function getCollectionsMetadata(locale: Locale): Metadata {
  const copy = COLLECTIONS_COPY[locale];

  return buildPageMetadata({
    locale,
    route: 'collections',
    title: copy.title,
    description: copy.description,
    keywords: [...copy.keywords],
    imageEyebrow: copy.current,
  });
}

export async function SiteCollectionsPage({ locale }: { locale: Locale }) {
  const copy = COLLECTIONS_COPY[locale];
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <>
      <JsonLd
        id={`collections-breadcrumbs-${locale}`}
        data={buildBreadcrumbSchema([
          { name: copy.home, url: absoluteUrl(getLocalizedPath(locale, 'home')) },
          { name: copy.current, url: absoluteUrl(getLocalizedPath(locale, 'collections')) },
        ])}
      />
      <SiteShell locale={locale}>
        <section className="pt-[140px] pb-16 px-12 bg-pearl-warm">
          <Container>
            <Breadcrumbs
              items={[
                { label: copy.home, href: getLocalizedPath(locale, 'home') },
                { label: copy.current },
              ]}
            />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
              <div>
                <div className="eyebrow mb-6">{copy.eyebrow}</div>
                <h1 className="font-display text-display-md text-ink-black leading-none">
                  {copy.headingMain}{' '}
                  <em className="font-serif italic font-light text-gold-dark">
                    {copy.headingAccent}
                  </em>
                  .
                </h1>
              </div>
              <p className="font-serif italic text-xl text-ink leading-snug">
                {copy.intro(products.length)}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 px-12 bg-pearl">
          <Container>
            <CatalogClient products={products} categories={categories} locale={locale} />
          </Container>
        </section>
      </SiteShell>
    </>
  );
}
