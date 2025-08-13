"use client";

import Link from "next/link";
import { Github, Heart, Linkedin, CloudSun } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background text-foreground mt-10 bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              About
            </h3>
            <p className="text-sm text-muted-foreground">© {year} Futsowl</p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              <Link
                href="/sitemap.xml"
                className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/robots.txt"
                className="text-sm text-muted-foreground underline hover:text-foreground transition-colors"
              >
                robots.txt
              </Link>
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/SaniatAzam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full bg-muted p-2 transition-colors hover:bg-muted-foreground/10 hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/saniatazam/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-muted p-2 transition-colors hover:bg-muted-foreground/10 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Data Sources Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Data Sources
            </h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <CloudSun className="h-4 w-4 text-orange-500 dark:text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <span>Weather by </span>
                <Link
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary transition-colors"
                >
                  Open-Meteo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with creator and community love */}
        <div className="mt-8 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-muted-foreground">
              Created by{" "}
              <Link
                href="https://github.com/SaniatAzam"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                @SaniatAzam
              </Link>
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
              <span>Made for the futsal community</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
