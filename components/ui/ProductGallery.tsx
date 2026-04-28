'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductSvg } from '@/components/ui/ProductSvg';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  svgFallback: string;
  badge?: string | null;
  inStock: boolean;
  soldLabel: string;
}

export function ProductGallery({
  images,
  alt,
  svgFallback,
  badge,
  inStock,
  soldLabel,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const hasImages = images && images.length > 0;
  const displayImages = hasImages ? images : ['placeholder'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 md:gap-6">
      {/* Thumbnails — vertical on desktop, horizontal on mobile */}
      <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px]">
        {displayImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              'shrink-0 w-20 h-20 md:w-full md:h-24 relative overflow-hidden border transition-all',
              activeIndex === i
                ? 'border-gold-dark'
                : 'border-line opacity-60 hover:opacity-100 hover:border-gold'
            )}
            aria-label={`View image ${i + 1}`}
          >
            {hasImages ? (
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-pearl-warm to-[#DDD3BC] flex items-center justify-center">
                <div className="w-3/5">
                  <ProductSvg type={svgFallback as any} />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="order-1 md:order-2 relative aspect-square overflow-hidden border border-line bg-gradient-to-br from-pearl-warm to-[#DDD3BC]">
        {!inStock && (
          <div className="absolute inset-0 bg-ink-black/40 z-[3] flex items-center justify-center">
            <span className="font-display text-pearl text-3xl tracking-widest border border-pearl px-8 py-4">
              {soldLabel}
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute top-6 left-6 bg-ink-black text-gold-light px-4 py-2 text-[10px] tracking-widest uppercase z-[2]">
            {badge}
          </span>
        )}

        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(201,169,97,0.1) 100%)' }}
        />

        {hasImages ? (
          <div
            className={cn(
              'absolute inset-0 cursor-zoom-in transition-transform duration-700 ease-luxe',
              isZoomed && 'scale-150 cursor-zoom-out'
            )}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={displayImages[activeIndex]}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority
            />
          </div>
        ) : (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%]"
            style={{ filter: 'drop-shadow(0 15px 40px rgba(155,127,63,0.4))' }}
          >
            <ProductSvg type={svgFallback as any} />
          </div>
        )}
      </div>
    </div>
  );
}
