import { TerminalCommand } from "./types";

export const terminalCommands: TerminalCommand[] = [
  {
    command: "whoami",
    output: ["Godwin O. • Product Engineer"],
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
      "Product Engineering • Full-Stack Engineering • Design Systems • API Design",
      "AI Agents • LLMs • RAG • LLM APIs • Prompt Engineering • DevOps",
    ],
  },
];
``