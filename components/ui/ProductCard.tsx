'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductSvg } from '@/components/ui/ProductSvg';
import { getProductSvgKey } from '@/lib/data/helpers';
import type { Product, Category, Locale } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  category?: Category;
  locale?: Locale;
}

export function ProductCard({ product, category, locale = 'sq' }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = {
    sq: { ask: 'Pyet', sold: 'I shitur', new: 'Risi' },
    en: { ask: 'Ask', sold: 'Sold', new: 'New' },
  }[locale];

  // Read wishlist from localStorage
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('novara_wishlist');
      if (stored) {
        const arr = JSON.parse(stored);
        setWishlisted(arr.includes(product.id));
      }
    }
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const stored = localStorage.getItem('novara_wishlist');
    const arr: string[] = stored ? JSON.parse(stored) : [];
    let newArr;
    if (arr.includes(product.id)) {
      newArr = arr.filter((id) => id !== product.id);
      setWishlisted(false);
    } else {
      newArr = [...arr, product.id];
      setWishlisted(true);
    }
    localStorage.setItem('novara_wishlist', JSON.stringify(newArr));
  };

  const productName = locale === 'sq' ? product.name_sq : product.name_en;
  const categoryName = category ? (locale === 'sq' ? category.name_sq : category.name_en) : '';
  const badge = locale === 'sq' ? product.badge_sq : product.badge_en;
  const hasImage = product.images && product.images.length > 0;
  const svgKey = category ? getProductSvgKey(category.slug) : 'ring';

  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="reveal group cursor-pointer no-underline text-inherit block"
    >
      <div className="aspect-square relative overflow-hidden mb-5 border border-line bg-gradient-to-br from-pearl-warm to-[#DDD3BC]">
        {!product.in_stock && (
          <div className="absolute inset-0 bg-ink-black/40 z-[3] flex items-center justify-center">
            <span className="font-display text-pearl text-2xl tracking-widest border border-pearl px-6 py-3">
              {t.sold}
            </span>
          </div>
        )}

        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(201,169,97,0.1) 100%)' }}
        />

        {badge && (
          <span className="absolute top-4 left-4 bg-ink-black text-gold-light px-3 py-1.5 text-[9px] tracking-widest uppercase z-[2]">
            {badge}
          </span>
        )}

        {mounted && (
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-9 h-9 bg-pearl/90 border-none rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-ink-black z-[2]"
            aria-label="Add to wishlist"
          >
            <span className={wishlisted ? 'text-gold-dark' : 'text-ink hover:text-gold-light'}>
              {wishlisted ? '♥' : '♡'}
            </span>
          </button>
        )}

        {hasImage ? (
          <Image
            src={product.images[0]}
            alt={productName}
            fill
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] transition-transform duration-700 ease-luxe group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 8px 20px rgba(155,127,63,0.3))' }}
          >
            <ProductSvg type={svgKey as any} />
          </div>
        )}
      </div>

      <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
        {categoryName}
      </div>
      <h4 className="font-display text-[22px] text-ink-black mb-2 tracking-wide">{productName}</h4>
      <div className="font-serif text-base text-ink flex justify-between items-baseline">
        <span className="truncate pr-2">{product.material}</span>
        <span className="text-[11px] tracking-widest uppercase text-gold-dark font-sans font-medium shrink-0">
          {t.ask}
        </span>
      </div>
    </Link>
  );
}
