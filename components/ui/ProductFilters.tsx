'use client';

import type { Category, Locale } from '@/lib/types';

export type SortOption = 'newest' | 'oldest' | 'name_asc' | 'name_desc';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (slug: string | null) => void;
  inStockOnly: boolean;
  onInStockChange: (v: boolean) => void;
  featuredOnly: boolean;
  onFeaturedChange: (v: boolean) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  totalCount: number;
  filteredCount: number;
  locale?: Locale;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
  featuredOnly,
  onFeaturedChange,
  sortBy,
  onSortChange,
  totalCount,
  filteredCount,
  locale = 'sq',
}: ProductFiltersProps) {
  const t = {
    sq: {
      filters: 'Filtra',
      categories: 'Kategoritë',
      all: 'Të gjitha',
      availability: 'Disponueshmëria',
      inStock: 'Vetëm në stok',
      featured: 'Vetëm featured',
      sort: 'Renditja',
      sortOptions: {
        newest: 'Më të rejat',
        oldest: 'Më të vjetrat',
        name_asc: 'Emri A → Z',
        name_desc: 'Emri Z → A',
      },
      showing: 'Duke shfaqur',
      of: 'nga',
      products: 'produkte',
      reset: 'Pastro filtrat',
    },
    en: {
      filters: 'Filters',
      categories: 'Categories',
      all: 'All',
      availability: 'Availability',
      inStock: 'In stock only',
      featured: 'Featured only',
      sort: 'Sort by',
      sortOptions: {
        newest: 'Newest',
        oldest: 'Oldest',
        name_asc: 'Name A → Z',
        name_desc: 'Name Z → A',
      },
      showing: 'Showing',
      of: 'of',
      products: 'products',
      reset: 'Clear filters',
    },
  }[locale];

  const hasActiveFilters = selectedCategory !== null || inStockOnly || featuredOnly;

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <div className="border border-line bg-pearl/50 backdrop-blur p-8">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-line">
          <h3 className="font-display text-xl text-ink-black tracking-wider">{t.filters}</h3>
          {hasActiveFilters && (
            <button
              onClick={() => {
                onCategoryChange(null);
                onInStockChange(false);
                onFeaturedChange(false);
              }}
              className="text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors"
            >
              {t.reset}
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-4 font-medium">
            {t.categories}
          </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onCategoryChange(null)}
                className={`text-left w-full py-1.5 font-serif text-base transition-colors ${
                  selectedCategory === null
                    ? 'text-ink-black font-medium border-b border-gold'
                    : 'text-ink hover:text-gold-dark'
                }`}
              >
                {t.all}
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => onCategoryChange(cat.slug)}
                  className={`text-left w-full py-1.5 font-serif text-base transition-colors ${
                    selectedCategory === cat.slug
                      ? 'text-ink-black font-medium border-b border-gold'
                      : 'text-ink hover:text-gold-dark'
                  }`}
                >
                  {locale === 'sq' ? cat.name_sq : cat.name_en}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability */}
        <div className="mb-8 pb-8 border-b border-line">
          <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-4 font-medium">
            {t.availability}
          </div>
          <label className="flex items-center gap-3 cursor-pointer mb-3 group">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 accent-gold-dark"
            />
            <span className="font-serif text-base text-ink group-hover:text-gold-dark transition-colors">
              {t.inStock}
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) => onFeaturedChange(e.target.checked)}
              className="w-4 h-4 accent-gold-dark"
            />
            <span className="font-serif text-base text-ink group-hover:text-gold-dark transition-colors">
              {t.featured}
            </span>
          </label>
        </div>

        {/* Sort */}
        <div>
          <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-4 font-medium">
            {t.sort}
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full py-3 px-0 border-0 border-b border-line bg-transparent font-serif text-base text-ink-black outline-none focus:border-gold cursor-pointer"
          >
            {Object.entries(t.sortOptions).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 px-2 text-[11px] tracking-widest uppercase text-gold-dark">
        {t.showing} {filteredCount} {t.of} {totalCount} {t.products}
      </div>
    </aside>
  );
}
