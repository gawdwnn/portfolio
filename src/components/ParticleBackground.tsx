"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log("Initializing particles engine...");
    // You can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // This loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // Starting from v2 you can add only the features you need reducing the bundle size
    await loadSlim(engine);
    console.log("Particles engine initialized.");
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log("Particles container loaded:", container);
    },
    []
  );

  const options = {
    background: {
      color: {
        value: "transparent", // Make background transparent
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Push particles away on hover
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 80, // Distance particles are pushed
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#4f46e5", // Indigo color matching theme
      },
      links: {
        color: "#ffffff", // White links
        distance: 150,
        enable: false, // Disable links between particles
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "out",
        },
        random: true, // Random movement direction
        speed: 0.5, // Slow particle speed
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 1000, // Adjust density based on area
        },
        value: 40, // Number of particles
      },
      opacity: {
        value: 0.3, // Particle opacity
      },
      shape: {
        type: "circle", // Particle shape
      },
      size: {
        value: { min: 1, max: 3 }, // Random particle size
      },
    },
    detectRetina: true,
  };

  // Type assertion needed for tsparticles options
  const typedOptions = options as any;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={typedOptions}
      className="absolute inset-0 z-0" // Position absolute behind content
    />
  );
};

export default ParticleBackground;
