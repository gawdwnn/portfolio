"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { personalInfo } from "@/data";
import { BACKGROUND_STYLES } from "@/lib/background-styles";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { TechStackShowcase } from "./TechStackShowcase";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: personalInfo.githubUrl,
      label: "GitHub",
      icon: Github,
      tooltip: "View GitHub Profile",
    },
    {
      href: personalInfo.linkedinUrl,
      label: "LinkedIn",
      icon: Linkedin,
      tooltip: "Connect/Chat on LinkedIn",
    },
    {
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      icon: Mail,
      tooltip: "Send an Email",
    },
  ];

  const resumeLink = {
    href: personalInfo.resumeUrl,
    label: "Download Resume",
    icon: Download,
    tooltip: "View Resume",
  };

  return (
    <footer className={`relative ${BACKGROUND_STYLES.root} ${BACKGROUND_STYLES.sectionBorderTop}`}>
      <TechStackShowcase />

      <div className="relative z-10 pt-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-xs text-center text-neutral-500 sm:text-left">
            © {currentYear} Godwin O. All rights reserved.
          </div>

          <TooltipProvider delayDuration={100}>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <Tooltip key={link.label}>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={link.href}
                      aria-label={link.label}
                      target={
                        link.href.startsWith("mailto:") ? "_self" : 
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http") && !link.href.startsWith("mailto:")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-neutral-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon className="w-5 h-5" />
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.a
                    href={resumeLink.href}
                    aria-label={resumeLink.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <resumeLink.icon className="w-5 h-5" />
                  </motion.a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{resumeLink.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="text-[10px] text-neutral-600 text-center mt-6 pb-2">
          🐾
        </div>
      </div>
    </footer>
  );
}
