/**
 * New Projects Component implementation guidelines:
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
 *
 * @todo Implement GitHub API integration
 * @todo Add repository data fetching
 * @todo Enhance UI with GitHub-specific elements
 * @todo Implement caching and performance optimizations
 */

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const ProjectGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px] md:auto-rows-[280px]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * ProjectCard Component
 *
 * Displays a card for a project with GitHub repository integration.
 *
 * @param {Object} props
 * @param {string} props.title - Repository name
 * @param {string} props.description - Repository description
 * @param {string} [props.span] - Grid span classes
 * @param {string} [props.gradient] - Background gradient classes
 * @param {string} [props.imageUrl] - Repository preview image
 * @param {string[]} [props.tags] - Repository topics/tags
 * @param {string} props.demoUrl - Repository URL
 *
 * @todo Add GitHub repository data interface
 * @todo Implement repository data fetching
 * @todo Add GitHub-specific UI elements:
 *    - Language indicator with color
 *    - Star/Fork buttons
 *    - Repository stats
 *    - Last commit info
 *    - Branch status
 *    - PR count
 *
 * Example GitHub data structure:
 * {
 *   name: string;
 *   description: string;
 *   stargazers_count: number;
 *   forks_count: number;
 *   open_issues_count: number;
 *   language: string;
 *   updated_at: string;
 *   html_url: string;
 *   topics: string[];
 *   default_branch: string;
 *   owner: {
 *     login: string;
 *     avatar_url: string;
 *   };
 * }
 */
const ProjectCard = ({
  title,
  description,
  span = "md:col-span-2 md:row-span-1",
  gradient = "from-blue-500/20 to-purple-500/20",
  imageUrl,
  tags,
  demoUrl,
}: {
  title: string;
  description: string;
  span?: string;
  gradient?: string;
  imageUrl?: string;
  tags?: string[];
  demoUrl: string;
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all col-span-1",
        "bg-white p-6 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800",
        "hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5",
        "dark:[background:linear-gradient(rgba(255,255,255,0.03),rgba(255,255,255,0))]",
        span
      )}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 z-0 opacity-30 transition-opacity duration-300 group-hover:opacity-50",
          `bg-gradient-to-br ${gradient}`
        )}
      />

      {/* Background image */}
      {imageUrl && (
        <div className="absolute top-0 right-0 h-full w-1/3 overflow-hidden z-0 opacity-50 transition-all duration-300 group-hover:opacity-70">
          <div
            className="h-full w-full bg-cover bg-center transform-gpu transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      )}

      {/* Main content that shifts up */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 group-hover:-translate-y-8 relative">
        {/* Icon or project logo */}
        <div className="mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 transform-gpu transition-all duration-300 group-hover:scale-75 origin-left">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA button that appears from bottom */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/20"
        >
          <a href={demoUrl} className="flex items-center">
            Explore Project
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </Button>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

// Featured project with more prominence
const FeaturedProjectCard = ({
  title,
  description,
  imageUrl,
  tags,
  demoUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  demoUrl: string;
}) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl col-span-1 md:col-span-6 md:row-span-1",
        "bg-white p-8 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800",
        "hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5",
        "dark:[background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0))]",
        "h-full"
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 transition-opacity duration-300 group-hover:opacity-50" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {/* Image with hover effect */}
        {imageUrl && (
          <div className="md:w-1/3 min-h-[180px] overflow-hidden rounded-lg">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>
        )}

        {/* Content that shifts slightly on hover */}
        <div className="md:w-2/3 transform-gpu transition-transform duration-300 group-hover:-translate-y-2">
          <div className="mb-1 text-sm font-medium text-indigo-500 dark:text-indigo-400 transform-gpu transition-all duration-300 group-hover:translate-x-1">
            FEATURED PROJECT
          </div>
          <h3 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300 max-w-xl">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA button that fades in more on hover */}
          <Button
            variant="ghost"
            className="group/btn relative overflow-hidden rounded-lg px-6 py-2.5 text-sm font-medium text-gray-800 dark:text-white border border-indigo-200 dark:border-indigo-800/30 transition-all duration-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20"
            asChild
          >
            <a href={demoUrl} className="flex items-center">
              <span className="relative z-10">View Case Study</span>
              <svg
                className="ml-2 h-5 w-5 transform-gpu transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </Button>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.02] group-hover:dark:bg-neutral-800/5" />
    </div>
  );
};

// Define props for Projects component
interface ProjectsProps {
  id?: string;
}

export default function Projects({ id }: ProjectsProps) {
  // Example project data - replace with real data
  const projects = [
    {
      title: "Intelligent Document Analyzer",
      description:
        "AI-powered platform that extracts insights from unstructured documents using advanced NLP and machine learning algorithms.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      imageUrl: "/projects/ai-doc.jpg",
      tags: ["NLP", "Machine Learning", "React"],
      demoUrl: "#document-analyzer",
    },
    {
      title: "Neural Synthesis Engine",
      description:
        "Real-time audio processing tool that uses neural networks to generate and transform sounds.",
      gradient: "from-purple-500/20 to-pink-500/20",
      imageUrl: "/projects/neural-audio.jpg",
      tags: ["TensorFlow", "WebAudio", "GPT"],
      demoUrl: "#neural-synthesis",
    },
    {
      title: "Predictive Analytics Dashboard",
      description:
        "Interactive dashboard visualizing complex data patterns with predictive modeling capabilities.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      imageUrl: "/projects/analytics.jpg",
      tags: ["Data Visualization", "Python", "Next.js"],
      demoUrl: "#analytics-dashboard",
    },
    {
      title: "Conversational AI Framework",
      description:
        "A toolkit for building human-like conversational agents with context awareness and personality.",
      span: "md:col-span-3 md:row-span-2",
      gradient: "from-amber-500/20 to-orange-500/20",
      imageUrl: "/projects/conv-ai.jpg",
      tags: ["LLMs", "Chatbots", "TypeScript"],
      demoUrl: "#conversational-ai",
    },
    {
      title: "Vector Search Engine",
      description:
        "Semantic search implementation using vector embeddings to find conceptually similar content.",
      span: "md:col-span-3 md:row-span-1",
      gradient: "from-indigo-500/20 to-violet-500/20",
      imageUrl: "/projects/vector-search.jpg",
      tags: ["Vector DB", "Embeddings", "Node.js"],
      demoUrl: "#vector-search",
    },
  ];

  const featuredProject = {
    title: "Multimodal AI Platform",
    description:
      "A comprehensive platform that combines vision, language, and audio AI to create powerful cross-modal applications. Enables businesses to build solutions that understand and generate content across different formats seamlessly.",
    imageUrl: "/projects/multimodal.jpg",
    tags: [
      "Computer Vision",
      "NLP",
      "Speech Recognition",
      "Next.js",
      "Python",
      "TensorFlow",
    ],
    demoUrl: "#multimodal-ai",
  };

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4">
            CASE STUDIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            AI-Powered Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transforming industries with intelligent algorithms and intuitive
            interfaces
          </p>
        </div>

        <FeaturedProjectCard {...featuredProject} />

        <div className="mt-8">
          <ProjectGrid>
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </ProjectGrid>
        </div>
      </div>
    </section>
  );
}
