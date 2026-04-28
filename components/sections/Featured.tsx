import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { getAllCategories, getFeaturedProducts } from '@/lib/data/queries';
import { getSiteContentMap, t } from '@/lib/data/content';
import type { Locale } from '@/lib/types';

export async function Featured({ locale = 'sq' }: { locale?: Locale }) {
  const [products, categories, c] = await Promise.all([
    getFeaturedProducts(4),
    getAllCategories(),
    getSiteContentMap(locale),
  ]);

  const title = (
    <>
      {t(c, 'featured.title_main')}{' '}
      <em className="font-serif italic font-light text-gold-dark">
        {t(c, 'featured.title_accent')}
      </em>
      .
    </>
  );

  const emptyMsg = locale === 'sq' ? 'Koleksioni i ri po vjen së shpejti.' : 'New collection coming soon.';

  return (
    <section id="featured" className="py-[140px] px-12 bg-pearl">
      <Container>
        <SectionHeader
          eyebrow={t(c, 'featured.eyebrow')}
          title={title}
          description={t(c, 'featured.description')}
        />

        {products.length === 0 ? (
          <p className="text-center font-serif italic text-xl text-ink py-16">{emptyMsg}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={categories.find((cat) => cat.id === product.category_id)}
                locale={locale}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-20">
          <Button href="/koleksione" variant="primary">
            {t(c, 'featured.cta')}
          </Button>
        </div>
      </Container>
    </section>
  );
}
