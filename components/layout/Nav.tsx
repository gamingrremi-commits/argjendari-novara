'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAlternateLocale, getLocalizedHomeHash, getLocalizedPath, switchLocalePath } from '@/lib/routing';
import type { Locale } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavProps {
  locale?: Locale;
}

export function Nav({ locale = 'sq' }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScrolled = () => {
      frameId = 0;
      const nextValue = window.scrollY > 60;
      setScrolled((previous) => (previous === nextValue ? previous : nextValue));
    };

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const links =
    locale === 'sq'
      ? [
          { href: getLocalizedPath(locale, 'collections'), label: 'Koleksione' },
          { href: getLocalizedPath(locale, 'atelier'), label: 'Atelier' },
          { href: getLocalizedPath(locale, 'services'), label: 'Shërbime' },
          { href: getLocalizedHomeHash(locale, 'location'), label: 'Dyqani' },
          { href: getLocalizedHomeHash(locale, 'contact'), label: 'Kontakt' },
        ]
      : [
          { href: getLocalizedPath(locale, 'collections'), label: 'Collections' },
          { href: getLocalizedPath(locale, 'atelier'), label: 'Atelier' },
          { href: getLocalizedPath(locale, 'services'), label: 'Services' },
          { href: getLocalizedHomeHash(locale, 'location'), label: 'Boutique' },
          { href: getLocalizedHomeHash(locale, 'contact'), label: 'Contact' },
        ];

  const alternateLocale = getAlternateLocale(locale);
  const localeSwitchHref = switchLocalePath(
    pathname || getLocalizedPath(locale, 'home'),
    alternateLocale
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] flex justify-between items-center transition-all duration-500 ease-luxe',
        scrolled
          ? 'bg-pearl/[0.92] backdrop-blur-xl py-[18px] px-12 border-b border-line'
          : 'bg-transparent py-6 px-12'
      )}
    >
      <Link
        href={getLocalizedPath(locale, 'home')}
        className="font-display text-[28px] tracking-[0.4em] text-ink-black no-underline relative"
      >
        NOVARA
        <span className="absolute -bottom-1.5 left-0 right-[30%] h-px bg-gold" />
      </Link>

      <ul className="hidden lg:flex gap-[42px] list-none items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-ink no-underline text-[11px] tracking-widest uppercase font-normal py-1.5 relative transition-colors duration-300 hover:text-gold-dark group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gold transition-all duration-400 -translate-x-1/2 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-1.5 items-center text-[10px] tracking-[0.2em] font-medium">
        <Link
          href={locale === 'sq' ? getLocalizedPath('sq', 'home') : localeSwitchHref}
          className={cn(
            'cursor-pointer px-1.5 py-1',
            locale === 'sq' ? 'text-gold-dark' : 'text-ink/40 hover:text-ink'
          )}
        >
          SQ
        </Link>
        <span className="opacity-30">/</span>
        <Link
          href={locale === 'en' ? getLocalizedPath('en', 'home') : localeSwitchHref}
          className={cn(
            'cursor-pointer px-1.5 py-1',
            locale === 'en' ? 'text-gold-dark' : 'text-ink/40 hover:text-ink'
          )}
        >
          EN
        </Link>
      </div>
    </nav>
  );
}
