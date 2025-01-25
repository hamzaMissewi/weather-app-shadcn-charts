import WeatherSearch from "@/components/weather-search";
import { MapPinIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col w-full justify-center items-center ">
      <div className="flex items-center space-x-2 mb-8">
        <MapPinIcon className="w-9 h-9 text-accent_green" />
        <h1 className="text-4xl font-bold text-[#00ff99]">
          Search By Location
        </h1>
      </div>
      <WeatherSearch />
    </main>
  );
}
