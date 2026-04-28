import type { MetadataRoute } from 'next';
import { getAllCategorySlugs, getAllProductSlugs } from '@/lib/data/queries';
import { getLocalizedPath, type PublicRouteKey } from '@/lib/routing';
import { absoluteUrl } from '@/lib/seo';
import type { Locale } from '@/lib/types';

function buildAlternateLanguages(route: PublicRouteKey, slug?: string) {
  return {
    'sq-AL': absoluteUrl(getLocalizedPath('sq', route, { slug })),
    'en-US': absoluteUrl(getLocalizedPath('en', route, { slug })),
  };
}

function buildEntry(
  locale: Locale,
  route: PublicRouteKey,
  options: {
    slug?: string;
    priority: number;
    changeFrequency:
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never';
  }
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(getLocalizedPath(locale, route, { slug: options.slug })),
    lastModified: new Date(),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: buildAlternateLanguages(route, options.slug),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getAllCategorySlugs(),
    getAllProductSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [
    buildEntry('sq', 'home', { priority: 1, changeFrequency: 'weekly' }),
    buildEntry('en', 'home', { priority: 0.95, changeFrequency: 'weekly' }),
    buildEntry('sq', 'collections', { priority: 0.9, changeFrequency: 'weekly' }),
    buildEntry('en', 'collections', { priority: 0.85, changeFrequency: 'weekly' }),
    buildEntry('sq', 'atelier', { priority: 0.85, changeFrequency: 'monthly' }),
    buildEntry('en', 'atelier', { priority: 0.8, changeFrequency: 'monthly' }),
    buildEntry('sq', 'services', { priority: 0.85, changeFrequency: 'monthly' }),
    buildEntry('en', 'services', { priority: 0.8, changeFrequency: 'monthly' }),
  ];

  for (const category of categories) {
    entries.push(
      buildEntry('sq', 'category', {
        slug: category.slug,
        priority: 0.75,
        changeFrequency: 'weekly',
      })
    );
    entries.push(
      buildEntry('en', 'category', {
        slug: category.slug,
        priority: 0.7,
        changeFrequency: 'weekly',
      })
    );
  }

  for (const product of products) {
    entries.push(
      buildEntry('sq', 'product', {
        slug: product.slug,
        priority: 0.7,
        changeFrequency: 'daily',
      })
    );
    entries.push(
      buildEntry('en', 'product', {
        slug: product.slug,
        priority: 0.65,
        changeFrequency: 'daily',
      })
    );
  }

  return entries;
}
