import { SiteHomePage, getHomeMetadata } from '@/components/pages/SiteHomePage';

export const metadata = getHomeMetadata('sq');
export const revalidate = 60;

export default function HomePage() {
  return <SiteHomePage locale="sq" />;
}
