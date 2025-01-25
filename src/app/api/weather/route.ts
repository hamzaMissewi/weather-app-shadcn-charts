import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const { location, lat, lng } = await req.json(); // Get location name or coordinates from query parameters

  // const url = await getWeatherUrl({ location, lat, lng });

  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  // if (!lat || !lng) {
  //   return NextResponse.json(
  //     { error: "Latitude and longitude are required" },
  //     { status: 400 },
  //   );
  // }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY!;

  if (!apiKey) {
    return NextResponse.json({ error: "Invalid API key" });
  }

  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  // const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&exclude=hourly,daily&appid=${apiKey}`;

  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;

  const newUrl = new URL(url);

  if (location && location !== "") {
    // newUrl.searchParams.set("q", encodeURIComponent(location));
    newUrl.searchParams.set("q", location);
  } else {
    // throw new Error("Please provide a location name.");
    return NextResponse.json(
      { error: "Please provide a location name." },
      { status: 500 },
    );
  }
  // if (lat && lng) {
  //   newUrl.searchParams.set("lat", lat.toString());
  //   newUrl.searchParams.set("lon", lng.toString());
  // }

  newUrl.searchParams.set("units", "metric");

  // console.log("weather url to fetch ", newUrl);

  const response = await fetch(newUrl.href);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch weather data." },
      { status: response.status },
    );
  }

  try {
    const data = await response.json();

    console.log("weather open data response", data);

    // Extract relevant data
    const weatherDetails = {
      location: data.name,
      coords: data.coord,
      //   other data
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0]?.description || "No description available",
      windSpeed: data.wind.speed,
    };

    return NextResponse.json(weatherDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 },
    );
  }
}
