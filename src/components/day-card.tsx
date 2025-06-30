"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useGetDhakaForecastQuery } from "@/lib/store/weatherApi";
import * as Lucide from "lucide-react";

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
}: DayCardProps) {
  const {
    data: weatherByDate,
    isLoading: weatherLoading,
    error: weatherError,
  } = useGetDhakaForecastQuery();
  const weather = weatherByDate?.[date.slice(0, 10)]; // Extract date in YYYY-MM-DD format

  console.log(" DATE DATE DATE " + date);

  // Dynamically create Tailwind classes using primaryColor
  const textPrimary = `text-${primaryColor}`;
  const iconPrimary = `text-${primaryColor} dark:text-${primaryColor}`;
  const dateHeaderClass = `text-lg md:text-xl font-semibold ${textPrimary} dark:${textPrimary}`;

  // borderClass uses the highlight color props
  const borderClass = highlight
    ? `border-2 ${highlightLight} ${highlightDark}`
    : "border border-border/40";

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Card className={`transition-shadow hover:shadow-xl ${borderClass}`}>
        <CardHeader className="py-2 flex flex-col gap-0">
          {/* Date Header */}
          <CardTitle className="">
            <span className={dateHeaderClass}>
              {new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              }).format(new Date(date))}
            </span>
          </CardTitle>
          {/* Weather Section */}
          <div className="w-full flex items-center gap-3 mt-1 mb-0.5 justify-between bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] p-2 rounded-md shadow-inner">
            {weatherLoading && (
              <span className="text-xs text-muted-foreground">
                Loading weather…
              </span>
            )}
            {weatherError && (
              <span className="text-xs text-red-500">Weather unavailable</span>
            )}
            {!weatherLoading && !weatherError && !weather && (
              <span className="text-xs text-muted-foreground">
                No weather data
              </span>
            )}
            {weather && (
              <>
                <div className="flex flex-col leading-tight">
                  <span
                    className={`text-base md:text-lg font-medium ${textPrimary} dark:${textPrimary}`}
                  >
                    {weather.condition}
                  </span>
                  <span className="text-sm text-muted-foreground flex gap-3">
                    <span>
                      <span className="font-semibold">
                        {Math.round(weather.temp)}°C
                      </span>{" "}
                      avg
                    </span>
                    <span>
                      <span className="font-semibold">{weather.precip}%</span>{" "}
                      rain
                    </span>
                  </span>
                </div>
                <motion.div
                  initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className={`rounded-full bg-gradient-to-br from-[color:var(--card)] to-[color:var(--muted)] p-2  flex items-center justify-center`}
                >
                  {(() => {
                    const Icon = Lucide[weather.icon] ?? Lucide.HelpCircle;
                    return (
                      <Icon
                        className={`w-8 h-8 md:w-10 md:h-10 ${iconPrimary}`}
                      />
                    );
                  })()}
                </motion.div>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2 py-2">
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
                  className={`gap-1 ${badgeClass} hover:scale-105 transition-transform duration-200 hover:bg-[-var(--primary)]`}
                >
                  <Clock className="h-4 w-4" />
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
