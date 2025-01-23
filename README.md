<div align="center">
  <br />
    <a href="https://youtube.com/playlist?list=PLJT1e2CqMCFDgbiwTnKQwV__0SLlpYq-E&si=8uBin0qCH8kQTs7V" target="_blank">
      <img src="public/weather_application.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
  </div>

  <h3 align="center">Weather Application Using ShadCN Charts</h3>

   <div align="center">
     Build this project step by step with a detailed tutorial on <a href="https://www.youtube.com/@codespirit369/videos" target="_blank"><b>Code Spirit</b></a> YouTube.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)

## 🚨 Tutorial

This repository contains the code corresponding to an in-depth tutorial available on our YouTube channel, <a href="https://www.youtube.com/@codespirit369/videos" target="_blank"><b>Code Spirit</b></a>.

<a href="https://youtu.be/hs6BtY9ndXA" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Next.js
- Typescript
- TailwindCSS
- ShadCN

## <a name="introduction">🤖 Introduction</a>

A Weather application that allows users to easily view real-time weather data for various locations, featuring detailed visualizations of temperature, humidity, and precipitation using ShadCN UI charts. The app is built using Next.js and TypeScript and integrates the openmeteo weather forecast API for accurate weather information. Additional features include a city picker for location selection and skeleton loading for a smooth user experience.

## <a name="features">🔋 Features</a>

👉 Real-time weather data for multiple locations

👉 Detailed visualizations of temperature, humidity, and precipitation

👉 City picker for easy location selection

👉 Skeleton loading for a smooth user experience

## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/hamzaMissewi/weather-app-shadcn-charts.git
cd weather-app-shadcn-charts
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Code Snippets</a>

<details>
<summary><code>hooks/useWeatherData.ts</code></summary>

```typescript
import { useEffect, useState } from "react";

import { fetchWeatherData } from "@/lib/fetchWeatherData";

export function useWeatherData(lat: string, long: string) {
  const [temperatureChartData, setTemperatureChartData] = useState<any>(null);
  const [humidityChartData, setHumidityChartData] = useState<any>(null);
  const [precipitationSumChartData, setPrecipitationSumChartData] =
    useState<any>(null);
  const [
    precipitationProbabilityChartData,
    setPrecipitationProbabilityChartData,
  ] = useState<any>(null);

  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [currentTemp, setCurrentTemp] = useState<number>(0);
  const [currentApparentTemp, setCurrentApparentTemp] = useState<number>(0);
  const [currentHumidity, setCurrentHumidity] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(lat, long);
        console.log(data);

        const now = new Date();

        // Next 6 hours
        const next6Hours = data.hourly.time
          .map((t) => new Date(t))
          .filter(
            (t: Date) =>
              t > now && t <= new Date(now.getTime() + 6 * 60 * 60 * 1000)
          );

        // Next 24 hours
        const next24Hours = data.hourly.time
          .map((t) => new Date(t))
          .filter(
            (t: Date) =>
              t > now && t <= new Date(now.getTime() + 24 * 60 * 60 * 1000)
          );

        //   Temperature
        const currentTemp = data.current.temperature2m;
        const currentApparentTemp = data.current.apparentTemperature;
        const weatherCode = data.current.weatherCode;

        const temperatureData = data.hourly.temperature2m.slice(
          0,
          next24Hours.length
        );
        const apparentTemperatureData = data.hourly.apparentTemperature.slice(
          0,
          next24Hours.length
        );

        const temperatureChartData = next24Hours.map((t, index) => {
          const temperature = temperatureData[index].toFixed(1);
          const apparentTemperature = apparentTemperatureData[index].toFixed(1);

          return {
            date: t.toString(),
            temperature: temperature,
            apparent_temperature: apparentTemperature,
          };
        });

        setCurrentTemp(currentTemp);
        setWeatherCode(weatherCode);
        setCurrentApparentTemp(currentApparentTemp);
        setTemperatureChartData(temperatureChartData);

        //   Humidity
        const currentHumidity = data.current.relativeHumidity2m;

        const humidityData = Object.values(
          data.hourly.relativeHumidity2m
        ).slice(0, next24Hours.length);

        const humidityChartData = next24Hours.map((t, index) => {
          const humidity = Math.round(humidityData[index]);

          return {
            date: t.toString(),
            humidity: humidity,
          };
        });

        setHumidityChartData(humidityChartData);
        setCurrentHumidity(currentHumidity);

        //   Precipitation Probability
        const precipitationData = Object.values(
          data.hourly.precipitationProbability
        ).slice(0, next6Hours.length);

        const precipitationProbabilityChartData = next6Hours.map((t, index) => {
          const precipitationProbability = Math.round(precipitationData[index]);

          return {
            date: t.toString(),
            precipitationProbability: precipitationProbability,
          };
        });

        setPrecipitationProbabilityChartData(precipitationProbabilityChartData);

        // Precipitation Sum
        const precipitationSumData = Object.values(
          data.hourly.precipitation
        ).slice(0, next24Hours.length);

        const precipitationSumChartData = next24Hours.map((t, index) => {
          const precipitationSum = precipitationSumData[index].toFixed(2);

          return {
            date: t.toString(),
            precipitation: precipitationSum,
          };
        });

        setPrecipitationSumChartData(precipitationSumChartData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, long]);

  return {
    temperatureChartData,
    humidityChartData,
    precipitationSumChartData,
    precipitationProbabilityChartData,
    weatherCode,
    currentTemp,
    currentApparentTemp,
    currentHumidity,
    error,
    loading,
  };
}
```

</details>

<details>
<summary><code>constants/index.ts</code></summary>

```typescript
export const weatherCodes: {
  [key: number]: {
    icon: string;
    label: string;
  };
} = {
  0: {
    icon: "c01d",
    label: "Clear sky",
  },
  1: {
    icon: "c02d",
    label: "Mainly clear",
  },
  2: {
    icon: "c03d",
    label: "Partly cloudy",
  },
  3: {
    icon: "c04d",
    label: "Overcast",
  },
  45: {
    icon: "s05d",
    label: "Fog",
  },
  48: {
    icon: "s05d",
    label: "Deposite rime fog",
  },
  51: {
    icon: "d01d",
    label: "Drizzle",
  },
  53: {
    icon: "d01d",
    label: "Drizzle",
  },
  55: {
    icon: "d01d",
    label: "Drizzle",
  },
  56: {
    icon: "d01d",
    label: "Freezing Drizzle",
  },
  57: {
    icon: "d01d",
    label: "Freezing Drizzle",
  },
  61: {
    icon: "r01d",
    label: "Rain",
  },
  63: {
    icon: "r01d",
    label: "Rain",
  },
  65: {
    icon: "r01d",
    label: "Rain",
  },
  66: {
    icon: "f01d",
    label: "Freezing Rain",
  },
  67: {
    icon: "f01d",
    label: "Freezing Rain",
  },
  71: {
    icon: "s02d",
    label: "Snow",
  },
  73: {
    icon: "s02d",
    label: "Snow",
  },
  75: {
    icon: "s02d",
    label: "Snow",
  },
  77: {
    icon: "s02d",
    label: "Snow Grains",
  },
  80: {
    icon: "r02d",
    label: "Rain Showers",
  },
  81: {
    icon: "r02d",
    label: "Rain Showers",
  },
  82: {
    icon: "r02d",
    label: "Rain Showers",
  },
  85: {
    icon: "s01d",
    label: "Snow Showers",
  },
  86: {
    icon: "s01d",
    label: "Snow Showers",
  },
  95: {
    icon: "t04d",
    label: "Thunderstorm",
  },
  96: {
    icon: "t04d",
    label: "Thunderstorm",
  },
  99: {
    icon: "t04d",
    label: "Thunderstorm",
  },
};

export const humidityLevels = [
  {
    max: 20,
    message:
      "🏜️ The air is quite dry today with very low humidity. You might experience dry skin and irritation.",
  },
  {
    max: 40,
    message:
      "🌵 The humidity level is low. It's a relatively dry day, but comfortable for most activities.",
  },
  {
    max: 60,
    message:
      "🌤️ The humidity level is moderate. The air feels comfortable and pleasant.",
  },
  {
    max: 80,
    message:
      "🌧️ The humidity level is high. It might feel a bit muggy and sticky outside.",
    color: "#87CEEB",
  },
  {
    max: 100,
    message:
      "💧 The air is very humid today. Expect a heavy, damp feeling, and possible discomfort due to high moisture levels.",
  },
];
```

</details>

<details>
<summary><code>lib/fetchWeatherData.ts</code></summary>

```typescript
import { fetchWeatherApi } from "openmeteo";

const url = "https://api.open-meteo.com/v1/forecast";

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const fetchWeatherData = async (lat: string, long: string) => {
  const params = {
    latitude: parseFloat(lat),
    longitude: parseFloat(long),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
    ],
  };

  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const current = response.current()!;
  const hourly = response.hourly()!;

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
    },
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
      apparentTemperature: hourly.variables(2)!.valuesArray()!,
      precipitationProbability: hourly.variables(3)!.valuesArray()!,
      precipitation: hourly.variables(4)!.valuesArray()!,
    },
  };

  return weatherData;
};
```

</details>
