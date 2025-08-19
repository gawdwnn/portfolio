import { motion } from "framer-motion";
import { BACKGROUND_STYLES } from "@/lib/background-styles";

// Animation configurations
const CONIC_GRADIENT_ANIMATIONS = {
  primary: {
    initial: { width: "0%", opacity: 0 },
    animate: { width: "100%", opacity: 0.15 },
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  },
  secondary: {
    initial: { width: "0%", opacity: 0 },
    animate: { width: "80%", opacity: 0.1 },
    transition: { duration: 1.2, ease: "easeOut", delay: 0.5 },
  },
};

const WAVEFORM_ANIMATION = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 0.2 },
    transition: { duration: 1, delay: 1 },
  },
  path: {
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

// Wave path data
const WAVE_PATHS = [
  "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
  "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,218.7C960,224,1056,160,1152,138.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
];

// Gradient configurations
const GRADIENTS = {
  primary: "conic-gradient(from 90deg at 50% 0%, #22d3ee, #7c3aed, #22d3ee)",
  secondary: "conic-gradient(from 270deg at 50% 0%, #a78bfa, #22d3ee, #a78bfa)",
  wave: "url(#gradient-wave)",
};

// Note: Shared styles now imported from @/lib/background-styles

const HeroBackground = () => {
  return (
    <>
      {/* Grid Pattern Background */}
      <div className={BACKGROUND_STYLES.gridPattern} />


      {/* Animated Conic Gradients */}
      <motion.div
        className={`${BACKGROUND_STYLES.heroCenteredTop} h-[300px]`}
        {...CONIC_GRADIENT_ANIMATIONS.primary}
        style={{
          background: GRADIENTS.primary,
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        }}
      />
      <motion.div
        className={`${BACKGROUND_STYLES.heroCenteredTop} h-[400px]`}
        {...CONIC_GRADIENT_ANIMATIONS.secondary}
        style={{
          background: GRADIENTS.secondary,
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 90%)",
        }}
      />

      {/* Animated Waveform */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
        {...WAVEFORM_ANIMATION.container}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d={WAVE_PATHS[0]}
            fill={GRADIENTS.wave}
            animate={{ d: WAVE_PATHS }}
            transition={WAVEFORM_ANIMATION.path.transition}
          />
          <defs>
            <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
};

export default HeroBackground;
