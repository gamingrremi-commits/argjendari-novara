'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

interface ContentEntry {
  key: string;
  value_sq: string | null;
  value_en: string | null;
  description: string | null;
}

interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'piped';
  hint?: string;
}

interface SectionDef {
  id: string;
  title: string;
  icon: string;
  description: string;
  fields: FieldDef[];
}

const SECTIONS: SectionDef[] = [
  {
    id: 'hero',
    title: 'Hero (Pamja kryesore)',
    icon: '◆',
    description: 'Seksioni i parë që shihet në homepage',
    fields: [
      { key: 'hero.eyebrow', label: 'Eyebrow (teksti i vogël lart)', type: 'text' },
      { key: 'hero.title_line1', label: 'Titulli — rreshti 1', type: 'text' },
      { key: 'hero.title_accent', label: 'Titulli — fjala e theksuar (italike artë)', type: 'text', hint: 'Vetëm një fjalë ose frazë e shkurtër' },
      { key: 'hero.title_line2', label: 'Titulli — rreshti 2', type: 'text' },
      { key: 'hero.subtitle', label: 'Nën-titull', type: 'textarea' },
      { key: 'hero.cta_primary', label: 'Butoni kryesor', type: 'text' },
      { key: 'hero.cta_secondary', label: 'Butoni sekondar', type: 'text' },
      { key: 'hero.years_count', label: 'Numri i viteve (p.sh. 10+)', type: 'text' },
      { key: 'hero.years_label', label: 'Etiketa nën numrin', type: 'text' },
    ],
  },
  {
    id: 'marquee',
    title: 'Marquee (banner i lëvizshëm)',
    icon: '⌁',
    description: 'Banner i zi me tekst që rrotullohet pas Hero',
    fields: [
      { key: 'marquee.items', label: 'Thëniet (ndaj me |)', type: 'piped', hint: 'P.sh. ARI 18K|DIAMANTE|RIPARIME' },
    ],
  },
  {
    id: 'collections',
    title: 'Koleksionet (titulli i seksionit)',
    icon: '⊞',
    description: 'Header mbi grid-in e 6 kategorive (kategoritë vetë editohen tek "Kategoritë")',
    fields: [
      { key: 'collections.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'collections.title_main', label: 'Titull — pjesa kryesore', type: 'text' },
      { key: 'collections.title_accent', label: 'Titull — fjala e theksuar', type: 'text' },
      { key: 'collections.description', label: 'Përshkrimi', type: 'textarea' },
    ],
  },
  {
    id: 'philosophy',
    title: 'Filozofia (seksioni i zi)',
    icon: '✦',
    description: 'Seksion me background të zi, me titull dhe statistika',
    fields: [
      { key: 'philosophy.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'philosophy.title_line1', label: 'Titulli — rreshti 1', type: 'text' },
      { key: 'philosophy.title_accent', label: 'Titulli — fjala e theksuar (italike)', type: 'text' },
      { key: 'philosophy.title_line2', label: 'Titulli — rreshti 2', type: 'text' },
      { key: 'philosophy.paragraph1', label: 'Paragraf 1', type: 'textarea' },
      { key: 'philosophy.paragraph2', label: 'Paragraf 2', type: 'textarea' },
      { key: 'philosophy.stat1_num', label: 'Statistika 1 — numri', type: 'text' },
      { key: 'philosophy.stat1_label', label: 'Statistika 1 — etiketa', type: 'text' },
      { key: 'philosophy.stat2_num', label: 'Statistika 2 — numri', type: 'text' },
      { key: 'philosophy.stat2_label', label: 'Statistika 2 — etiketa', type: 'text' },
      { key: 'philosophy.stat3_num', label: 'Statistika 3 — numri', type: 'text' },
      { key: 'philosophy.stat3_label', label: 'Statistika 3 — etiketa', type: 'text' },
      { key: 'philosophy.stat4_num', label: 'Statistika 4 — numri', type: 'text' },
      { key: 'philosophy.stat4_label', label: 'Statistika 4 — etiketa', type: 'text' },
    ],
  },
  {
    id: 'services',
    title: 'Shërbimet (seksioni)',
    icon: '⌖',
    description: '6 shërbimet që shfaqen në homepage',
    fields: [
      { key: 'services.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'services.title_main', label: 'Titull — pjesa kryesore', type: 'text' },
      { key: 'services.title_accent', label: 'Titull — fjala e theksuar', type: 'text' },
      { key: 'services.description', label: 'Përshkrimi', type: 'textarea' },
      { key: 'service1.title', label: 'Shërbimi 1 — titulli', type: 'text' },
      { key: 'service1.description', label: 'Shërbimi 1 — përshkrimi', type: 'textarea' },
      { key: 'service2.title', label: 'Shërbimi 2 — titulli', type: 'text' },
      { key: 'service2.description', label: 'Shërbimi 2 — përshkrimi', type: 'textarea' },
      { key: 'service3.title', label: 'Shërbimi 3 — titulli', type: 'text' },
      { key: 'service3.description', label: 'Shërbimi 3 — përshkrimi', type: 'textarea' },
      { key: 'service4.title', label: 'Shërbimi 4 — titulli', type: 'text' },
      { key: 'service4.description', label: 'Shërbimi 4 — përshkrimi', type: 'textarea' },
      { key: 'service5.title', label: 'Shërbimi 5 — titulli', type: 'text' },
      { key: 'service5.description', label: 'Shërbimi 5 — përshkrimi', type: 'textarea' },
      { key: 'service6.title', label: 'Shërbimi 6 — titulli', type: 'text' },
      { key: 'service6.description', label: 'Shërbimi 6 — përshkrimi', type: 'textarea' },
    ],
  },
  {
    id: 'featured',
    title: 'Të Zgjedhura (titulli)',
    icon: '★',
    description: 'Header mbi 4 produktet featured (produktet vetë editohen tek "Produkte")',
    fields: [
      { key: 'featured.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'featured.title_main', label: 'Titull — pjesa kryesore', type: 'text' },
      { key: 'featured.title_accent', label: 'Titull — fjala e theksuar', type: 'text' },
      { key: 'featured.description', label: 'Përshkrimi', type: 'textarea' },
      { key: 'featured.cta', label: 'Butoni "Shiko të gjitha"', type: 'text' },
    ],
  },
  {
    id: 'atelier',
    title: 'Atelier (seksioni i porosive)',
    icon: '⚏',
    description: 'Seksioni me 4 hapat e procesit të porosisë',
    fields: [
      { key: 'atelier.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'atelier.title_line1', label: 'Titulli — rreshti 1', type: 'text' },
      { key: 'atelier.title_accent', label: 'Titulli — fjala e theksuar', type: 'text' },
      { key: 'atelier.title_line2', label: 'Titulli — rreshti 2', type: 'text' },
      { key: 'atelier.intro', label: 'Hyrja', type: 'textarea' },
      { key: 'atelier.tag_num', label: 'Numri në kornizën grafike', type: 'text' },
      { key: 'atelier.tag_label', label: 'Etiketa nën numër', type: 'text' },
      { key: 'atelier.cta', label: 'Butoni CTA', type: 'text' },
      { key: 'atelier.step1_title', label: 'Hapi 1 — titulli', type: 'text' },
      { key: 'atelier.step1_desc', label: 'Hapi 1 — përshkrimi', type: 'textarea' },
      { key: 'atelier.step2_title', label: 'Hapi 2 — titulli', type: 'text' },
      { key: 'atelier.step2_desc', label: 'Hapi 2 — përshkrimi', type: 'textarea' },
      { key: 'atelier.step3_title', label: 'Hapi 3 — titulli', type: 'text' },
      { key: 'atelier.step3_desc', label: 'Hapi 3 — përshkrimi', type: 'textarea' },
      { key: 'atelier.step4_title', label: 'Hapi 4 — titulli', type: 'text' },
      { key: 'atelier.step4_desc', label: 'Hapi 4 — përshkrimi', type: 'textarea' },
    ],
  },
  {
    id: 'story',
    title: 'Story (Citimi i themeluesit)',
    icon: '"',
    description: 'Citimi i madh me sfond të zi',
    fields: [
      { key: 'story.quote', label: 'Citimi i plotë', type: 'textarea', hint: 'Përfshi thonjëzat. P.sh. "Bizhuteritë janë..."' },
      { key: 'story.quote_accent', label: 'Fraza e theksuar (italike artë)', type: 'text', hint: 'Duhet të jetë pjesë e citimit më lart, fjalë për fjalë' },
      { key: 'story.attribution', label: 'Atribuimi', type: 'text', hint: 'P.sh. Themeluesi · Argjendari Novara' },
    ],
  },
  {
    id: 'location',
    title: 'Lokacioni (titulli)',
    icon: '◉',
    description: 'Header mbi hartën (adresa, ora dhe kontakti vijnë nga konfigurimi)',
    fields: [
      { key: 'location.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'location.title_main', label: 'Titull — pjesa kryesore', type: 'text' },
      { key: 'location.title_accent', label: 'Titull — fjala e theksuar', type: 'text' },
    ],
  },
  {
    id: 'contact',
    title: 'Kontakt (forma)',
    icon: '✉',
    description: 'Header dhe lista e shërbimeve afër formës',
    fields: [
      { key: 'contact.eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'contact.title_main', label: 'Titull — pjesa kryesore', type: 'text' },
      { key: 'contact.title_accent', label: 'Titull — fjala e theksuar', type: 'text' },
      { key: 'contact.intro', label: 'Hyrja', type: 'textarea' },
      { key: 'contact.services_list', label: 'Lista e shërbimeve (ndaj me |)', type: 'piped', hint: 'P.sh. Provim Privat|Konsultim Fejese|Riparim' },
    ],
  },
];

export function ContentManager({ initialContent }: { initialContent: ContentEntry[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [openSection, setOpenSection] = useState<string | null>('hero');
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Build map for quick lookup
  const contentMap = new Map<string, ContentEntry>();
  initialContent.forEach((e) => contentMap.set(e.key, e));

  const [edits, setEdits] = useState<Record<string, { sq: string; en: string }>>(() => {
    const initial: Record<string, { sq: string; en: string }> = {};
    initialContent.forEach((e) => {
      initial[e.key] = { sq: e.value_sq ?? '', en: e.value_en ?? '' };
    });
    return initial;
  });

  const saveField = async (key: string) => {
    setSavingKey(key);
    const entry = edits[key];
    if (!entry) {
      setSavingKey(null);
      return;
    }

    const existing = contentMap.get(key);
    let error;

    if (existing) {
      // Update
      const result = await supabase
        .from('site_content')
        .update({ value_sq: entry.sq, value_en: entry.en })
        .eq('key', key);
      error = result.error;
    } else {
      // Insert
      const result = await supabase
        .from('site_content')
        .insert({ key, value_sq: entry.sq, value_en: entry.en });
      error = result.error;
    }

    setSavingKey(null);

    if (error) {
      toast.error('Gabim: ' + error.message);
      return;
    }

    toast.success('U ruajt');
    router.refresh();
  };

  const updateField = (key: string, lang: 'sq' | 'en', value: string) => {
    setEdits((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? { sq: '', en: '' }), [lang]: value },
    }));
  };

  const isDirty = (key: string) => {
    const original = contentMap.get(key);
    const edit = edits[key];
    if (!edit) return false;
    return (original?.value_sq ?? '') !== edit.sq || (original?.value_en ?? '') !== edit.en;
  };

  return (
    <div className="space-y-3">
      {SECTIONS.map((section) => {
        const isOpen = openSection === section.id;
        return (
          <div key={section.id} className="bg-white border border-line">
            <button
              onClick={() => setOpenSection(isOpen ? null : section.id)}
              className="w-full p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-pearl/40 transition-colors text-left"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="font-display text-3xl text-gold-dark shrink-0 w-12 text-center">
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-xl text-ink-black">{section.title}</div>
                  <div className="font-serif italic text-sm text-ink/70 mt-1">
                    {section.description}
                  </div>
                </div>
              </div>
              <div
                className={`font-display text-3xl text-gold-dark transition-transform shrink-0 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                +
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-line bg-pearl/30 p-6 space-y-6">
                {section.fields.map((field) => {
                  const dirty = isDirty(field.key);
                  const saving = savingKey === field.key;
                  return (
                    <div key={field.key} className="bg-white border border-line p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="text-[11px] tracking-widest uppercase text-gold-dark font-medium">
                            {field.label}
                          </div>
                          {field.hint && (
                            <div className="font-serif italic text-xs text-ink/60 mt-1">
                              {field.hint}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => saveField(field.key)}
                          disabled={!dirty || saving}
                          className={`shrink-0 px-4 py-2 text-[10px] tracking-widest uppercase transition-colors ${
                            dirty
                              ? 'bg-ink-black text-pearl hover:bg-gold-dark cursor-pointer'
                              : 'bg-pearl text-ink/30 cursor-not-allowed border border-line'
                          }`}
                        >
                          {saving ? '...' : dirty ? 'Ruaj' : 'Ruajtur'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldInput
                          flag="🇦🇱"
                          lang="Shqip"
                          field={field}
                          value={edits[field.key]?.sq ?? ''}
                          onChange={(v) => updateField(field.key, 'sq', v)}
                        />
                        <FieldInput
                          flag="🇬🇧"
                          lang="Anglisht"
                          field={field}
                          value={edits[field.key]?.en ?? ''}
                          onChange={(v) => updateField(field.key, 'en', v)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldInput({
  flag,
  lang,
  field,
  value,
  onChange,
}: {
  flag: string;
  lang: string;
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const isMultiline = field.type === 'textarea' || field.type === 'piped';
  return (
    <div>
      <label className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-ink/60 mb-2 font-medium">
        <span>{flag}</span> {lang}
      </label>
      {isMultiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={field.type === 'piped' ? 2 : 3}
          className="w-full p-3 border border-line bg-white font-serif text-base text-ink-black outline-none focus:border-gold transition-colors resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border border-line bg-white font-serif text-base text-ink-black outline-none focus:border-gold transition-colors"
        />
      )}
    </div>
  );
}
