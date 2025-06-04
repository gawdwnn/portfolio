"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { projects } from "@/data";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleCardExpand = (index: number) => {
    setExpandedCard(index);
  };

  return (
    <>
      <div className="relative w-screen -ml-[calc((100vw-100%)/2)]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 py-4 pl-[max(calc((100vw-100%)/2+1rem),1rem)] pr-[max(calc((100vw-100%)/2+1rem),1rem)]">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                className="flex-shrink-0 flex-grow-0 basis-[90%] sm:basis-[calc(50%-0.75rem)] lg:basis-[400px]"
              >
                <motion.button
                  onClick={() => handleCardExpand(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="block w-full h-full"
                >
                  <Card className="w-full bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden group h-full">
                    <div className="relative aspect-video">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform-gpu transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `url(${project.imageUrl})`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-zinc-800 text-gray-300 text-xs group-hover:bg-purple-900/50 group-hover:text-purple-300 transition-colors duration-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                        {project.description}
                      </p>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                          asChild
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                          asChild
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-end mt-8 mr-10 gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 w-12 h-12"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-800 border-zinc-700 hover:bg-zinc-700 w-12 h-12"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      {/* Expanded Card Sheet */}
      <Sheet
        open={expandedCard !== null}
        onOpenChange={() => setExpandedCard(null)}
      >
        <SheetContent
          side="bottom"
          className="h-[90vh] bg-zinc-900 border-zinc-800"
        >
          {expandedCard !== null && (
            <div className="p-8">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-white">
                  {projects[expandedCard].title}
                </SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${projects[expandedCard].imageUrl})`,
                    }}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-gray-400 mb-6">
                      {projects[expandedCard].description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[expandedCard].tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-zinc-800 text-gray-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      asChild
                    >
                      <a
                        href={projects[expandedCard].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                      asChild
                    >
                      <a
                        href={projects[expandedCard].demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
