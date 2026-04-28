import type { Metadata } from 'next';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CatalogClient } from '@/components/sections/CatalogClient';
import { getAllProducts, getAllCategories } from '@/lib/data/queries';

export const metadata: Metadata = {
  title: 'Koleksionet | NOVARA — Argjendari Novara',
  description:
    'Eksploro të gjitha koleksionet tona: unaza fejese, gjerdanë, vathë, byzylykë, ora dhe aksesorë burrash.',
};

export const revalidate = 60; // Re-fetch every minute

export default async function KoleksionePage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main>
        <section className="pt-[140px] pb-16 px-12 bg-pearl-warm">
          <Container>
            <Breadcrumbs items={[{ label: 'Kreu', href: '/' }, { label: 'Koleksionet' }]} />

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
              <div>
                <div className="eyebrow mb-6">Të Gjitha Koleksionet</div>
                <h1 className="font-display text-display-md text-ink-black leading-none">
                  Çdo pjesë,{' '}
                  <em className="font-serif italic font-light text-gold-dark">
                    një histori
                  </em>
                  .
                </h1>
              </div>
              <p className="font-serif italic text-xl text-ink leading-snug">
                Nga unaza fejese të punuara me kujdes deri tek aksesorë të rrallë —
                eksploro {products.length} krijime të zgjedhura me dorë në Durrës.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 px-12 bg-pearl">
          <Container>
            <CatalogClient products={products} categories={categories} locale="sq" />
          </Container>
        </section>
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
