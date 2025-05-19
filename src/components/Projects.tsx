/**
 * Projects Component implementation guidelines:
 *
 * This component should display a grid of project cards, with the ability to fetch and display
 * real GitHub repository data. The implementation includes:
 *
 * 1. GitHub API Integration
 *    - Uses GitHub REST API v3 to fetch repository data
 *    - Implements rate limiting and caching strategies
 *    - Handles authentication and error states
 *
 * 2. Repository Data Display
 *    - Stars, forks, and issues count
 *    - Primary language with color indicator
 *    - Last updated timestamp
 *    - Repository description
 *    - Topics/tags
 *    - Contributor information
 *
 * 3. Interactive Features
 *    - Star/Fork repository directly from card
 *    - View repository statistics
 *    - Access commit history
 *    - Language breakdown
 *
 * 4. Performance Optimizations
 *    - Server-side data fetching
 *    - Client-side caching with SWR/React Query
 *    - Incremental static regeneration
 *    - Optimized image loading
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { featuredProject, projects } from "@/data";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useRef, useState } from "react";

interface ProjectsProps {
  id?: string;
}

export default function Projects({ id }: ProjectsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handlePrevSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCardExpand = (index: number) => {
    setExpandedCard(index);
  };

  const handleCardCollapse = () => {
    setExpandedCard(null);
  };

  return (
    <section id={id} className="py-16 md:py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge
            variant="outline"
            className="bg-purple-900/30 text-purple-300 border-purple-800 mb-6 py-1.5 px-3 rounded-full"
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
            Featured Projects
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            AI-Powered Solutions
          </h2>
          <p className="text-lg text-gray-400">
            Transforming industries with intelligent algorithms and intuitive
            interfaces
          </p>
        </div>

        {/* Featured Project */}
        <div className="mb-16">
          <Card className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-500 hover:scale-105"
                    style={{
                      backgroundImage: `url(${featuredProject.imageUrl})`,
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {featuredProject.title}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredProject.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      asChild
                    >
                      <a
                        href={featuredProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      asChild
                    >
                      <a
                        href={featuredProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Project Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 py-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            onScroll={checkScrollability}
          >
            <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
            <div className="flex flex-row justify-start gap-4 pl-3 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2 * index,
                      ease: "easeOut",
                      once: true,
                    },
                  }}
                  className="last:pr-[5%] md:last:pr-[33%]"
                >
                  <motion.button
                    onClick={() => handleCardExpand(index)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="block"
                  >
                    <Card className="w-[400px] bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden group">
                      <div className="relative aspect-video">
                        <div
                          className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${project.imageUrl})`,
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-zinc-800 text-gray-300 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                            asChild
                          >
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                            asChild
                          >
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-end mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 w-12 h-12"
              onClick={handlePrevSlide}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 w-12 h-12"
              onClick={handleNextSlide}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        {/* Expanded Card Sheet */}
        <Sheet
          open={expandedCard !== null}
          onOpenChange={() => setExpandedCard(null)}
        >
          <SheetContent
            side="bottom"
            className="h-[90vh] bg-zinc-900 border-zinc-800"
          >
            {expandedCard !== null && (
              <div className="p-8">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold text-white">
                    {projects[expandedCard].title}
                  </SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${projects[expandedCard].imageUrl})`,
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-gray-400 mb-6">
                        {projects[expandedCard].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {projects[expandedCard].tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-zinc-800 text-gray-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                        asChild
                      >
                        <a
                          href={projects[expandedCard].demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                        asChild
                      >
                        <a
                          href={projects[expandedCard].demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
