import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { getLocalizedPath, type PublicRouteKey } from '@/lib/routing';
import type { Category, Locale, Product } from '@/lib/types';

const LOCALE_META = {
  sq: {
    hreflang: 'sq-AL',
    openGraph: 'sq_AL',
    alternateOpenGraph: 'en_US',
  },
  en: {
    hreflang: 'en-US',
    openGraph: 'en_US',
    alternateOpenGraph: 'sq_AL',
  },
} as const;

interface PageMetadataOptions {
  locale: Locale;
  route: PublicRouteKey;
  title: string;
  description: string;
  keywords?: string[];
  imageTitle?: string;
  imageEyebrow?: string;
  imageDescription?: string;
  pathOptions?: {
    slug?: string;
  };
  openGraphType?: 'website' | 'article';
}

interface BreadcrumbSchemaItem {
  name: string;
  url: string;
}

export function getSiteUrl() {
  return SITE_CONFIG.siteUrl.replace(/\/+$/, '');
}

export function absoluteUrl(path: string) {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function buildOgImageUrl({
  locale,
  title,
  eyebrow,
  description,
}: {
  locale: Locale;
  title: string;
  eyebrow?: string;
  description?: string;
}) {
  const url = new URL('/api/og', getSiteUrl());
  url.searchParams.set('locale', locale);
  url.searchParams.set('title', title);

  if (eyebrow) {
    url.searchParams.set('eyebrow', eyebrow);
  }

  if (description) {
    url.searchParams.set('description', description);
  }

  return url.toString();
}

function buildLanguageAlternates(
  route: PublicRouteKey,
  pathOptions?: {
    slug?: string;
  }
) {
  return {
    'sq-AL': absoluteUrl(getLocalizedPath('sq', route, pathOptions)),
    'en-US': absoluteUrl(getLocalizedPath('en', route, pathOptions)),
    'x-default': absoluteUrl(getLocalizedPath('sq', route, pathOptions)),
  };
}

export function buildPageMetadata({
  locale,
  route,
  title,
  description,
  keywords = [],
  imageTitle,
  imageEyebrow,
  imageDescription,
  pathOptions,
  openGraphType = 'website',
}: PageMetadataOptions): Metadata {
  const currentPath = getLocalizedPath(locale, route, pathOptions);
  const localeMeta = LOCALE_META[locale];
  const ogImageUrl = buildOgImageUrl({
    locale,
    title: imageTitle ?? title,
    eyebrow: imageEyebrow,
    description: imageDescription ?? description,
  });

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl(currentPath),
      languages: buildLanguageAlternates(route, pathOptions),
    },
    openGraph: {
      type: openGraphType,
      title,
      description,
      url: absoluteUrl(currentPath),
      siteName: SITE_CONFIG.fullName,
      locale: localeMeta.openGraph,
      alternateLocale: [localeMeta.alternateOpenGraph],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildGlobalSeoSchema(locale: Locale) {
  const homeUrl = absoluteUrl(getLocalizedPath(locale, 'home'));
  const baseId = absoluteUrl('/');
  const landmark =
    locale === 'sq' ? SITE_CONFIG.address.landmark_sq : SITE_CONFIG.address.landmark_en;
  const country =
    locale === 'sq' ? SITE_CONFIG.address.country_sq : SITE_CONFIG.address.country_en;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseId}#organization`,
        name: SITE_CONFIG.fullName,
        url: absoluteUrl('/'),
        email: SITE_CONFIG.contact.email,
        telephone: SITE_CONFIG.contact.phone,
        sameAs: [SITE_CONFIG.social.instagram, SITE_CONFIG.social.facebook],
      },
      {
        '@type': 'JewelryStore',
        '@id': `${baseId}#store`,
        name: SITE_CONFIG.fullName,
        url: homeUrl,
        description: SITE_CONFIG.tagline[locale],
        telephone: SITE_CONFIG.contact.phone,
        email: SITE_CONFIG.contact.email,
        image: buildOgImageUrl({
          locale,
          title: SITE_CONFIG.fullName,
          eyebrow: locale === 'sq' ? 'Argjendari ne Durres' : 'Jewelry Store in Durres',
          description: SITE_CONFIG.tagline[locale],
        }),
        sameAs: [SITE_CONFIG.social.instagram, SITE_CONFIG.social.facebook],
        priceRange: '$$',
        currenciesAccepted: 'EUR, ALL',
        availableLanguage: ['sq', 'en'],
        areaServed: ['Durres', 'Tirane', 'Albania', 'Kosovo'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${SITE_CONFIG.address.street}, ${landmark}`,
          addressLocality: SITE_CONFIG.address.city,
          addressCountry: country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SITE_CONFIG.address.coordinates.lat,
          longitude: SITE_CONFIG.address.coordinates.lng,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'https://schema.org/Monday',
              'https://schema.org/Tuesday',
              'https://schema.org/Wednesday',
              'https://schema.org/Thursday',
              'https://schema.org/Friday',
              'https://schema.org/Saturday',
            ],
            opens: '09:00',
            closes: '20:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'https://schema.org/Sunday',
            opens: '10:00',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseId}#website`,
        url: absoluteUrl('/'),
        name: SITE_CONFIG.fullName,
        inLanguage: [LOCALE_META.sq.hreflang, LOCALE_META.en.hreflang],
        publisher: {
          '@id': `${baseId}#organization`,
        },
      },
    ],
  };
}

export function buildProductSchema({
  locale,
  product,
  category,
}: {
  locale: Locale;
  product: Product;
  category?: Category;
}) {
  const name = locale === 'sq' ? product.name_sq : product.name_en || product.name_sq;
  const description =
    locale === 'sq'
      ? product.description_sq || ''
      : product.description_en || product.description_sq || '';
  const categoryName = category
    ? locale === 'sq'
      ? category.name_sq
      : category.name_en || category.name_sq
    : undefined;
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: product.id,
    url: absoluteUrl(getLocalizedPath(locale, 'product', { slug: product.slug })),
    image: product.images,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.fullName,
    },
    availability: `https://schema.org/${product.in_stock ? 'InStock' : 'OutOfStock'}`,
  };

  if (categoryName) {
    schema.category = categoryName;
  }

  if (product.material) {
    schema.material = product.material;
  }

  if (product.show_price && product.price_eur != null) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: product.price_eur,
      availability: `https://schema.org/${product.in_stock ? 'InStock' : 'OutOfStock'}`,
      url: absoluteUrl(getLocalizedPath(locale, 'product', { slug: product.slug })),
    };
  } else if (product.show_price && product.price_lek != null) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: 'ALL',
      price: product.price_lek,
      availability: `https://schema.org/${product.in_stock ? 'InStock' : 'OutOfStock'}`,
      url: absoluteUrl(getLocalizedPath(locale, 'product', { slug: product.slug })),
    };
  }

  return schema;
}
