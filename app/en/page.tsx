import { SiteHomePage, getHomeMetadata } from '@/components/pages/SiteHomePage';

export const metadata = getHomeMetadata('en');
export const revalidate = 60;

export default function EnglishHomePage() {
  return <SiteHomePage locale="en" />;
}
