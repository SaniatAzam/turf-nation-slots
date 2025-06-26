// hooks/useTurfNationSlots.ts
import { useGetTurfNationSlotsQuery } from "@/lib/store/turfApi";

const DURATION = 90;
const DAYS = 14;
// const ARENA_ID = "6761946a992c39b4c667573a"; // or receive via param

function nextDates(n: number) {
  const out: string[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < n; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(d.toISOString());
  }
  return out;
}

export function useTurfNationSlots(pArenaID: string) {
  const dates = nextDates(DAYS);

  // Static top-level hook calls:
  const q0 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[0],
    duration: DURATION,
  });
  const q1 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[1],
    duration: DURATION,
  });
  const q2 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[2],
    duration: DURATION,
  });
  const q3 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[3],
    duration: DURATION,
  });
  const q4 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[4],
    duration: DURATION,
  });
  const q5 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[5],
    duration: DURATION,
  });
  const q6 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[6],
    duration: DURATION,
  });
  const q7 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[7],
    duration: DURATION,
  });
  const q8 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[8],
    duration: DURATION,
  });
  const q9 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[9],
    duration: DURATION,
  });
  const q10 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[10],
    duration: DURATION,
  });
  const q11 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[11],
    duration: DURATION,
  });
  const q12 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[12],
    duration: DURATION,
  });
  const q13 = useGetTurfNationSlotsQuery({
    arenaId: pArenaID,
    date: dates[13],
    duration: DURATION,
  });

  const queries = [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  const data = queries
    .map((q, i) => ({
      date: dates[i],
      startTimes: Array.isArray(q.data) ? q.data : [],
    }))
    .filter((q) => q.startTimes.length > 0);

  return { data, isLoading, isError };
}
