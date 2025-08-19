import { FeaturedProject, Project } from "./types";

export const projects: Project[] = [];

export const featuredProject: FeaturedProject = {
  title: "StudyLoopAI",
  description: `
    StudyLoopAI is an AI-powered personalized study platform that transforms your course materials into a complete adaptive learning experience. 
    Students simply upload course content, and the platform instantly generates smart summaries, adaptive quizzes, cuecards, contentmaps, and personalized study plans that evolve based on performance.
    `,
  screenshot: "",
  tags: [
    "TypeScript",
    "Next.js",
    "Tailwindcss",
    "Shadcn/ui",
    "Supabase",
    "PG vector",
    "Agentic RAG",
    "LLMs",
    "Caching & Rate Limiting",
    "Billing & Usage Analytics - Polar.sh",
  ],
  demoUrl: "https://studyloopai.vercel.app/",
  githubUrl: "https://github.com/gawdwnn/studyloopai",
  projectStatus: "completed",
};
