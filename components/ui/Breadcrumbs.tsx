import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-[11px] tracking-widest uppercase text-gold-dark">
      <ol className="flex items-center gap-3 flex-wrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-ink-black transition-colors no-underline text-gold-dark"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-black">{item.label}</span>
            )}
            {i < items.length - 1 && <span className="text-gold opacity-50">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
