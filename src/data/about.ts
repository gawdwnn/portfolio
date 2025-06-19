export interface AboutCommand {
  name: string;
  description: string;
  response: string;
}

export const aboutCommands = {
  help: "Available commands: toolbox, experience, education, contact, clear",
  toolbox: "TypeScript, React, Next.js, Node.js, Python, DevOps, LLMs, Agents",
  experience:
    "• 5 years of Software Engineering\n• Led feature development in agile teams\n• Built scalable solutions for B2B and B2C startups",
  education:
    "• Software Development, Conestoga College, Waterloo\n• Continuing education in AI Agents and LLMs",
  contact: "CONTACT_LINKS",
  clear: "CLEAR_COMMAND",
};

export const aboutContent = {
  title: "Snapshot",
  subtitle: "Software engineer with a passion for building impactful solutions",
  terminalTitle: "about.sh — godwin@portfolio",
  profileDescription: `I'm a <span class="text-indigo-400 font-semibold">full-stack Software Engineer</span> with <span class="text-green-400">5 years of experience</span> building scalable applications. I specialize in <span class="text-blue-400">TypeScript</span> and <span class="text-yellow-400">Python</span>, with expertise in modern web technologies and cloud infrastructure. My approach combines <span class="text-purple-400">technical excellence</span> with practical problem-solving - I've successfully delivered complex features for both B2B and B2C startups, often leading development from concept to deployment. I'm passionate about writing <span class="text-emerald-400">clean, maintainable code</span> and creating solutions that make a real impact.`,
  messages: {
    initializing: "Initializing profile data...",
    loadingPersonal: "Loading personal information...",
    interactiveMode:
      "Interactive mode activated. Type 'help' for available commands.",
    placeholder: "Terminal initializing...",
  },
};
