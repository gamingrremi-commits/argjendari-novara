import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getLocalizedPath } from '@/lib/routing';
import {
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
} from '@/lib/seo';
import type { Locale } from '@/lib/types';

const ATELIER_PAGE = {
  sq: {
    metadataTitle: 'Atelier — Porosi me Dizajn Personal | NOVARA',
    metadataDescription:
      'Krijoni bizhuterinë e ëndrrave me artizanët tanë. Konsultim, skicim, model 3D dhe realizim me dorë. Atelier privat në Durrës.',
    home: 'Kreu',
    current: 'Atelier',
    heroEyebrow: 'Atelier · Porosi me Dizajn',
    heroTitleLine1: 'Asgjë e',
    heroTitleAccent: 'gatshme',
    heroTitleLine2: 'nuk përshtatet.',
    heroIntro:
      'Disa momente meritojnë diçka që nuk ekziston ende. Le ta krijojmë bashkë — nga skica e parë deri në momentin që e mbani në duart tuaja.',
    heroCta: 'Nis Konsultimin Falas',
    processEyebrow: 'Procesi',
    processTitleMain: 'Gjashtë hapa drejt',
    processTitleAccent: 'unikalitetit',
    processIntro:
      'Procesi ynë është i projektuar të jetë i kujdesshëm dhe transparent — pa surpriza, pa shtypje, vetëm bashkëpunim i mirëfilltë.',
    processSteps: [
      { num: '01', title: 'Konsultim Privat', desc: 'Hapim një bisedë mbi idenë, momentin, personin që do ta mbajë. Pa nxitim. Pa presion. Vetëm përkushtim ndaj asaj që ju imagjinoni.', duration: '60 min' },
      { num: '02', title: 'Skicim & Model 3D', desc: 'Krijojmë skicat e para me dorë, pastaj kalojmë në model 3D fotorealist. Ndryshime pa kufi derisa çdo detaj të jetë i përsosur.', duration: '7-14 ditë' },
      { num: '03', title: 'Përzgjedhje Materiali', desc: 'Ari 14K, 18K ose platin. Diamante të certifikuar GIA. Gemstones të rralla nga koleksioni ynë privat.', duration: '3-5 ditë' },
      { num: '04', title: 'Realizim me Dorë', desc: 'Artizanët tanë e marrin nga ekrani në realitet. Çdo gravim, çdo lustrim, çdo detaj — bërë me dorë në atelierin tonë.', duration: '21-35 ditë' },
      { num: '05', title: 'Kontrolli Final', desc: 'Inspektim mikroskopik. Pastrim profesional. Vendosja në kuti elegancë. Dokumentet finalizohen.', duration: '1-2 ditë' },
      { num: '06', title: 'Dorëzim', desc: 'Në dyqan, ose dërgesë e siguruar kudo në botë. Me certifikatë autenticiteti, garanci të zgjeruar dhe shërbim falas pastrimi mbi jetë.', duration: 'Sipas dëshirës' },
    ],
    createEyebrow: 'Çfarë mund të krijojmë',
    createTitleMain: 'Çdo ide ka',
    createTitleAccent: 'vendin e saj',
    createItems: [
      { icon: '◇', title: 'Unaza Fejese & Martese', desc: 'Personalizoni çdo detaj — nga forma e diamantit te gravimi i brendshëm.' },
      { icon: '⊙', title: 'Heirloom Pieces', desc: 'Pjesë të krijuara për t\'u kaluar brez pas brezi, me vlerë emocionale dhe materiale.' },
      { icon: '✏', title: 'Riprojektim', desc: 'Shkrini bizhuteritë e vjetra dhe rikrijoni diçka të re — duke ruajtur kujtimin.' },
      { icon: '✦', title: 'Statement Pieces', desc: 'Pjesë unike për ngjarje të veçanta — gala, premiera, rituale.' },
      { icon: '⌖', title: 'Bizhuteri Markash', desc: 'Vula, butona dhe aksesorë me iniciale ose simbole familjare.' },
      { icon: '⊕', title: 'Dhurata Personale', desc: 'Shënim diplomimi, pensionimi, jubileji — pjesa që mban historinë.' },
    ],
    faqEyebrow: 'Pyetje të Shpeshta',
    faqTitleMain: 'Çfarë',
    faqTitleAccent: 'duhet të dini',
    faqs: [
      { q: 'Sa kushton një porosi me dizajn personal?', a: 'Çmimi varet nga materiali, kompleksiteti dhe ekzistenca e gemstones të rralla. Konsultimi është falas dhe pas tij ju jepet një vlerësim i detajuar pa angazhim. Porositë tona fillojnë nga 800 EUR dhe shkojnë deri në investime të rëndësishme për pjesë heirloom.' },
      { q: 'Sa kohë zgjat i gjithë procesi?', a: 'Tipikisht 6-10 javë nga konsultimi i parë deri në dorëzim. Për porosi urgjente mund ta përshpejtojmë procesin deri në 4 javë me një kosto shtesë.' },
      { q: 'A mund të modifikoj diçka pas miratimit të modelit 3D?', a: 'Para fillimit të prodhimit, po — çdo ndryshim është i mirëpritur. Pasi pjesa hyn në fazën e prodhimit, ndryshimet bëhen të vështira dhe shpesh kërkojnë rifillimin nga zero.' },
      { q: 'A garantoni autenticitetin e materialeve?', a: 'Absolutisht. Çdo pjesë vjen me certifikatë autenticiteti të lëshuar nga atelieri ynë. Diamantet vijnë me certifikatë GIA, IGI, ose HRD. Ari testohet dhe stampohet sipas standardeve evropiane.' },
      { q: 'A ofroni shërbim mirëmbajtjeje pas dorëzimit?', a: 'Po. Të gjitha pjesët tona kanë garanci të zgjeruar dhe pastrim falas mbi jetë. Riparimet minore përfshihen, ndërsa modifikimet e mëdha kanë çmim të reduktuar për klientët tanë.' },
    ],
    ctaEyebrow: 'Konsultim Falas',
    ctaTitleMain: 'Le të',
    ctaTitleAccent: 'fillojmë',
    ctaIntro: 'Plotësoni formën dhe do t\'ju kontaktojmë për të caktuar konsultimin tuaj privat.',
  },
  en: {
    metadataTitle: 'Atelier — Bespoke Jewelry Design | NOVARA',
    metadataDescription:
      'Create the jewelry piece you imagine with our Durrës atelier: consultation, sketching, 3D modeling, and hand-finished execution.',
    home: 'Home',
    current: 'Atelier',
    heroEyebrow: 'Atelier · Bespoke Design',
    heroTitleLine1: 'Nothing',
    heroTitleAccent: 'ready-made',
    heroTitleLine2: 'ever fits.',
    heroIntro: 'Some moments deserve something that does not exist yet. Let’s create it together — from the first sketch to the moment it rests in your hands.',
    heroCta: 'Start a Free Consultation',
    processEyebrow: 'Process',
    processTitleMain: 'Six steps toward',
    processTitleAccent: 'singularity',
    processIntro: 'Our process is designed to feel careful and transparent — no surprises, no pressure, only genuine collaboration.',
    processSteps: [
      { num: '01', title: 'Private Consultation', desc: 'We open a conversation around the idea, the occasion, and the person who will wear it. No rush. No pressure. Just devotion to what you imagine.', duration: '60 min' },
      { num: '02', title: 'Sketching & 3D Model', desc: 'We begin with hand sketches, then move into a photorealistic 3D model. Unlimited refinements until every detail feels right.', duration: '7-14 days' },
      { num: '03', title: 'Material Selection', desc: '14K or 18K gold, platinum, GIA-certified diamonds, and rare gemstones sourced from our private collection.', duration: '3-5 days' },
      { num: '04', title: 'Handcrafted Execution', desc: 'Our artisans take it from screen to reality. Every engraving, every polish, every detail is finished by hand in our atelier.', duration: '21-35 days' },
      { num: '05', title: 'Final Review', desc: 'Microscopic inspection. Professional cleaning. Elegant presentation. Final documents prepared with care.', duration: '1-2 days' },
      { num: '06', title: 'Delivery', desc: 'Pick up in store, or insured worldwide delivery with certificate of authenticity, extended warranty, and lifetime cleaning service.', duration: 'As preferred' },
    ],
    createEyebrow: 'What we can create',
    createTitleMain: 'Every idea has',
    createTitleAccent: 'its place',
    createItems: [
      { icon: '◇', title: 'Engagement & Wedding Rings', desc: 'Personalize every detail — from diamond shape to the inner engraving.' },
      { icon: '⊙', title: 'Heirloom Pieces', desc: 'Pieces designed to move from one generation to the next, carrying both emotion and value.' },
      { icon: '✏', title: 'Redesigns', desc: 'Melt down older jewelry and create something new while preserving the memory behind it.' },
      { icon: '✦', title: 'Statement Pieces', desc: 'Singular creations for special occasions — galas, premieres, rituals, and defining nights.' },
      { icon: '⌖', title: 'Signature Jewelry', desc: 'Seals, cufflinks, and accessories marked with initials or family symbols.' },
      { icon: '⊕', title: 'Personal Gifts', desc: 'Graduations, retirements, anniversaries — a piece that carries the story forward.' },
    ],
    faqEyebrow: 'Frequently Asked Questions',
    faqTitleMain: 'What',
    faqTitleAccent: 'you should know',
    faqs: [
      { q: 'How much does a bespoke design cost?', a: 'Pricing depends on material, complexity, and the presence of rare gemstones. The consultation is free, and afterward you receive a detailed estimate with no obligation. Most bespoke commissions start around 800 EUR.' },
      { q: 'How long does the full process take?', a: 'Most projects take 6-10 weeks from the first consultation to final delivery. For urgent timelines, we can often accelerate the process to about 4 weeks with an additional fee.' },
      { q: 'Can I change something after approving the 3D model?', a: 'Before production begins, yes — revisions are welcome. Once the piece enters production, changes become difficult and may require restarting the process.' },
      { q: 'Do you guarantee material authenticity?', a: 'Absolutely. Every piece comes with an atelier-issued certificate of authenticity. Diamonds can include GIA, IGI, or HRD certification, and gold is tested and stamped to European standards.' },
      { q: 'Do you offer maintenance after delivery?', a: 'Yes. Every piece includes extended care and complimentary lifetime cleaning. Minor repairs are covered, while major modifications are offered at preferred client pricing.' },
    ],
    ctaEyebrow: 'Free Consultation',
    ctaTitleMain: 'Let’s',
    ctaTitleAccent: 'begin',
    ctaIntro: 'Fill out the form and we’ll reach out to schedule your private consultation.',
  },
} as const;

export function getAtelierMetadata(locale: Locale): Metadata {
  const content = ATELIER_PAGE[locale];

  return buildPageMetadata({
    locale,
    route: 'atelier',
    title: content.metadataTitle,
    description: content.metadataDescription,
    imageEyebrow: content.current,
  });
}

export function SiteAtelierPage({ locale }: { locale: Locale }) {
  const content = ATELIER_PAGE[locale];
  const contactHref = `${getLocalizedPath(locale, 'atelier')}#contact-atelier`;

  return (
    <>
      <JsonLd
        id={`atelier-breadcrumbs-${locale}`}
        data={buildBreadcrumbSchema([
          { name: content.home, url: absoluteUrl(getLocalizedPath(locale, 'home')) },
          { name: content.current, url: absoluteUrl(getLocalizedPath(locale, 'atelier')) },
        ])}
      />
      <JsonLd
        id={`atelier-faq-${locale}`}
        data={buildFaqSchema(content.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))}
      />
      <SiteShell locale={locale}>
        <section
          className="relative pt-[140px] pb-32 px-12 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse at 30% 30%, rgba(201,169,97,0.18) 0%, transparent 50%), linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)',
          }}
        >
          <Container>
            <Breadcrumbs
              items={[
                { label: content.home, href: getLocalizedPath(locale, 'home') },
                { label: content.current },
              ]}
            />

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-20 items-center">
              <div>
                <div className="eyebrow mb-6">{content.heroEyebrow}</div>
                <h1 className="font-display text-display-xl text-ink-black leading-[0.92] mb-10">
                  {content.heroTitleLine1}
                  <br />
                  <em className="font-serif italic font-light text-gold-dark">
                    {content.heroTitleAccent}
                  </em>{' '}
                  <br />
                  {content.heroTitleLine2}
                </h1>
                <p className="font-serif italic text-2xl text-ink leading-snug mb-12 max-w-xl">
                  {content.heroIntro}
                </p>
                <Button href={contactHref} variant="primary">
                  {content.heroCta}
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

        <section className="py-32 px-12 bg-pearl">
          <Container>
            <div className="reveal text-center mb-24">
              <div className="eyebrow mb-6">{content.processEyebrow}</div>
              <h2 className="font-display text-display-md text-ink-black mb-6">
                {content.processTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-dark">
                  {content.processTitleAccent}
                </em>
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-2xl mx-auto">
                {content.processIntro}
              </p>
            </div>

            <div className="space-y-px bg-line border border-line">
              {content.processSteps.map((step) => (
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

        <section className="py-32 px-12 bg-ink-black text-pearl">
          <Container>
            <div className="reveal text-center mb-20">
              <div className="eyebrow mb-6" style={{ color: '#E5C989' }}>
                {content.createEyebrow}
              </div>
              <h2 className="font-display text-display-md text-pearl mb-6">
                {content.createTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-light">
                  {content.createTitleAccent}
                </em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.createItems.map((item) => (
                <div
                  key={item.title}
                  className="reveal border border-gold/20 p-8 hover:border-gold transition-colors duration-500"
                >
                  <div className="font-display text-4xl text-gold-light mb-4">{item.icon}</div>
                  <h3 className="font-display text-2xl text-pearl mb-3">{item.title}</h3>
                  <p className="font-serif italic text-pearl-warm leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-32 px-12 bg-pearl-warm">
          <Container size="narrow">
            <div className="reveal text-center mb-20">
              <div className="eyebrow mb-6">{content.faqEyebrow}</div>
              <h2 className="font-display text-display-sm text-ink-black">
                {content.faqTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-dark">
                  {content.faqTitleAccent}
                </em>
              </h2>
            </div>

            <div className="space-y-px bg-line border border-line">
              {content.faqs.map((faq) => (
                <details key={faq.q} className="reveal bg-pearl px-8 py-6 group">
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

        <section
          id="contact-atelier"
          className="py-32 px-12"
          style={{ background: 'linear-gradient(180deg, #F8F6F0 0%, #EDE7D9 100%)' }}
        >
          <Container size="narrow">
            <div className="reveal text-center mb-12">
              <div className="eyebrow mb-6">{content.ctaEyebrow}</div>
              <h2 className="font-display text-display-sm text-ink-black mb-6">
                {content.ctaTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-dark">
                  {content.ctaTitleAccent}
                </em>
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-xl mx-auto">
                {content.ctaIntro}
              </p>
            </div>

            <Suspense fallback={<div className="bg-pearl border border-line min-h-[520px]" />}>
              <ContactForm locale={locale} defaultType="custom_order" />
            </Suspense>
          </Container>
        </section>
      </SiteShell>
    </>
  );
}
