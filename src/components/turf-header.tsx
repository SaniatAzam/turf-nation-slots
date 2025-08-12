"use client";

import Image from "next/image";
import { Phone, ExternalLink } from "lucide-react";

interface TurfHeaderProps {
  name: string;
  logoSrc: string;
  coverSrc: string;
  contactNumber?: string;
  website?: string;
}

function getLinkParts(raw?: string) {
  if (!raw) return { href: undefined as string | undefined, display: "" };
  try {
    const url = raw.startsWith("http")
      ? new URL(raw)
      : new URL(`https://${raw}`);
    return { href: url.toString(), display: url.hostname };
  } catch {
    // Fallback: strip scheme & path crudely
    const display = raw.replace(/^https?:\/\//, "").split("/")[0];
    const href = raw.startsWith("http") ? raw : `https://${raw}`;
    return { href, display };
  }
}

export function TurfHeader({
  name,
  logoSrc,
  coverSrc,
  contactNumber,
  website,
}: TurfHeaderProps) {
  const link = getLinkParts(website);

  return (
    <header className="relative w-full overflow-hidden rounded-xl">
      {/* Cover */}
      <div className="relative h-[180px] sm:h-[220px] w-full">
        <Image
          src={coverSrc}
          alt={`${name} cover image`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Readability overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background/40 dark:from-background/0 dark:via-background/20 dark:to-background/60" />
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Floating info bar */}
      <div className="relative mx-4 -mt-12 sm:-mt-16 pb-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border border-border bg-card/80 px-4 py-4 backdrop-blur-md shadow-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          {/* Left: Logo + Name (logo never grows, name can truncate) */}
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="relative -mt-10 h-20 w-20 flex-none overflow-hidden rounded-full border bg-white shadow-md ring-1 ring-ring/20 sm:h-24 sm:w-24">
              <Image
                src={logoSrc}
                alt={`${name} logo`}
                fill
                sizes="96px"
                className="object-contain p-1.5"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h1
                className="truncate text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl"
                title={name}
              >
                {name}
              </h1>
            </div>
          </div>

          {/* Right: Actions (call never shrinks; link truncates first) */}
          <div className="flex min-w-0 flex-col-reverse gap-2 sm:flex-row md:items-center md:justify-end">
            {link.href && (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.href}
                className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition hover:shadow-sm hover:ring-1 hover:ring-ring/40 md:order-1 md:max-w-[320px]"
              >
                <ExternalLink className="h-4 w-4 flex-none" />
                <span className="truncate">{link.display}</span>
              </a>
            )}

            {contactNumber && (
              <a
                href={`tel:${contactNumber}`}
                title={`Call ${contactNumber}`}
                className="inline-flex flex-none items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50 md:order-2"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call</span>
                <span className="sm:hidden">Call</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
