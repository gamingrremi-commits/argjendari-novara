import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = createClient();

  // Fetch stats in parallel
  const [productsCount, categoriesCount, bookingsAll, bookingsNew] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('categories').select('id', { count: 'exact', head: true }),
    supabase.from('bookings').select('id', { count: 'exact', head: true }),
    supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new'),
  ]);

  // Recent bookings
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    {
      label: 'Produkte',
      value: productsCount.count ?? 0,
      href: '/admin/produkte',
      cta: 'Menaxho →',
    },
    {
      label: 'Kategori',
      value: categoriesCount.count ?? 0,
      href: '/admin/kategorite',
      cta: 'Menaxho →',
    },
    {
      label: 'Mesazhe Total',
      value: bookingsAll.count ?? 0,
      href: '/admin/mesazhet',
      cta: 'Shih →',
    },
    {
      label: 'Mesazhe të Reja',
      value: bookingsNew.count ?? 0,
      href: '/admin/mesazhet?status=new',
      cta: 'Lexo →',
      highlight: (bookingsNew.count ?? 0) > 0,
    },
  ];

  return (
    <div className="p-10">
      <div className="mb-12">
        <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
          Mirë se erdhët
        </div>
        <h1 className="font-display text-5xl text-ink-black">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`block bg-white border p-8 transition-all hover:border-gold no-underline group ${
              stat.highlight ? 'border-gold' : 'border-line'
            }`}
          >
            <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
              {stat.label}
            </div>
            <div className="font-display text-5xl text-ink-black mb-4">
              {stat.value}
            </div>
            <div className="text-[10px] tracking-widest uppercase text-ink/50 group-hover:text-gold-dark transition-colors">
              {stat.cta}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Link
          href="/admin/produkte/ri"
          className="bg-ink-black text-pearl p-10 transition-all hover:bg-gold-dark no-underline block group"
        >
          <div className="font-display text-4xl mb-3">+</div>
          <div className="font-display text-2xl mb-2">Shto Produkt të Ri</div>
          <p className="font-serif italic text-pearl-warm">
            Krijo një produkt të ri me foto, përshkrim dhe detaje.
          </p>
        </Link>

        <Link
          href="/admin/mesazhet"
          className="bg-white border border-line p-10 transition-all hover:border-gold no-underline block group"
        >
          <div className="font-display text-4xl text-gold-dark mb-3">✉</div>
          <div className="font-display text-2xl text-ink-black mb-2">Lexo Mesazhet</div>
          <p className="font-serif italic text-ink">
            Shih rezervimet, konsultimet dhe pyetjet nga klientët.
          </p>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border border-line p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-line">
          <h2 className="font-display text-2xl text-ink-black">Mesazhet e Fundit</h2>
          <Link
            href="/admin/mesazhet"
            className="text-[10px] tracking-widest uppercase text-gold-dark hover:text-ink-black transition-colors no-underline"
          >
            Shih të gjitha →
          </Link>
        </div>

        {!recentBookings || recentBookings.length === 0 ? (
          <p className="font-serif italic text-ink py-8 text-center">
            Akoma nuk ka mesazhe. Mesazhet do të shfaqen këtu kur klientët mbushin formën.
          </p>
        ) : (
          <ul className="space-y-1">
            {recentBookings.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/admin/mesazhet`}
                  className="flex items-center justify-between gap-4 py-4 border-b border-line/50 last:border-0 hover:px-2 transition-all no-underline group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg text-ink-black truncate">
                      {b.first_name} {b.last_name}
                    </div>
                    <div className="font-serif text-sm italic text-ink truncate">
                      {BOOKING_TYPE_LABELS[b.type as keyof typeof BOOKING_TYPE_LABELS] ?? b.type}
                    </div>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark shrink-0">
                    {b.status === 'new' && (
                      <span className="text-gold-dark font-bold">●</span>
                    )}{' '}
                    {new Date(b.created_at).toLocaleDateString('sq-AL')}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const BOOKING_TYPE_LABELS = {
  showroom_visit: 'Provim në dyqan',
  engagement_consultation: 'Konsulencë fejese',
  custom_order: 'Porosi me dizajn',
  repair: 'Riparim',
  appraisal: 'Vlerësim',
  general: 'Pyetje e përgjithshme',
};
