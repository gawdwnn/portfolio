"use client";

import { Badge } from "@/components/ui/badge";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCarousel from "@/components/ProjectCarousel";

interface ProjectsProps {
  id?: string;
}

export default function Projects({ id }: ProjectsProps) {
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

          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Craft • Design • Code
          </h2>
          <p className="text-lg text-gray-400">
            Transforming industries with intelligent algorithms and intuitive
            interfaces
          </p>
        </div>

        {/* Featured Project */}
        <FeaturedProject />

        {/* Project Carousel */}
        <ProjectCarousel />
      </div>
    </section>
  );
}
