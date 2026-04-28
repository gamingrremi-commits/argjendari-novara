import type { Locale } from '@/lib/types';

export type PublicRouteKey =
  | 'home'
  | 'collections'
  | 'category'
  | 'atelier'
  | 'services'
  | 'product';

export const ROUTE_SEGMENTS = {
  collections: {
    sq: 'koleksione',
    en: 'collections',
  },
  atelier: {
    sq: 'atelier',
    en: 'atelier',
  },
  services: {
    sq: 'sherbime',
    en: 'services',
  },
  product: {
    sq: 'produkt',
    en: 'product',
  },
} as const;

function normalizeHash(hash: string) {
  return hash.startsWith('#') ? hash : `#${hash}`;
}

function trimTrailingSlash(pathname: string) {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '') || '/';
}

export function getLocalePrefix(locale: Locale) {
  return locale === 'en' ? '/en' : '';
}

export function getLocalizedPath(
  locale: Locale,
  route: PublicRouteKey,
  options: { slug?: string; hash?: string } = {}
) {
  const prefix = getLocalePrefix(locale);
  let path = prefix || '/';

  switch (route) {
    case 'home':
      path = prefix || '/';
      break;
    case 'collections':
      path = `${prefix}/${ROUTE_SEGMENTS.collections[locale]}`;
      break;
    case 'category':
      path = `${prefix}/${ROUTE_SEGMENTS.collections[locale]}/${options.slug ?? ''}`;
      break;
    case 'atelier':
      path = `${prefix}/${ROUTE_SEGMENTS.atelier[locale]}`;
      break;
    case 'services':
      path = `${prefix}/${ROUTE_SEGMENTS.services[locale]}`;
      break;
    case 'product':
      path = `${prefix}/${ROUTE_SEGMENTS.product[locale]}/${options.slug ?? ''}`;
      break;
  }

  if (options.hash) {
    return `${path}${normalizeHash(options.hash)}`;
  }

  return path;
}

export function getLocalizedHomeHash(locale: Locale, hash: string) {
  return getLocalizedPath(locale, 'home', { hash });
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'sq' ? 'en' : 'sq';
}

export function switchLocalePath(pathname: string, targetLocale: Locale) {
  const normalizedPath = trimTrailingSlash(pathname || '/');
  const patterns: Array<{
    route: PublicRouteKey;
    regexes: RegExp[];
  }> = [
    {
      route: 'home',
      regexes: [/^\/$/, /^\/en$/],
    },
    {
      route: 'collections',
      regexes: [
        new RegExp(`^/${ROUTE_SEGMENTS.collections.sq}$`),
        new RegExp(`^/en/${ROUTE_SEGMENTS.collections.en}$`),
      ],
    },
    {
      route: 'category',
      regexes: [
        new RegExp(`^/${ROUTE_SEGMENTS.collections.sq}/([^/]+)$`),
        new RegExp(`^/en/${ROUTE_SEGMENTS.collections.en}/([^/]+)$`),
      ],
    },
    {
      route: 'atelier',
      regexes: [
        new RegExp(`^/${ROUTE_SEGMENTS.atelier.sq}$`),
        new RegExp(`^/en/${ROUTE_SEGMENTS.atelier.en}$`),
      ],
    },
    {
      route: 'services',
      regexes: [
        new RegExp(`^/${ROUTE_SEGMENTS.services.sq}$`),
        new RegExp(`^/en/${ROUTE_SEGMENTS.services.en}$`),
      ],
    },
    {
      route: 'product',
      regexes: [
        new RegExp(`^/${ROUTE_SEGMENTS.product.sq}/([^/]+)$`),
        new RegExp(`^/en/${ROUTE_SEGMENTS.product.en}/([^/]+)$`),
      ],
    },
  ];

  for (const pattern of patterns) {
    for (const regex of pattern.regexes) {
      const match = normalizedPath.match(regex);
      if (!match) continue;

      return getLocalizedPath(targetLocale, pattern.route, {
        slug: match[1],
      });
    }
  }

  return getLocalizedPath(targetLocale, 'home');
}
