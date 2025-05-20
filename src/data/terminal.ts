import { TerminalCommand } from "./types";

export const terminalCommands: TerminalCommand[] = [
  {
    command: "whoami",
    output: ["Godwin O. • Product Engineer & AI Agents Specialist"],
  },
  {
    command: "echo $MISSION",
    output: [
      "Building great products that solve real problems",
      "at the intersection of design, code and AI.",
    ],
  },
  {
    command: "cat skills.txt",
    output: [
      "Product Engineering • Frontend Development • Design Systems • Backend Development • API Design",
      "AI Agents • LLMs • RAG • LLM APIs • Prompt Engineering • Cloud Architecture",
    ],
  },
];
``