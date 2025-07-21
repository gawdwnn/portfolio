import { FeaturedProject, Project } from "./types";

export const projects: Project[] = [];

export const featuredProject: FeaturedProject = {
  title: "StudyLoopAI",
  description: `
    StudyLoopAI is an AI-powered personalized study platform that transforms your course materials into a complete adaptive learning experience. 
    Students simply upload course content, and the platform instantly generates smart summaries, adaptive quizzes, cuecards, contentmaps, and personalized study plans that evolve based on performance.
    `,
  tags: [
    "TypeScript",
    "Next.js",
    "Tailwindcss",
    "Shadcn/ui",
    "Supabase",
    "PG vector",
    "RAG",
    "LLMs",
    "AI Agents",
  ],
  demoUrl: "https://studyloopai.vercel.app/",
  githubUrl: "https://github.com/gawdwnn/studyloopai",
  projectStatus: "in-progress",
  stats: [
    {
      label: "Users",
      value: "++",
    },
    {
      label: "Downloads",
      value: "++",
    },
    {
      label: "Active Users",
      value: "++",
    },
  ],
};
