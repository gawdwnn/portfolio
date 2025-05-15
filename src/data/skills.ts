import { Skill } from "./types";

export const techSkills: Skill[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    name: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Flask",
      "Fast API",
      "GraphQL",
      "REST APIs",
    ],
  },
  {
    name: "Database",
    items: [
      "SQL Databases",
      "NoSQL Databases",
      "Supabase",
      "Redis",
      "Prisma ORM",
    ],
  },
  {
    name: "DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
      "CircleCI",
      "GitHub Actions",
    ],
  },
  {
    name: "Testing",
    items: ["Unit Testing", "Automated Testing", "TDD", "E2E Testing"],
  },
];

export const aiSkills: Skill[] = [
  {
    name: "LLM Integration",
    items: ["OpenAI API", "LangChain", "Vector Databases", "Embeddings"],
  },
  {
    name: "ML Frameworks",
    items: ["TensorFlow", "PyTorch", "Hugging Face", "scikit-learn"],
  },
  {
    name: "Data Processing",
    items: ["Python", "NumPy", "Pandas", "Jupyter"],
  },
  {
    name: "Deployment",
    items: ["MLOps", "Model Serving", "Inference Optimization", "Fine-tuning"],
  },
];
