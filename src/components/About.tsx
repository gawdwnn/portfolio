"use client";

import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import StreamingText from "@/components/StreamingText";
import { aboutCommands, aboutContent, personalInfo } from "@/data";
import { motion } from "framer-motion";
import { Code, Github, Globe, Mail, Terminal, User } from "lucide-react";
import { useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface AboutProps {
  id?: string;
}

export default function About({ id }: AboutProps) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.25,
    freezeOnceVisible: true,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const shouldStart = isIntersecting && !hasStarted;

  // Create contact links component
  const contactLinksComponent = (
    <div className="space-y-2">
      <div className="flex items-center">
        <Mail className="w-4 h-4 mr-2 text-blue-400" />
        <span className="text-gray-300">Email: </span>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-blue-400 hover:text-blue-300 underline ml-1 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {personalInfo.email}
        </a>
      </div>
      <div className="flex items-center">
        <Github className="w-4 h-4 mr-2 text-purple-400" />
        <span className="text-gray-300">GitHub: </span>
        <a
          href={personalInfo.githubUrl}
          className="text-purple-400 hover:text-purple-300 underline ml-1 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {personalInfo.githubUrl}
        </a>
      </div>
      {personalInfo.linkedinUrl && (
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2 text-green-400" />
          <span className="text-gray-300">LinkedIn: </span>
          <a
            href={personalInfo.linkedinUrl}
            className="text-green-400 hover:text-green-300 underline ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {personalInfo.linkedinUrl}
          </a>
        </div>
      )}
      {personalInfo.resumeUrl && (
        <div className="flex items-center">
          <Code className="w-4 h-4 mr-2 text-yellow-400" />
          <span className="text-gray-300">Resume: </span>
          <a
            href={personalInfo.resumeUrl}
            className="text-yellow-400 hover:text-yellow-300 underline ml-1 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );

  // Create the final commands object with JSX contact component
  const availableCommands = {
    ...aboutCommands,
    contact: contactLinksComponent,
  };

  const getInitialContent = () => {
    const content = [];

    if (!hasStarted) {
      if (shouldStart) {
        setHasStarted(true);
      } else {
        return [
          <div key="placeholder" className="text-neutral-500">
            {aboutContent.messages.placeholder}
          </div>,
        ];
      }
    }

    content.push(
      <StreamingText
        key="init"
        content={aboutContent.messages.initializing}
        className="text-green-400"
        speed="human"
        cursor={{ style: "block", blink: true, color: "#10b981" }}
        onComplete={() => setShowPersonalInfo(true)}
        autoStart={hasStarted}
      />
    );

    if (showPersonalInfo) {
      content.push(
        <div key="personal-info" className="mt-4">
          <StreamingText
            content={aboutContent.messages.loadingPersonal}
            speed="fast"
            className="text-blue-400"
            cursor={{ style: "underscore", blink: true, color: "#3b82f6" }}
            onComplete={() => setShowBio(true)}
          />
          <div className="mt-3 pl-4 border-l-2 border-indigo-500/30">
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 mr-2 text-indigo-400" />
              <StreamingText content={personalInfo.name} speed="normal" />
            </div>
            <div className="flex items-center mb-2">
              <Code className="w-4 h-4 mr-2 text-indigo-400" />
              <StreamingText content={personalInfo.title} speed="normal" />
            </div>
            <div className="flex items-center mb-2">
              <Globe className="w-4 h-4 mr-2 text-indigo-400" />
              <StreamingText content={personalInfo.location} speed="normal" />
            </div>
          </div>
        </div>
      );
    }

    if (showBio) {
      content.push(
        <StreamingText
          key="bio"
          content={aboutContent.profileDescription}
          speed="human"
          className="text-gray-300 mt-4"
          onComplete={() => setShowInteractive(true)}
          cursor={{ style: "line", blink: true, color: "#d1d5db" }}
          pauseOnPunctuation={300}
          interactive={true}
        />
      );
    }

    if (showInteractive) {
      content.push(
        <StreamingText
          key="interactive"
          content={aboutContent.messages.interactiveMode}
          speed="normal"
          className="text-yellow-300 mt-4"
          onComplete={() => setShowPrompt(true)}
          cursor={{ style: "line", blink: true, color: "#fde047" }}
        />
      );
    }

    return content;
  };

  const customTitle = (
    <div className="flex items-center text-sm font-mono">
      <Terminal className="w-4 h-4 mr-2" />
      <span>{aboutContent.terminalTitle}</span>
    </div>
  );

  return (
    <section
      ref={ref}
      id={id}
      className="min-h-[70vh] py-20 md:py-28 bg-gradient-to-b from-gray-900 to-black text-gray-200"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
            {aboutContent.title}
          </h2>
          <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
            {aboutContent.subtitle}
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
                href={personalInfo.githubUrl}
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
