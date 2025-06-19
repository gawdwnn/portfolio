import AnimatedTextCycle from "@/components/AnimatedTextCycle";
import { headlineData } from "@/data";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";

export const HeadlineTitle = () => {
  const { words } = headlineData;

  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 mb-6 shadow-sm">
        <GitBranch className="w-3.5 h-3.5 opacity-80" />
        <span className="text-sm text-white/60">
          <AnimatedTextCycle words={words} constrainWidth={true} />
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
        <div className="text-white mb-2">Creative Solutions</div>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 relative inline-block">
          <code className="font-mono bg-transparent">Code & AI</code>
          <svg
            className="absolute -bottom-4 left-0 w-full"
            height="10"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,0 C20,10 50,10 100,0"
              stroke="url(#gradient-line-headline)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <defs>
              <linearGradient
                id="gradient-line-headline"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#67e8f9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </h1>
    </>
  );
};
