import { SiteServicesPage, getServicesMetadata } from '@/components/pages/SiteServicesPage';

export const metadata = getServicesMetadata('sq');

export default function SherbimePage() {
  return <SiteServicesPage locale="sq" />;
}
