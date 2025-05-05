"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code, Github, Globe, Mail, Terminal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { HoverBorderGradient } from "./HoverBorderGradient";
import TypewriterText from "./TypewriterText";

export default function About() {
  const [terminalStage, setTerminalStage] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [responses, setResponses] = useState<
    Array<{ command: string; response: string }>
  >([]);

  // Predefined responses for the demo
  const availableResponses = {
    help: "Available commands: skills, experience, education, contact, clear",
    skills:
      "TypeScript, React, Next.js, Node.js, Python, AWS, Docker, CI/CD, GraphQL",
    experience:
      "• 5 years of Software Engineering\n• Led feature development in agile teams\n• Built scalable solutions for B2B and B2C startups",
    education:
      "• Software Development, Conestoga College, Waterloo\n• Continuing education in AI and Machine Learning",
    contact: "Email: gawdwnn@gmail.com\nGitHub: github.com/gawdwnn",
    clear: "CLEAR_COMMAND",
  };

  // Progress through terminal stages
  useEffect(() => {
    if (terminalStage < 4) {
      const timer = setTimeout(
        () => {
          setTerminalStage((prev) => prev + 1);
        },
        terminalStage === 0 ? 1000 : 1500
      );
      return () => clearTimeout(timer);
    } else if (terminalStage === 4) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [terminalStage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userQuery.trim() !== "") {
      // Process the command
      const command = userQuery.toLowerCase().trim();

      if (command === "clear") {
        setResponses([]);
      } else {
        const response =
          command in availableResponses
            ? availableResponses[command as keyof typeof availableResponses]
            : "Command not recognized. Try 'help' for available commands.";

        setResponses([...responses, { command: userQuery, response }]);
      }

      setUserQuery("");
    }
  };

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-black text-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center bg-gray-800 px-4 py-2">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center text-sm font-mono">
                <Terminal className="w-4 h-4 mr-2" />
                <span>about.sh — godwin@portfolio</span>
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono text-sm leading-relaxed h-[440px] overflow-y-auto">
              <AnimatePresence>
                {terminalStage >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4"
                  >
                    <TypewriterText
                      text="Initializing profile data..."
                      className="text-green-400"
                    />
                  </motion.div>
                )}

                {terminalStage >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4"
                  >
                    <TypewriterText
                      text="Loading personal information..."
                      speed={30}
                      className="text-blue-400"
                    />

                    <div className="mt-3 pl-4 border-l-2 border-indigo-500/30">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 mr-2 text-indigo-400" />
                        <TypewriterText text="Godwin" speed={50} />
                      </div>
                      <div className="flex items-center mb-2">
                        <Code className="w-4 h-4 mr-2 text-indigo-400" />
                        <TypewriterText text="Software Engineer" speed={50} />
                      </div>
                      <div className="flex items-center mb-2">
                        <Globe className="w-4 h-4 mr-2 text-indigo-400" />
                        <TypewriterText text="Waterloo, ON CA" speed={50} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {terminalStage >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4"
                  >
                    <TypewriterText
                      text="Hello! I'm a Software Engineer with five years of experience, currently also studying Software Development at Conestoga College in Waterloo. I enjoy working across the full stack, primarily using TypeScript and Python, and I'm comfortable with DevOps practices too. I've built scalable solutions for B2B and B2C startups and thrive in small, agile teams, often leading feature development end-to-end. Writing clean, tested code and ensuring smooth delivery is key for me. I value best practices, collaboration, and delivering impactful results, and I'm eager to contribute my skills to new projects."
                      speed={10}
                      className="text-gray-300"
                    />
                  </motion.div>
                )}

                {terminalStage >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 text-yellow-300"
                  >
                    <TypewriterText
                      text="Interactive mode activated. Type 'help' for available commands."
                      speed={15}
                    />
                  </motion.div>
                )}

                {/* Display previous command responses */}
                {responses.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <div className="flex items-center text-white">
                      <span className="text-green-400 mr-2">$ </span>
                      <span>{item.command}</span>
                    </div>
                    <div className="pl-4 mt-1 text-gray-300 whitespace-pre-line">
                      {item.response}
                    </div>
                  </motion.div>
                ))}

                {/* Interactive prompt */}
                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <span className="text-green-400 mr-2">$ </span>
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none"
                      placeholder="Type a command..."
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <HoverBorderGradient
                as="a"
                href="mailto:gawdwnn@gmail.com"
                containerClassName="rounded-full"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 flex items-center"
                duration={1.5}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </HoverBorderGradient>

              <HoverBorderGradient
                as="a"
                href="https://github.com/gawdwnn"
                target="_blank"
                rel="noopener noreferrer"
                containerClassName="rounded-full"
                className="bg-gray-800 text-white font-semibold px-6 py-3 flex items-center"
                duration={1.5}
              >
                <Github className="w-4 h-4 mr-2" />
                View GitHub
              </HoverBorderGradient>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
