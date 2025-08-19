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
    "• Software Development, Conestoga College, Waterloo",
  contact: "CONTACT_LINKS",
  clear: "CLEAR_COMMAND",
};

export const aboutContent = {
  title: "Snapshot",
  subtitle: "Software engineer with a passion for building impactful solutions",
  terminalTitle: "about.sh — godwin@portfolio",
  profileDescription: `I'm a <span class="text-indigo-400 font-semibold">full-stack Software Developer</span> with <span class="text-green-400">5 years of experience</span> building impactful software products and services. I specialize in <span class="text-blue-400">TypeScript</span> and <span class="text-yellow-400">Python</span>, including related tools, libraries and frameworks. My approach combines <span class="text-purple-400">technical excellence</span> with practical problem-solving - I've successfully worked in collaborative or as individual contributor to develop and deploy software products and services for small businesses, B2B and B2C startups, often leading development from concept to deployment in small teams, fast-paced environments. I'm passionate about writing <span class="text-emerald-400">clean, maintainable code</span> and creating solutions that make a real impact.`,
  messages: {
    initializing: "Initializing profile data...",
    loadingPersonal: "Loading personal information...",
    interactiveMode:
      "Interactive mode activated. Type 'help' for available commands.",
    placeholder: "Terminal initializing...",
  },
};
