// lib/store/weatherApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { weatherCodeToLucide } from "@/lib/weather/weatherCodeToLucide";
import type { DailyWeather, WeatherCode } from "@/lib/weather/types";

interface OpenMeteoResponse {
  daily: {
    time: string[];
    temperature_2m_mean: number[];
    precipitation_probability_mean: number[];
    weathercode: WeatherCode[];
  };
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.open-meteo.com/v1/" }),
  endpoints: (builder) => ({
    getDhakaForecast: builder.query<Record<string, DailyWeather>, void>({
      query: () =>
        "forecast?latitude=23.7104&longitude=90.4074&daily=temperature_2m_mean,precipitation_probability_mean,weathercode&forecast_days=14&timezone=Asia/Dhaka",
      transformResponse: (response: OpenMeteoResponse) => {
        // Adapt to a date-keyed object for fast lookups
        const {
          time,
          temperature_2m_mean,
          precipitation_probability_mean,
          weathercode,
        } = response.daily;
        const out: Record<string, DailyWeather> = {};
        time.forEach((date, i) => {
          const code = weathercode[i] as WeatherCode;
          const mapping = weatherCodeToLucide[code] || {
            label: "Unknown",
            icon: "HelpCircle",
          };
          out[date] = {
            date,
            temp: temperature_2m_mean[i],
            precip: precipitation_probability_mean[i],
            code,
            condition: mapping.label,
            icon: mapping.icon,
          };
        });
        return out;
      },
    }),
  }),
});

export const { useGetDhakaForecastQuery } = weatherApi;
