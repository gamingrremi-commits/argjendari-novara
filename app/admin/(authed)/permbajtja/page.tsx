import { createClient } from '@/lib/supabase/server';
import { ContentManager } from '@/components/admin/ContentManager';

export default async function AdminContentPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from('site_content')
    .select('key, value_sq, value_en, description');

  return (
    <div className="p-10">
      <div className="mb-12">
        <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-2">
          Menaxhim
        </div>
        <h1 className="font-display text-5xl text-ink-black">Përmbajtja</h1>
        <p className="font-serif italic text-base text-ink mt-2">
          Edito tekstet e homepage, atelier dhe shërbimeve. Ndryshimet shfaqen menjëherë në website.
        </p>
      </div>

      <ContentManager initialContent={data ?? []} />
    </div>
  );
}
