"use client";

import { useGetDboxRooftopDayQuery } from "@/lib/store/turfApi";

const DAYS = 15;

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

export function useDboxRooftopSlots() {
  const dates = nextDates();

  /* 14 top‑level calls – complies with rules‑of‑hooks */
  const queries = [
    // useGetDboxRooftopDayQuery(dates[0]),
    useGetDboxRooftopDayQuery(dates[1]),
    useGetDboxRooftopDayQuery(dates[2]),
    useGetDboxRooftopDayQuery(dates[3]),
    useGetDboxRooftopDayQuery(dates[4]),
    useGetDboxRooftopDayQuery(dates[5]),
    useGetDboxRooftopDayQuery(dates[6]),
    useGetDboxRooftopDayQuery(dates[7]),
    useGetDboxRooftopDayQuery(dates[8]),
    useGetDboxRooftopDayQuery(dates[9]),
    useGetDboxRooftopDayQuery(dates[10]),
    useGetDboxRooftopDayQuery(dates[11]),
    useGetDboxRooftopDayQuery(dates[12]),
    useGetDboxRooftopDayQuery(dates[13]),
  ];

  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.error);

  const data: CardData[] = queries
    .map((q) => q.data)
    .filter(Boolean) as CardData[];

  return { data, isLoading, isError };
}
