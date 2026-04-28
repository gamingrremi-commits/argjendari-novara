import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { JsonLd } from '@/components/seo/JsonLd';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { buildGlobalSeoSchema } from '@/lib/seo';
import type { Locale } from '@/lib/types';

interface SiteShellProps {
  children: React.ReactNode;
  locale: Locale;
  mainClassName?: string;
  showWhatsApp?: boolean;
}

export function SiteShell({
  children,
  locale,
  mainClassName,
  showWhatsApp = true,
}: SiteShellProps) {
  return (
    <>
      <JsonLd id={`novara-global-schema-${locale}`} data={buildGlobalSeoSchema(locale)} />
      <Nav locale={locale} />
      <ScrollReveal />
      <main lang={locale} className={mainClassName}>
        {children}
      </main>
      <Footer locale={locale} />
      {showWhatsApp && <WhatsAppFloat />}
    </>
  );
}
