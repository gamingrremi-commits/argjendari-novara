'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ProductModelViewer } from '@/components/ui/ProductModelViewer';
import { ProductSvg } from '@/components/ui/ProductSvg';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
  alt: string;
  svgFallback: string;
  modelUrl?: string | null;
  badge?: string | null;
  inStock: boolean;
  soldLabel: string;
}

type GalleryItem =
  | { type: 'image'; src: string }
  | { type: 'model'; src: string }
  | { type: 'placeholder' };

export function ProductGallery({
  images,
  alt,
  svgFallback,
  modelUrl,
  badge,
  inStock,
  soldLabel,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const galleryItems = useMemo<GalleryItem[]>(() => {
    const imageItems: GalleryItem[] = images.map((src) => ({ type: 'image', src }));

    if (modelUrl) {
      imageItems.push({ type: 'model', src: modelUrl });
    }

    if (imageItems.length === 0) {
      return [{ type: 'placeholder' }];
    }

    return imageItems;
  }, [images, modelUrl]);

  useEffect(() => {
    if (activeIndex >= galleryItems.length) {
      setActiveIndex(0);
      setIsZoomed(false);
    }
  }, [activeIndex, galleryItems.length]);

  const activeItem = galleryItems[activeIndex] ?? galleryItems[0];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[100px_1fr] md:gap-6">
      <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:max-h-[600px] md:flex-col md:overflow-y-auto">
        {galleryItems.map((item, index) => (
          <button
            key={item.type === 'placeholder' ? 'placeholder' : `${item.type}-${index}`}
            onClick={() => {
              setActiveIndex(index);
              setIsZoomed(false);
            }}
            className={cn(
              'relative h-20 w-20 shrink-0 overflow-hidden border transition-all md:h-24 md:w-full',
              activeIndex === index
                ? 'border-gold-dark'
                : 'border-line opacity-60 hover:border-gold hover:opacity-100'
            )}
            aria-label={
              item.type === 'model' ? 'View 3D model' : `View image ${index + 1}`
            }
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pearl-warm to-[#DDD3BC]">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 text-gold-dark opacity-75">
                    <ProductSvg type={svgFallback as any} />
                  </div>
                  {item.type === 'model' ? (
                    <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-dark">
                      3D
                    </span>
                  ) : null}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="order-1 relative aspect-square overflow-hidden border border-line bg-gradient-to-br from-pearl-warm to-[#DDD3BC] md:order-2">
        {!inStock && (
          <div className="absolute inset-0 z-[3] flex items-center justify-center bg-ink-black/40">
            <span className="border border-pearl px-8 py-4 font-display text-3xl tracking-widest text-pearl">
              {soldLabel}
            </span>
          </div>
        )}

        {badge && (
          <span className="absolute left-6 top-6 z-[2] bg-ink-black px-4 py-2 text-[10px] uppercase tracking-widest text-gold-light">
            {badge}
          </span>
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 30%, rgba(201,169,97,0.1) 100%)',
          }}
        />

        {activeItem?.type === 'image' ? (
          <div
            className={cn(
              'absolute inset-0 cursor-zoom-in transition-transform duration-700 ease-luxe',
              isZoomed && 'scale-150 cursor-zoom-out'
            )}
            onClick={() => setIsZoomed((prev) => !prev)}
          >
            <Image
              src={activeItem.src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority={activeIndex === 0}
            />
          </div>
        ) : activeItem?.type === 'model' ? (
          <div className="absolute inset-0">
            <ProductModelViewer
              src={activeItem.src}
              alt={`${alt} 3D preview`}
              className="block h-full w-full bg-transparent"
            />
          </div>
        ) : (
          <div
            className="absolute left-1/2 top-1/2 w-[55%] -translate-x-1/2 -translate-y-1/2"
            style={{ filter: 'drop-shadow(0 15px 40px rgba(155,127,63,0.4))' }}
          >
            <ProductSvg type={svgFallback as any} />
          </div>
        )}

        {activeItem?.type === 'model' && (
          <span className="absolute bottom-6 right-6 z-[2] bg-ink-black/80 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.35em] text-gold-light backdrop-blur-sm">
            3D
          </span>
        )}
      </div>
    </div>
  );
}
