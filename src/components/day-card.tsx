"use client";

//components/day-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */
export interface DayCardProps {
  /** ISO date (yyyy-mm-dd or full ISO) */
  date: string;
  /** List of slot start-times (ISO strings or plain “07:00”) */
  startTimes: string[];
  highlight?: boolean;
  /** full border+text class for light mode */
  highlightLight?: string; // e.g. "border-sky-600 text-sky-600"
  /** full border+text class for dark mode */
  highlightDark?: string; // e.g. "dark:border-sky-400 dark:text-sky-400"

  primaryColor?: string; // e.g.
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
  primaryColor = "green-400",
  isSpecialSlot = DEFAULT_EVENING,
}: DayCardProps) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(date));

  const fmtTime = (iso: string) => {
    const start = new Date(iso);
    const end = new Date(start.getTime() + 90 * 60_000); // 90-min duration
    const f = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${f.format(start)} – ${f.format(end)}`;
  };

  /* dynamic border */
  const borderClass = highlight
    ? `border-2 ${highlight} ${highlightDark}`
    : "border border-border/40";

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Card className={`transition-shadow hover:shadow-xl ${borderClass}`}>
        <CardHeader className={`flex items-center py-2 `}>
          <CardTitle>
            <span className={`text-gray-900 dark:text-${primaryColor}`}>
              {dateLabel}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-wrap gap-2 py-4">
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
                  className={`gap-1 ${badgeClass}`}
                >
                  <Clock className="h-4 w-4" />
                  {fmtTime(iso)}
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
