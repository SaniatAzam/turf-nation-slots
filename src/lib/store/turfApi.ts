// src/lib/store/turfApi.ts
import { toIso, dboxTimeToIso } from "@/utils/time";
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

interface DboxApiResponse {
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

    getDboxRooftopDay: builder.query<CardData, string /*date*/>({
      query: (date) => `dbox-rooftop?date=${date}`,
      transformResponse: (raw: DboxApiResponse) => {
        return {
          date: raw.date,
          startTimes: raw.slots
            .filter((s) => s.status === "available")
            .map((s) => {
              // Extract start and end times from "HH:MM - HH:MM" format
              const startTime = s.time.split(" - ")[0];
              return dboxTimeToIso(raw.date, startTime);
            }),
        };
      },
      providesTags: (r) => (r ? [{ type: "Slots", id: r.date }] : []),
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

export const {
  useGetTurfNationSlotsQuery,
  useGetJaffDayQuery,
  useGetDboxRooftopDayQuery,
} = turfApi;
