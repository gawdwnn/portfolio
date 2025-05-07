"use client";

import About from "@/components/About";
import BookingWidget from "@/components/BookingWidget";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useState } from "react";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <main className="flex min-h-screen flex-col text-foreground overflow-x-hidden antialiased">
      <Hero id="hero-section" onBookCallClick={() => setShowBooking(true)} />
      <Projects id="projects-section" />
      <Skills id="skills-section" />
      <About id="about-section" />
      <Footer />

      {/* use context to render modals and alerts avoid this 👇🏽 */}
      {showBooking && (
        <BookingWidget
          onClose={() => setShowBooking(false)}
          username="YOUR_CAL_USERNAME"
          eventSlug="YOUR_EVENT_SLUG"
        />
      )}
    </main>
  );
}
