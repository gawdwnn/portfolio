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

export interface Project {
  title: string;
  description: string;
  gradient: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  span?: string;
}

export interface FeaturedProject {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
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
