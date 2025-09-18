import type { Education, Experience, Skill } from "./types";

export const techSkills: Skill[] = [
  {
    name: "Programming Languages",
    items: ["TypeScript", "Python", "Golang"],
  },
  {
    name: "Frontend",
    items: [
      "HTML",
      "CSS",
      "React",
      "React Native",
      "Next.js",
      "TailwindCSS",
      "Shadcn UI",
      "Component Library",
      "Design Systems",
      "CSS Frameworks and Libraries",
      "Animation Libraries",
    ],
  },
  {
    name: "Backend",
    items: [
      "Flask",
      "Fast API",
      "Node.js",
      "Express.js",
      "NestJS",
      "GraphQL & REST APIs",
      "Redis",
    ],
  },
  {
    name: "Database",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Supabase",
      "Firebase",
    ],
  },
  {
    name: "DevOps",
    items: [
      "Git",
      "CI/CD",
      "Dev Containers",
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
    ],
  },
  {
    name: "Testing",
    items: ["Unit Testing", "Automated Testing", "TDD", "E2E Testing"],
  },
];

export const education: Education[] = [
  {
    school: "Conestoga College Waterloo",
    degree: "Software Engineering",
    period: "August, 2025",
    highlights: [""],
  },
  {
    school: "Anambra State University of Technology",
    degree: "Bachelor of Engineering - BE, Chemical Engineering",
    period: "2020",
    highlights: [""],
  },
];

export const experiences: Experience[] = [
  {
    title: "Frontend Engineer",
    company: "TechLeft",
    companyUrl: "https://www.linkedin.com/company/techleft/about/",
    period: "Jan 2025 – Present",
    highlights: [
      "Development of an Aging-in-Place HealthTech SaaS platform that helps seniors live independently, reduces caregiver burden, and delays institutionalization.",
      "Building the prototype/MVP with cloud backend services, data pipelines, and APIs to integrate data from wearables, medication sensors, and home monitoring devices.",
      "Implementing secure data handling practices to ensure privacy and compliance with healthcare standards.",
    ],
    techStack: [
      "JavaScript/TypeScript",
      "Node.js",
      "React",
      "TailwindCSS",
      "Shadcn UI",
      "Rest APIs",
      "AWS (Lambda, S3, API Gateway)",
      "PostgreSQL",
      "Docker",
      "CI/CD",
      "Git",
    ],
  },
  {
    title: "Senior Full-Stack Software Engineer (Remote)",
    company: "FactorialHR • Human Resource Management Platform (Spain)",
    companyUrl: "https://factorialhr.com",
    period: "Feb 2023 – Jan 2024",
    highlights: [
      "Built and maintained frontend and backend services for robust expense tracking and management including cards, budgets, reports,  automating expenses approval workflows, on-time reimbursements.",
      "Ensured seamless integration between frontend and backend services.",
      "Implemented CI/CD workflows enhancing team productivity and code quality.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions.",
    ],
    techStack: [
      "TypeScript",
      "React.js",
      "React Native",
      "Styled Components",
      "Design System",
      "Ruby on Rails",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "CI/CD",
    ],
  },
  {
    title: "Senior Frontend Engineer (Remote)",
    company: "Renofi • Renovation Financing Platform (USA)",
    companyUrl: "https://renofi.com",
    period: "Jan 2021 – Feb 2023",
    highlights: [
      "Led frontend development, improving loan application UI with React & GraphQL.",
      "Streamlined UI component deployment by 25% using design systems.",
      "Implemented CI/CD workflows enhancing team productivity and code quality.",
    ],
    techStack: [
      "TypeScript",
      "React.js",
      "Redux",
      "GraphQL",
      "Styled Components",
      "CSS",
      "CI/CD",
    ],
  },
  {
    title: "Full-Stack Software Engineer (Remote)",
    company: "Simplifyy (USA)",
    period: "Mar 2020 – Jan 2021",
    highlights: [
      "Developed features like real-time messaging and reporting.",
      "Integrated third-party APIs (Twilio) for prospect vetting and communications.",
      "Contributed to a seamless customer experience across frontend and backend.",
    ],
    techStack: [
      "TypeScript",
      "React.js",
      "GraphQL",
      "PostgreSQL",
      "AWS",
      "CI/CD",
    ],
  },
  {
    title: "Full-Stack Engineer",
    company: "Healthcare Platform (Nigeria)",
    period: "Jan 2019 – Mar 2020",
    highlights: [
      "Built backend systems enabling real-time tele-consultations (139% accessibility increase).",
      "Delivered personalized health education APIs.",
      "Ensured reliable deployments using Docker and Kubernetes.",
    ],
  },
];


