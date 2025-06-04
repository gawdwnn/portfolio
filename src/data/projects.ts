import { FeaturedProject, Project } from "./types";

export const projects: Project[] = [];

export const featuredProject: FeaturedProject = {
  title: "Studyloopai",
  description: `
    StudyLoop is a web-based, AI-powered platform designed to empower college students to study smarter, not harder. By leveraging advanced adaptive tools and a learning gap algorithm, StudyLoop transforms uploaded course materials—PDFs, slides, notes, and more—into personalized smart summaries, adaptive quizzes, flashcards, and gamified learning experiences.

    Our closed-loop learning engine guides students through a seamless cycle: upload materials, understand content, practice with tailored tools, diagnose weaknesses, refine knowledge, and simulate exams—all in a privacy-first, engaging environment. Think of StudyLoop as the Duolingo of personalized studying: rewarding, accessible, and efficient.

    With StudyLoop, college students gain a tailored, effective study solution to excel in their academic journey.
    `,
  imageUrl: "/days-since.jpeg",
  tags: ["TypeScript", "Next.js", "RAG", "LLMs", "AI Agents"],
  demoUrl: "https://studyloopai.vercel.app/",
  githubUrl: "https://github.com/gawdwnn/studyloopai",
  projectStatus: "in-progress",
};
