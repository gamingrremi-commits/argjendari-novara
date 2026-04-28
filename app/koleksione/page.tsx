import {
  SiteCollectionsPage,
  getCollectionsMetadata,
} from '@/components/pages/SiteCollectionsPage';

export const metadata = getCollectionsMetadata('sq');
export const revalidate = 60;

export default function KoleksionePage() {
  return <SiteCollectionsPage locale="sq" />;
}
