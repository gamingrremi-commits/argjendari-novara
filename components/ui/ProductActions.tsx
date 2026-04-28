'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/config';
import type { Product, Locale } from '@/lib/types';

interface ProductActionsProps {
  product: Product;
  locale?: Locale;
}

export function ProductActions({ product, locale = 'sq' }: ProductActionsProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = {
    sq: {
      askWhatsapp: 'Pyet në WhatsApp',
      bookVisit: 'Rezervo provim në dyqan',
      wishlistAdd: 'Shto në listën e dëshirave',
      wishlistRemove: 'Hiq nga lista e dëshirave',
      whatsappMsg: (name: string) =>
        `Pershendetje! Jam i interesuar per produktin "${name}". A mund te me jepni me shume informacion?`,
    },
    en: {
      askWhatsapp: 'Ask on WhatsApp',
      bookVisit: 'Book in-store visit',
      wishlistAdd: 'Add to wishlist',
      wishlistRemove: 'Remove from wishlist',
      whatsappMsg: (name: string) =>
        `Hello! I'm interested in "${name}". Could you send me more information?`,
    },
  }[locale];

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('novara_wishlist');
      if (stored) {
        setWishlisted(JSON.parse(stored).includes(product.id));
      }
    }
  }, [product.id]);

  const toggleWishlist = () => {
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
  const message = encodeURIComponent(t.whatsappMsg(productName));
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${message}`;
  const visitUrl = `/#contact?product=${product.slug}&type=showroom_visit`;

  return (
    <div className="space-y-4">
      <Button href={whatsappUrl} variant="primary" external className="w-full justify-center">
        {t.askWhatsapp}
      </Button>

      <Button href={visitUrl} variant="secondary" className="w-full justify-center">
        {t.bookVisit}
      </Button>

      {mounted && (
        <button
          onClick={toggleWishlist}
          className="w-full flex items-center justify-center gap-3 py-3 text-[11px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors font-medium"
        >
          <span className="text-lg">{wishlisted ? '♥' : '♡'}</span>
          {wishlisted ? t.wishlistRemove : t.wishlistAdd}
        </button>
      )}
    </div>
  );
}
