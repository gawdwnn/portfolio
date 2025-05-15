"use client";

import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { useModal } from "@/components/ModalProvider";
import ParticleBackground from "@/components/ParticleBackground";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { openBookingModal } = useModal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const totalScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      };

      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-400 to-cyan-600"
        style={{ width: `${scrollProgress}%` }}
      />
    );
  };

  return (
    <main className="flex min-h-screen flex-col text-foreground overflow-x-hidden antialiased relative">

      <ParticleBackground />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Hero id="hero-section" onBookCallClick={openBookingModal} />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Projects id="projects-section" />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Skills id="skills-section" />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <About id="about-section" />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Footer />
        </motion.div>
      </motion.div>

      <ScrollProgress />
    </main>
  );
}
