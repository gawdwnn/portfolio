"use client";

import { personalInfo } from "@/data";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, X } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: personalInfo.githubUrl,
      label: "GitHub",
      icon: Github,
    },
    {
      href: personalInfo.linkedinUrl,
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: personalInfo.xUrl,
      label: "X (formerly Twitter)",
      icon: X,
    },
    {
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      icon: Mail,
    },
  ];

  const resumeLink = {
    href: personalInfo.resumeUrl,
    label: "Download Resume",
    icon: Download,
  };

  return (
    <footer className="pt-8 px-6 bg-neutral-950 border-t border-neutral-900 text-neutral-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-xs text-center sm:text-left">
          © {currentYear} Godwin O. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
          <motion.a
            href={resumeLink.href}
            aria-label={resumeLink.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <resumeLink.icon className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
      <div className="text-[10px] text-neutral-600 text-center mt-6 pb-2">
        Built with Cursor AI
      </div>
    </footer>
  );
}
