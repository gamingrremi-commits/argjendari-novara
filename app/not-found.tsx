import Link from 'next/link';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Nav locale="sq" />
      <main className="min-h-screen pt-[140px] pb-32 px-12 flex items-center justify-center bg-pearl-warm">
        <div className="max-w-2xl text-center">
          <div className="font-display text-[120px] md:text-[200px] text-gold-dark/30 leading-none mb-4">
            404
          </div>
          <div className="eyebrow mb-6 justify-center inline-flex">Faqja nuk u gjet</div>
          <h1 className="font-display text-display-sm text-ink-black mb-8">
            Kjo pjesë{' '}
            <em className="font-serif italic font-light text-gold-dark">nuk ekziston</em>{' '}
            ende.
          </h1>
          <p className="font-serif italic text-xl text-ink leading-snug mb-12 max-w-lg mx-auto">
            Mund të jetë zhvendosur, ose linku është i pasaktë. Kthehuni te kreu për të
            eksploruar koleksionet tona.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button href="/" variant="primary">
              Kthehu te Kreu
            </Button>
            <Button href="/koleksione" variant="secondary">
              Shiko Koleksionet
            </Button>
          </div>
        </div>
      </main>
      <Footer locale="sq" />
    </>
  );
}
