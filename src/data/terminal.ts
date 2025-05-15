import { TerminalCommand } from "./types";

export const terminalCommands: TerminalCommand[] = [
  {
    command: "whoami",
    output: ["Godwin O.", "Product Engineer & AI Agents Specialist"],
  },
  {
    command: "cat skills.txt",
    output: [
      "Next.js • React • TypeScript • AI Integration",
      "Design Systems • API Development • Cloud Architecture",
    ],
  },
  {
    command: "echo $MISSION",
    output: [
      "Building great products that solve real problems",
      "at the intersection of design, code and AI.",
    ],
  },
];
