// hooks/useJaffSlots.ts
"use client";

import { useGetJaffDayQuery } from "@/lib/store/turfApi";

const DAYS = 14;

function nextDates() {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  return Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

interface CardData {
  date: string;
  startTimes: string[];
}

export function useJaffSlots() {
  const dates = nextDates();

  /* 14 top‑level calls – complies with rules‑of‑hooks */
  const queries = [
    useGetJaffDayQuery(dates[0]),
    useGetJaffDayQuery(dates[1]),
    useGetJaffDayQuery(dates[2]),
    useGetJaffDayQuery(dates[3]),
    useGetJaffDayQuery(dates[4]),
    useGetJaffDayQuery(dates[5]),
    useGetJaffDayQuery(dates[6]),
    useGetJaffDayQuery(dates[7]),
    useGetJaffDayQuery(dates[8]),
    useGetJaffDayQuery(dates[9]),
    useGetJaffDayQuery(dates[10]),
    useGetJaffDayQuery(dates[11]),
    useGetJaffDayQuery(dates[12]),
    useGetJaffDayQuery(dates[13]),
  ];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.error);

  const data: CardData[] = queries
    .map((q) => q.data)
    .filter(Boolean) as CardData[];

  return { data, isLoading, isError };
}
