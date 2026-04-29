'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
  {
    id: 'atelier-page',
    title: 'Faqja /atelier',
    icon: '◆',
    description: 'Tekstet kryesore të faqes Atelier (procesi, llojet e krijesave, FAQ, CTA)',
    fields: [
      { key: 'atelier_page.hero_eyebrow', label: 'Hero — eyebrow', type: 'text' },
      { key: 'atelier_page.hero_title_line1', label: 'Hero — titulli rreshti 1', type: 'text' },
      { key: 'atelier_page.hero_title_accent', label: 'Hero — fjala e theksuar (italike artë)', type: 'text' },
      { key: 'atelier_page.hero_title_line2', label: 'Hero — titulli rreshti 2', type: 'text' },
      { key: 'atelier_page.hero_intro', label: 'Hero — paragraf hyrës', type: 'textarea' },
      { key: 'atelier_page.hero_cta', label: 'Hero — butoni CTA', type: 'text' },
      { key: 'atelier_page.process_eyebrow', label: 'Procesi — eyebrow', type: 'text' },
      { key: 'atelier_page.process_title_main', label: 'Procesi — titulli pjesa kryesore', type: 'text' },
      { key: 'atelier_page.process_title_accent', label: 'Procesi — fjala e theksuar', type: 'text' },
      { key: 'atelier_page.process_intro', label: 'Procesi — paragraf hyrës', type: 'textarea' },
      { key: 'atelier_page.starting_price', label: 'Cmimi fillestar (p.sh. 800 EUR)', type: 'text' },
      { key: 'atelier_page.process_step01_title', label: 'Hapi 01 - titulli', type: 'text' },
      { key: 'atelier_page.process_step01_desc', label: 'Hapi 01 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step01_duration', label: 'Hapi 01 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.process_step02_title', label: 'Hapi 02 - titulli', type: 'text' },
      { key: 'atelier_page.process_step02_desc', label: 'Hapi 02 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step02_duration', label: 'Hapi 02 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.process_step03_title', label: 'Hapi 03 - titulli', type: 'text' },
      { key: 'atelier_page.process_step03_desc', label: 'Hapi 03 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step03_duration', label: 'Hapi 03 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.process_step04_title', label: 'Hapi 04 - titulli', type: 'text' },
      { key: 'atelier_page.process_step04_desc', label: 'Hapi 04 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step04_duration', label: 'Hapi 04 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.process_step05_title', label: 'Hapi 05 - titulli', type: 'text' },
      { key: 'atelier_page.process_step05_desc', label: 'Hapi 05 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step05_duration', label: 'Hapi 05 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.process_step06_title', label: 'Hapi 06 - titulli', type: 'text' },
      { key: 'atelier_page.process_step06_desc', label: 'Hapi 06 - pershkrimi', type: 'textarea' },
      { key: 'atelier_page.process_step06_duration', label: 'Hapi 06 - koha/cmimi', type: 'text' },
      { key: 'atelier_page.create_eyebrow', label: 'Krijojmë — eyebrow', type: 'text' },
      { key: 'atelier_page.create_title_main', label: 'Krijojmë — titulli pjesa kryesore', type: 'text' },
      { key: 'atelier_page.create_title_accent', label: 'Krijojmë — fjala e theksuar', type: 'text' },
      { key: 'atelier_page.faq_eyebrow', label: 'FAQ — eyebrow', type: 'text' },
      { key: 'atelier_page.faq_title_main', label: 'FAQ — titulli pjesa kryesore', type: 'text' },
      { key: 'atelier_page.faq_title_accent', label: 'FAQ — fjala e theksuar', type: 'text' },
      { key: 'atelier_page.cta_eyebrow', label: 'CTA fund — eyebrow', type: 'text' },
      { key: 'atelier_page.cta_title_main', label: 'CTA fund — titulli pjesa kryesore', type: 'text' },
      { key: 'atelier_page.cta_title_accent', label: 'CTA fund — fjala e theksuar', type: 'text' },
      { key: 'atelier_page.cta_intro', label: 'CTA fund — paragraf', type: 'textarea' },
    ],
  },
  {
    id: 'services-page',
    title: 'Faqja /sherbime',
    icon: '◈',
    description: 'Tekstet kryesore + tituj/intro për 6 shërbimet',
    fields: [
      { key: 'services_page.hero_eyebrow', label: 'Hero — eyebrow', type: 'text' },
      { key: 'services_page.hero_title_main', label: 'Hero — titulli pjesa kryesore', type: 'text' },
      { key: 'services_page.hero_title_accent', label: 'Hero — fjala e theksuar (italike)', type: 'text' },
      { key: 'services_page.hero_intro', label: 'Hero — paragraf hyrës', type: 'textarea' },
      { key: 'services_page.includes_label', label: 'Etiketa "Përfshin"', type: 'text' },
      { key: 'services_page.reserve_label', label: 'Butoni "Rezervo Këtë Shërbim"', type: 'text' },
      { key: 'services_page.contact_eyebrow', label: 'Forma e kontaktit — eyebrow', type: 'text' },
      { key: 'services_page.contact_title_main', label: 'Forma e kontaktit — titull kryesor', type: 'text' },
      { key: 'services_page.contact_title_accent', label: 'Forma e kontaktit — fjala e theksuar', type: 'text' },
      { key: 'services_page.contact_intro', label: 'Forma e kontaktit — paragraf', type: 'textarea' },
      { key: 'services_page.service01_title', label: 'Shërbimi 01 — titulli', type: 'text' },
      { key: 'services_page.service01_intro', label: 'Shërbimi 01 — intro', type: 'textarea' },
      { key: 'services_page.service01_description', label: 'Sherbimi 01 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service01_duration', label: 'Sherbimi 01 - koha/cmimi', type: 'text' },
      { key: 'services_page.service01_includes', label: 'Sherbimi 01 - perfshin (ndaj me |)', type: 'piped' },
      { key: 'services_page.service02_title', label: 'Shërbimi 02 — titulli', type: 'text' },
      { key: 'services_page.service02_intro', label: 'Shërbimi 02 — intro', type: 'textarea' },
      { key: 'services_page.service02_description', label: 'Sherbimi 02 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service02_duration', label: 'Sherbimi 02 - koha/cmimi', type: 'text' },
      { key: 'services_page.service02_includes', label: 'Sherbimi 02 - perfshin (ndaj me |)', type: 'piped' },
      { key: 'services_page.service03_title', label: 'Shërbimi 03 — titulli', type: 'text' },
      { key: 'services_page.service03_intro', label: 'Shërbimi 03 — intro', type: 'textarea' },
      { key: 'services_page.service03_description', label: 'Sherbimi 03 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service03_duration', label: 'Sherbimi 03 - koha/cmimi', type: 'text' },
      { key: 'services_page.service03_includes', label: 'Sherbimi 03 - perfshin (ndaj me |)', type: 'piped' },
      { key: 'services_page.service04_title', label: 'Shërbimi 04 — titulli', type: 'text' },
      { key: 'services_page.service04_intro', label: 'Shërbimi 04 — intro', type: 'textarea' },
      { key: 'services_page.service04_description', label: 'Sherbimi 04 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service04_duration', label: 'Sherbimi 04 - koha/cmimi', type: 'text' },
      { key: 'services_page.service04_includes', label: 'Sherbimi 04 - perfshin (ndaj me |)', type: 'piped' },
      { key: 'services_page.service05_title', label: 'Shërbimi 05 — titulli', type: 'text' },
      { key: 'services_page.service05_intro', label: 'Shërbimi 05 — intro', type: 'textarea' },
      { key: 'services_page.service05_description', label: 'Sherbimi 05 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service05_duration', label: 'Sherbimi 05 - koha/cmimi', type: 'text' },
      { key: 'services_page.service05_includes', label: 'Sherbimi 05 - perfshin (ndaj me |)', type: 'piped' },
      { key: 'services_page.service06_title', label: 'Shërbimi 06 — titulli', type: 'text' },
      { key: 'services_page.service06_intro', label: 'Shërbimi 06 — intro', type: 'textarea' },
      { key: 'services_page.service06_description', label: 'Sherbimi 06 - pershkrimi kryesor', type: 'textarea' },
      { key: 'services_page.service06_duration', label: 'Sherbimi 06 - koha/cmimi', type: 'text' },
      { key: 'services_page.service06_includes', label: 'Sherbimi 06 - perfshin (ndaj me |)', type: 'piped' },
    ],
  },
];

export function ContentManager({ initialContent }: { initialContent: ContentEntry[] }) {
  const router = useRouter();
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

    const response = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value_sq: entry.sq, value_en: entry.en }),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;

    setSavingKey(null);

    if (!response.ok) {
      toast.error('Gabim: ' + (payload?.error ?? 'Nuk u ruajt'));
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
