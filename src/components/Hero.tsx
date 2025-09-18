"use client";

import HeadlineColumn from "@/components/HeadlineColumn";
import HeroBackground from "@/components/HeroBackground";
import TerminalColumn from "@/components/TerminalColumn";
import { BACKGROUND_STYLES } from "@/lib/background-styles";
import { useRef } from "react";

interface HeroProps {
  onBookCallClick: () => void;
  id?: string;
}

export default function Hero({ onBookCallClick, id }: HeroProps) {
  return (
    <section id={id} className={`relative min-h-screen w-full ${BACKGROUND_STYLES.sectionBorderBottom} ${BACKGROUND_STYLES.section}`}>
      <HeroBackground />

      <div className="container relative mx-auto px-4 py-12 sm:py-20 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <TerminalColumn onSelectCall={onBookCallClick} />

          <HeadlineColumn onBookCallClick={onBookCallClick} />
        </div>
      </div>
    </section>
  );
}
