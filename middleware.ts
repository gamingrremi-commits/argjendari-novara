import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const LOCALE_COOKIE = 'novara-locale';
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 vit

// Heqim prefix-in /en (nëse ekziston) për të ndërtuar versionin SQ të të njëjtës rrugë.
function toSqPath(pathname: string): string {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3) || '/';
  return pathname;
}

function toEnPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/en';
  if (pathname === '/en' || pathname.startsWith('/en/')) return pathname;
  return `/en${pathname}`;
}

// Lexon vendin nga header-at e ofruar nga hosting provider.
// Vercel: x-vercel-ip-country  ·  Cloudflare: cf-ipcountry
// Në dev / hosting tjetër këto janë null → nuk bëjmë redirect, fallback në SQ default.
function detectCountry(request: NextRequest): string | null {
  const vercel = request.headers.get('x-vercel-ip-country');
  if (vercel) return vercel.toUpperCase();
  const cf = request.headers.get('cf-ipcountry');
  if (cf) return cf.toUpperCase();
  // @ts-expect-error - vetëm në Vercel runtime
  const geoCountry = request.geo?.country as string | undefined;
  if (geoCountry) return geoCountry.toUpperCase();
  return null;
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const pathname = request.nextUrl.pathname;
  const isPublicAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    /\.[a-zA-Z0-9]+$/.test(pathname); // file me extension (.png, .ico, .xml, etj.)

  // ──────────────────────────────────────────────────────────────────────────
  // GEO-IP LOCALE REDIRECT
  // Logjika: nëse vizitori NUK ka cookie eksplicite, lexojmë vendin.
  // - IP nga Shqipëria  → SQ (heq /en nëse e ka në URL)
  // - IP tjetër        → EN (shton /en nëse nuk e ka)
  // Pasi bëhet redirect-i (ose përcaktohet locale-i), ruajmë cookie-n që mos
  // të bëjmë override përsëri herën tjetër — dhe respektojmë çdo zgjedhje
  // manuale të bërë nga klikimi i SQ/EN në nav.
  // ──────────────────────────────────────────────────────────────────────────
  if (!isPublicAsset) {
    const existingLocaleCookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const isOnEnPath = pathname === '/en' || pathname.startsWith('/en/');

    if (!existingLocaleCookie) {
      const country = detectCountry(request);
      // Trajtojmë edhe Kosovën (XK) si tregues i mundshëm i shqipfolësit.
      const isAlbanianRegion = country === 'AL' || country === 'XK';

      // Nëse s'mund ta zbulojmë vendin (dev local p.sh.) lëre default SQ — pa redirect.
      if (country) {
        if (isAlbanianRegion && isOnEnPath) {
          const url = request.nextUrl.clone();
          url.pathname = toSqPath(pathname);
          const redirectResponse = NextResponse.redirect(url);
          redirectResponse.cookies.set(LOCALE_COOKIE, 'sq', {
            path: '/',
            maxAge: LOCALE_COOKIE_MAX_AGE,
            sameSite: 'lax',
          });
          return redirectResponse;
        }

        if (!isAlbanianRegion && !isOnEnPath) {
          const url = request.nextUrl.clone();
          url.pathname = toEnPath(pathname);
          const redirectResponse = NextResponse.redirect(url);
          redirectResponse.cookies.set(LOCALE_COOKIE, 'en', {
            path: '/',
            maxAge: LOCALE_COOKIE_MAX_AGE,
            sameSite: 'lax',
          });
          return redirectResponse;
        }
      }

      // S'pati nevojë për redirect — ruajmë cookie-n bazuar në URL-n aktuale.
      response.cookies.set(LOCALE_COOKIE, isOnEnPath ? 'en' : 'sq', {
        path: '/',
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: 'lax',
      });
    }
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';

  // Protect admin routes
  if (isAdminRoute && !isLoginRoute && !user) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If logged in user visits login, redirect to dashboard
  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
