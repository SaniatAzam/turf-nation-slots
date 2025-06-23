"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggler";

// -----------------------------------------------------------------------------
// Types & helpers
// -----------------------------------------------------------------------------
export interface SlotPayload {
  arenaId: string;
  date: string; // ISO string
  duration: number;
}

interface ApiSlotResponse {
  // adjust these fields to match your actual backend response
  date: string; // ISO date e.g. "2025-06-23T18:00:00.000Z"
  startTimes: string[]; // e.g. ["07:00", "08:30", ...]
}

const sixASideID = "6761946a992c39b4c667573a";
const fiveASideID = "67619460992c39b4c6675735";
const duration = 90;
// local proxy endpoint created earlier
const API_ENDPOINT = "/api/turf/available-slots";

/** Generate ISO strings for today + the next `days-1` days at local midnight */
function getNextIsoDates(days: number = 14) {
  const out: string[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < days; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(d.toISOString());
  }
  return out;
}

function buildPayloads(arenaId: string, days = 14): SlotPayload[] {
  return getNextIsoDates(days).map((date) => ({ arenaId, date, duration }));
}

function formatDateHeader(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(iso));
}

function formatTimeRange(startIso: string) {
  const start = new Date(startIso);
  const end = new Date(start.getTime() + duration * 60_000);
  const fmt = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/* -------------------------------------------------------------------------- */
/* Configurable highlight rules                                               */
/* -------------------------------------------------------------------------- */
const HIGHLIGHT_WEEKDAYS: number[] = [2, 6]; // 0-Sun … 6-Sat
const EVENING_HOURS = new Set([19, 20, 21]); // 7-9 PM local

/* -------------------------------------------------------------------------- */
/* Helper predicates                                                          */
/* -------------------------------------------------------------------------- */
function isHighlightDay(dateIso: string) {
  const day = new Date(dateIso).getDay();
  return HIGHLIGHT_WEEKDAYS.includes(day);
}

function isEveningSlot(startIso: string) {
  const d = new Date(startIso);
  return EVENING_HOURS.has(d.getHours());
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------
export default function SlotsPage() {
  const [tab, setTab] = useState<"6" | "5">("6");
  const [data6, setData6] = useState<ApiSlotResponse[]>([]);
  const [data5, setData5] = useState<ApiSlotResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // fetch slots whenever tab changes and that dataset is empty
  useEffect(() => {
    async function fetchSlots(
      arenaId: string,
      setter: React.Dispatch<React.SetStateAction<ApiSlotResponse[]>>
    ) {
      setLoading(true);
      try {
        const payloads = buildPayloads(arenaId);
        const results = await Promise.all(
          payloads.map((p) => axios.post(API_ENDPOINT, p).then((r) => r.data))
        );
        // results: flat list ➜ group by date
        const grouped: Record<string, string[]> = {};
        results.forEach((times, i) => {
          const payloadDate = payloads[i].date;
          if (Array.isArray(times)) {
            grouped[payloadDate] = times;
          } else {
            console.warn("Unexpected API response for", payloadDate, times);
          }
        });

        const array: ApiSlotResponse[] = Object.entries(grouped).map(
          ([date, startTimes]) => ({ date, startTimes })
        );
        setter(array);
      } catch (err) {
        console.error("slot fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    if (tab === "6" && data6.length === 0) fetchSlots(sixASideID, setData6);
    if (tab === "5" && data5.length === 0) fetchSlots(fiveASideID, setData5);
  }, [tab, data6.length, data5.length]);

  const currentData = tab === "6" ? data6 : data5;

  // Tooltip-like message if no data yet
  const content = useMemo(() => {
    if (loading && currentData.length === 0) {
      return (
        <div className="flex flex-col items-center gap-2 py-24">
          <Loader2 className="animate-spin text-primary" />
          <span className="text-muted-foreground">Fetching slots…</span>
        </div>
      );
    }
    if (currentData.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-24">
          No slots available.
        </p>
      );
    }

    return (
      <div className="flex">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {currentData.map(({ date, startTimes }) => {
            const highlightCard = isHighlightDay(date);
            return (
              <motion.div
                key={date}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
              >
                <Card
                  className={`transition-shadow hover:shadow-xl ${
                    highlightCard
                      ? "border-2 border-green-600 dark:border-green-400" // weekday highlight
                      : "border border-border/40"
                  }`}
                >
                  <CardHeader className="bg-primary/10 flex items-center py-2 border-y-accent-foreground/5 border-y-[1px]">
                    <CardTitle className="p-1">
                      <span className={`text-gray-900 dark:text-green-400`}>
                        {formatDateHeader(date)}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-wrap gap-2 py-4">
                    {startTimes.length ? (
                      startTimes.map((iso) => {
                        const evening = isEveningSlot(iso);

                        /* --------------------------------------- */
                        /* Evening badge styling                   */
                        /* --------------------------------------- */
                        const eveningClasses = evening
                          ? "border border-green-600 text-green-700 " + // light
                            "dark:border-green-400 dark:text-green-400" // dark
                          : "";

                        return (
                          <Badge
                            key={iso}
                            variant="secondary"
                            className={`gap-1 ${eveningClasses}`}
                          >
                            <Clock className="h-4 w-4" />
                            {formatTimeRange(iso)}
                          </Badge>
                        );
                      })
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        No slots
                      </span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    );
  }, [currentData, loading]);

  return (
    <main className="flex flex-col justify-center py-10 max-w-6xl space-y-8 px-10">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Tabs
        value={tab}
        onValueChange={(v) => setTab(v as "6" | "5")}
        className="w-full"
      >
        <TabsList className="mx-auto w-fit bg-primary/10">
          <TabsTrigger value="6">6 V 6</TabsTrigger>
          <TabsTrigger value="5">5 V 5</TabsTrigger>
        </TabsList>
        <TabsContent value="6" className="mt-8">
          {content}
        </TabsContent>
        <TabsContent value="5" className="mt-8">
          {content}
        </TabsContent>
      </Tabs>
    </main>
  );
}
