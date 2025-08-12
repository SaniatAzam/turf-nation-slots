// app/turf/dbox-rooftop/page.tsx
"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { DayCard } from "@/components/day-card";
import { TurfHeader } from "@/components/turf-header";
import { useDboxRooftopSlots } from "@/hooks/useDBoxRooftopSlots";

const isSaturday = (iso: string) => new Date(iso).getDay() === 6;
const isEvening = (iso: string) =>
  [19, 20, 21].includes(new Date(iso).getHours());

export default function DBoxSlotsPage() {
  const { data, isLoading, isError } = useDboxRooftopSlots();

  const content = useMemo(() => {
    if (isLoading)
      return (
        <div className="flex flex-col items-center gap-2 py-24">
          <Loader2 className="animate-spin text-primary" />
          <span className="text-muted-foreground">Fetching slots…</span>
        </div>
      );

    if (isError)
      return (
        <p className="text-center text-destructive mt-20">
          Failed to load DBox JFP Rooftop data.
        </p>
      );

    const visible = data.filter((c) => c.startTimes.length);

    if (visible.length === 0)
      return (
        <p className="text-center text-muted-foreground py-24">
          No slots available.
        </p>
      );

    return (
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {visible.map(({ date, startTimes }) => (
          <DayCard
            key={date}
            date={date}
            startTimes={startTimes} // already ISO strings
            highlight={isSaturday(date)}
            highlightLight="border-purple-500 text-purple-500"
            highlightDark="dark:border-purple-500 dark:text-purple-400"
            primaryColor="purple-500"
            isSpecialSlot={isEvening}
            turf="DBOX-JFP"
          />
        ))}
      </motion.div>
    );
  }, [data, isLoading, isError]);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center lg:px-10">
      <TurfHeader
        coverSrc="/turfs/dbox-rooftop/dbox-rooftop-cover.jpg"
        logoSrc="/turfs/dbox-rooftop/dbox-rooftop-logo.jpg"
        name="DBox JFP Rooftop"
        website="https://booking.squarefeet.xyz/booking/dbox-jfp-rooftop-futsal-ground"
        contactNumber="+8801918973999"
      />
      <main className="flex flex-col py-10 max-w-7xl space-y-8 px-8 lg:px-0 w-full">
        {content}
      </main>
    </div>
  );
}
