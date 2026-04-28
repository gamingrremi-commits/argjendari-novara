import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const ATELIER_CONTENT = {
  sq: {
    eyebrow: 'Atelier · Porosi me Dizajn',
    title: (
      <>
        Kur asgjë <em className="font-serif italic font-light text-gold-dark">e gatshme</em>
        <br />
        nuk mjafton.
      </>
    ),
    intro: 'Disa momente meritojnë diçka që nuk ekziston ende. Le ta krijojmë bashkë.',
    tagNum: '04',
    tagLabel: 'Hapa drejt unikalitetit',
    cta: 'Nis Projektin Tënd',
    steps: [
      { num: '01', title: 'Konsultim', desc: 'Bisedojmë për idenë, momentin, personin që do ta mbajë.' },
      { num: '02', title: 'Skicë & Model 3D', desc: 'Krijojmë vizualizimin e parë. Ndryshime pa kufi derisa të jetë i përsosur.' },
      { num: '03', title: 'Realizim me Dorë', desc: 'Artizanët tanë e marrin nga ekrani në realitet, me kujdes maksimal.' },
      { num: '04', title: 'Dorëzim', desc: 'Në kuti elegancë, me certifikatë autenticiteti dhe garanci të zgjeruar.' },
    ],
  },
  en: {
    eyebrow: 'Atelier · Custom Design',
    title: (
      <>
        When nothing <em className="font-serif italic font-light text-gold-dark">ready-made</em>
        <br />
        is enough.
      </>
    ),
    intro: 'Some moments deserve something that doesn\'t exist yet. Let\'s create it together.',
    tagNum: '04',
    tagLabel: 'Steps to uniqueness',
    cta: 'Start Your Project',
    steps: [
      { num: '01', title: 'Consultation', desc: 'We talk about the idea, the moment, the person who will wear it.' },
      { num: '02', title: 'Sketch & 3D Model', desc: 'We create the first visualization. Endless changes until it\'s perfect.' },
      { num: '03', title: 'Handcrafting', desc: 'Our artisans take it from screen to reality with maximum care.' },
      { num: '04', title: 'Delivery', desc: 'In an elegant box, with authenticity certificate and extended warranty.' },
    ],
  },
};

export function Atelier({ locale = 'sq' }: { locale?: 'sq' | 'en' }) {
  const t = ATELIER_CONTENT[locale];

  return (
    <section
      id="atelier"
      className="py-[140px] px-12 relative"
      style={{ background: 'linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)' }}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[100px] items-center">
          <div className="reveal relative aspect-[4/5] bg-ink-black overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 60% 40%, #9B7F3F 0%, #0A0A0A 70%)' }}
            />
            <div className="absolute inset-6 border border-gold/30" />

            <svg
              viewBox="0 0 200 200"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5"
              style={{ filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.6))' }}
            >
              <defs>
                <linearGradient id="ateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C989" />
                  <stop offset="100%" stopColor="#9B7F3F" />
                </linearGradient>
              </defs>
              <path d="M 50 100 L 100 50 L 150 100 L 100 150 Z" fill="none" stroke="url(#ateGrad)" strokeWidth="3" />
              <path d="M 70 100 L 100 70 L 130 100 L 100 130 Z" fill="url(#ateGrad)" opacity="0.4" />
              <circle cx="100" cy="100" r="8" fill="#F8F6F0" />
              <line x1="50" y1="100" x2="150" y2="100" stroke="url(#ateGrad)" strokeWidth="1" opacity="0.5" />
              <line x1="100" y1="50" x2="100" y2="150" stroke="url(#ateGrad)" strokeWidth="1" opacity="0.5" />
            </svg>

            <div className="absolute bottom-10 left-10 z-[2]">
              <div className="font-display text-[56px] text-gold-light leading-none">{t.tagNum}</div>
              <div className="text-[11px] tracking-widest uppercase text-pearl mt-2">{t.tagLabel}</div>
            </div>
          </div>

          <div className="reveal">
            <div className="eyebrow mb-6">{t.eyebrow}</div>
            <h2 className="font-display text-display-md text-ink-black mb-8">{t.title}</h2>
            <p className="font-serif italic text-xl leading-[1.6] text-ink mb-12">{t.intro}</p>

            <div className="my-12">
              {t.steps.map((step) => (
                <div key={step.num} className="flex gap-6 py-6 border-b border-line">
                  <div className="font-display text-[32px] text-gold-dark leading-none min-w-[60px]">
                    {step.num}
                  </div>
                  <div>
                    <strong className="block font-display text-xl text-ink-black mb-1.5 font-normal">
                      {step.title}
                    </strong>
                    <span className="font-serif text-base italic text-ink">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button href="#contact" variant="primary">
              {t.cta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
