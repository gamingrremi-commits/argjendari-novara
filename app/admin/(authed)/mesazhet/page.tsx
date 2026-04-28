import { createClient } from '@/lib/supabase/server';
import { BookingsInbox } from '@/components/admin/BookingsInbox';

interface PageProps {
  searchParams: { status?: string };
}

export default async function AdminBookingsPage({ searchParams }: PageProps) {
  const supabase = createClient();
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-10">
      <div className="mb-12">
        <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
          Inbox
        </div>
        <h1 className="font-display text-5xl text-ink-black">Mesazhet</h1>
        <p className="font-serif italic text-base text-ink mt-2">
          {bookings?.length ?? 0} mesazhe nga klientët
        </p>
      </div>

      <BookingsInbox
        bookings={bookings ?? []}
        initialFilter={searchParams.status}
      />
    </div>
  );
}
