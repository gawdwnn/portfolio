"use client";

import { useState } from "react";
import About from "@/components/About";
import BookingWidget from "@/components/BookingWidget";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <Hero onBookCallClick={() => setShowBooking(true)} />
      {/* <Highlights /> */}

      {/* <Features /> */}
      <Projects />
      <Skills />
      <About />
      <Footer />
      {/* use context to render modals and alerts avoid this 👇🏽 */}
      {showBooking && (
        <BookingWidget
          onClose={() => setShowBooking(false)}
          username="YOUR_CAL_USERNAME"
          eventSlug="YOUR_EVENT_SLUG"
        />
      )}
    </>
  );
}
