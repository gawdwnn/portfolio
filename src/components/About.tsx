"use client";

import { HoverBorderGradient } from "@/components/HoverBorderGradient";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import StreamingText from "@/components/StreamingText";
import { aboutCommands, aboutContent, personalInfo } from "@/data";
import { BACKGROUND_STYLES } from "@/lib/background-styles";
import { Code, Github, Globe, Mail, Terminal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface AboutProps {
  id?: string;
}

type AnimationStep = 'idle' | 'initializing' | 'personal' | 'bio' | 'interactive' | 'prompt';

export default function About({ id }: AboutProps) {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const [currentStep, setCurrentStep] = useState<AnimationStep>('idle');

  useEffect(() => {
    if (isIntersecting && currentStep === 'idle') {
      setCurrentStep('initializing');
    }
  }, [isIntersecting, currentStep]);

  const ContactLinks = () => (
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

  const availableCommands = {
    ...aboutCommands,
    contact: <ContactLinks />,
  };

  const getStepContent = (step: AnimationStep) => {
    switch (step) {
      case 'idle':
        return [
          <div key="placeholder" className="text-neutral-500">
            {aboutContent.messages.placeholder}
          </div>,
        ];

      case 'initializing':
        return [
          <StreamingText
            key="init"
            content={aboutContent.messages.initializing}
            className="text-green-400"
            speed="human"
            cursor={{ style: "block", blink: true, color: "#10b981" }}
            onComplete={() => setCurrentStep('personal')}
            autoStart={true}
          />
        ];

      case 'personal':
        return [
          <StreamingText
            key="init"
            content={aboutContent.messages.initializing}
            className="text-green-400"
            speed="human"
            cursor={{ style: "block", blink: true, color: "#10b981" }}
          />,
          <div key="personal-info" className="mt-4">
            <StreamingText
              content={aboutContent.messages.loadingPersonal}
              speed="fast"
              className="text-blue-400"
              cursor={{ style: "underscore", blink: true, color: "#3b82f6" }}
              onComplete={() => setCurrentStep('bio')}
              autoStart={true}
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
        ];

      case 'bio':
        return [
          <StreamingText
            key="init"
            content={aboutContent.messages.initializing}
            className="text-green-400"
            speed="human"
            cursor={{ style: "block", blink: true, color: "#10b981" }}
          />,
          <div key="personal-info" className="mt-4">
            <StreamingText
              content={aboutContent.messages.loadingPersonal}
              speed="fast"
              className="text-blue-400"
              cursor={{ style: "underscore", blink: true, color: "#3b82f6" }}
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
          </div>,
          <StreamingText
            key="bio"
            content={aboutContent.profileDescription}
            speed="human"
            className="text-gray-300 mt-4"
            onComplete={() => setCurrentStep('interactive')}
            cursor={{ style: "line", blink: true, color: "#d1d5db" }}
            pauseOnPunctuation={300}
            interactive={true}
            autoStart={true}
          />
        ];

      case 'interactive':
        return [
          <StreamingText
            key="init"
            content={aboutContent.messages.initializing}
            className="text-green-400"
            speed="human"
            cursor={{ style: "block", blink: true, color: "#10b981" }}
          />,
          <div key="personal-info" className="mt-4">
            <StreamingText
              content={aboutContent.messages.loadingPersonal}
              speed="fast"
              className="text-blue-400"
              cursor={{ style: "underscore", blink: true, color: "#3b82f6" }}
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
          </div>,
          <StreamingText
            key="bio"
            content={aboutContent.profileDescription}
            speed="human"
            className="text-gray-300 mt-4"
            cursor={{ style: "line", blink: true, color: "#d1d5db" }}
            pauseOnPunctuation={300}
            interactive={true}
          />,
          <StreamingText
            key="interactive"
            content={aboutContent.messages.interactiveMode}
            speed="normal"
            className="text-yellow-300 mt-4"
            onComplete={() => setCurrentStep('prompt')}
            cursor={{ style: "line", blink: true, color: "#fde047" }}
            autoStart={true}
          />
        ];

      case 'prompt':
      default:
        return [
          <StreamingText
            key="init"
            content={aboutContent.messages.initializing}
            className="text-green-400"
            speed="human"
            cursor={{ style: "block", blink: true, color: "#10b981" }}
          />,
          <div key="personal-info" className="mt-4">
            <StreamingText
              content={aboutContent.messages.loadingPersonal}
              speed="fast"
              className="text-blue-400"
              cursor={{ style: "underscore", blink: true, color: "#3b82f6" }}
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
          </div>,
          <StreamingText
            key="bio"
            content={aboutContent.profileDescription}
            speed="human"
            className="text-gray-300 mt-4"
            cursor={{ style: "line", blink: true, color: "#d1d5db" }}
            pauseOnPunctuation={300}
            interactive={true}
          />,
          <StreamingText
            key="interactive"
            content={aboutContent.messages.interactiveMode}
            speed="normal"
            className="text-yellow-300 mt-4"
            cursor={{ style: "line", blink: true, color: "#fde047" }}
          />
        ];
    }
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
      className={`min-h-[70vh] py-20 md:py-28 ${BACKGROUND_STYLES.sectionBorderBoth} ${BACKGROUND_STYLES.section} text-gray-200`}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
            {aboutContent.title}
          </h2>
          <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
            {aboutContent.subtitle}
          </p>
          <div>
            <InteractiveTerminal
              title="about.sh — godwin@portfolio"
              titleContent={customTitle}
              headerClassName="bg-gray-800 px-4 py-2"
              initialContent={getStepContent(currentStep)}
              showPrompt={currentStep === 'prompt'}
              availableCommands={availableCommands}
              className="bg-gray-900 rounded-xl border border-gray-800 shadow-2xl"
              autoFocus={currentStep === 'prompt' && isIntersecting}
            />
          </div>

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
