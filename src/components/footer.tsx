"use client";

import Link from "next/link";
import { Github, Heart, Linkedin, CloudSun } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-10  bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)]">
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

        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <CloudSun className="w-4 h-4 text-orange-500 dark:text-orange-400" />
          Weather data from
          <Link
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-primary"
          >
            Open-moteo
          </Link>
        </div>

        <div className="flex items-center gap-4 rounded-full bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] p-2 shadow-sm justify-center">
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
