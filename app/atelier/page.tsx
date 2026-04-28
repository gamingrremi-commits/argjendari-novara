import type { Metadata } from 'next';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Atelier — Porosi me Dizajn Personal | NOVARA',
  description:
    'Krijoni bizhuterinë e ëndrrave me artizanët tanë. Konsultim, skicim, model 3D dhe realizim me dorë. Atelier privat në Durrës.',
};

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Konsultim Privat',
    desc: 'Hapim një bisedë mbi idenë, momentin, personin që do ta mbajë. Pa nxitim. Pa presion. Vetëm përkushtim ndaj asaj që ju imagjinoni.',
    duration: '60 min',
  },
  {
    num: '02',
    title: 'Skicim & Model 3D',
    desc: 'Krijojmë skicat e para me dorë, pastaj kalojmë në model 3D fotorealist. Ndryshime pa kufi derisa çdo detaj të jetë i përsosur.',
    duration: '7-14 ditë',
  },
  {
    num: '03',
    title: 'Përzgjedhje Materiali',
    desc: 'Ari 14K, 18K ose platin. Diamante të certifikuar GIA. Gemstones të rralla nga koleksioni ynë privat.',
    duration: '3-5 ditë',
  },
  {
    num: '04',
    title: 'Realizim me Dorë',
    desc: 'Artizanët tanë e marrin nga ekrani në realitet. Çdo gravim, çdo lustrim, çdo detaj — bërë me dorë në atelierin tonë.',
    duration: '21-35 ditë',
  },
  {
    num: '05',
    title: 'Kontrolli Final',
    desc: 'Inspektim mikroskopik. Pastrim profesional. Vendosja në kuti elegancë. Dokumentet finalizohen.',
    duration: '1-2 ditë',
  },
  {
    num: '06',
    title: 'Dorëzim',
    desc: 'Në dyqan, ose dërgesë e siguruar kudo në botë. Me certifikatë autenticiteti, garanci të zgjeruar dhe shërbim falas pastrimi mbi jetë.',
    duration: 'Sipas dëshirës',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Sa kushton një porosi me dizajn personal?',
    a: 'Çmimi varet nga materiali, kompleksiteti dhe ekzistenca e gemstones të rralla. Konsultimi është falas dhe pas tij ju jepet një vlerësim i detajuar pa angazhim. Porositë tona fillojnë nga 800 EUR dhe shkojnë deri në investime të rëndësishme për pjesë heirloom.',
  },
  {
    q: 'Sa kohë zgjat i gjithë procesi?',
    a: 'Tipikisht 6-10 javë nga konsultimi i parë deri në dorëzim. Për porosi urgjente (p.sh. unaza fejese me afat të caktuar) mund të përshpejtojmë procesin deri në 4 javë me një kosto shtesë.',
  },
  {
    q: 'A mund të modifikoj diçka pas miratimit të modelit 3D?',
    a: 'Para fillimit të prodhimit, po — çdo ndryshim është i mirëpritur. Pasi pjesa hyn në fazën e prodhimit, ndryshimet janë të vështira dhe shpesh kërkojnë rifillimin nga zero, kështu që ju lutemi të jeni të sigurtë para konfirmimit final.',
  },
  {
    q: 'A garantoni autenticitetin e materialeve?',
    a: 'Absolutisht. Çdo pjesë vjen me certifikatë autenticiteti të lëshuar nga atelieri ynë. Diamantet vijnë me certifikatë GIA, IGI, ose HRD. Ari testohet dhe stampohet sipas standardeve evropiane.',
  },
  {
    q: 'A ofroni shërbim mirëmbajtjeje pas dorëzimit?',
    a: 'Po. Të gjitha pjesët tona kanë garanci të zgjeruar dhe pastrim falas mbi jetë. Riparimet minore përfshihen, ndërsa modifikimet e mëdha (ridimensionim, shtim gemstone) kanë çmim të reduktuar për klientët tanë.',
  },
];

export default function AtelierPage() {
  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main>
        {/* Hero */}
        <section
          className="relative pt-[140px] pb-32 px-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(201,169,97,0.18) 0%, transparent 50%), linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)',
          }}
        >
          <Container>
            <Breadcrumbs items={[{ label: 'Kreu', href: '/' }, { label: 'Atelier' }]} />

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-20 items-center">
              <div>
                <div className="eyebrow mb-6">Atelier · Porosi me Dizajn</div>
                <h1 className="font-display text-display-xl text-ink-black leading-[0.92] mb-10">
                  Asgjë e<br />
                  <em className="font-serif italic font-light text-gold-dark">gatshme</em>{' '}
                  nuk<br />
                  përshtatet.
                </h1>
                <p className="font-serif italic text-2xl text-ink leading-snug mb-12 max-w-xl">
                  Disa momente meritojnë diçka që nuk ekziston ende. Le ta krijojmë bashkë —
                  nga skica e parë deri në momentin që e mbani në duart tuaja.
                </p>
                <Button href="#contact-atelier" variant="primary">
                  Nis Konsultimin Falas
                </Button>
              </div>

              <div className="relative aspect-[4/5] bg-ink-black overflow-hidden">
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
                    <linearGradient id="atelier-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5C989" />
                      <stop offset="100%" stopColor="#9B7F3F" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 100 L 100 50 L 150 100 L 100 150 Z" fill="none" stroke="url(#atelier-grad)" strokeWidth="3" />
                  <path d="M 70 100 L 100 70 L 130 100 L 100 130 Z" fill="url(#atelier-grad)" opacity="0.4" />
                  <circle cx="100" cy="100" r="8" fill="#F8F6F0" />
                </svg>
              </div>
            </div>
          </Container>
        </section>

        {/* Process Steps */}
        <section className="py-32 px-12 bg-pearl">
          <Container>
            <div className="reveal text-center mb-24">
              <div className="eyebrow mb-6">Procesi</div>
              <h2 className="font-display text-display-md text-ink-black mb-6">
                Gjashtë hapa drejt{' '}
                <em className="font-serif italic font-light text-gold-dark">unikalitetit</em>
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-2xl mx-auto">
                Procesi ynë është i projektuar të jetë i kujdesshëm dhe transparent — pa surpriza,
                pa shtypje, vetëm bashkëpunim i mirëfilltë.
              </p>
            </div>

            <div className="space-y-px bg-line border border-line">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="reveal bg-pearl px-8 md:px-12 py-12 grid grid-cols-1 md:grid-cols-[120px_1fr_140px] gap-8 items-center group hover:bg-ink-black transition-colors duration-500"
                >
                  <div className="font-display text-6xl text-gold-dark group-hover:text-gold-light transition-colors duration-500">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-ink-black group-hover:text-pearl mb-3 transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="font-serif italic text-lg text-ink group-hover:text-pearl-warm leading-snug transition-colors duration-500">
                      {step.desc}
                    </p>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase text-gold-dark group-hover:text-gold-light transition-colors duration-500 md:text-right">
                    {step.duration}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* What you can create */}
        <section className="py-32 px-12 bg-ink-black text-pearl">
          <Container>
            <div className="reveal text-center mb-20">
              <div className="eyebrow mb-6" style={{ color: '#E5C989' }}>
                Çfarë mund të krijojmë
              </div>
              <h2 className="font-display text-display-md text-pearl mb-6">
                Çdo ide ka{' '}
                <em className="font-serif italic font-light text-gold-light">vendin e saj</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '◇', title: 'Unaza Fejese & Martese', desc: 'Personalizoni çdo detaj — nga forma e diamantit te gravimi i brendshëm.' },
                { icon: '⊙', title: 'Heirloom Pieces', desc: 'Pjesë të krijuara për t\'u kaluar brez pas brezi, me vlerë emocionale dhe materiale.' },
                { icon: '⚏', title: 'Riprojektim', desc: 'Shkrini bizhuteritë e vjetra dhe rikrijoni diçka të re — duke ruajtur kujtimin.' },
                { icon: '✦', title: 'Statement Pieces', desc: 'Pjesë unike për ngjarje të veçanta — gala, premiera, rituale.' },
                { icon: '⌖', title: 'Bizhuteri Markash', desc: 'Vula, butona dhe aksesorë me iniciale ose simbole familjare.' },
                { icon: '⊕', title: 'Dhurata Personale', desc: 'Shënim diplomimi, pensionimi, jubileji — pjesa që mban historinë.' },
              ].map((item) => (
                <div key={item.title} className="reveal border border-gold/20 p-8 hover:border-gold transition-colors duration-500">
                  <div className="font-display text-4xl text-gold-light mb-4">{item.icon}</div>
                  <h3 className="font-display text-2xl text-pearl mb-3">{item.title}</h3>
                  <p className="font-serif italic text-pearl-warm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-32 px-12 bg-pearl-warm">
          <Container size="narrow">
            <div className="reveal text-center mb-20">
              <div className="eyebrow mb-6">Pyetje të Shpeshta</div>
              <h2 className="font-display text-display-sm text-ink-black">
                Çfarë{' '}
                <em className="font-serif italic font-light text-gold-dark">duhet të dini</em>
              </h2>
            </div>

            <div className="space-y-px bg-line border border-line">
              {FAQ_ITEMS.map((faq, i) => (
                <details key={i} className="reveal bg-pearl px-8 py-6 group">
                  <summary className="cursor-pointer flex items-center justify-between gap-6 list-none">
                    <h3 className="font-display text-xl md:text-2xl text-ink-black group-open:text-gold-dark transition-colors">
                      {faq.q}
                    </h3>
                    <span className="font-display text-3xl text-gold-dark transition-transform duration-300 group-open:rotate-45 shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-6 font-serif text-lg italic text-ink leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Form */}
        <section
          id="contact-atelier"
          className="py-32 px-12"
          style={{ background: 'linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)' }}
        >
          <Container size="narrow">
            <div className="reveal text-center mb-12">
              <div className="eyebrow mb-6">Konsultim Falas</div>
              <h2 className="font-display text-display-sm text-ink-black mb-6">
                Le të{' '}
                <em className="font-serif italic font-light text-gold-dark">fillojmë</em>
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-xl mx-auto">
                Plotësoni formën dhe do t'ju kontaktojmë për të caktuar konsultimin tuaj privat.
              </p>
            </div>

            <ContactForm locale="sq" defaultType="custom_order" />
          </Container>
        </section>
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
