"use client";

import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import TypewriterText from "@/components/TypewriterText";
import { personalInfo } from "@/data";
import { motion } from "framer-motion";
import { Code, Github, Globe, Mail, Terminal, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface AboutProps {
  id?: string;
}

export default function About({ id }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.25,
    freezeOnceVisible: true,
  });

  const [terminalStage, setTerminalStage] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  const availableCommands = {
    help: "Available commands: skills, experience, education, contact, clear",
    skills:
      "TypeScript, React, Next.js, Node.js, Python, AWS, Docker, CI/CD, GraphQL",
    experience:
      "• 5 years of Software Engineering\n• Led feature development in agile teams\n• Built scalable solutions for B2B and B2C startups",
    education:
      "• Software Development, Conestoga College, Waterloo\n• Continuing education in AI and Machine Learning",
    contact: `Email: ${personalInfo.email}\nGitHub: ${personalInfo.github}`,
    clear: "CLEAR_COMMAND",
  };

  useEffect(() => {
    if (isIntersecting && !animationStarted) {
      setAnimationStarted(true);
      setTerminalStage(1);
    }
  }, [isIntersecting, animationStarted]);

  useEffect(() => {
    if (!animationStarted) return;

    if (terminalStage > 0 && terminalStage < 3) {
      const timer = setTimeout(() => {
        setTerminalStage((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [terminalStage, animationStarted]);

  useEffect(() => {
    if (terminalStage === 4) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [terminalStage]);

  const getInitialContent = () => {
    const content = [];

    if (!animationStarted) {
      content.push(
        <div key="placeholder" className="text-neutral-500">
          Terminal initializing...
        </div>
      );
      return content;
    }

    if (terminalStage >= 1) {
      content.push(
        <TypewriterText
          key="init"
          text="Initializing profile data..."
          className="text-green-400"
        />
      );
    }

    if (terminalStage >= 2) {
      content.push(
        <div key="personal-info" className="mt-4">
          <TypewriterText
            text="Loading personal information..."
            speed={30}
            className="text-blue-400"
          />
          <div className="mt-3 pl-4 border-l-2 border-indigo-500/30">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text={personalInfo.name} speed={50} />
            </div>
            <div className="flex items-center mb-2">
              <Code className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text={personalInfo.title} speed={50} />
            </div>
            <div className="flex items-center mb-2">
              <Globe className="w-4 h-4 mr-2 text-indigo-400" />
              <TypewriterText text={personalInfo.location} speed={50} />
            </div>
          </div>
        </div>
      );
    }

    if (terminalStage >= 3) {
      content.push(
        <TypewriterText
          key="bio"
          text={personalInfo.bio}
          speed={10}
          className="text-gray-300 mt-4"
          onComplete={() => setTerminalStage(4)}
        />
      );
    }

    if (terminalStage >= 4) {
      content.push(
        <TypewriterText
          key="interactive"
          text="Interactive mode activated. Type 'help' for available commands."
          speed={15}
          className="text-yellow-300 mt-4"
          onComplete={() => setTerminalStage(4)}
        />
      );
    }

    return content;
  };

  const customTitle = (
    <div className="flex items-center text-sm font-mono">
      <Terminal className="w-4 h-4 mr-2" />
      <span>about.sh — godwin@portfolio</span>
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-black text-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
            About Me
          </h2>
          <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
            Software engineer with a passion for building impactful solutions
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InteractiveTerminal
              title="about.sh — godwin@portfolio"
              titleContent={customTitle}
              headerClassName="bg-gray-800 px-4 py-2"
              initialContent={getInitialContent()}
              showPrompt={showPrompt}
              availableCommands={availableCommands}
              className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl"
              autoFocus={showPrompt && isIntersecting}
            />
          </motion.div>

          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <HoverBorderGradient
                as="a"
                href={`mailto:${personalInfo.email}`}
                containerClassName="rounded-full"
                className="bg-indigo-600 text-white font-semibold px-6 py-3 flex items-center"
                duration={1.5}
              >
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
              </HoverBorderGradient>

              <HoverBorderGradient
                as="a"
                href={`https://${personalInfo.github}`}
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
