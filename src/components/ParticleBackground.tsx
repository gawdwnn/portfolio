"use client";

import { loadBasic } from "@tsparticles/basic";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useId } from "react";

const ParticleBackground = () => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadBasic(engine);
    });
  }, []);

  const id = useId();

  const options = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        repulse: {
          distance: 80,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#4f46e5",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "out" as const,
        },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000,
        },
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id={id}
      options={options}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
};

export default ParticleBackground;
