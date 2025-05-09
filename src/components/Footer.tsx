"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, X } from "lucide-react";

/**
 * Modern Tech Footer Component
 *
 * A clean, dark footer with minimalist icons for social/contact links and a copyright notice.
 * Avoids the terminal style for visual contrast while maintaining a tech aesthetic.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://github.com/gawdwnn/",
      label: "GitHub",
      icon: Github,
    },
    {
      href: "https://www.linkedin.com/in/gawdwnn/",
      label: "LinkedIn",
      icon: Linkedin,
    },
    {
      href: "https://x.com/",
      label: "X (formerly Twitter)",
      icon: X,
    },
    {
      href: "mailto:gawdwnn@gmail.com",
      label: "Email",
      icon: Mail,
    },
  ];

  const resumeLink = {
    href: "https://docs.google.com/document/d/e/2PACX-1vTSZD4HTB4DCnJjt-xK7f6ocd8nVNcoh7MxJ7BGo214MzNxWXIPY3RFaEe-LAwtfmEcIuRBluYvMClq/pub",
    label: "Download Resume",
    icon: Download,
  };

  return (
    <footer className="pt-8 px-6 bg-neutral-950 border-t border-neutral-900 text-neutral-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Copyright Info */}
        <div className="text-xs text-center sm:text-left">
          © {currentYear} Godwin O. All rights reserved.
        </div>

        {/* Social & Resume Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
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
