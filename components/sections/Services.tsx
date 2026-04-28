import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

const SERVICES_CONTENT = {
  sq: {
    eyebrow: 'Shërbime',
    title: (
      <>
        Më shumë se një <em className="font-serif italic font-light text-gold-dark">dyqan</em>.
      </>
    ),
    description: 'Përvojë e plotë, nga konsulenca falas deri tek riparimet ekspertë.',
    items: [
      { num: 'N° 01', icon: '◇', title: 'Konsulencë për Unazë Fejese', desc: 'Sesion privat me ekspertin tonë. Diamante, formë, madhësi — çdo detaj i menduar për dashurinë tuaj.', cta: 'Rezervo Sesion' },
      { num: 'N° 02', icon: '⚏', title: 'Porosi me Dizajn Personal', desc: 'Krijo bizhuterinë e ëndrrave bashkë me artizanët tanë. Skicë, model 3D, realizim.', cta: 'Mëso Më Shumë' },
      { num: 'N° 03', icon: '⌖', title: 'Riparime & Restaurim', desc: 'Ridhuruani jetë bizhuterive të dashura. Lustrim, ripunim, pastrim profesional.', cta: 'Sill Pjesën Tuaj' },
      { num: 'N° 04', icon: '⊙', title: 'Vlerësim & Certifikim', desc: 'Dëshironi të dini vlerën reale? Vlerësim profesional me certifikatë të nënshkruar.', cta: 'Cakto Termin' },
      { num: 'N° 05', icon: '⊕', title: 'Provim në Dyqan', desc: 'Rezervo një kohë private për të provuar koleksionet pa nxitim, me kafenë e shtëpisë.', cta: 'Rezervo Provim' },
      { num: 'N° 06', icon: '⌘', title: 'Dërgesa Worldwide', desc: 'Sigurohuni që dhurata juaj mbërrin kudo, të paketuar elegancë, me ndjekje të plotë.', cta: 'Pyet për Dërgesë' },
    ],
  },
  en: {
    eyebrow: 'Services',
    title: (
      <>
        More than just a <em className="font-serif italic font-light text-gold-dark">boutique</em>.
      </>
    ),
    description: 'A complete experience, from free consultation to expert repairs.',
    items: [
      { num: 'N° 01', icon: '◇', title: 'Engagement Ring Consultation', desc: 'A private session with our expert. Diamonds, shape, size — every detail considered for your love.', cta: 'Book Session' },
      { num: 'N° 02', icon: '⚏', title: 'Custom Design Orders', desc: 'Create the jewelry of your dreams alongside our artisans. Sketch, 3D model, realization.', cta: 'Learn More' },
      { num: 'N° 03', icon: '⌖', title: 'Repairs & Restoration', desc: 'Bring beloved jewelry back to life. Polishing, reworking, professional cleaning.', cta: 'Bring Your Piece' },
      { num: 'N° 04', icon: '⊙', title: 'Appraisal & Certification', desc: 'Want to know the real value? Professional appraisal with signed certificate.', cta: 'Set Appointment' },
      { num: 'N° 05', icon: '⊕', title: 'In-Store Try-On', desc: 'Book private time to try collections without rush, with the house coffee.', cta: 'Book Try-On' },
      { num: 'N° 06', icon: '⌘', title: 'Worldwide Shipping', desc: 'Make sure your gift arrives anywhere, elegantly packaged, with full tracking.', cta: 'Ask About Shipping' },
    ],
  },
};

export function Services({ locale = 'sq' }: { locale?: 'sq' | 'en' }) {
  const t = SERVICES_CONTENT[locale];

  return (
    <section id="services" className="py-[140px] px-12 bg-pearl-warm">
      <Container>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {t.items.map((item) => (
            <div
              key={item.num}
              className="reveal bg-pearl px-12 py-16 relative cursor-pointer transition-all duration-500 ease-luxe hover:bg-ink-black group"
            >
              <div className="w-16 h-16 border border-gold rounded-full flex items-center justify-center mb-8 font-display text-2xl text-gold-dark transition-all duration-500 group-hover:text-gold-light group-hover:border-gold">
                {item.icon}
              </div>
              <span className="absolute top-6 right-8 font-display text-sm tracking-widest text-gold-dark">
                {item.num}
              </span>
              <h3 className="font-display text-[28px] text-ink-black mb-4 tracking-wide transition-colors duration-500 group-hover:text-pearl">
                {item.title}
              </h3>
              <p className="font-serif text-lg italic leading-snug text-ink mb-8 transition-colors duration-500 group-hover:text-pearl-warm">
                {item.desc}
              </p>
              <a
                href="#contact"
                className="text-[11px] tracking-widest uppercase text-gold-dark inline-flex items-center gap-3 font-medium transition-all duration-400 group-hover:text-gold-light"
              >
                {item.cta}
                <span className="transition-transform duration-400 group-hover:translate-x-1.5">→</span>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
