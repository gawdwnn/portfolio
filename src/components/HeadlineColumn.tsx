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

const StatCard = ({
  value,
  label,
  icon: Icon,
  hoverColor,
}: {
  value: string | number;
  label: string;
  icon: any;
  hoverColor: string;
}) => (
  <motion.div
    className="bg-white/5 border border-white/10 rounded-lg p-4 group"
    whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
  >
    <div className="flex items-center justify-between mb-1">
      <div className="text-3xl font-bold text-white">{value}+</div>
      <Icon
        className={`w-5 h-5 text-white/40 ${hoverColor} transition-colors`}
      />
    </div>
    <div className="text-white/60 text-sm">{label}</div>
  </motion.div>
);

const SocialLink = ({
  href,
  icon: Icon,
  label,
  tooltip,
  target = "_blank",
}: {
  href: string;
  icon: any;
  label: string;
  tooltip: string;
  target?: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href={href}
        target={target !== "_self" ? target : undefined}
        rel={target !== "_self" ? "noopener noreferrer" : undefined}
        className="text-white/60 hover:text-white transition-colors"
        aria-label={label}
      >
        <Icon className="w-5 h-5" />
      </a>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

const ActionButton = ({
  onClick,
  icon: Icon,
  label,
  tooltip,
  className,
}: {
  onClick: () => void;
  icon: any;
  label: string;
  tooltip: string;
  className: string;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button onClick={onClick} className={className} aria-label={label}>
        <Icon className="w-4 h-4" />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);

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
      <div className="relative flex flex-col items-center lg:items-start w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-900/40 border border-indigo-500/30 text-indigo-300 mb-6 shadow-sm"
        >
          <GitBranch className="w-3.5 h-3.5 opacity-80" />
          <span className="text-sm text-white/60">
            <AnimatedTextCycle words={words} constrainWidth={true} />
          </span>
        </motion.div>

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

        <p className="text-white/60 text-lg mt-6 mb-6 max-w-lg">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4 mb-6">
          <StatCard
            value={stats.years}
            label="Years Experience"
            icon={Briefcase}
            hoverColor="group-hover:text-cyan-400"
          />
          <StatCard
            value={stats.projects}
            label="Projects Completed"
            icon={Code}
            hoverColor="group-hover:text-violet-400"
          />
          <StatCard
            value={stats.clients}
            label="Happy Clients"
            icon={Users}
            hoverColor="group-hover:text-indigo-400"
          />
          <StatCard
            value={stats.aiSolutions}
            label="AI Solutions"
            icon={BrainCircuit}
            hoverColor="group-hover:text-emerald-400"
          />
        </div>

        <TooltipProvider delayDuration={100}>
          <div className="flex items-center justify-between w-full max-w-md mt-4 mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <SocialLink
                href={personalInfo.githubUrl}
                icon={Github}
                label="GitHub"
                tooltip="View GitHub Profile"
              />
              <SocialLink
                href={personalInfo.linkedinUrl}
                icon={Linkedin}
                label="LinkedIn"
                tooltip="Connect/Chat on LinkedIn"
              />
              <SocialLink
                href={`mailto:${personalInfo.email}`}
                icon={Mail}
                label="Email"
                tooltip="Send an Email"
                target="_self"
              />
              <SocialLink
                href={personalInfo.resumeUrl}
                icon={Download}
                label="Resume"
                tooltip="View Resume"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <ActionButton
                onClick={onBookCallClick}
                icon={Clock}
                label="Schedule a call"
                tooltip="Schedule a call"
                className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white text-sm font-medium transition-colors border border-indigo-500/50 shadow-sm"
              />
              <ActionButton
                onClick={openCommandPalette}
                icon={Command}
                label="Open Command Palette"
                tooltip="Command Palette (ctrl/⌘ K)"
                className="flex items-center justify-center gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium transition-colors border border-white/10"
              />
            </motion.div>
          </div>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default HeadlineColumn;
