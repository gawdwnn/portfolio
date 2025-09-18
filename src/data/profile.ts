import type { HeadlineData, PersonalInfo, TerminalCommand } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Godwin O.",
  title: "Software Engineer",
  location: "Waterloo, ON CA",
  email: "gawdwnn@gmail.com",
  githubUrl: "https://github.com/gawdwnn",
  linkedinUrl: "https://www.linkedin.com/in/gawdwnn/",
  xUrl: "https://x.com/",
  bio: "I'm a full-stack Software Engineer with 5 years of experience building scalable applications. I specialize in TypeScript and Python, with expertise in modern web technologies and cloud infrastructure. My approach combines technical excellence with practical problem-solving - I've successfully delivered complex features for both B2B and B2C startups, often leading development from concept to deployment. I'm passionate about writing clean, maintainable code and creating solutions that make a real impact.",
  resumeUrl:
    "https://docs.google.com/document/d/e/2PACX-1vTd_-AYkn1XTuYy3EYiXWGgxPGmyvnwSovhmk_-gVE7l3LK1711IK_3s-DBtBbLOA/pub",
};

export const headlineData: HeadlineData = {
  words: [
    "Software Engineer",
    "Full-Stack Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "API Design & Development",
    "Design System",
    "Generative AI",
    "DevOps",
    "AI Agents",
  ],
  description:
    "Shipping modern web apps, resilient APIs, and practical AI automation that turn ideas into products.",
  stats: {
    years: 5,
    projects: 50,
    clients: 201,
    aiSolutions: 5,
  },
};

// Generate terminal commands from canonical sources
export function generateTerminalCommands(): TerminalCommand[] {
  return [
    {
      command: "whoami",
      output: [`${personalInfo.name} • ${personalInfo.title}`],
    },
    {
      command: "echo $MISSION",
      output: [headlineData.description],
    },
  ];
}

export const terminalCommands: TerminalCommand[] = generateTerminalCommands();


