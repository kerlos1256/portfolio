import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatISolve } from "@/components/what-i-solve";
import { TechStack } from "@/components/tech-stack";
import { ClientVoices } from "@/components/client-voices";
import { ClientReviews } from "@/components/client-reviews";
import { ContactBand } from "@/components/contact-band";
import { Footer } from "@/components/footer";
import { FloatChat } from "@/components/float-chat";
import { SectionNav } from "@/components/section-nav";

export default function Page() {
  return (
    <div className="relative">
      <div className="grid-bg" />
      <div className="glow-orb" />

      <Nav />

      <div className="container">
        <Hero />

        <div className="divider" />
        <WhatISolve />

        <div className="divider" />
        <TechStack />

        <div className="divider" />
        <ClientVoices />

        <div className="divider" />
        <ClientReviews />

        <ContactBand />
      </div>

      <Footer />
      <FloatChat />
      <SectionNav />
    </div>
  );
}
