"use client";

import useSWR from "swr";
import { DayCard } from "@/components/day-card";
import { toIso } from "@/utils/time";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TurfHeader } from "@/components/turf-header";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */
interface JaffSlot {
  time: string;
  price: string;
  type: string;
  status: "available" | "booked";
}

interface JaffApiResponse {
  date: string;
  slots: JaffSlot[];
}

interface CardData {
  date: string;
  startTimes: string[];
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
const DAYS = 14;

function nextDates(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const dates14 = nextDates(DAYS);

async function fetchBatch(): Promise<CardData[]> {
  const resArr = await Promise.all(
    dates14.map((d) =>
      fetch(`/api/jaff?date=${d}`).then(
        (r) => r.json() as Promise<JaffApiResponse>
      )
    )
  );

  return resArr.map(({ date, slots }) => ({
    date,
    startTimes: slots
      .filter((s) => s.status === "available")
      .map((s) => toIso(date, s.time)),
  }));
}

const isSaturday = (iso: string) => new Date(iso).getDay() === 6;
const isEvening = (iso: string) =>
  [19, 20, 21].includes(new Date(iso).getHours());

/* -------------------------------------------------------------------------- */
/* Page component                                                             */
/* -------------------------------------------------------------------------- */
export default function JaffSlotsPage() {
  const { data, error, isLoading } = useSWR<CardData[]>(
    "jaff-batch",
    fetchBatch
  );

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-2 py-24">
        <Loader2 className="animate-spin text-primary" />
        <span className="text-muted-foreground">Fetching slots…</span>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-destructive mt-20">
        Failed to load JAFF data.
      </p>
    );

  const visibleCards = (data ?? []).filter((c) => c.startTimes.length);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center lg:px-16">
      <TurfHeader
        coverSrc="/turfs/jaff/jaff-cover.png"
        logoSrc="/turfs/jaff/jaff-logo.png"
        name="JAFF"
        website="https://www.jaff.com.bd/venue/jaff"
        contactNumber="+8801304229158"
      />
      <main className="flex flex-col justify-center py-10 max-w-6xl space-y-8 px-10">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {visibleCards.map((c) => (
            <DayCard
              key={c.date}
              date={c.date}
              startTimes={c.startTimes}
              highlight={isSaturday(c.date)}
              highlightLight="border-sky-400 text-sky-400"
              highlightDark="dark:border-sky-400 dark:text-sky-400"
              primaryColor="sky-400"
              isSpecialSlot={isEvening}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}
