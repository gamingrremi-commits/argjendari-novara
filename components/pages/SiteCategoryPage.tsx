import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { CatalogClient } from '@/components/sections/CatalogClient';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import {
  getAllCategories,
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/data/queries';
import { getLocalizedPath } from '@/lib/routing';
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';
import type { Category, Locale } from '@/lib/types';

const CATEGORY_COPY = {
  sq: {
    notFound: 'Kategoria nuk u gjet | NOVARA',
    eyebrow: 'Koleksioni',
    home: 'Kreu',
    collections: 'Koleksionet',
    count: (value: number) => `${value} krijime`,
  },
  en: {
    notFound: 'Collection not found | NOVARA',
    eyebrow: 'Collection',
    home: 'Home',
    collections: 'Collections',
    count: (value: number) => `${value} pieces`,
  },
} as const;

function getCategoryName(category: Category, locale: Locale) {
  return locale === 'sq' ? category.name_sq : category.name_en || category.name_sq;
}

function getCategoryDescription(category: Category, locale: Locale) {
  return locale === 'sq'
    ? category.description_sq || undefined
    : category.description_en || category.description_sq || undefined;
}

export async function getCategoryMetadata(
  locale: Locale,
  slug: string
): Promise<Metadata> {
  const copy = CATEGORY_COPY[locale];
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: copy.notFound,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildPageMetadata({
    locale,
    route: 'category',
    pathOptions: { slug },
    title: `${getCategoryName(category, locale)} | NOVARA — Argjendari Novara`,
    description: getCategoryDescription(category, locale) || copy.notFound,
    imageEyebrow: copy.collections,
  });
}

export async function SiteCategoryPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const copy = CATEGORY_COPY[locale];
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, allProducts, allCategories] = await Promise.all([
    getProductsByCategory(slug),
    getAllProducts(),
    getAllCategories(),
  ]);
  const categoryName = getCategoryName(category, locale);
  const categoryDescription = getCategoryDescription(category, locale);

  return (
    <>
      <JsonLd
        id={`category-breadcrumbs-${locale}-${slug}`}
        data={buildBreadcrumbSchema([
          { name: copy.home, url: absoluteUrl(getLocalizedPath(locale, 'home')) },
          { name: copy.collections, url: absoluteUrl(getLocalizedPath(locale, 'collections')) },
          { name: categoryName, url: absoluteUrl(getLocalizedPath(locale, 'category', { slug })) },
        ])}
      />
      <SiteShell locale={locale}>
        <section
          className="relative pt-[140px] pb-24 px-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(201,169,97,0.15) 0%, transparent 50%), linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)',
          }}
        >
          <Container>
            <Breadcrumbs
              items={[
                { label: copy.home, href: getLocalizedPath(locale, 'home') },
                { label: copy.collections, href: getLocalizedPath(locale, 'collections') },
                { label: categoryName },
              ]}
            />

            <div className="mt-12 max-w-3xl">
              <div className="eyebrow mb-6">{copy.eyebrow}</div>
              <h1 className="font-display text-display-lg text-ink-black leading-none mb-8">
                {categoryName}
              </h1>
              {categoryDescription && (
                <p className="font-serif italic text-2xl text-ink leading-snug">
                  {categoryDescription}
                </p>
              )}
              <div className="mt-10 text-[11px] tracking-widest uppercase text-gold-dark">
                {copy.count(products.length)}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 px-12 bg-pearl">
          <Container>
            <CatalogClient
              products={allProducts}
              categories={allCategories}
              initialCategory={slug}
              locale={locale}
            />
          </Container>
        </section>
      </SiteShell>
    </>
  );
}
