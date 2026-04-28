import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Italiana } from 'next/font/google';
import { Toaster } from 'sonner';
import { buildOgImageUrl, getSiteUrl } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italiana',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'NOVARA — Argjendari Novara',
    template: '%s',
  },
  applicationName: 'NOVARA',
  description:
    'NOVARA — handcrafted jewelry, bespoke atelier work, and premium services from the heart of Durrës.',
  openGraph: {
    title: 'NOVARA — Argjendari Novara',
    description: 'Handcrafted jewelry with a story. Since 2014, in Durrës.',
    type: 'website',
    locale: 'sq_AL',
    alternateLocale: 'en_US',
    images: [
      {
        url: buildOgImageUrl({
          locale: 'sq',
          title: 'NOVARA',
          eyebrow: 'Argjendari ne Durres',
          description: 'Bizhuteri me dore, me histori. Qe nga 2014.',
        }),
        width: 1200,
        height: 630,
        alt: 'NOVARA',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    languages: {
      'sq-AL': '/',
      'en-US': '/en',
      'x-default': '/',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="sq"
      className={`${inter.variable} ${cormorant.variable} ${italiana.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://tkonfvqmvgwvsybdmbfz.supabase.co" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#0A0A0A',
              color: '#F8F6F0',
              border: '1px solid #C9A961',
              borderRadius: '0',
              fontFamily: 'var(--font-cormorant)',
              fontSize: '16px',
            },
          }}
        />
      </body>
    </html>
  );
}
