'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { Booking } from '@/lib/types';

const TYPE_LABELS: Record<string, string> = {
  showroom_visit: 'Provim në dyqan',
  engagement_consultation: 'Konsulencë fejese',
  custom_order: 'Porosi me dizajn',
  repair: 'Riparim',
  appraisal: 'Vlerësim',
  general: 'Pyetje e përgjithshme',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'I ri',
  contacted: 'I kontaktuar',
  scheduled: 'I caktuar',
  completed: 'I përfunduar',
  cancelled: 'I anuluar',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-gold-dark text-pearl',
  contacted: 'bg-ink/40 text-pearl',
  scheduled: 'bg-blue-600/80 text-pearl',
  completed: 'bg-green-700 text-pearl',
  cancelled: 'bg-red-700 text-pearl',
};

interface Props {
  bookings: Booking[];
  initialFilter?: string;
}

export function BookingsInbox({ bookings, initialFilter }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [filter, setFilter] = useState<string>(initialFilter ?? 'all');
  const [selected, setSelected] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const filtered = useMemo(() => {
    if (filter === 'all') return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  const counts = useMemo(() => {
    return {
      all: bookings.length,
      new: bookings.filter((b) => b.status === 'new').length,
      contacted: bookings.filter((b) => b.status === 'contacted').length,
      scheduled: bookings.filter((b) => b.status === 'scheduled').length,
      completed: bookings.filter((b) => b.status === 'completed').length,
      cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    };
  }, [bookings]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }
    toast.success('Statusi u përditësua');
    if (selected?.id === id) {
      setSelected({ ...selected, status: status as any });
    }
    router.refresh();
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    const { error } = await supabase
      .from('bookings')
      .update({ admin_notes: adminNotes })
      .eq('id', selected.id);
    setSavingNotes(false);
    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }
    toast.success('Shënimet u ruajtën');
    setSelected({ ...selected, admin_notes: adminNotes } as any);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Fshi këtë mesazh? Kjo nuk mund të rikthehet.')) return;
    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }
    toast.success('Mesazhi u fshi');
    setSelected(null);
    router.refresh();
  };

  const openDetail = (b: Booking) => {
    setSelected(b);
    setAdminNotes((b as any).admin_notes ?? '');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-6">
      {/* List */}
      <div>
        {/* Filter tabs */}
        <div className="flex gap-1 mb-4 flex-wrap">
          {(['all', 'new', 'contacted', 'scheduled', 'completed', 'cancelled'] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  'px-3 py-2 text-[10px] tracking-widest uppercase transition-colors',
                  filter === s
                    ? 'bg-ink-black text-pearl'
                    : 'bg-white border border-line hover:border-gold text-ink'
                )}
              >
                {s === 'all' ? 'Të gjitha' : STATUS_LABELS[s]} ({counts[s]})
              </button>
            )
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-line p-12 text-center">
            <p className="font-serif italic text-lg text-ink">
              {bookings.length === 0
                ? 'Akoma nuk ka mesazhe.'
                : 'Asnjë mesazh me këtë status.'}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-line max-h-[80vh] overflow-y-auto">
            {filtered.map((b) => (
              <button
                key={b.id}
                onClick={() => openDetail(b)}
                className={cn(
                  'w-full text-left p-4 border-b border-line/50 last:border-0 transition-colors',
                  selected?.id === b.id ? 'bg-pearl-warm' : 'hover:bg-pearl/40',
                  b.status === 'new' && 'border-l-2 border-l-gold-dark'
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-display text-lg text-ink-black truncate">
                    {b.first_name} {b.last_name}
                  </div>
                  <span
                    className={cn(
                      'shrink-0 px-2 py-0.5 text-[8px] tracking-widest uppercase',
                      STATUS_COLORS[b.status]
                    )}
                  >
                    {STATUS_LABELS[b.status]}
                  </span>
                </div>
                <div className="font-serif italic text-sm text-ink mb-2">
                  {TYPE_LABELS[b.type]}
                </div>
                {b.message && (
                  <p className="font-serif text-sm text-ink/70 line-clamp-2">{b.message}</p>
                )}
                <div className="text-[10px] tracking-widest uppercase text-gold-dark mt-2">
                  {new Date(b.created_at).toLocaleString('sq-AL', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail */}
      <div>
        {!selected ? (
          <div className="bg-white border border-line p-12 text-center sticky top-6">
            <div className="font-display text-6xl text-gold-dark/30 mb-4">✉</div>
            <p className="font-serif italic text-lg text-ink">
              Zgjidh një mesazh nga lista për të parë detajet.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-line p-8 sticky top-6">
            <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-line">
              <div>
                <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
                  {TYPE_LABELS[selected.type]}
                </div>
                <h2 className="font-display text-3xl text-ink-black">
                  {selected.first_name} {selected.last_name}
                </h2>
                <div className="text-[10px] tracking-widest uppercase text-ink/50 mt-2">
                  {new Date(selected.created_at).toLocaleString('sq-AL', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                </div>
              </div>
              <button
                onClick={() => handleDelete(selected.id)}
                className="px-3 py-2 text-[10px] tracking-widest uppercase text-red-700 border border-red-700/30 hover:bg-red-700 hover:text-white transition-colors"
              >
                Fshi
              </button>
            </div>

            {/* Status changer */}
            <div className="mb-6 pb-6 border-b border-line">
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                Status
              </div>
              <div className="flex gap-2 flex-wrap">
                {(['new', 'contacted', 'scheduled', 'completed', 'cancelled'] as const).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={cn(
                        'px-3 py-2 text-[9px] tracking-widest uppercase transition-colors',
                        selected.status === s
                          ? STATUS_COLORS[s]
                          : 'bg-white border border-line text-ink hover:border-gold'
                      )}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="mb-6 pb-6 border-b border-line">
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                Kontakt
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-ink/50 mr-2">Email:</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="font-serif text-base text-ink-black hover:text-gold-dark no-underline"
                  >
                    {selected.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] tracking-widest uppercase text-ink/50 mr-2">Tel:</span>
                  <a
                    href={`tel:${selected.phone.replace(/\s/g, '')}`}
                    className="font-serif text-base text-ink-black hover:text-gold-dark no-underline"
                  >
                    {selected.phone}
                  </a>
                </div>
                {selected.preferred_date && (
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-ink/50 mr-2">
                      Data e preferuar:
                    </span>
                    <span className="font-serif text-base text-ink-black">
                      {new Date(selected.preferred_date).toLocaleDateString('sq-AL')}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <a
                  href={`https://wa.me/${selected.phone.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white text-[10px] tracking-widest uppercase no-underline hover:opacity-90 transition-opacity"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="px-4 py-2 bg-ink-black text-pearl text-[10px] tracking-widest uppercase no-underline hover:bg-gold-dark transition-colors"
                >
                  Përgjigjju Email
                </a>
              </div>
            </div>

            {/* Message */}
            {selected.message && (
              <div className="mb-6 pb-6 border-b border-line">
                <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                  Mesazhi
                </div>
                <p className="font-serif italic text-lg text-ink-black leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
            )}

            {/* Admin notes */}
            <div>
              <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-3 font-medium">
                Shënime Private (vetëm për ty)
              </div>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Shkruaj shënime private rreth këtij mesazhi..."
                rows={4}
                className="w-full p-3 border border-line bg-pearl/30 font-serif text-base text-ink-black outline-none focus:border-gold transition-colors resize-y"
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="mt-3 px-6 py-2 bg-ink-black text-pearl text-[10px] tracking-widest uppercase hover:bg-gold-dark transition-colors disabled:opacity-50"
              >
                {savingNotes ? 'Duke ruajtur...' : 'Ruaj Shënimet'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
