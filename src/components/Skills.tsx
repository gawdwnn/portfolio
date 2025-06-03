"use client";

import { Tiles } from "@/components/Tiles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { education, experiences, techSkills } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface SkillsProps {
  id?: string;
}

const tabs = [
  { id: "skills", label: "Toolbox" },
  { id: "resume", label: "Experience" },
  { id: "education", label: "Education" },
] as const;

export default function Skills({ id }: SkillsProps) {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]["id"]>("skills");
  const controls = useAnimation();

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as (typeof tabs)[number]["id"]);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  }, [activeTab, controls]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "skills":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techSkills.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-lg bg-neutral-950" />
                    </div>
                    <h3 className="text-xl font-bold text-violet-400">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "education":
        return (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index !== education.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
                  )}

                  <div className="flex gap-8">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-950" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                          {edu.period}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-violet-400 mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-lg text-blue-400 mb-4">{edu.school}</p>
                      {edu.highlights &&
                        edu.highlights.length > 0 &&
                        edu.highlights[0] && (
                          <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                            <ul className="space-y-2">
                              {edu.highlights.map((highlight, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-blue-500 mr-2">▹</span>
                                  <span className="text-neutral-300">
                                    {highlight}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50" />
                  )}

                  <div className="flex gap-8">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-neutral-950" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-violet-400 mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <p className="text-lg text-blue-400">{exp.company}</p>
                        {exp.companyUrl && (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="inline-block ml-1"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </a>
                        )}
                      </div>

                      <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                        <ul className="space-y-2">
                          {exp.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">▹</span>
                              <span className="text-neutral-300">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.techStack && exp.techStack.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  }, [activeTab]);

  return (
    <section
      id={id}
      className="min-h-[80vh] py-16 md:py-24 relative overflow-hidden bg-neutral-950 text-white"
    >
      <div className="absolute inset-0 z-0 opacity-20">
        <Tiles />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent dark:text-white">
          Path & Journey
        </h2>
        <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
          Building at the intersection of design, code, and artificial
          intelligence
        </p>

        <div className="flex justify-center mb-12">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full flex flex-col items-center"
          >
            <TabsList className="bg-neutral-900 border border-neutral-800 rounded-lg p-1 flex w-full mx-2 sm:mx-0 overflow-x-auto lg:w-auto lg:mx-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-all",
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-neutral-400 hover:text-white"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="min-h-[400px] mt-8 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
