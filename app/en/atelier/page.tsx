import { SiteAtelierPage, getAtelierMetadata } from '@/components/pages/SiteAtelierPage';

export const metadata = getAtelierMetadata('en');

export default function EnglishAtelierPage() {
  return <SiteAtelierPage locale="en" />;
}
