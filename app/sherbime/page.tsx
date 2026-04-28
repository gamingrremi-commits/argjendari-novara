import type { Metadata } from 'next';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Shërbime — Konsulencë, Riparime, Vlerësim | NOVARA',
  description:
    'Shërbime të plota argjendarie në Durrës: konsulencë për unaza fejese, riparime, vlerësim, certifikim dhe dërgesa kudo në botë.',
};

const SERVICES = [
  {
    num: '01',
    icon: '◇',
    title: 'Konsulencë për Unazë Fejese',
    intro: 'Sesion privat me ekspertin tonë për të zgjedhur unazën perfekte.',
    description:
      'Pjesa më e rëndësishme e jetës suaj meriton vendimin më të mirë. Në një sesion privat 60-minutësh, ne shqyrtojmë bashkë çdo aspekt — formë diamanti, peshë në karatë, ngjyrë dhe pastërti, mënyrë vendosjeje, materiali i unazës dhe stilin që pasqyron historinë tuaj. Pa shtypje. Pa nxitim. Vetëm informacioni që ju nevojitet.',
    includes: [
      'Sesion 60-minutësh privat (në dyqan ose video-call)',
      'Demonstrim live i diamanteve të certifikuara GIA',
      'Edukim mbi 4C-të (Cut, Color, Clarity, Carat)',
      'Sugjerime për buxhetin tuaj',
      'Kthim falas brenda 14 ditësh nëse nuk jeni i kënaqur',
    ],
    duration: 'Falas',
    bookingType: 'engagement_consultation' as const,
  },
  {
    num: '02',
    icon: '⚏',
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
    bookingType: 'custom_order' as const,
  },
  {
    num: '03',
    icon: '⌖',
    title: 'Riparime & Restaurim',
    intro: 'Ridhuruani jetë bizhuterive të dashura, pa humbur kujtimin.',
    description:
      'Bizhuteritë e familjes mbajnë histori që asnjë gjë e re nuk mund t\'i zëvendësojë. Me kujdesin maksimal, ne riparojmë, restaurojmë dhe lustrojmë pjesë antike pa cënuar karakterin e tyre origjinal. Ne punojmë me ar, argjend, platin, dhe pjesë të dëmtuara seriozisht (që duken të pashpëtueshme).',
    includes: [
      'Vlerësim falas i dëmtimit në dyqan',
      'Lustrim & pastrim profesional ultrasonik',
      'Ridimensionim unazash',
      'Riparim zinxhirësh të thyer & kapëse',
      'Restaurim pjesësh antike & heirloom',
      'Garanci 12-mujore mbi punën',
    ],
    duration: '3-14 ditë',
    bookingType: 'repair' as const,
  },
  {
    num: '04',
    icon: '⊙',
    title: 'Vlerësim & Certifikim',
    intro: 'Dëshironi të dini vlerën reale? Vlerësim profesional me certifikatë.',
    description:
      'Për trashëgimi, sigurim, ose thjesht për të ditur — ne ofrojmë vlerësime profesionale të nënshkruara nga eksperti ynë i certifikuar. Vlerësimi përfshin testim materiali, identifikim gemstone, peshim precis, dhe vlerësim aktual tregu, të dorëzuar me certifikatë oficiale të pranueshme nga shoqëritë e sigurimit.',
    includes: [
      'Testim ari me reagent kimik (XRF gjithashtu i mundshëm)',
      'Identifikim & klasifikim gemstones',
      'Vlerësim sipas vlerës aktuale të tregut',
      'Certifikatë e nënshkruar dhe e vulosur',
      'Foto profesionale të pjesës (përfshirë në çmim)',
    ],
    duration: '2-5 ditë',
    bookingType: 'appraisal' as const,
  },
  {
    num: '05',
    icon: '⊕',
    title: 'Provim Privat në Dyqan',
    intro: 'Rezervoni kohë private për të provuar koleksionet pa nxitim.',
    description:
      'Përjetimi i blerjes së një bizhuterie të rëndësishme nuk duhet të ndihet si vrapim. Rezervoni një orar privat dhe provoni koleksionet tona në një ambient të qetë, me kafenë e shtëpisë, me ekspertin tonë në dispozicion vetëm për ju. Ideale për propozime, ditëlindje speciale, ose vendime të mëdha.',
    includes: [
      'Përdorim privat i hapësirës së dyqanit',
      'Konsultent ekspert në dispozicion',
      'Kafe italiane / shampanjë (sipas dëshirës)',
      'Discreción totale & privatësi',
      'Kohëzgjatja: deri në 90 minuta',
    ],
    duration: 'Falas · me rezervim',
    bookingType: 'showroom_visit' as const,
  },
  {
    num: '06',
    icon: '⌘',
    title: 'Dërgesa Worldwide',
    intro: 'Bizhuteria juaj mbërrin kudo, e siguruar dhe e paketuar elegancë.',
    description:
      'Pavarësisht nëse jeni në Tiranë ose Tokio, dërgesa juaj do të mbërrijë me kujdesin maksimal. Ne punojmë me partnerë logjistikë premium (DHL Express, FedEx) për dërgesa ndërkombëtare të siguruara, me tracking në kohë reale dhe nënshkrim në dorëzim.',
    includes: [
      'Paketim elegant me kuti firmë',
      'Sigurim i plotë gjatë transportit',
      'Dërgesa të shpejta (1-3 ditë në Evropë)',
      'Tracking i plotë & nënshkrim në dorëzim',
      'Falas për porosi mbi 1,000 EUR brenda BE',
    ],
    duration: '1-7 ditë',
    bookingType: 'general' as const,
  },
];

export default function SherbimePage() {
  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main>
        {/* Hero */}
        <section className="pt-[140px] pb-24 px-12 bg-pearl-warm">
          <Container>
            <Breadcrumbs items={[{ label: 'Kreu', href: '/' }, { label: 'Shërbime' }]} />

            <div className="mt-16 max-w-4xl">
              <div className="eyebrow mb-6">Shërbime</div>
              <h1 className="font-display text-display-lg text-ink-black leading-none mb-10">
                Më shumë se një{' '}
                <em className="font-serif italic font-light text-gold-dark">dyqan</em>.
              </h1>
              <p className="font-serif italic text-2xl text-ink leading-snug max-w-3xl">
                Përvojë e plotë, nga konsulenca falas deri tek riparimet ekspertë. Çdo shërbim
                vjen me kujdesin që meriton një bizhuteri e rëndësishme.
              </p>
            </div>
          </Container>
        </section>

        {/* Services List */}
        <section className="py-20 px-12 bg-pearl">
          <Container>
            <div className="space-y-24">
              {SERVICES.map((service, i) => (
                <div
                  key={service.num}
                  className={`reveal grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-center ${
                    i % 2 === 1 ? 'lg:[&>:first-child]:order-2' : ''
                  }`}
                >
                  {/* Visual */}
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

                  {/* Content */}
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
                        Përfshin
                      </div>
                      <ul className="space-y-2">
                        {service.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 font-serif text-base text-ink"
                          >
                            <span className="text-gold-dark shrink-0 mt-1">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={`/#contact`}
                      className="inline-flex items-center gap-3.5 text-[11px] tracking-widest uppercase font-medium text-ink-black border-b border-ink-black pb-1 hover:text-gold-dark hover:border-gold transition-colors"
                    >
                      Rezervo Këtë Shërbim →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Final CTA Form */}
        <section
          className="py-32 px-12"
          style={{ background: 'linear-gradient(180deg, #EDE7D9 0%, #F8F6F0 100%)' }}
        >
          <Container size="narrow">
            <div className="reveal text-center mb-12">
              <div className="eyebrow mb-6">Kontaktoni</div>
              <h2 className="font-display text-display-sm text-ink-black mb-6">
                Cilin shërbim po{' '}
                <em className="font-serif italic font-light text-gold-dark">kërkoni</em>?
              </h2>
              <p className="font-serif italic text-xl text-ink max-w-xl mx-auto">
                Tregona pak më shumë rreth asaj që keni në mendje, dhe do t'ju kontaktojmë
                brenda 24 orëve.
              </p>
            </div>

            <ContactForm locale="sq" />
          </Container>
        </section>
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
