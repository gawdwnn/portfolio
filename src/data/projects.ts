import { FeaturedProject, Project } from "./types";

export const projects: Project[] = [
  {
    title: "Intelligent Document Analyzer",
    description:
      "AI-powered platform that extracts insights from unstructured documents using advanced NLP and machine learning algorithms.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    imageUrl: "/days-since.jpeg",
    tags: ["NLP", "Machine Learning", "React"],
    demoUrl: "#document-analyzer",
  },
  {
    title: "Neural Synthesis Engine",
    description:
      "Real-time audio processing tool that uses neural networks to generate and transform sounds.",
    gradient: "from-purple-500/20 to-pink-500/20",
    imageUrl: "/days-since.jpeg",
    tags: ["TensorFlow", "WebAudio", "GPT"],
    demoUrl: "#neural-synthesis",
  },
  {
    title: "Predictive Analytics Dashboard",
    description:
      "Interactive dashboard visualizing complex data patterns with predictive modeling capabilities.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    imageUrl: "/days-since.jpeg",
    tags: ["Data Visualization", "Python", "Next.js"],
    demoUrl: "#analytics-dashboard",
  },
  {
    title: "Conversational AI Framework",
    description:
      "A toolkit for building human-like conversational agents with context awareness and personality.",
    span: "md:col-span-3 md:row-span-2",
    gradient: "from-amber-500/20 to-orange-500/20",
    imageUrl: "/days-since.jpeg",
    tags: ["LLMs", "Chatbots", "TypeScript"],
    demoUrl: "#conversational-ai",
  },
  {
    title: "Vector Search Engine",
    description:
      "Semantic search implementation using vector embeddings to find conceptually similar content.",
    span: "md:col-span-3 md:row-span-1",
    gradient: "from-indigo-500/20 to-violet-500/20",
    imageUrl: "/days-since.jpeg",
    tags: ["Vector DB", "Embeddings", "Node.js"],
    demoUrl: "#vector-search",
  },
];

export const featuredProject: FeaturedProject = {
  title: "Multimodal AI Platform",
  description:
    "A comprehensive platform that combines vision, language, and audio AI to create powerful cross-modal applications. Enables businesses to build solutions that understand and generate content across different formats seamlessly.",
  imageUrl: "/days-since.jpeg",
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
