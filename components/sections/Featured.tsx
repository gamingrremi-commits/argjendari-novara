import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { getAllCategories, getFeaturedProducts } from '@/lib/data/queries';
import type { Locale } from '@/lib/types';

const FEATURED_CONTENT = {
  sq: {
    eyebrow: 'Të Zgjedhura',
    title: (
      <>
        Krijime <em className="font-serif italic font-light text-gold-dark">të preferuara</em>.
      </>
    ),
    description: 'Pjesë që kanë gjetur shtëpinë e tyre, dhe disa që ende presin.',
    cta: 'Shiko të Gjitha Koleksionet',
    empty: 'Koleksioni i ri po vjen së shpejti.',
  },
  en: {
    eyebrow: 'Featured',
    title: (
      <>
        <em className="font-serif italic font-light text-gold-dark">Beloved</em> creations.
      </>
    ),
    description: 'Pieces that have found their home, and some still waiting.',
    cta: 'View All Collections',
    empty: 'New collection coming soon.',
  },
};

export async function Featured({ locale = 'sq' }: { locale?: Locale }) {
  const t = FEATURED_CONTENT[locale];
  const [products, categories] = await Promise.all([
    getFeaturedProducts(4),
    getAllCategories(),
  ]);

  return (
    <section id="featured" className="py-[140px] px-12 bg-pearl">
      <Container>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {products.length === 0 ? (
          <p className="text-center font-serif italic text-xl text-ink py-16">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={categories.find((c) => c.id === product.category_id)}
                locale={locale}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <Button href="/koleksione" variant="primary">
            {t.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
