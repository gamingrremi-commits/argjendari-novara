'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '◐' },
  { href: '/admin/produkte', label: 'Produkte', icon: '◇' },
  { href: '/admin/kategorite', label: 'Kategoritë', icon: '⊞' },
  { href: '/admin/mesazhet', label: 'Mesazhet', icon: '✉' },
];

interface AdminSidebarProps {
  userEmail: string;
}

export function AdminSidebar({ userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Mirupafshim');
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-ink-black text-pearl min-h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-gold/15">
        <Link
          href="/admin"
          className="font-display text-2xl tracking-[0.4em] text-pearl no-underline block"
        >
          NOVARA
        </Link>
        <p className="text-[9px] tracking-widest uppercase text-gold-light mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-[11px] tracking-widest uppercase font-medium transition-all no-underline',
                    isActive
                      ? 'bg-gold/15 text-gold-light border-l-2 border-gold'
                      : 'text-pearl-warm hover:bg-white/5 hover:text-pearl border-l-2 border-transparent'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-6 border-t border-gold/15">
        <div className="mb-4">
          <div className="text-[9px] tracking-widest uppercase text-gold-light mb-1">
            Hyrë si
          </div>
          <div className="font-serif text-sm text-pearl truncate">{userEmail}</div>
        </div>
        <Link
          href="/"
          target="_blank"
          className="block w-full mb-3 text-center py-2 text-[10px] tracking-widest uppercase text-pearl-warm hover:text-gold-light transition-colors no-underline border border-gold/20 hover:border-gold/40"
        >
          Hap Website ↗
        </Link>
        <button
          onClick={handleLogout}
          className="w-full py-2 text-[10px] tracking-widest uppercase text-pearl-warm hover:text-gold-light transition-colors border-none bg-transparent cursor-pointer"
        >
          Dil
        </button>
      </div>
    </aside>
  );
}
