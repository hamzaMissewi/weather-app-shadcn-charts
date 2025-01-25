"use client";
import React, { useEffect, useState } from "react";
import { getWeatherUrl } from "@/lib/weather";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
// import ReactJson from "react-json-view";
import dynamic from "next/dynamic";
const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export default function WeatherSearch() {
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lon, setLon] = useState<number | undefined>(undefined);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // This code runs only on the client
  //     document.title = "Weather Search";
  //   }
  // }, []);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      setError("");

      // if (location) {
      //   query = `location=${encodeURIComponent(location)}`;
      // } else if (lat && lon) {
      //   query = `lat=${lat}&lon=${lon}`;
      // } else {
      //   setError("Please provide a location or coordinates.");
      //   return;
      // }
      // const url = await getWeatherUrl({ location, lat, lng: lon });

      let apiUrl = `/api/weather?location=${location}`;

      if (lat && lon) {
        apiUrl = `${apiUrl}&lat=${lat}&lng=${lon}`;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
      });

      if (!response.ok) {
        toast.error(`Response not ok ! ${response.status}`);
        setError("Not Error");
      }

      const data = await response.json();
      // console.log("what is data ", data);
      if (data.error) {
        toast.error(`Failed to fetch weather data ${data.error.message}`);
        setError(data.error || "Failed to fetch weather data.");
      }

      if (data && data.location && data.coords) {
        toast.success(
          `Weather in ${data.location} is ${data?.temperature}°C , description: ${data?.description}.`,
        );
      }

      setWeather(data);
    } catch (err: any) {
      toast.error(`An unexpected error occurred ${err.message}`);
      setError(`An unexpected error occurred. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //   if (weather && weather.location && weather.coords) {
  //     toast.success(
  //       `Weather in ${weather.location} is ${weather?.temperature}°C , description: ${weather?.description}.`,
  //     );
  //     // setTimeout(() => {
  //     //   router.push(
  //     //     `/weather/${weather.location}/${weather.coords.lat}/${weather.coords.lon}`,
  //     //   );
  //     // }, 2000);
  //   }
  // }, [weather]);

  if (!isClient) {
    return <LoadingSpinner />; // Fallback for SSR
  }

  return (
    <div className="p-4 w-4xl mx-auto">
      <div className="space-y-3 w-full">
        <input
          type="text"
          placeholder="Enter location name"
          required={false}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        {/*<p className="text-center text-gray-600">OR</p>*/}
        {/*<div className="flex space-x-2">*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Latitude"*/}
        {/*    required={false}*/}
        {/*    value={lat}*/}
        {/*    onChange={(e) => setLat(e.target.valueAsNumber)}*/}
        {/*    className="w-1/2 border rounded px-3 py-2"*/}
        {/*  />*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Longitude"*/}
        {/*    required={false}*/}
        {/*    value={lon}*/}
        {/*    onChange={(e) => setLon(e.target.valueAsNumber)}*/}
        {/*    className="w-1/2 border rounded px-3 py-2"*/}
        {/*  />*/}
        {/*</div>*/}
        <button
          onClick={fetchWeather}
          className="flex w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Get Weather
        </button>
        {loading && <LoadingSpinner />}
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}

      {weather && (
        <div className="mt-4 text-white flex-wrap text-wrap w-full">
          {/*<strong>{m.role === "user" ? "You: " : "AI: "}</strong>*/}
          <strong>Result:</strong>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <DynamicReactJson
              src={weather}
              theme="monokai"
              collapsed={false}
              displayDataTypes={false}
              displayObjectSize={false}
              enableClipboard={true}
            />
          </div>
        </div>
      )}
      {weather && !weather.error && (
        <div className={"flex flex-col justify-between h-full my-5"}>
          <Button
            className={
              "text-accent_green bg-gray-800/80 flex justify-center self-center border hover:shadow-gray-100 shadow-md"
            }
            onClick={() =>
              router.push(
                `/weather/${weather.location}/${weather.coords.lat}/${weather.coords.lon}`,
              )
            }
          >
            Show Details
          </Button>
          <div className="mt-5 p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-bold">Location: {weather.location}</h2>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Weather: {weather.description}</p>
            <p>Wind Speed: {weather.windSpeed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}
