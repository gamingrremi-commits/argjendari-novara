import { SiteProductPage, getProductMetadata } from '@/components/pages/SiteProductPage';
import { getAllProductSlugs } from '@/lib/data/queries';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  return getProductMetadata('en', params.slug);
}

export default function EnglishProductPage({ params }: PageProps) {
  return <SiteProductPage locale="en" slug={params.slug} />;
}
