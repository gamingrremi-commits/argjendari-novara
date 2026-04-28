import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Italiana } from 'next/font/google';
import { Toaster } from 'sonner';
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
  title: 'NOVARA — Argjendari & Bizhuteri | Durrës',
  description:
    'Argjendari Novara — bizhuteri të zgjedhura me dorë në zemër të Durrësit. Unaza fejese, gjerdanë, vathë dhe porosi me dizajn personal.',
  keywords: [
    'argjendari',
    'bizhuteri',
    'unaza fejese',
    'durres',
    'shqiperia',
    'argjendari novara',
    'jewelry',
    'engagement rings',
  ],
  openGraph: {
    title: 'NOVARA — Argjendari & Bizhuteri',
    description: 'Bizhuteri me dorë, me histori. Që nga 2014, në Durrës.',
    type: 'website',
    locale: 'sq_AL',
    alternateLocale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
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
