import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/layout/SiteShell';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { ProductActions } from '@/components/ui/ProductActions';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductGallery } from '@/components/ui/ProductGallery';
import {
  getAllCategories,
  getProductBySlug,
  getProductSvgKey,
  getRelatedProducts,
} from '@/lib/data/queries';
import { getLocalizedPath } from '@/lib/routing';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildProductSchema,
} from '@/lib/seo';
import type { Category, Locale, Product } from '@/lib/types';
import { formatPriceEUR, formatPriceLEK } from '@/lib/utils';

const PRODUCT_COPY = {
  sq: {
    notFound: 'Produkti nuk u gjet | NOVARA',
    home: 'Kreu',
    collections: 'Koleksionet',
    specifications: 'Specifikime',
    material: 'Material',
    weight: 'Pesha',
    size: 'Madhësia',
    availability: 'Disponueshmëria',
    inStock: 'Në stok',
    sold: 'I shitur',
    price: 'Çmimi',
    priceValue: 'Sipas kërkesës',
    priceNote: 'Çmimi konfirmohet pas konsultimit. Çdo pjesë është unike.',
    authenticity: 'Autenticitet',
    warranty: 'Garanci',
    repairs: 'Riparime',
    relatedEyebrow: 'Mund të të Pëlqejnë',
    relatedTitleMain: 'Krijime',
    relatedTitleAccent: 'të ngjashme',
  },
  en: {
    notFound: 'Product not found | NOVARA',
    home: 'Home',
    collections: 'Collections',
    specifications: 'Specifications',
    material: 'Material',
    weight: 'Weight',
    size: 'Size',
    availability: 'Availability',
    inStock: 'In stock',
    sold: 'Sold',
    price: 'Price',
    priceValue: 'Price on request',
    priceNote: 'Pricing is confirmed after consultation. Every piece is unique.',
    authenticity: 'Authenticity',
    warranty: 'Warranty',
    repairs: 'Repairs',
    relatedEyebrow: 'You Might Like',
    relatedTitleMain: 'Similar',
    relatedTitleAccent: 'creations',
  },
} as const;

function getProductName(product: Product, locale: Locale) {
  return locale === 'sq' ? product.name_sq : product.name_en || product.name_sq;
}

function getProductDescription(product: Product, locale: Locale) {
  return locale === 'sq'
    ? product.description_sq || undefined
    : product.description_en || product.description_sq || undefined;
}

function getCategoryName(category: Category | undefined, locale: Locale) {
  if (!category) return undefined;
  return locale === 'sq' ? category.name_sq : category.name_en || category.name_sq;
}

export async function getProductMetadata(
  locale: Locale,
  slug: string
): Promise<Metadata> {
  const copy = PRODUCT_COPY[locale];
  const product = await getProductBySlug(slug);

  if (!product) {
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
    route: 'product',
    pathOptions: { slug },
    title: `${getProductName(product, locale)} | NOVARA — Argjendari Novara`,
    description: getProductDescription(product, locale) || copy.priceNote,
    imageEyebrow: copy.collections,
  });
}

export async function SiteProductPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const copy = PRODUCT_COPY[locale];
  const [product, categories] = await Promise.all([getProductBySlug(slug), getAllCategories()]);

  if (!product) {
    notFound();
  }

  const category = categories.find((entry) => entry.id === product.category_id);
  const related = category
    ? await getRelatedProducts(product.id, product.category_id, 4)
    : [];
  const svgKey = category ? getProductSvgKey(category.slug) : 'ring';
  const productName = getProductName(product, locale);
  const productDescription = getProductDescription(product, locale);
  const categoryName = getCategoryName(category, locale);
  const visiblePriceEntries = [
    product.price_eur !== null ? formatPriceEUR(product.price_eur) : null,
    product.price_lek !== null ? formatPriceLEK(product.price_lek) : null,
  ];
  const visiblePrices = product.show_price
    ? visiblePriceEntries.filter((price): price is string => Boolean(price))
    : [];

  return (
    <>
      <JsonLd
        id={`product-breadcrumbs-${locale}-${slug}`}
        data={buildBreadcrumbSchema([
          { name: copy.home, url: absoluteUrl(getLocalizedPath(locale, 'home')) },
          { name: copy.collections, url: absoluteUrl(getLocalizedPath(locale, 'collections')) },
          ...(category && categoryName
            ? [
                {
                  name: categoryName,
                  url: absoluteUrl(
                    getLocalizedPath(locale, 'category', { slug: category.slug })
                  ),
                },
              ]
            : []),
          { name: productName, url: absoluteUrl(getLocalizedPath(locale, 'product', { slug })) },
        ])}
      />
      <JsonLd
        id={`product-schema-${locale}-${slug}`}
        data={buildProductSchema({ locale, product, category })}
      />
      <SiteShell locale={locale} mainClassName="bg-pearl">
        <section className="pt-[120px] pb-8 px-12">
          <Container>
            <Breadcrumbs
              items={[
                { label: copy.home, href: getLocalizedPath(locale, 'home') },
                { label: copy.collections, href: getLocalizedPath(locale, 'collections') },
                ...(category && categoryName
                  ? [
                      {
                        label: categoryName,
                        href: getLocalizedPath(locale, 'category', { slug: category.slug }),
                      },
                    ]
                  : []),
                { label: productName },
              ]}
            />
          </Container>
        </section>

        <section className="px-12 pb-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24">
              <ProductGallery
                images={product.images}
                alt={productName}
                svgFallback={svgKey}
                modelUrl={product.model_url}
                badge={locale === 'sq' ? product.badge_sq : product.badge_en || product.badge_sq}
                inStock={product.in_stock}
                soldLabel={copy.sold}
              />

              <div>
                {category && categoryName && (
                  <Link
                    href={getLocalizedPath(locale, 'category', { slug: category.slug })}
                    className="inline-block text-[10px] tracking-widest uppercase text-gold-dark mb-6 hover:text-ink-black transition-colors no-underline"
                  >
                    {categoryName}
                  </Link>
                )}

                <h1 className="font-display text-display-sm text-ink-black leading-none mb-6">
                  {productName}
                </h1>

                {productDescription && (
                  <p className="font-serif italic text-xl text-ink leading-relaxed mb-10">
                    {productDescription}
                  </p>
                )}

                <div className="border-t border-line py-8 mb-10">
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-6 font-medium">
                    {copy.specifications}
                  </div>
                  <dl className="space-y-4">
                    {product.material && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          {copy.material}
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.material}
                        </dd>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          {copy.weight}
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.weight}
                        </dd>
                      </div>
                    )}
                    {product.size && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          {copy.size}
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.size}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                        {copy.availability}
                      </dt>
                      <dd className="font-serif text-base text-right">
                        {product.in_stock ? (
                          <span className="text-ink-black">{copy.inStock}</span>
                        ) : (
                          <span className="text-gold-dark">{copy.sold}</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-ink-black text-pearl p-8 mb-8">
                  <div className="text-[10px] tracking-widest uppercase text-gold-light mb-3 font-medium">
                    {copy.price}
                  </div>
                  {visiblePrices.length > 0 ? (
                    <div className="space-y-2">
                      <div className="font-display text-3xl">{visiblePrices[0]}</div>
                      {visiblePrices[1] && (
                        <p className="font-serif italic text-pearl-warm text-xl">
                          {visiblePrices[1]}
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="font-display text-3xl mb-2">{copy.priceValue}</div>
                      <p className="font-serif italic text-pearl-warm">{copy.priceNote}</p>
                    </>
                  )}
                </div>

                <ProductActions product={product} locale={locale} />

                <div className="mt-10 pt-8 border-t border-line grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      {copy.authenticity}
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      {copy.warranty}
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      {copy.repairs}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="py-32 px-12 bg-pearl-warm">
            <Container>
              <div className="reveal mb-16 text-center">
                <div className="eyebrow mb-6">{copy.relatedEyebrow}</div>
                <h2 className="font-display text-display-sm text-ink-black">
                  {copy.relatedTitleMain}{' '}
                  <em className="font-serif italic font-light text-gold-dark">
                    {copy.relatedTitleAccent}
                  </em>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    category={categories.find((entry) => entry.id === relatedProduct.category_id)}
                    locale={locale}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}
      </SiteShell>
    </>
  );
}
