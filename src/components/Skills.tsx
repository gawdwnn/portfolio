"use client";

import { Tiles } from "@/components/Tiles";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aiSkills, experiences, techSkills } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface SkillsProps {
  id?: string;
}

const tabs = [
  { id: "skills", label: "Technical Skills" },
  { id: "ai", label: "AI & ML" },
  { id: "resume", label: "Experience" },
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
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {techSkills.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xl font-semibold mb-3 text-violet-400">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-blue-500/50 hover:bg-blue-900/20 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {aiSkills.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xl font-semibold mb-3 text-violet-400">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "resume":
        return (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-violet-400">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400">{exp.company}</p>
                    </div>
                    <span className="text-sm text-neutral-500 font-mono bg-neutral-950 px-2 py-1 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">▹</span>
                        <span className="text-neutral-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
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
      {/* Tiles Background grid effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Tiles />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-clip-text text-transparent dark:text-white">
          Skills & Experience
        </h2>
        <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
          Building at the intersection of design, code, and artificial
          intelligence
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full flex flex-col items-center"
          >
            <TabsList className="bg-neutral-900 border border-neutral-800 rounded-lg p-1 inline-flex">
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

            {/* Tab Content */}
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
