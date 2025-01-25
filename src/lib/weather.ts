import { weatherBaseUrl } from "@/lib/constants";

export const getWeatherUrl = ({
  lat = 33.44,
  lng = -94.04,
  location,
}: {
  lat?: number;
  lng?: number;
  location?: string;
}) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY!;
  if (!apiKey) {
    throw new Error("No API key");
  }

  // https://pro.openweathermap.org/data/2.5/forecast/climate?zip=94040,us&appid={API key}

  try {
    const newUrl = new URL(weatherBaseUrl);

    // newUrl.searchParams.set("units", "metric");
    // exclude=hourly,daily

    if (location) {
      newUrl.searchParams.set("q", location);
    } else if (lat && lng) {
      newUrl.searchParams.set("lat", lat.toString());
      newUrl.searchParams.set("lon", lng.toString());
    } else {
      throw new Error("Please provide a location name or lat/lon.");
    }
    console.log("new url", newUrl);
    return newUrl.href;
  } catch (error: any) {
    throw new Error(`Could not fetch weather data: ${error.message}`);
  }
};
