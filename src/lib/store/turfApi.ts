// src/lib/store/turfApi.ts
import { toIso } from "@/utils/time";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SlotPayload {
  arenaId: string;
  date: string;
  duration: number;
}
interface TurfSlotsResponse {
  date: string;
  startTimes: string[];
}

interface CardData {
  date: string;
  startTimes: string[];
}

interface JaffApiResponse {
  date: string;
  slots: { time: string; status: string }[];
}

export const turfApi = createApi({
  reducerPath: "turfApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Next‑API base
  tagTypes: ["Slots"],
  endpoints: (builder) => ({
    getTurfNationSlots: builder.query<TurfSlotsResponse, SlotPayload>({
      query: (body) => ({
        url: "turf/available-slots",
        method: "POST",
        body,
      }),
      providesTags: (r, e, arg) => [{ type: "Slots", id: arg.date }],
    }),

    getJaffDay: builder.query<CardData, string /*date*/>({
      query: (date) => `jaff?date=${date}`,
      transformResponse: (raw: JaffApiResponse) => ({
        date: raw.date,
        startTimes: raw.slots
          .filter((s) => s.status === "available")
          .map((s) => toIso(raw.date, s.time)),
      }),
      providesTags: (r) => (r ? [{ type: "Slots", id: r.date }] : []),
    }),
  }),
});

export const { useGetTurfNationSlotsQuery, useGetJaffDayQuery } = turfApi;
