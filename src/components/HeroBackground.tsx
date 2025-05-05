import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <>
      {/* grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.4] -z-10"></div>

      {/* Glow effects */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -z-10"></div>
      {/* --- End Glow effects --- */}

      {/* Animating Conic Gradients --- */}
      <motion.div
        initial={{ width: "0%", opacity: 0 }}
        whileInView={{ width: "100%", opacity: 0.15 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% visible
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-full -z-1"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 0%, #06b6d4, #7c3aed, #06b6d4)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
        }}
      />
      <motion.div
        initial={{ width: "0%", opacity: 0 }}
        whileInView={{ width: "80%", opacity: 0.1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-full -z-1"
        style={{
          background:
            "conic-gradient(from 270deg at 50% 0%, #a78bfa, #67e8f9, #a78bfa)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 90%)",
        }}
      />
      {/* --- End Conic Gradients --- */}

      {/* Waveform animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#gradient-wave)"
            animate={{
              d: [
                "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,186.7C672,203,768,181,864,154.7C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,218.7C960,224,1056,160,1152,138.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient
              id="gradient-wave"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </>
  );
};

export default HeroBackground;
