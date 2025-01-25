import { NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City parameter is required" },
      { status: 400 },
    );
  }

  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
  );
  const data = await response.json();
  // console.log("api 2 data ", data);

  if (response.ok) {
    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      { error: data.message },
      { status: response.status },
    );
  }
}
