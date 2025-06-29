// lib/weather/types.ts

export type WeatherCode =
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86
  | 95
  | 96
  | 99;

export type LucideWeatherIcon =
  | "Sun"
  | "CloudSun"
  | "Cloud"
  | "CloudFog"
  | "CloudDrizzle"
  | "CloudRain"
  | "Snowflake"
  | "CloudLightning"
  | "HelpCircle";

export interface WeatherCondition {
  label: string;
  icon: LucideWeatherIcon;
}

export interface DailyWeather {
  date: string; // ISO yyyy-mm-dd
  temp: number;
  precip: number;
  condition: string;
  icon: LucideWeatherIcon;
  code: WeatherCode;
}
