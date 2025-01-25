export const weatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`;
// let url = `${baseUrl}?appid=${apiKey}&exclude=hourly,daily`;

export const baseUrlV2 =
  "https://api.openweathermap.org/data/2.5/forecast/climate";
// api.openweathermap.org/data/2.5/forecast/climate?q=London&cnt=3
export const baseUrlV3 = "https://api.openweathermap.org/data/3.0/onecall";
