"use client";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useModal } from "@/components/ModalProvider";
import ParticleBackground from "@/components/ParticleBackground";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import { BACKGROUND_STYLES } from "@/lib/background-styles";

export default function Home() {
  const { openBookingModal } = useModal();

  return (
    <div className={`${BACKGROUND_STYLES.root} min-h-screen text-white overflow-x-hidden antialiased`}>
      <main className="flex flex-col relative">
        <ParticleBackground />
        <ScrollProgress />

        <Hero id="hero-section" onBookCallClick={openBookingModal} />

        <AnimatedSection>
          <Projects id="projects-section" />
        </AnimatedSection>

        <AnimatedSection>
          <Skills id="skills-section" />
        </AnimatedSection>
      </main>
      
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </div>
  );
}
