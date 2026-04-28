import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CatalogClient } from '@/components/sections/CatalogClient';
import {
  getAllCategories,
  getAllCategorySlugs,
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/data/queries';

interface PageProps {
  params: { kategori: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((s) => ({ kategori: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.kategori);
  if (!category) return { title: 'Kategoria nuk u gjet | NOVARA' };

  return {
    title: `${category.name_sq} | NOVARA — Argjendari Novara`,
    description: category.description_sq || undefined,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await getCategoryBySlug(params.kategori);
  if (!category) return notFound();

  const [products, allProducts, allCategories] = await Promise.all([
    getProductsByCategory(params.kategori),
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main>
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
                { label: 'Kreu', href: '/' },
                { label: 'Koleksionet', href: '/koleksione' },
                { label: category.name_sq },
              ]}
            />

            <div className="mt-12 max-w-3xl">
              <div className="eyebrow mb-6">Koleksioni</div>
              <h1 className="font-display text-display-lg text-ink-black leading-none mb-8">
                {category.name_sq}
              </h1>
              {category.description_sq && (
                <p className="font-serif italic text-2xl text-ink leading-snug">
                  {category.description_sq}
                </p>
              )}
              <div className="mt-10 text-[11px] tracking-widest uppercase text-gold-dark">
                {products.length} krijime
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 px-12 bg-pearl">
          <Container>
            <CatalogClient
              products={allProducts}
              categories={allCategories}
              initialCategory={params.kategori}
              locale="sq"
            />
          </Container>
        </section>
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
