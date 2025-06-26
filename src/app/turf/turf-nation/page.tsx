"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { DayCard } from "@/components/day-card";
import { TurfHeader } from "@/components/turf-header";
import { useTurfNationSlots } from "@/hooks/useTurfNationSlots";

// -----------------------------------------------------------------------------
// Types & helpers
// -----------------------------------------------------------------------------
export interface SlotPayload {
  arenaId: string;
  date: string; // ISO string
  duration: number;
}

const sixASideID = "6761946a992c39b4c667573a";
const fiveASideID = "67619460992c39b4c6675735";

/* -------------------------------------------------------------------------- */
/* Configurable highlight rules                                               */
/* -------------------------------------------------------------------------- */
const HIGHLIGHT_WEEKDAYS: number[] = [6]; // 0-Sun … 6-Sat
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
  /* ------------- state for tab (6‑a‑side / 5‑a‑side) ------------- */
  const [tab, setTab] = useState<"6" | "5">("6");
  const arenaId = tab === "6" ? sixASideID : fiveASideID;
  const { data, isLoading } = useTurfNationSlots(arenaId);
  console.log("Slots data:", data, "Loading:", isLoading);

  // const dates = nextDates(14);
  // const queries = dates.map((date) =>
  //   useGetSlotsQuery({ arenaId, date, duration })
  // );

  // const [data6, setData6] = useState<ApiSlotResponse[]>([]);
  // const [data5, setData5] = useState<ApiSlotResponse[]>([]);

  // const [loading, setLoading] = useState<boolean>(false);

  // fetch slots whenever tab changes and that dataset is empty
  // useEffect(() => {
  //   async function fetchSlots(
  //     arenaId: string,
  //     setter: React.Dispatch<React.SetStateAction<ApiSlotResponse[]>>
  //   ) {
  //     setLoading(true);
  //     try {
  //       const payloads = buildPayloads(arenaId);
  //       const results = await Promise.all(
  //         payloads.map((p) => axios.post(API_ENDPOINT, p).then((r) => r.data))
  //       );
  //       // results: flat list ➜ group by date
  //       const grouped: Record<string, string[]> = {};
  //       results.forEach((times, i) => {
  //         const payloadDate = payloads[i].date;
  //         if (Array.isArray(times)) {
  //           grouped[payloadDate] = times;
  //         } else {
  //           console.warn("Unexpected API response for", payloadDate, times);
  //         }
  //       });

  //       const array: ApiSlotResponse[] = Object.entries(grouped).map(
  //         ([date, startTimes]) => ({ date, startTimes })
  //       );
  //       setter(array);
  //     } catch (err) {
  //       console.error("slot fetch error", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (tab === "6" && data6.length === 0) fetchSlots(sixASideID, setData6);
  //   if (tab === "5" && data5.length === 0) fetchSlots(fiveASideID, setData5);
  // }, [tab, data6.length, data5.length]);

  // const currentData = tab === "6" ? data6 : data5;

  // Tooltip-like message if no data yet
  const content = useMemo(() => {
    if (isLoading && data.length === 0) {
      return (
        <div className="flex flex-col items-center gap-2 py-24">
          <Loader2 className="animate-spin text-primary" />
          <span className="text-muted-foreground">Fetching slots…</span>
        </div>
      );
    }
    if (data.length === 0) {
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
          {data.map(({ date, startTimes }) => (
            <DayCard
              key={date}
              date={date}
              startTimes={startTimes}
              highlight={isHighlightDay(date)}
              isSpecialSlot={isEveningSlot}
            />
          ))}
        </motion.div>
      </div>
    );
  }, [data, isLoading]);

  return (
    <div className="w-[100vw] flex flex-col justify-center items-center lg:px-16">
      <TurfHeader
        coverSrc="/turfs/turf-nation/tn-cover.png"
        logoSrc="/turfs/turf-nation/tn-logo.svg"
        name="Turf Nation"
        website="https://www.turfnationbd.com/booking"
        contactNumber="+8801814460000"
      />
      <main className="flex flex-col justify-center py-10 max-w-6xl space-y-8 px-10">
        {/* <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div> */}
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
    </div>
  );
}
