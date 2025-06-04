"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredProject } from "@/data";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

export default function FeaturedProject() {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldTruncate = featuredProject.description.length > maxLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-16"
    >
      <Card className="group relative bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-800 border border-zinc-700/50 rounded-2xl overflow-hidden backdrop-blur-sm">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />

        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

        <div className="relative p-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Live Preview Section */}
            <div className="lg:col-span-3 relative">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800/50 shadow-2xl">
                <iframe
                  src={featuredProject.demoUrl}
                  className="absolute inset-0 w-full h-full transform-gpu transition-all duration-700 group-hover:scale-105"
                  frameBorder="0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Featured badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
                  Live Preview
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 cursor-pointer"
                  onClick={() => window.open(featuredProject.demoUrl, "_blank")}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <ExternalLink className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white/90 text-sm">Click to interact</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details Section */}
            <div className="lg:col-span-2 flex flex-col justify-between h-full">
              <div className="space-y-6">
                {/* Title with animated underline */}
                <div className="relative">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    {featuredProject.title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-150" />
                </div>

                {/* Project Status Indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      featuredProject.projectStatus === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500 animate-pulse"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      featuredProject.projectStatus === "completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {featuredProject.projectStatus === "completed"
                      ? "Completed"
                      : "In Progress"}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {shouldTruncate && !isExpanded
                      ? `${featuredProject.description.slice(0, maxLength)}...`
                      : featuredProject.description}
                  </p>
                  {shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {/* Technology Tags */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.tags.map((tag, index) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800/80 text-gray-300 border border-zinc-700/50 hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200 backdrop-blur-sm"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Stats/Metrics (if available) */}
                {featuredProject.stats && (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/30">
                    {featuredProject.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xl font-bold text-blue-500">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <Button
                  variant="default"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-none shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  asChild
                >
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 hover:border-zinc-600 text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  asChild
                >
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Source
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
