"use client";

import About from "@/components/About";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useModal } from "@/components/ModalProvider";
import ParticleBackground from "@/components/ParticleBackground";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";

export default function Home() {
  const { openBookingModal } = useModal();

  return (
    <>
      <main className="flex min-h-screen flex-col text-foreground overflow-x-hidden antialiased relative">
        <ParticleBackground />

        <AnimatedSection>
          <Hero id="hero-section" onBookCallClick={openBookingModal} />
        </AnimatedSection>

        <AnimatedSection>
          <Projects id="projects-section" />
        </AnimatedSection>

        <AnimatedSection>
          <Skills id="skills-section" />
        </AnimatedSection>

        <AnimatedSection>
          <About id="about-section" />
        </AnimatedSection>

        <ScrollProgress />
      </main>
      <AnimatedSection>
        <Footer />
      </AnimatedSection>
    </>
  );
}
