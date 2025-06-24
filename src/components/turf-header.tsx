"use client";

import Image from "next/image";
import { Phone, ExternalLink } from "lucide-react";
// import { cn } from "@/lib/utils";

interface TurfHeaderProps {
  name: string;
  logoSrc: string;
  coverSrc: string;
  contactNumber?: string;
  website?: string;
}

export function TurfHeader({
  name,
  logoSrc,
  coverSrc,
  contactNumber,
  website,
}: TurfHeaderProps) {
  return (
    <div className="relative w-full border-border">
      {/* Cover Image */}
      <div className="relative h-[160px] sm:h-[200px] w-full overflow-hidden">
        <Image
          src={coverSrc}
          alt="Cover"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay info box */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between px-4 sm:px-10 -mt-12 sm:-mt-16 mb-4 sm:mb-0 gap-4">
        {/* Logo & Name */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-background bg-background shadow-lg overflow-hidden">
            <Image src={logoSrc} alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {name}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground sm:items-center">
          {website && (
            <div className="flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
          {contactNumber && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <a href={`tel:${contactNumber}`} className="hover:underline">
                {contactNumber}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
