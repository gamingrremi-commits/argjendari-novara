'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/config';

interface NavProps {
  locale?: 'sq' | 'en';
}

export function Nav({ locale = 'sq' }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = NAV_LINKS[locale];

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
        href="/"
        className="font-display text-[28px] tracking-[0.4em] text-ink-black no-underline relative"
      >
        NOVARA
        <span className="absolute -bottom-1.5 left-0 right-[30%] h-px bg-gold" />
      </Link>

      <ul className="hidden lg:flex gap-[42px] list-none items-center">
        {links.map((link) => {
          const isHash = link.href.startsWith('/#') || link.href.startsWith('#');
          const LinkComponent = isHash ? 'a' : Link;
          return (
            <li key={link.href}>
              <LinkComponent
                href={link.href}
                className="text-ink no-underline text-[11px] tracking-widest uppercase font-normal py-1.5 relative transition-colors duration-300 hover:text-gold-dark group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gold transition-all duration-400 -translate-x-1/2 group-hover:w-full" />
              </LinkComponent>
            </li>
          );
        })}
      </ul>

      <div className="flex gap-1.5 items-center text-[10px] tracking-[0.2em] font-medium">
        <Link
          href="/"
          className={cn(
            'cursor-pointer px-1.5 py-1',
            locale === 'sq' ? 'text-gold-dark' : 'text-ink/40 hover:text-ink'
          )}
        >
          SQ
        </Link>
        <span className="opacity-30">/</span>
        <Link
          href="/en"
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
