"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useGetDhakaForecastQuery } from "@/lib/store/weatherApi";
import * as Lucide from "lucide-react";
import { Separator } from "@radix-ui/react-separator";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
export interface DayCardProps {
  date: string;
  startTimes: string[];
  highlight?: boolean;
  highlightLight?: string;
  highlightDark?: string;
  primaryColor?: string; // Tailwind color, e.g. "green-400"
  isSpecialSlot?: (iso: string) => boolean;
  turf?: string;
}

const DEFAULT_EVENING = (iso: string) =>
  [19, 20, 21].includes(new Date(iso).getHours());

export function DayCard({
  date,
  startTimes,
  highlight = false,
  highlightLight = "border-green-400 text-green-400",
  highlightDark = " dark:border-green-400 dark:text-green-400",
  primaryColor = "green-400", // default fallback
  isSpecialSlot = DEFAULT_EVENING,
  turf,
}: DayCardProps) {
  const {
    data: weatherByDate,
    isLoading: weatherLoading,
    error: weatherError,
  } = useGetDhakaForecastQuery();
  const weather = weatherByDate?.[date.slice(0, 10)]; // Extract date in YYYY-MM-DD

  // Primary color hooks
  const textPrimary = `text-${primaryColor}`;
  const iconPrimary = `text-${primaryColor} dark:text-${primaryColor}`;
  const dateHeaderClass = `text-xl md:text-xl font-semibold ${textPrimary} dark:${textPrimary}`;
  const turfBorderClass = `border-foreground/10 border-1`;
  const topPostClass = `flex justify-center items-center rounded-b-xl h-fit border-1 py-2 ${turfBorderClass} text-${primaryColor} text-center -mt-[25px] w-[50%] mx-auto tracking-widest font-medium`;

  const borderClass = highlight
    ? `border-2 ${highlightLight} ${highlightDark}`
    : "border border-border/40";

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Card className={`flex transition-shadow hover:shadow-xl ${borderClass}`}>
        <div className={`${topPostClass}`}>{turf}</div>

        {/* Header: Date on the left, compact weather pill on the right */}
        <CardHeader className="py-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            {/* Date (primary) */}
            <CardTitle className="flex-1 min-w-0">
              <span className={dateHeaderClass}>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }).format(new Date(date))}
              </span>
            </CardTitle>

            {/* Weather (supplementary) */}
            <div className="shrink-0">
              {weatherLoading && (
                <span className="inline-flex items-center rounded-lg border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground shadow-sm backdrop-blur">
                  Loading…
                </span>
              )}

              {weatherError && (
                <span className="inline-flex items-center rounded-lg border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground shadow-sm backdrop-blur">
                  Weather unavailable
                </span>
              )}

              {!weatherLoading && !weatherError && !weather && (
                <span className="inline-flex items-center rounded-lg border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] text-muted-foreground shadow-sm backdrop-blur">
                  No weather
                </span>
              )}

              {weather && (
                <motion.div
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background/70 px-2.5 py-1 text-[12px] text-muted-foreground shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  title={`${weather.condition} • ${Math.round(
                    weather.temp
                  )}°C avg • ${weather.precip}% rain`}
                >
                  {(() => {
                    const Icon = Lucide[weather.icon] ?? Lucide.HelpCircle;
                    return (
                      <Icon className={`h-4 w-4 ${iconPrimary}`} aria-hidden />
                    );
                  })()}
                  <span className="whitespace-nowrap">
                    {Math.round(weather.temp)}°C • {weather.precip}%
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>

        <Separator className="h-[1px] bg-foreground/10 rounded-full" />

        {/* Slot times (unchanged) */}
        <CardContent className="flex flex-wrap gap-2 pb-2">
          {startTimes.length ? (
            startTimes.map((iso) => {
              const special = isSpecialSlot(iso);
              const badgeClass = special
                ? `border ${highlightLight} ${highlightDark} `
                : "";
              return (
                <Badge
                  key={iso}
                  variant="secondary"
                  className={`gap-1 ${badgeClass} hover:scale-105 transition-transform duration-200 hover:bg-[-var(--primary)] text-md md:text-xs`}
                >
                  <Clock className="h-4 w-4 " />
                  {(() => {
                    const start = new Date(iso);
                    const end = new Date(start.getTime() + 90 * 60_000);
                    const f = new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });
                    return `${f.format(start)} – ${f.format(end)}`;
                  })()}
                </Badge>
              );
            })
          ) : (
            <span className="text-muted-foreground text-sm">No slots</span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
