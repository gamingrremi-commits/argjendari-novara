import { SiteShell } from '@/components/layout/SiteShell';
import { Button } from '@/components/ui/Button';
import { getLocalizedPath } from '@/lib/routing';
import type { Locale } from '@/lib/types';

const NOT_FOUND_COPY = {
  sq: {
    eyebrow: 'Faqja nuk u gjet',
    titleMain: 'Kjo pjesë',
    titleAccent: 'nuk ekziston',
    titleTail: 'ende.',
    intro:
      'Mund të jetë zhvendosur, ose linku është i pasaktë. Kthehuni te kreu për të eksploruar koleksionet tona.',
    homeCta: 'Kthehu te Kreu',
    collectionsCta: 'Shiko Koleksionet',
  },
  en: {
    eyebrow: 'Page not found',
    titleMain: 'This piece',
    titleAccent: 'does not exist',
    titleTail: 'yet.',
    intro:
      'The page may have moved, or the link may be incorrect. Head back home and continue exploring our collections.',
    homeCta: 'Back to Home',
    collectionsCta: 'View Collections',
  },
} as const;

export function SiteNotFoundPage({ locale }: { locale: Locale }) {
  const copy = NOT_FOUND_COPY[locale];

  return (
    <SiteShell locale={locale} showWhatsApp={false}>
      <section className="min-h-screen pt-[140px] pb-32 px-12 flex items-center justify-center bg-pearl-warm">
        <div className="max-w-2xl text-center">
          <div className="font-display text-[120px] md:text-[200px] text-gold-dark/30 leading-none mb-4">
            404
          </div>
          <div className="eyebrow mb-6 justify-center inline-flex">{copy.eyebrow}</div>
          <h1 className="font-display text-display-sm text-ink-black mb-8">
            {copy.titleMain}{' '}
            <em className="font-serif italic font-light text-gold-dark">{copy.titleAccent}</em>{' '}
            {copy.titleTail}
          </h1>
          <p className="font-serif italic text-xl text-ink leading-snug mb-12 max-w-lg mx-auto">
            {copy.intro}
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button href={getLocalizedPath(locale, 'home')} variant="primary">
              {copy.homeCta}
            </Button>
            <Button href={getLocalizedPath(locale, 'collections')} variant="secondary">
              {copy.collectionsCta}
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
