import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Collections } from '@/components/sections/Collections';
import { Philosophy } from '@/components/sections/Philosophy';
import { Services } from '@/components/sections/Services';
import { Featured } from '@/components/sections/Featured';
import { Atelier } from '@/components/sections/Atelier';
import { Story } from '@/components/sections/Story';
import { Location } from '@/components/sections/Location';
import { Contact } from '@/components/sections/Contact';

export default async function HomePage() {
  return (
    <>
      <Nav locale="sq" />
      <ScrollReveal />
      <main>
        <Hero locale="sq" />
        <Marquee locale="sq" />
        <Collections locale="sq" />
        <Philosophy locale="sq" />
        <Services locale="sq" />
        <Featured locale="sq" />
        <Atelier locale="sq" />
        <Story locale="sq" />
        <Location locale="sq" />
        <Contact locale="sq" />
      </main>
      <Footer locale="sq" />
      <WhatsAppFloat />
    </>
  );
}
