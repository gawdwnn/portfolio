export interface Skill {
  name: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  bio: string;
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
