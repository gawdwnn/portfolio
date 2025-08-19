export interface Skill {
  name: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  highlights: string[];
  techStack?: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
  bio: string;
  resumeUrl: string;
}

export interface TerminalCommand {
  command: string;
  output: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export type ProjectStatus = "in-progress" | "completed";

export interface Project {
  title: string;
  description: string;
  gradient: string;
  imageUrl?: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  span?: string;
  projectStatus: ProjectStatus;
}

export interface FeaturedProject {
  title: string;
  description: string;
  imageUrl?: string;
  screenshot?: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  projectStatus: ProjectStatus;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface HeadlineData {
  words: string[];
  description: string;
  stats: {
    years: number;
    projects: number;
    clients: number;
    aiSolutions: number;
  };
}
