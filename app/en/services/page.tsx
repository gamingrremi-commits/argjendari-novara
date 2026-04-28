import { SiteServicesPage, getServicesMetadata } from '@/components/pages/SiteServicesPage';

export const metadata = getServicesMetadata('en');

export default function EnglishServicesPage() {
  return <SiteServicesPage locale="en" />;
}
