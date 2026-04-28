import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductGallery } from '@/components/ui/ProductGallery';
import { ProductActions } from '@/components/ui/ProductActions';
import { ProductCard } from '@/components/ui/ProductCard';
import {
  getAllCategories,
  getAllProductSlugs,
  getProductBySlug,
  getProductSvgKey,
  getRelatedProducts,
} from '@/lib/data/queries';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Produkti nuk u gjet | NOVARA' };

  return {
    title: `${product.name_sq} | NOVARA — Argjendari Novara`,
    description: product.description_sq || undefined,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const categories = await getAllCategories();
  const category = categories.find((c) => c.id === product.category_id);
  const related = category
    ? await getRelatedProducts(product.id, product.category_id, 4)
    : [];
  const svgKey = category ? getProductSvgKey(category.slug) : 'ring';

  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main className="bg-pearl">
        <section className="pt-[120px] pb-8 px-12">
          <Container>
            <Breadcrumbs
              items={[
                { label: 'Kreu', href: '/' },
                { label: 'Koleksionet', href: '/koleksione' },
                ...(category
                  ? [{ label: category.name_sq, href: `/koleksione/${category.slug}` }]
                  : []),
                { label: product.name_sq },
              ]}
            />
          </Container>
        </section>

        <section className="px-12 pb-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24">
              <ProductGallery
                images={product.images}
                alt={product.name_sq}
                svgFallback={svgKey}
                badge={product.badge_sq}
                inStock={product.in_stock}
                soldLabel="I shitur"
              />

              <div>
                {category && (
                  <Link
                    href={`/koleksione/${category.slug}`}
                    className="inline-block text-[10px] tracking-widest uppercase text-gold-dark mb-6 hover:text-ink-black transition-colors no-underline"
                  >
                    {category.name_sq}
                  </Link>
                )}

                <h1 className="font-display text-display-sm text-ink-black leading-none mb-6">
                  {product.name_sq}
                </h1>

                {product.description_sq && (
                  <p className="font-serif italic text-xl text-ink leading-relaxed mb-10">
                    {product.description_sq}
                  </p>
                )}

                <div className="border-t border-line py-8 mb-10">
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-6 font-medium">
                    Specifikime
                  </div>
                  <dl className="space-y-4">
                    {product.material && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          Material
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.material}
                        </dd>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          Pesha
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.weight}
                        </dd>
                      </div>
                    )}
                    {product.size && (
                      <div className="flex justify-between gap-4 py-3 border-b border-line/50">
                        <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                          Madhësia
                        </dt>
                        <dd className="font-serif text-base text-ink-black text-right">
                          {product.size}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between gap-4 py-3">
                      <dt className="font-sans text-[11px] tracking-widest uppercase text-ink/60">
                        Disponueshmëria
                      </dt>
                      <dd className="font-serif text-base text-right">
                        {product.in_stock ? (
                          <span className="text-ink-black">Në stok</span>
                        ) : (
                          <span className="text-gold-dark">I shitur</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-ink-black text-pearl p-8 mb-8">
                  <div className="text-[10px] tracking-widest uppercase text-gold-light mb-3 font-medium">
                    Çmimi
                  </div>
                  <div className="font-display text-3xl mb-2">Sipas kërkesës</div>
                  <p className="font-serif italic text-pearl-warm">
                    Çmimi konfirmohet pas konsultimit. Çdo pjesë është unike.
                  </p>
                </div>

                <ProductActions product={product} locale="sq" />

                <div className="mt-10 pt-8 border-t border-line grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      Autenticitet
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      Garanci
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl text-gold-dark mb-1">✓</div>
                    <div className="text-[9px] tracking-widest uppercase text-ink/60">
                      Riparime
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
                <div className="eyebrow mb-6">Mund të të Pëlqejnë</div>
                <h2 className="font-display text-display-sm text-ink-black">
                  Krijime{' '}
                  <em className="font-serif italic font-light text-gold-dark">të ngjashme</em>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    category={categories.find((c) => c.id === p.category_id)}
                    locale="sq"
                  />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
