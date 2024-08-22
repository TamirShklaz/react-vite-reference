"use client";

import { cn } from "@/lib/utils.ts";
import WeatherWithSwr from "@/components/weather-with-swr.tsx";

type Props = { className?: string };

function Weather({ className }: Props) {
  return (
    <div className={cn(className)}>
      <h1 className={"text-2xl font-medium mb-4"}>Weather With SWR</h1>
      <WeatherWithSwr />
    </div>
  );
}

export default Weather;
