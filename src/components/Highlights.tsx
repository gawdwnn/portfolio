"use client";

import { motion } from "framer-motion";
import { Cloud, Code, Cpu, LayoutList } from "lucide-react";

const highlights = [
  {
    icon: Cpu,
    label: "AI/ML Engineering",
    desc: "Intelligent features, from idea to deployment.",
  },
  {
    icon: Code,
    label: "Full-Stack Product Dev",
    desc: "React, Next.js, Node, and scalable cloud.",
  },
  {
    icon: LayoutList,
    label: "Product Design",
    desc: "Pixel-perfect UI/UX, Figma to code.",
  },
  {
    icon: Cloud,
    label: "Cloud Native",
    desc: "Seamless deployments and ops.",
  },
  {
    icon: Cpu,
    label: "API & Systems",
    desc: "Robust, secure, and lightning-fast.",
  },
  {
    icon: Code,
    label: "Collaboration",
    desc: "Clear communication, rapid iteration.",
  },
];

export default function Highlights() {
  return (
    <section className="py-20 px-6 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-12 text-foreground/90 tracking-tight">
          What I Bring to Every Project
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.13, duration: 0.55, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-xl group overflow-hidden"
            >
              {/* Glassmorphic background accent */}
              <span className="absolute -inset-2 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-60 blur-xl z-0" />
              <Icon className="w-11 h-11 text-primary mb-4 z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl font-bold mb-1 z-10 drop-shadow-lg">
                {label}
              </span>
              <span className="text-base font-light z-10">{desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
