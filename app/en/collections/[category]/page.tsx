import { SiteCategoryPage, getCategoryMetadata } from '@/components/pages/SiteCategoryPage';
import { getAllCategorySlugs } from '@/lib/data/queries';

interface PageProps {
  params: { category: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((entry) => ({ category: entry.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  return getCategoryMetadata('en', params.category);
}

export default function EnglishCategoryPage({ params }: PageProps) {
  return <SiteCategoryPage locale="en" slug={params.category} />;
}
