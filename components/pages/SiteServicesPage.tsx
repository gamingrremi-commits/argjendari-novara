import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { ContactForm } from '@/components/forms/ContactForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Container } from '@/components/ui/Container';
import { getLocalizedPath } from '@/lib/routing';
import { absoluteUrl, buildBreadcrumbSchema, buildPageMetadata } from '@/lib/seo';
import type { BookingType } from '@/lib/validations/contact';
import type { Locale } from '@/lib/types';

type ServiceContent = {
  num: string;
  icon: string;
  title: string;
  intro: string;
  description: string;
  includes: string[];
  duration: string;
  bookingType: BookingType;
};

const SERVICES_PAGE = {
  sq: {
    metadataTitle: 'Shërbime — Konsulencë, Riparime, Vlerësim | NOVARA',
    metadataDescription:
      'Shërbime të plota argjendarie në Durrës: konsulencë për unaza fejese, riparime, vlerësim, certifikim dhe dërgesa kudo në botë.',
    home: 'Kreu',
    current: 'Shërbime',
    heroEyebrow: 'Shërbime',
    heroTitleMain: 'Më shumë se një',
    heroTitleAccent: 'dyqan',
    heroIntro:
      'Përvojë e plotë, nga konsulenca falas deri tek riparimet ekspertë. Çdo shërbim vjen me kujdesin që meriton një bizhuteri e rëndësishme.',
    includesLabel: 'Përfshin',
    reserveLabel: 'Rezervo Këtë Shërbim',
    contactEyebrow: 'Kontaktoni',
    contactTitleMain: 'Cilin shërbim po',
    contactTitleAccent: 'kërkoni',
    contactIntro:
      'Tregona pak më shumë rreth asaj që keni në mendje, dhe do t\'ju kontaktojmë brenda 24 orëve.',
    services: [
      {
        num: '01',
        icon: '◇',
        title: 'Konsulencë për Unazë Fejese',
        intro: 'Sesion privat me ekspertin tonë për të zgjedhur unazën perfekte.',
        description:
          'Pjesa më e rëndësishme e jetës suaj meriton vendimin më të mirë. Në një sesion privat 60-minutësh, ne shqyrtojmë bashkë çdo aspekt — formë diamanti, peshë në karatë, ngjyrë dhe pastërti, mënyrë vendosjeje, materiali i unazës dhe stilin që pasqyron historinë tuaj.',
        includes: [
          'Sesion 60-minutësh privat (në dyqan ose video-call)',
          'Demonstrim live i diamanteve të certifikuara GIA',
          'Edukimi mbi 4C-të (Cut, Color, Clarity, Carat)',
          'Sugjerime për buxhetin tuaj',
          'Kthim falas brenda 14 ditësh nëse nuk jeni i kënaqur',
        ],
        duration: 'Falas',
        bookingType: 'engagement_consultation',
      },
      {
        num: '02',
        icon: '✏',
        title: 'Porosi me Dizajn Personal',
        intro: 'Krijoni bizhuterinë e ëndrrave bashkë me artizanët tanë.',
        description:
          'Nga skicim me dorë te modeli 3D fotorealist, deri te realizimi në atelierin tonë. Procesi ynë i porosisë personale është i njohur për transparencën absolute — ju shihni çdo hap, miratoni çdo detaj, dhe pranoni një pjesë që nuk ekziston askund tjetër në botë.',
        includes: [
          'Konsultim falas pa angazhim',
          'Skicim & modelim 3D me ndryshime pa kufi',
          'Përzgjedhje materiali (ari 14K/18K, platin, gemstones)',
          'Realizim i plotë me dorë (6-10 javë)',
          'Certifikatë autenticiteti & garanci',
        ],
        duration: '6-10 javë',
        bookingType: 'custom_order',
      },
      {
        num: '03',
        icon: '⌖',
        title: 'Riparime & Restaurim',
        intro: 'Ridhuruani jetë bizhuterive të dashura, pa humbur kujtimin.',
        description:
          'Bizhuteritë e familjes mbajnë histori që asnjë gjë e re nuk mund t\'i zëvendësojë. Me kujdesin maksimal, ne riparojmë, restaurojmë dhe lustrojmë pjesë antike pa cenuar karakterin e tyre origjinal.',
        includes: [
          'Vlerësim falas i dëmtimit në dyqan',
          'Lustrim & pastrim profesional ultrasonik',
          'Ridimensionim unazash',
          'Riparim zinxhirësh të thyer & kapëse',
          'Restaurim pjesësh antike & heirloom',
          'Garanci 12-mujore mbi punën',
        ],
        duration: '3-14 ditë',
        bookingType: 'repair',
      },
      {
        num: '04',
        icon: '⊙',
        title: 'Vlerësim & Certifikim',
        intro: 'Dëshironi të dini vlerën reale? Vlerësim profesional me certifikatë.',
        description:
          'Për trashëgimi, sigurim, ose thjesht për të ditur — ne ofrojmë vlerësime profesionale të nënshkruara nga eksperti ynë i certifikuar. Përfshihet testim materiali, identifikim gemstones, peshim preciz, dhe vlerësim aktual tregu.',
        includes: [
          'Testim ari me reagent kimik (XRF gjithashtu i mundshëm)',
          'Identifikim & klasifikim gemstones',
          'Vlerësim sipas vlerës aktuale të tregut',
          'Certifikatë e nënshkruar dhe e vulosur',
          'Foto profesionale të pjesës (përfshirë në çmim)',
        ],
        duration: '2-5 ditë',
        bookingType: 'appraisal',
      },
      {
        num: '05',
        icon: '⊕',
        title: 'Provim Privat në Dyqan',
        intro: 'Rezervoni kohë private për të provuar koleksionet pa nxitim.',
        description:
          'Përjetimi i blerjes së një bizhuterie të rëndësishme nuk duhet të ndihet si vrapim. Rezervoni një orar privat dhe provoni koleksionet tona në një ambient të qetë, me ekspertin tonë vetëm për ju.',
        includes: [
          'Përdorim privat i hapësirës së dyqanit',
          'Konsulent ekspert në dispozicion',
          'Kafe italiane / shampanjë sipas dëshirës',
          'Diskrecion total & privatësi',
          'Kohëzgjatja: deri në 90 minuta',
        ],
        duration: 'Falas · me rezervim',
        bookingType: 'showroom_visit',
      },
      {
        num: '06',
        icon: '⌘',
        title: 'Dërgesa Worldwide',
        intro: 'Bizhuteri juaj mbërrin kudo, e siguruar dhe e paketuar me elegancë.',
        description:
          'Pavarësisht nëse jeni në Tiranë ose Tokio, dërgesa juaj mbërrin me kujdesin maksimal. Ne punojmë me partnerë premium për dërgesa ndërkombëtare të siguruara, me tracking në kohë reale dhe nënshkrim në dorëzim.',
        includes: [
          'Paketim elegant me kuti firme',
          'Sigurim i plotë gjatë transportit',
          'Dërgesa të shpejta (1-3 ditë në Evropë)',
          'Tracking i plotë & nënshkrim në dorëzim',
          'Falas për porosi mbi 1,000 EUR brenda BE',
        ],
        duration: '1-7 ditë',
        bookingType: 'general',
      },
    ] satisfies ServiceContent[],
  },
  en: {
    metadataTitle: 'Services — Consultation, Repairs, Appraisal | NOVARA',
    metadataDescription:
      'Full-service jewelry care in Durrës: engagement ring consultations, repairs, appraisals, certification, and worldwide delivery.',
    home: 'Home',
    current: 'Services',
    heroEyebrow: 'Services',
    heroTitleMain: 'More than a',
    heroTitleAccent: 'boutique',
    heroIntro:
      'A complete experience, from free consultations to expert repairs. Every service is handled with the care an important piece deserves.',
    includesLabel: 'Includes',
    reserveLabel: 'Book This Service',
    contactEyebrow: 'Contact',
    contactTitleMain: 'Which service are you',
    contactTitleAccent: 'looking for',
    contactIntro:
      'Tell us a little more about what you have in mind and we’ll reach out within 24 hours.',
    services: [
      {
        num: '01',
        icon: '◇',
        title: 'Engagement Ring Consultation',
        intro: 'A private session with our expert to choose the right ring with confidence.',
        description:
          'One of the most important purchases of your life deserves clarity. In a 60-minute private consultation, we review diamond shape, carat weight, color, clarity, setting style, ring metal, and the design language that best reflects your story.',
        includes: [
          '60-minute private session in store or by video call',
          'Live demonstration of GIA-certified diamonds',
          'Clear education around the 4Cs',
          'Budget-aligned recommendations',
          'Free return within 14 days if you are not satisfied',
        ],
        duration: 'Complimentary',
        bookingType: 'engagement_consultation',
      },
      {
        num: '02',
        icon: '✏',
        title: 'Bespoke Design Orders',
        intro: 'Create the piece you imagine alongside our artisans.',
        description:
          'From hand sketching to photorealistic 3D models and final execution in our atelier, our bespoke process is known for complete transparency. You see every step, approve every detail, and receive something that exists nowhere else.',
        includes: [
          'Free consultation with no obligation',
          'Sketching and 3D modeling with unlimited revisions',
          'Material selection (14K/18K gold, platinum, gemstones)',
          'Handcrafted execution in 6-10 weeks',
          'Certificate of authenticity and warranty',
        ],
        duration: '6-10 weeks',
        bookingType: 'custom_order',
      },
      {
        num: '03',
        icon: '⌖',
        title: 'Repairs & Restoration',
        intro: 'Give beloved jewelry a new life without losing the memory it carries.',
        description:
          'Family jewelry holds stories that nothing new can replace. With maximum care, we repair, restore, and polish antique pieces while respecting their original character.',
        includes: [
          'Free in-store damage assessment',
          'Professional polishing and ultrasonic cleaning',
          'Ring resizing',
          'Broken chain and clasp repair',
          'Restoration for antique and heirloom pieces',
          '12-month workmanship guarantee',
        ],
        duration: '3-14 days',
        bookingType: 'repair',
      },
      {
        num: '04',
        icon: '⊙',
        title: 'Appraisal & Certification',
        intro: 'Need to understand the real value? Receive a professional written appraisal.',
        description:
          'For inheritance, insurance, or simply peace of mind, we provide professional appraisals signed by our certified expert. Material testing, gemstone identification, precision weighing, and current market valuation are all included.',
        includes: [
          'Gold testing with chemical reagent (XRF available when needed)',
          'Gemstone identification and grading',
          'Current market valuation',
          'Signed and stamped certificate',
          'Professional piece photography included',
        ],
        duration: '2-5 days',
        bookingType: 'appraisal',
      },
      {
        num: '05',
        icon: '⊕',
        title: 'Private In-Store Fitting',
        intro: 'Reserve private time to try collections without interruption.',
        description:
          'Buying an important piece should never feel rushed. Book a private appointment and experience our collections in a calm setting, with an expert dedicated entirely to you.',
        includes: [
          'Private use of the boutique space',
          'Dedicated expert consultant',
          'Italian coffee or champagne on request',
          'Total discretion and privacy',
          'Up to 90 minutes per session',
        ],
        duration: 'Complimentary · by reservation',
        bookingType: 'showroom_visit',
      },
      {
        num: '06',
        icon: '⌘',
        title: 'Worldwide Delivery',
        intro: 'Your jewelry arrives anywhere, fully insured and elegantly presented.',
        description:
          'Whether you are in Tirana or Tokyo, your shipment is handled with great care. We work with premium logistics partners for insured international delivery, real-time tracking, and signature on arrival.',
        includes: [
          'Elegant signature packaging',
          'Full transport insurance',
          'Fast shipping (1-3 days within Europe)',
          'Full tracking and signature on delivery',
          'Free delivery within the EU on orders above 1,000 EUR',
        ],
        duration: '1-7 days',
        bookingType: 'general',
      },
    ] satisfies ServiceContent[],
  },
} as const;

export function getServicesMetadata(locale: Locale): Metadata {
  const content = SERVICES_PAGE[locale];

  return buildPageMetadata({
    locale,
    route: 'services',
    title: content.metadataTitle,
    description: content.metadataDescription,
    imageEyebrow: content.current,
  });
}

export function SiteServicesPage({ locale }: { locale: Locale }) {
  const content = SERVICES_PAGE[locale];
  const servicesAnchorBase = getLocalizedPath(locale, 'services');

  return (
    <>
      <JsonLd
        id={`services-breadcrumbs-${locale}`}
        data={buildBreadcrumbSchema([
          { name: content.home, url: absoluteUrl(getLocalizedPath(locale, 'home')) },
          { name: content.current, url: absoluteUrl(getLocalizedPath(locale, 'services')) },
        ])}
      />
      <SiteShell locale={locale}>
        <section className="pt-[140px] pb-24 px-12 bg-pearl-warm">
          <Container>
            <Breadcrumbs
              items={[
                { label: content.home, href: getLocalizedPath(locale, 'home') },
                { label: content.current },
              ]}
            />

            <div className="mt-16 max-w-4xl">
              <div className="eyebrow mb-6">{content.heroEyebrow}</div>
              <h1 className="font-display text-display-lg text-ink-black leading-none mb-10">
                {content.heroTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-dark">
                  {content.heroTitleAccent}
                </em>
                .
              </h1>
              <p className="font-serif italic text-2xl text-ink leading-snug max-w-3xl">
                {content.heroIntro}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-20 px-12 bg-pearl">
          <Container>
            <div className="space-y-24">
              {content.services.map((service, index) => {
                const serviceHref = `${servicesAnchorBase}?type=${service.bookingType}#contact-services`;

                return (
                  <div
                    key={service.num}
                    className={`reveal grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center ${
                      index % 2 === 1 ? 'lg:[&>:first-child]:order-2' : ''
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-pearl-warm to-[#DDD3BC] border border-line">
                      <div
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(201,169,97,0.15) 0%, transparent 60%)' }}
                      />
                      <div className="absolute inset-8 border border-gold/20" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold rounded-full flex items-center justify-center font-display text-7xl text-gold-dark">
                        {service.icon}
                      </div>
                      <div className="absolute top-8 left-8 font-display text-2xl text-gold-dark tracking-widest">
                        N° {service.num}
                      </div>
                      <div className="absolute bottom-8 right-8 text-[10px] tracking-widest uppercase text-gold-dark">
                        {service.duration}
                      </div>
                    </div>

                    <div>
                      <h2 className="font-display text-display-sm text-ink-black mb-6">
                        {service.title}
                      </h2>
                      <p className="font-serif italic text-2xl text-gold-dark mb-6 leading-snug">
                        {service.intro}
                      </p>
                      <p className="font-serif text-lg text-ink leading-relaxed mb-8">
                        {service.description}
                      </p>

                      <div className="border-t border-line pt-6 mb-8">
                        <div className="text-[10px] tracking-widest uppercase text-gold-dark mb-4 font-medium">
                          {content.includesLabel}
                        </div>
                        <ul className="space-y-2">
                          {service.includes.map((item) => (
                            <li key={item} className="flex gap-3 font-serif text-base text-ink">
                              <span className="text-gold-dark shrink-0 mt-1">→</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={serviceHref}
                        className="inline-flex items-center gap-3.5 text-[11px] tracking-widest uppercase font-medium text-ink-black border-b border-ink-black pb-1 hover:text-gold-dark hover:border-gold transition-colors"
                      >
                        {content.reserveLabel} →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        <section
          id="contact-services"
          className="py-32 px-12"
          style={{ background: 'linear-gradient(180deg, #EDE7D9 0%, #F8F6F0 100%)' }}
        >
          <Container size="narrow">
            <div className="reveal text-center mb-12">
              <div className="eyebrow mb-6">{content.contactEyebrow}</div>
              <h2 className="font-display text-display-sm text-ink-black mb-6">
                {content.contactTitleMain}{' '}
                <em className="font-serif italic font-light text-gold-dark">
                  {content.contactTitleAccent}
                </em>
                ?
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-xl mx-auto">
                {content.contactIntro}
              </p>
            </div>

            <Suspense fallback={<div className="bg-pearl border border-line min-h-[520px]" />}>
              <ContactForm locale={locale} defaultType="general" />
            </Suspense>
          </Container>
        </section>
      </SiteShell>
    </>
  );
}
