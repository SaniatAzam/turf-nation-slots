"use client";

import Link from "next/link";
import { Github, Heart, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <Heart className="w-4 h-4 text-red-500 dark:text-red-400" />
          Built with love by{" "}
          <Link
            href="https://github.com/SaniatAzam"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-primary"
          >
            @SaniatAzam
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/SaniatAzam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/saniatazam/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
