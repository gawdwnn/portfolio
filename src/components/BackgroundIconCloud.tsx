"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

// Optimize cloud props for background use
const backgroundCloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 0,
      willChange: "transform", // Optimize for animations
    },
  },
  options: {
    reverse: true,
    depth: 0.5,
    wheelZoom: false,
    imageScale: 1.5,
    activeCursor: "default",
    tooltip: null,
    initial: [0.1, -0.1],
    clickToFront: 0,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.02,
    minSpeed: 0.01,
    // Add performance optimizations
    dragControl: false,
    dragThreshold: 0,
    freezeActive: true,
    freezeDecel: true,
    shape: "sphere",
    radiusX: 1,
    radiusY: 1,
    radiusZ: 1,
  },
};

// Memoize default icon slugs to prevent unnecessary re-renders
const defaultIconSlugs = [
  "react",
  "typescript",
  "nextdotjs",
  "tailwindcss",
  "nodejs",
  "mongodb",
  "postgresql",
  "prisma",
  "graphql",
  "aws",
  "vercel",
  "docker",
  "git",
  "github",
  "figma",
  "gitlab",
  "circleci",
  "nestjs",
  "python",
  "tensorflow",
  "pytorch",
  "openai",
  "huggingface",
  "langchain",
  "jupyter",
  "pandas",
  "numpy",
  "scikitlearn",
];

export type BackgroundIconCloudProps = {
  iconSlugs?: string[];
  className?: string;
};

export function BackgroundIconCloud({
  iconSlugs = defaultIconSlugs,
  className,
}: BackgroundIconCloudProps) {
  const [data, setData] = useState<Awaited<
    ReturnType<typeof fetchSimpleIcons>
  > | null>(null);

  // Memoize icon rendering function
  const renderBackgroundIcon = useCallback((icon: SimpleIcon) => {
    return renderSimpleIcon({
      icon,
      minContrastRatio: 1.1,
      size: 32,
      aProps: {
        href: undefined,
        target: undefined,
        rel: undefined,
        onClick: (e: any) => e.preventDefault(),
      },
    });
  }, []);

  // Memoize the icon slugs to prevent unnecessary fetches
  const memoizedIconSlugs = useMemo(() => iconSlugs, [iconSlugs]);

  // Fetch icons only when slugs change
  useEffect(() => {
    let isMounted = true;

    const fetchIcons = async () => {
      try {
        const result = await fetchSimpleIcons({ slugs: memoizedIconSlugs });
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to fetch icons:", error);
      }
    };

    fetchIcons();

    return () => {
      isMounted = false;
    };
  }, [memoizedIconSlugs]);

  // Memoize rendered icons to prevent unnecessary re-renders
  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderBackgroundIcon(icon)
    );
  }, [data, renderBackgroundIcon]);

  if (!renderedIcons) {
    return null;
  }

  return (
    <div className={`${className} w-full h-full absolute inset-0`}>
      <Cloud {...backgroundCloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    </div>
  );
}
