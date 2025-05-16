import AnimatedTextCycle from "@/components/AnimatedTextCycle";
import { useCommandPalette } from "@/components/CommandPaletteProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { headlineData, personalInfo } from "@/data";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Briefcase,
  Clock,
  Code,
  Command,
  Download,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  Users,
} from "lucide-react";

interface HeadlineColumnProps {
  onBookCallClick: () => void;
}

const HeadlineColumn = ({ onBookCallClick }: HeadlineColumnProps) => {
  const { open: openCommandPalette } = useCommandPalette();
  const { words, description, stats } = headlineData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left"
    >
      <div className="relative z-10 flex flex-col items-center lg:items-start w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 mb-6 shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5 opacity-80" />
          <span className="text-xs text-white/60">
            <AnimatedTextCycle words={words} constrainWidth={true} />
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-white">Creative Solutions with </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 relative">
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
          </span>
        </h1>

        <p className="text-white/60 text-lg mt-6 mb-6 max-w-lg">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4 mb-6">
          {/* Stat Card 1: Years Experience */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-lg p-4 group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-3xl font-bold text-white">
                {stats.years}+
              </div>
              <Briefcase className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="text-white/60 text-sm">Years Experience</div>
          </motion.div>

          {/* Stat Card 2: Projects Completed */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-lg p-4 group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-3xl font-bold text-white">
                {stats.projects}+
              </div>
              <Code className="w-5 h-5 text-white/40 group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="text-white/60 text-sm">Projects Completed</div>
          </motion.div>

          {/* Stat Card 3: Happy Clients */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-lg p-4 group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-3xl font-bold text-white">
                {stats.clients}+
              </div>
              <Users className="w-5 h-5 text-white/40 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-white/60 text-sm">Happy Clients</div>
          </motion.div>

          {/* Stat Card 4: AI Solutions */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-lg p-4 group"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-3xl font-bold text-white">
                {stats.aiSolutions}+
              </div>
              <BrainCircuit className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
            </div>
            <div className="text-white/60 text-sm">AI Solutions</div>
          </motion.div>
        </div>

        {/* Social links */}
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center justify-between w-full max-w-md mt-4 mb-6">
            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View GitHub Profile</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect/Chat on LinkedIn</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send an Email</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={personalInfo.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Resume"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Resume</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onBookCallClick}
                    className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors border border-indigo-500/50 shadow-sm"
                    aria-label="Schedule a call"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Schedule a call</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={openCommandPalette}
                    className="flex items-center justify-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-colors border border-white/10"
                    aria-label="Open Command Palette"
                  >
                    <Command className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Command Palette (ctrl/⌘K)</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default HeadlineColumn;
