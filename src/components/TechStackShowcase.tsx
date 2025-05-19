"use client";

import { InfiniteSlider } from "@/components/infinite-slider";
import { ProgressiveBlur } from "@/components/progressive-blur";
import { Sparkles } from "@/components/sparkles";
import {
  SiAmazon,
  SiDocker,
  SiGit,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const techStack = [
  {
    id: "react",
    component: SiReact,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#61DAFB]",
  },
  {
    id: "typescript",
    component: SiTypescript,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#3178C6]",
  },
  {
    id: "node",
    component: SiNodedotjs,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#339933]",
  },
  {
    id: "python",
    component: SiPython,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#3776AB]",
  },
  {
    id: "docker",
    component: SiDocker,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#2496ED]",
  },
  {
    id: "next",
    component: SiNextdotjs,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-white",
  },
  {
    id: "tailwind",
    component: SiTailwindcss,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#06B6D4]",
  },
  {
    id: "mongodb",
    component: SiMongodb,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#47A248]",
  },
  {
    id: "postgres",
    component: SiPostgresql,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#336791]",
  },
  {
    id: "redis",
    component: SiRedis,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#DC382D]",
  },
  {
    id: "git",
    component: SiGit,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#F05032]",
  },
  {
    id: "github",
    component: SiGithub,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-white",
  },
  {
    id: "vercel",
    component: SiVercel,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-white",
  },
  {
    id: "aws",
    component: SiAmazon,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#FF9900]",
  },
  {
    id: "terraform",
    component: SiTerraform,
    className: "w-8 h-8 sm:w-12 sm:h-12 text-[#7B42BC]",
  },
];

export function TechStackShowcase() {
  return (
    <div className="relative w-full overflow-hidden bg-neutral-950">
      <div className="relative mx-auto w-full max-w-4xl sm:max-w-7xl px-4 py-12 sm:py-16">
        <div className="text-center text-2xl sm:text-3xl text-neutral-200 mb-8 sm:mb-12">
          <span className="text-neutral-400">Building with modern</span>
          <br />
          <span>technologies.</span>
        </div>

        <div className="relative h-[80px] sm:h-[120px] w-full">
          <InfiniteSlider
            className="flex h-full w-full items-center"
            duration={30}
            gap={32}
          >
            {techStack.map(({ id, component: Icon, className }) => (
              <div key={id} className="flex items-center justify-center">
                <Icon className={className} />
              </div>
            ))}
          </InfiniteSlider>
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 left-0 h-full w-[100px] sm:w-[300px]"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute top-0 right-0 h-full w-[100px] sm:w-[300px]"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#8350e8,transparent_70%)] before:opacity-40" />
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-neutral-900/20 bg-neutral-950" />
        <Sparkles
          density={1200}
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
          color="#ffffff"
        />
      </div>
    </div>
  );
}
