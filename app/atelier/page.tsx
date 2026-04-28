import { SiteAtelierPage, getAtelierMetadata } from '@/components/pages/SiteAtelierPage';

export const metadata = getAtelierMetadata('sq');

export default function AtelierPage() {
  return <SiteAtelierPage locale="sq" />;
}
