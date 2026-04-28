import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getAllCategories } from '@/lib/data/queries';
import { getProductSvgKey } from '@/lib/data/helpers';
import type { Locale } from '@/lib/types';

const COLLECTIONS_CONTENT = {
  sq: {
    eyebrow: 'Koleksionet',
    title: (
      <>
        Çdo pjesë, një <em className="font-serif italic font-light text-gold-dark">histori</em>.
      </>
    ),
    description:
      'Nga unaza fejese të punuara me kujdes, deri tek aksesorë të rrallë — secila krijim me karakterin e vet.',
    designs: 'krijime',
  },
  en: {
    eyebrow: 'Collections',
    title: (
      <>
        Every piece, a <em className="font-serif italic font-light text-gold-dark">story</em>.
      </>
    ),
    description:
      'From carefully crafted engagement rings to rare accessories — each creation with its own character.',
    designs: 'designs',
  },
};

const SVGs: Record<string, JSX.Element> = {
  ring: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="cg-eng" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9B7F3F" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="130" rx="50" ry="50" fill="none" stroke="#E5C989" strokeWidth="5" />
      <polygon points="100,55 125,85 113,100 87,100 75,85" fill="url(#cg-eng)" />
      <polygon points="87,100 113,100 100,118" fill="url(#cg-eng)" opacity="0.7" />
    </svg>
  ),
  pendant: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path d="M 60 60 Q 100 40, 140 60 Q 145 100, 100 140 Q 55 100, 60 60 Z" fill="none" stroke="#E5C989" strokeWidth="3" />
      <circle cx="100" cy="100" r="8" fill="#FFF" opacity="0.9" />
      <circle cx="80" cy="80" r="3" fill="#E5C989" />
      <circle cx="120" cy="80" r="3" fill="#E5C989" />
      <circle cx="100" cy="130" r="3" fill="#E5C989" />
    </svg>
  ),
  earrings: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="70" cy="80" r="20" fill="none" stroke="#E5C989" strokeWidth="3" />
      <circle cx="130" cy="80" r="20" fill="none" stroke="#E5C989" strokeWidth="3" />
      <circle cx="70" cy="80" r="6" fill="#FFF" opacity="0.9" />
      <circle cx="130" cy="80" r="6" fill="#FFF" opacity="0.9" />
      <line x1="70" y1="100" x2="70" y2="140" stroke="#E5C989" strokeWidth="2" />
      <line x1="130" y1="100" x2="130" y2="140" stroke="#E5C989" strokeWidth="2" />
    </svg>
  ),
  tennis: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <ellipse cx="100" cy="100" rx="55" ry="20" fill="none" stroke="#E5C989" strokeWidth="3" />
      <ellipse cx="100" cy="100" rx="55" ry="20" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <circle cx="60" cy="100" r="4" fill="#FFF" opacity="0.9" />
      <circle cx="100" cy="100" r="6" fill="#FFF" opacity="0.9" />
      <circle cx="140" cy="100" r="4" fill="#FFF" opacity="0.9" />
    </svg>
  ),
  watch: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <circle cx="100" cy="100" r="55" fill="none" stroke="#E5C989" strokeWidth="4" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.3" />
      <line x1="100" y1="60" x2="100" y2="100" stroke="#E5C989" strokeWidth="3" />
      <line x1="100" y1="100" x2="125" y2="115" stroke="#E5C989" strokeWidth="2" />
      <circle cx="100" cy="100" r="3" fill="#FFF" />
      <text x="100" y="78" textAnchor="middle" fill="#E5C989" fontSize="10" fontFamily="serif">XII</text>
    </svg>
  ),
  mens: (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect x="70" y="70" width="60" height="60" fill="none" stroke="#E5C989" strokeWidth="3" />
      <line x1="60" y1="100" x2="70" y2="100" stroke="#E5C989" strokeWidth="2" />
      <line x1="130" y1="100" x2="140" y2="100" stroke="#E5C989" strokeWidth="2" />
      <circle cx="100" cy="100" r="6" fill="#FFF" opacity="0.9" />
    </svg>
  ),
};

export async function Collections({ locale = 'sq' }: { locale?: Locale }) {
  const t = COLLECTIONS_CONTENT[locale];
  const categories = await getAllCategories();

  // Build product count map (optional — could query separately later)
  return (
    <section id="collections" className="py-[140px] px-12 bg-pearl">
      <Container>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => {
            const isFeatured = i === 0; // First category gets featured (2x size) layout
            const num = `N° ${String(i + 1).padStart(2, '0')}`;
            const name = locale === 'sq' ? cat.name_sq : cat.name_en;
            const svgKey = getProductSvgKey(cat.slug);
            const hasImage = !!cat.image;

            return (
              <Link
                key={cat.id}
                href={`/koleksione/${cat.slug}`}
                className={`reveal group cursor-pointer no-underline text-inherit ${
                  isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div
                  className={`relative overflow-hidden mb-6 bg-gradient-to-br from-ink-soft to-ink ${
                    isFeatured ? 'aspect-[1/1.1]' : 'aspect-[3/4]'
                  }`}
                >
                  {hasImage ? (
                    <>
                      <Image
                        src={cat.image!}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                        sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                      />
                      {/* Dark overlay for legibility of overlay text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-ink-black/20 to-ink-black/40 pointer-events-none" />
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-70"
                        style={{
                          background:
                            'radial-gradient(circle at 50% 40%, #9B7F3F 0%, #0A0A0A 80%)',
                        }}
                      />
                      <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 transition-transform duration-700 ease-luxe group-hover:scale-110 group-hover:rotate-2"
                        style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
                      >
                        {SVGs[svgKey]}
                      </div>
                    </>
                  )}

                  <div className="absolute inset-6 border border-gold/30 pointer-events-none z-[1]" />
                  <span className="absolute top-6 left-6 font-display text-sm text-gold-light tracking-widest z-[2]">
                    {num}
                  </span>
                </div>

                <div className="flex justify-between items-end pb-4 border-b border-line mb-3">
                  <span className={`font-display ${isFeatured ? 'text-4xl' : 'text-2xl'} tracking-wide text-ink-black`}>
                    {name}
                  </span>
                  <span className="font-serif text-xl text-gold-dark transition-transform duration-400 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
