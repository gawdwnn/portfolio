"use client";

import TerminalWindow from "@/components/TerminalWindow";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, Home, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";

export function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-[0.4] -z-10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl -z-10 opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full max-w-2xl z-10"
      >
        <TerminalWindow title="system-error: 404">
          <div className="text-center py-8 sm:py-12">
            <div className="font-mono text-6xl sm:text-8xl font-bold mb-6 relative inline-block">
              <span className="text-brand-primary">4</span>
              <span className="text-brand-muted">0</span>
              <span className="text-brand-secondary">4</span>
              <span className="absolute -top-2 -right-8 text-brand-accent/70 animate-pulse">
                <AlertTriangle size={24} />
              </span>
            </div>

            <div className="text-lg sm:text-xl font-semibold mb-3 flex items-center justify-center gap-2 text-neutral-300">
              <Terminal size={18} className="text-neutral-500 flex-shrink-0" />
              <TypewriterText
                text="Command failed: resource unavailable."
                speed={30}
                className="text-left"
              />
            </div>
            <p className="text-neutral-400 mb-10 text-sm sm:text-base max-w-md mx-auto">
              The requested path could not be resolved. Check the URL or
              navigate back to safety using the command below.
            </p>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="bg-brand-primary/5 hover:bg-brand-primary/10 text-brand-primary/90 hover:text-brand-primary border-brand-primary/10 group transition-all duration-300 ease-out hover:shadow-lg hover:shadow-brand-primary/30"
            >
              <Home
                size={16}
                className="mr-2 transition-transform duration-300 ease-out group-hover:-translate-x-1"
              />
              cd /home
            </Button>
          </div>
        </TerminalWindow>
      </motion.div>
    </section>
  );
}
