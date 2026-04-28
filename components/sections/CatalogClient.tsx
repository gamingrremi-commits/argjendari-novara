'use client';

import { useState, useMemo, useEffect } from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { ProductFilters, type SortOption } from '@/components/ui/ProductFilters';
import type { Product, Category, Locale } from '@/lib/types';

interface CatalogClientProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string | null;
  locale?: Locale;
}

export function CatalogClient({
  products,
  categories,
  initialCategory = null,
  locale = 'sq',
}: CatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Force ScrollReveal to re-observe newly mounted cards
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.visible)');
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, [selectedCategory, inStockOnly, featuredOnly, sortBy, searchQuery]);

  const categoryMap = useMemo(() => {
    const m = new Map<string, Category>();
    categories.forEach((c) => m.set(c.id, c));
    return m;
  }, [categories]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (selectedCategory) {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) list = list.filter((p) => p.category_id === cat.id);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.in_stock);
    }

    if (featuredOnly) {
      list = list.filter((p) => p.is_featured);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name_sq.toLowerCase().includes(q) ||
          p.name_en.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case 'newest':
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'name_asc':
        list.sort((a, b) => {
          const aN = locale === 'sq' ? a.name_sq : a.name_en;
          const bN = locale === 'sq' ? b.name_sq : b.name_en;
          return aN.localeCompare(bN);
        });
        break;
      case 'name_desc':
        list.sort((a, b) => {
          const aN = locale === 'sq' ? a.name_sq : a.name_en;
          const bN = locale === 'sq' ? b.name_sq : b.name_en;
          return bN.localeCompare(aN);
        });
        break;
    }

    return list;
  }, [products, categories, selectedCategory, inStockOnly, featuredOnly, sortBy, searchQuery, locale]);

  const t = {
    sq: {
      search: 'Kërko produkt...',
      noResults: 'Asnjë produkt nuk u gjet me këto filtra.',
      tryDifferent: 'Provo të ndryshosh kriteret e kërkimit.',
    },
    en: {
      search: 'Search product...',
      noResults: 'No products found with these filters.',
      tryDifferent: 'Try changing your search criteria.',
    },
  }[locale];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        inStockOnly={inStockOnly}
        onInStockChange={setInStockOnly}
        featuredOnly={featuredOnly}
        onFeaturedChange={setFeaturedOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={products.length}
        filteredCount={filtered.length}
        locale={locale}
      />

      <div>
        {/* Search bar */}
        <div className="mb-10 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full py-4 px-0 pr-12 border-0 border-b border-line bg-transparent font-serif text-lg text-ink-black outline-none focus:border-gold transition-colors placeholder:text-ink/40"
          />
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif italic text-2xl text-ink mb-4">{t.noResults}</p>
            <p className="font-sans text-sm text-ink/60">{t.tryDifferent}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                category={categoryMap.get(product.category_id)}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
