import { cn } from "@/lib/utils.ts";
import useSWR from "swr";
import { fetcher, FetchError } from "@/lib/fetcher.ts";
import { isErrorResponse, WeatherResponse } from "@/types/weather.ts";

type Props = { className?: string };

function WeatherWithSwr({ className }: Props) {
  const { data, error, isLoading } = useSWR<WeatherResponse, FetchError>(
    "https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=vqG6hlif6vh8happOknYTnRUFxIw6iyX",
    fetcher,
    { shouldRetryOnError: false },
  );

  if (error) {
    console.error(error.message, error.status, error.info);
    if (isErrorResponse(error.info)) {
      return <p>Error: {error.info.message}</p>;
    }
    return <p>An unexpected error occured</p>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data) {
    return <p>Empty</p>;
  }

  return (
    <div className={cn(className)}>
      <span>Temperature in Toronto: &nbsp;{data?.data.values.temperature} degrees</span>
    </div>
  );
}

export default WeatherWithSwr;
