import {
  SiteCollectionsPage,
  getCollectionsMetadata,
} from '@/components/pages/SiteCollectionsPage';

export const metadata = getCollectionsMetadata('en');
export const revalidate = 60;

export default function EnglishCollectionsPage() {
  return <SiteCollectionsPage locale="en" />;
}
