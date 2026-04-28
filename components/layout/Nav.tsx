'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getAlternateLocale,
  getLocalizedHomeHash,
  getLocalizedPath,
  switchLocalePath,
} from '@/lib/routing';
import type { Locale } from '@/lib/types';
import { cn } from '@/lib/utils';

interface NavProps {
  locale?: Locale;
}

export function Nav({ locale = 'sq' }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

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
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const navIsSolid = scrolled || mobileMenuOpen;
  const languageLabel = locale === 'sq' ? 'Gjuha' : 'Language';
  const ariaLabel = mobileMenuOpen
    ? locale === 'sq' ? 'Mbyll menynë' : 'Close menu'
    : locale === 'sq' ? 'Hap menynë' : 'Open menu';

  // Persist explicit user language choice — middleware respects this cookie
  // so the geo-IP redirect won't override what the visitor actually picked.
  const persistLocaleChoice = (chosen: Locale) => {
    if (typeof document === 'undefined') return;
    document.cookie = `novara-locale=${chosen}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <>
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close mobile navigation"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-[99] bg-ink-black/15 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 ease-luxe',
          navIsSolid
            ? 'border-b border-line bg-pearl/[0.92] px-6 py-4 backdrop-blur-xl md:px-12 md:py-[18px]'
            : 'bg-transparent px-6 py-5 md:px-12 md:py-6'
        )}
      >
        <Link
          href={getLocalizedPath(locale, 'home')}
          onClick={closeMobileMenu}
          className="relative font-display text-[22px] tracking-[0.34em] text-ink-black no-underline md:text-[28px] md:tracking-[0.4em]"
        >
          NOVARA
          <span className="absolute -bottom-1.5 left-0 right-[30%] h-px bg-gold" />
        </Link>

        <ul className="hidden list-none items-center gap-[42px] lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative py-1.5 text-[11px] font-normal uppercase tracking-widest text-ink no-underline transition-colors duration-300 hover:text-gold-dark"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-400 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1.5 text-[10px] font-medium tracking-[0.2em] lg:flex">
          <Link
            href={locale === 'sq' ? getLocalizedPath('sq', 'home') : localeSwitchHref}
            onClick={() => persistLocaleChoice('sq')}
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
            onClick={() => persistLocaleChoice('en')}
            className={cn(
              'cursor-pointer px-1.5 py-1',
              locale === 'en' ? 'text-gold-dark' : 'text-ink/40 hover:text-ink'
            )}
          >
            EN
          </Link>
        </div>

        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-gold/5 lg:hidden"
        >
          <span className="sr-only">{ariaLabel}</span>
          <span aria-hidden className="relative block h-[14px] w-[22px]">
            <span
              className={cn(
                'absolute left-0 block h-px w-full bg-ink-black transition-all duration-400 ease-luxe group-hover:bg-gold-dark',
                mobileMenuOpen ? 'top-[6px] rotate-45' : 'top-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-[6px] block h-px bg-ink-black transition-all duration-300 ease-luxe group-hover:bg-gold-dark',
                mobileMenuOpen ? 'w-0 opacity-0' : 'w-3/4 opacity-100'
              )}
            />
            <span
              className={cn(
                'absolute left-0 block h-px w-full bg-ink-black transition-all duration-400 ease-luxe group-hover:bg-gold-dark',
                mobileMenuOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'
              )}
            />
          </span>
        </button>

        <div
          id="mobile-nav-menu"
          className={cn(
            'absolute left-0 right-0 top-full overflow-hidden border-t border-line bg-pearl/[0.98] backdrop-blur-xl transition-all duration-400 ease-luxe lg:hidden',
            mobileMenuOpen
              ? 'pointer-events-auto max-h-[calc(100vh-72px)] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0'
          )}
        >
          <div className="px-6 py-6 md:px-10">
            {/* Language toggle — placed at the top so it is the first thing
                users see when they open the sandwich menu. */}
            <div className="mb-6 flex items-center justify-between border-b border-line/70 pb-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-ink/50">
                {languageLabel}
              </span>

              <div className="relative flex items-center rounded-full border border-line bg-pearl/60 p-1 text-[11px] font-medium tracking-[0.22em]">
                <Link
                  href={locale === 'sq' ? getLocalizedPath('sq', 'home') : localeSwitchHref}
                  onClick={() => {
                    persistLocaleChoice('sq');
                    closeMobileMenu();
                  }}
                  aria-current={locale === 'sq' ? 'true' : undefined}
                  className={cn(
                    'min-w-[52px] rounded-full px-4 py-1.5 text-center no-underline transition-all duration-300',
                    locale === 'sq'
                      ? 'bg-ink-black text-pearl shadow-[0_2px_8px_rgba(10,10,10,0.15)]'
                      : 'text-ink/50 hover:text-ink-black'
                  )}
                >
                  SQ
                </Link>
                <Link
                  href={locale === 'en' ? getLocalizedPath('en', 'home') : localeSwitchHref}
                  onClick={() => {
                    persistLocaleChoice('en');
                    closeMobileMenu();
                  }}
                  aria-current={locale === 'en' ? 'true' : undefined}
                  className={cn(
                    'min-w-[52px] rounded-full px-4 py-1.5 text-center no-underline transition-all duration-300',
                    locale === 'en'
                      ? 'bg-ink-black text-pearl shadow-[0_2px_8px_rgba(10,10,10,0.15)]'
                      : 'text-ink/50 hover:text-ink-black'
                  )}
                >
                  EN
                </Link>
              </div>
            </div>

            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between border-b border-line/70 py-4 font-display text-[30px] tracking-[0.08em] text-ink-black no-underline transition-colors hover:text-gold-dark"
                  >
                    <span>{link.label}</span>
                    <span className="font-serif text-gold-dark">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
